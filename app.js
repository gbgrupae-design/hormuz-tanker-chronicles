const STORAGE_KEY = 'hormuz-chronicles-nft-state-v3';
const MAX_TANKERS = 5;
const BASE_VOYAGE_SECONDS = 120;
const FUEL_BASE_FEE = 10;
const FUEL_PER_TANKER = 5;
const HUNT_FEE = 15;
const HUNT_DURATION = 40;
const GAME_NFT_REGISTRY = {
  tankers: {
    'monsoon-titan': { name: 'Monsoon Titan', type: 'Tanker', cargo: 120, speedBonus: -20, baseSuccess: 70, reward: 100, image: 'images/Monsoon titan.jpg', openseaUrl: 'https://opensea.io' },
    'persian-phantom': { name: 'Persian Phantom', type: 'Tanker', cargo: 50, speedBonus: 30, baseSuccess: 90, reward: 40, image: 'images/Persian Phantom.jpg', openseaUrl: 'https://opensea.io' },
    kormoran: { name: 'Kormoran Transporter', type: 'Tanker', cargo: 250, speedBonus: -50, baseSuccess: 55, reward: 250, image: 'images/ORP kormoran.jpg', openseaUrl: 'https://opensea.io' },
    'amaterasu-maru': { name: 'Amaterasu Maru', type: 'Tanker', cargo: 180, speedBonus: -10, baseSuccess: 65, reward: 160, image: 'images/Amaterasu maru.jpg', openseaUrl: 'https://opensea.io' },
    'black-marlin': { name: 'Black Marlin', type: 'Tanker', cargo: 140, speedBonus: -15, baseSuccess: 68, reward: 115, image: 'images/Ocean Nomad.jpg', openseaUrl: 'https://opensea.io' }
  },
  escorts: {
    'fleet-command': { name: 'Fleet Command', type: 'Escort', defenseBonus: 30, speedModifier: 15, image: 'images/Flet command.jpg', openseaUrl: 'https://opensea.io' },
    'aegis-vanguard': { name: 'Aegis Vanguard', type: 'Escort', defenseBonus: 20, speedModifier: 10, image: 'images/Aegis vanguard.jpg', openseaUrl: 'https://opensea.io' },
    'guardian-patrol': { name: 'Guardian Patrol', type: 'Escort', defenseBonus: 15, speedModifier: 20, image: 'images/Overwatch sentinel.jpg', openseaUrl: 'https://opensea.io' },
    imperator: { name: 'IMPERATOR', type: 'Escort', defenseBonus: 25, speedModifier: 5, image: 'images/Imperator.jpg', openseaUrl: 'https://opensea.io' }
  },
  weapons: {
    apex: { name: 'APEX', type: 'Weapon', charges: 1, image: 'images/apex.jpg', text: 'Niszczy rakiety', openseaUrl: 'https://opensea.io' },
    'imperator-mine': { name: 'IMPERATOR Mine', type: 'Weapon', charges: 1, image: 'images/Imperator PH.jpg', text: 'Detonuje wroga', openseaUrl: 'https://opensea.io' },
    guardian: { name: 'Guardian', type: 'Weapon', charges: 1, image: 'images/poseidons shields.jpg', text: 'Wzmacnia obronę konwoju', openseaUrl: 'https://opensea.io' }
  },
  pirates: {
    'the-outlaw': { name: 'The Outlaw', type: 'Pirate', attackBonus: 40, speedModifier: 10, image: 'images/The Outlaw.jpg', openseaUrl: 'https://opensea.io' }
  }
};

const DEFAULT_USER_NFTS = {
  'monsoon-titan': 2, 'persian-phantom': 1, kormoran: 0, 'amaterasu-maru': 1, 'black-marlin': 1,
  'fleet-command': 1, 'aegis-vanguard': 0, 'guardian-patrol': 1, imperator: 1,
  'the-outlaw': 1,
  apex: 2, 'imperator-mine': 1, guardian: 0
};

const $ = (id) => document.getElementById(id);
const fmt = (value) => new Intl.NumberFormat().format(Math.round(value));
const clock = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
const allNftIds = () => Object.keys(DEFAULT_USER_NFTS);

function loadState() {
  const fallback = {
    wallet: 100,
    starterBalanceGranted: true,
    voyages: 0,
    userNFTs: { ...DEFAULT_USER_NFTS },
    selectedTankers: [],
    selectedEscorts: [],
    selectedWeapons: [],
    selectedPirates: []
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (!saved) return fallback;
    const userNFTs = { ...DEFAULT_USER_NFTS, ...(saved.userNFTs || {}) };
    allNftIds().forEach((id) => { userNFTs[id] = Math.max(0, Number(userNFTs[id]) || 0); });
    const starterBalanceGranted = saved.starterBalanceGranted === true;
    const wallet = starterBalanceGranted
      ? (Number.isFinite(Number(saved.wallet)) ? Number(saved.wallet) : 0)
      : 100;
    return {
      ...fallback, ...saved, userNFTs, wallet, starterBalanceGranted: true,
      selectedTankers: Array.isArray(saved.selectedTankers) ? saved.selectedTankers.filter((id) => GAME_NFT_REGISTRY.tankers[id]) : [],
      selectedEscorts: Array.isArray(saved.selectedEscorts) ? saved.selectedEscorts.filter((id) => GAME_NFT_REGISTRY.escorts[id]) : [],
      selectedWeapons: Array.isArray(saved.selectedWeapons) ? saved.selectedWeapons.filter((id) => GAME_NFT_REGISTRY.weapons[id]) : [],
      selectedPirates: Array.isArray(saved.selectedPirates) ? saved.selectedPirates.filter((id) => GAME_NFT_REGISTRY.pirates[id]) : []
    };
  } catch (error) {
    console.warn('Saved NFT state was invalid and has been reset.', error);
    return fallback;
  }
}

const state = loadState();
let running = false;
let elapsed = 0;
let voyageSeconds = 0;
let huntElapsed = 0;
let timer = null;
let nextAttackAt = 0;

function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function updateWallet() { $('wallet').textContent = `${fmt(state.wallet)} $HOC`; }
function addLog(message, type = 'system') {
  const entry = document.createElement('p');
  entry.className = `log-entry ${type}`;
  entry.textContent = `[${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}] ${message}`;
  $('missionLog').appendChild(entry);
  $('missionLog').scrollTop = $('missionLog').scrollHeight;
}
function registryItem(category, id) { return GAME_NFT_REGISTRY[category][id]; }
function selectedCount(id) { return state.selectedTankers.filter((item) => item === id).length; }
function fuelFee() { return FUEL_BASE_FEE + state.selectedTankers.length * FUEL_PER_TANKER; }
function ownedTotal(category) {
  return Object.keys(GAME_NFT_REGISTRY[category]).reduce((sum, id) => sum + (state.userNFTs[id] || 0), 0);
}
function protectionChance() {
  return Math.min(0.95, 0.35 + state.selectedEscorts.reduce((sum, id) => sum + (registryItem('escorts', id).defenseBonus || 0) / 100, 0));
}
function estimatedDuration() {
  if (!state.selectedTankers.length) return 0;
  const averageSpeed = state.selectedTankers.reduce((sum, id) => sum + registryItem('tankers', id).speedBonus, 0) / state.selectedTankers.length;
  const escortSpeed = state.selectedEscorts.reduce((sum, id) => sum + (registryItem('escorts', id).speedModifier || 0), 0);
  return Math.max(30, Math.round(BASE_VOYAGE_SECONDS - averageSpeed - escortSpeed));
}
function estimatedSurvival() {
  if (!state.selectedTankers.length) return 0;
  const averageSuccess = state.selectedTankers.reduce((sum, id) => sum + registryItem('tankers', id).baseSuccess, 0) / state.selectedTankers.length;
  return Math.round(Math.min(99, averageSuccess + protectionChance() * 20));
}

function card(category, id) {
  const item = registryItem(category, id);
  const owned = state.userNFTs[id] || 0;
  const locked = owned === 0;
  const selected = category === 'tankers' ? selectedCount(id) : category === 'escorts' ? state.selectedEscorts.includes(id) : category === 'weapons' ? state.selectedWeapons.includes(id) : state.selectedPirates.includes(id);
  const stats = category === 'tankers'
    ? `Cargo <b>${item.cargo} kt</b> · Speed <b>${item.speedBonus >= 0 ? '+' : ''}${item.speedBonus}s</b> · Reward <b>${item.reward} $HOC</b>`
    : category === 'escorts' || category === 'pirates'
      ? `${item.type === 'Pirate' ? 'Attack' : 'Defense'} <b>+${item.attackBonus || item.defenseBonus}%</b> · Speed <b>+${item.speedModifier}s</b>`
      : `${item.text} · Charges <b>${item.charges}</b>`;
  return `<article class="ship-card nft-card ${selected ? 'selected' : ''} ${locked ? 'locked-nft' : ''}" data-category="${category}" data-id="${id}">
    <div class="nft-image-wrap"><img src="${item.image}" class="nft-card-img" alt="${item.name}" loading="lazy"><span class="owned-badge">x${owned}</span>${locked ? `<button class="buy-overlay" type="button" data-opensea-url="${item.openseaUrl}">BUY ON OPENSEA</button>` : ''}</div>
    <div class="nft-card-body"><h2>${item.name}</h2><div class="stats-line"><span>${stats}</span></div>
    ${locked ? '' : `<small class="selected-count">${selected ? `Selected: ${selected}` : 'Click to select'}</small>`}</div>
  </article>`;
}

function renderInventory() {
  $('tankers-vault').innerHTML = Object.keys(GAME_NFT_REGISTRY.tankers).map((id) => card('tankers', id)).join('');
  $('escorts-vault').innerHTML = Object.keys(GAME_NFT_REGISTRY.escorts).map((id) => card('escorts', id)).join('');
  $('weapons-vault').innerHTML = Object.keys(GAME_NFT_REGISTRY.weapons).map((id) => card('weapons', id)).join('');
  $('pirateGrid').innerHTML = Object.keys(GAME_NFT_REGISTRY.pirates).map((id) => card('pirates', id)).join('');
  document.querySelectorAll('.nft-card:not(.locked-nft)').forEach((element) => {
    element.addEventListener('click', () => selectNFT(element.dataset.category, element.dataset.id));
  });
  document.querySelectorAll('.buy-overlay').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      window.open(button.dataset.openseaUrl, '_blank', 'noopener,noreferrer');
    });
  });
  updateSummary();
}

function selectNFT(category, id) {
  if (running || !state.userNFTs[id]) return;
  if (category === 'tankers') {
    const count = selectedCount(id);
    if (count < state.userNFTs[id] && state.selectedTankers.length < MAX_TANKERS) state.selectedTankers.push(id);
    else if (count > 0) state.selectedTankers.splice(state.selectedTankers.lastIndexOf(id), 1);
    else addLog('Convoy limit reached: maximum five tanker units.', 'warning');
  } else if (category === 'escorts' || category === 'pirates') {
    const target = category === 'pirates' ? state.selectedPirates : state.selectedEscorts;
    const index = target.indexOf(id);
    if (index >= 0) target.splice(index, 1);
    else target.push(id);
  } else {
    const index = state.selectedWeapons.indexOf(id);
    if (index >= 0) state.selectedWeapons.splice(index, 1);
    else state.selectedWeapons.push(id);
  }
  saveState();
  renderInventory();
}

function updateSummary() {
  const tankers = state.selectedTankers.map((id) => registryItem('tankers', id));
  $('ownedTankers').textContent = ownedTotal('tankers');
  $('ownedEscorts').textContent = ownedTotal('escorts') + ownedTotal('pirates');
  $('ownedWeapons').textContent = ownedTotal('weapons');
  $('voyages').textContent = state.voyages;
  $('fleetCapacity').textContent = `${state.selectedTankers.length} / ${MAX_TANKERS} tankers deployed`;
  $('fleetValue').textContent = fmt(tankers.reduce((sum, item) => sum + item.reward, 0));
  $('cargoCapacity').textContent = `${fmt(tankers.reduce((sum, item) => sum + item.cargo, 0))} kt`;
  $('protection').textContent = `${Math.round(protectionChance() * 100)}%`;
  $('fuelFee').textContent = `Fuel fee: ${fuelFee()} $HOC`;
  $('summary').innerHTML = tankers.length
    ? `<b>${tankers.map((item) => item.name).join(', ')}</b><br>${state.selectedEscorts.length} escorts · ${state.selectedWeapons.length} weapons<br><strong>Estimated voyage: ${clock(estimatedDuration())} · Safe arrival chance: ${estimatedSurvival()}%</strong>`
    : '<span>No tankers selected. Choose owned NFTs to form a convoy.</span>';
  $('pirateSummary').innerHTML = state.selectedPirates.length
    ? `<b>${state.selectedPirates.map((id) => registryItem('pirates', id).name).join(', ')}</b><br>${state.selectedPirates.length} pirate unit(s) · 15 $HOC fee · 40 second hunt<br><strong>Estimated success chance: ${Math.min(75, 40 + (state.selectedPirates.length - 1) * 15)}%</strong>`
    : '<span>No pirate units selected. Choose an owned pirate NFT.</span>';
  $('startMission').disabled = running || !tankers.length;
  $('startHunt').disabled = running || !state.selectedPirates.length;
  updateWallet();
}

function startVoyage() {
  const fee = fuelFee();
  if (running || !state.selectedTankers.length) return;
  if (state.wallet < fee) { addLog('Brak $HOC na zakup paliwa dla konwoju!', 'failed'); return; }
  state.wallet -= fee;
  running = true; elapsed = 0; voyageSeconds = estimatedDuration(); nextAttackAt = 20 + Math.floor(Math.random() * 11);
  $('startMission').textContent = 'CONVOY UNDERWAY'; $('voyageState').textContent = 'AT SEA';
  $('progressLabel').textContent = 'Strait crossing in progress'; $('missionLog').innerHTML = '';
  addLog(`Fleet launched. Fuel sink paid: ${fee} $HOC.`);
  timer = setInterval(tickVoyage, 1000); saveState(); updateSummary();
}
function tickVoyage() {
  elapsed++; $('progressFill').style.width = `${Math.min(100, elapsed / voyageSeconds * 100)}%`; $('progressText').textContent = `${clock(elapsed)} / ${clock(voyageSeconds)}`;
  if (elapsed >= nextAttackAt && state.selectedTankers.length) { addLog('WARNING: Hostile pirate units detected.', 'warning'); nextAttackAt += 20 + Math.floor(Math.random() * 11); }
  if (elapsed >= voyageSeconds) finishVoyage();
}
function finishVoyage() {
  if (!running) return;
  clearInterval(timer); running = false;
  const payout = state.selectedTankers.reduce((sum, id) => sum + registryItem('tankers', id).reward, 0);
  state.wallet += payout; state.voyages += 1; state.selectedTankers = []; state.selectedEscorts = []; state.selectedWeapons = [];
  $('startMission').textContent = 'START VOYAGE'; $('voyageState').textContent = 'DOCKED';
  addLog(payout ? `CONVOY ARRIVED: surviving tankers generated ${payout} $HOC.` : 'VOYAGE LOST: no tankers survived.', payout ? 'success' : 'failed');
  saveState(); renderInventory();
}

function startHunt() {
  if (running || !state.selectedPirates.length) return;
  if (state.wallet < HUNT_FEE) { addLog('Not enough $HOC for ammunition and intelligence.', 'failed'); return; }
  state.wallet -= HUNT_FEE; running = true; huntElapsed = 0; $('startHunt').textContent = 'INTERCEPT UNDERWAY'; $('voyageState').textContent = 'HUNTING'; $('missionLog').innerHTML = '';
  $('progressLabel').textContent = 'Pirate intercept in progress'; $('progressText').textContent = '0:00 / 0:40'; addLog('[HUNT] Intercept fee paid. Pirate fleet leaving port.');
  timer = setInterval(tickHunt, 1000); saveState(); updateSummary();
}
function tickHunt() {
  huntElapsed++; $('progressFill').style.width = `${huntElapsed / HUNT_DURATION * 100}%`; $('progressText').textContent = `${clock(huntElapsed)} / 0:40`;
  if (huntElapsed % 10 === 0) addLog(['[HUNT] Configured radar for interception...', '[HUNT] Tracking tanker thermal signature...', '[HUNT] Pirate units closing on target...'][huntElapsed / 10 - 1], 'warning');
  if (huntElapsed >= HUNT_DURATION) finishHunt();
}
function finishHunt() {
  clearInterval(timer); running = false;
  if (Math.random() < Math.min(0.75, 0.4 + (state.selectedPirates.length - 1) * 0.15)) {
    const reward = 50 + Math.floor(Math.random() * 71); state.wallet += reward;
    addLog(`[HUNT SUCCESS] Captured enemy tanker cargo! Looted ${reward} $HOC!`, 'success');
  } else addLog('[HUNT FAILED] Convoy defended with APEX missiles. Your ships return empty-handed!', 'failed');
  state.selectedPirates = []; $('startHunt').textContent = 'LAUNCH INTERCEPT'; $('voyageState').textContent = 'DOCKED'; saveState(); renderInventory();
}

function switchMode(mode) {
  if (running) return;
  $('convoyMode').classList.toggle('hidden', mode !== 'convoy'); $('pirateMode').classList.toggle('hidden', mode !== 'pirate');
  $('convoyTab').classList.toggle('active', mode === 'convoy'); $('pirateTab').classList.toggle('active', mode === 'pirate');
  $('progressLabel').textContent = mode === 'convoy' ? 'Awaiting convoy orders' : 'Awaiting intercept orders';
}

$('startMission').addEventListener('click', startVoyage);
$('startHunt').addEventListener('click', startHunt);
$('convoyTab').addEventListener('click', () => switchMode('convoy'));
$('pirateTab').addEventListener('click', () => switchMode('pirate'));
$('clearLog').addEventListener('click', () => { $('missionLog').innerHTML = ''; });
renderInventory();
addLog('NFT Registry online. Select owned assets from the vault.');
