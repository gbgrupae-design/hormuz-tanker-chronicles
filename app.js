const STORAGE_KEY = 'hormuz-chronicles-nft-state-v3';
const MAX_TANKERS = 5;
const BASE_VOYAGE_SECONDS = 120;
const FUEL_BASE_FEE = 10;
const FUEL_PER_TANKER = 5;
const HUNT_FEE = 15;
const HUNT_DURATION = 40;
const GAME_NFT_REGISTRY = {
  tankers: {
    'ocean-nomad': { name: 'Ocean Nomad', type: 'Tanker', cargo: 140, speedBonus: -15, baseSuccess: 68, reward: 115, image: 'images/Ocean Nomad.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/7' },
    republica: { name: 'Republica', type: 'Tanker', cargo: 120, speedBonus: 0, baseSuccess: 72, reward: 100, image: 'images/Republika.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/14' },
    'persian-phantom': { name: 'Persian Phantom', type: 'Tanker', cargo: 50, speedBonus: 30, baseSuccess: 90, reward: 40, image: 'images/Persian Phantom.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/4' },
    'shadow-voyager': { name: 'Shadow Voyager', type: 'Tanker', cargo: 110, speedBonus: 10, baseSuccess: 78, reward: 90, image: 'images/Shadow Voyager.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/1' },
    'monsoon-titan': { name: 'Monsoon Titan', type: 'Tanker', cargo: 120, speedBonus: -20, baseSuccess: 70, reward: 100, image: 'images/Monsoon titan.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/9' },
    'l-etoile-marine': { name: "L'Étoile Marine", type: 'Tanker', cargo: 130, speedBonus: -5, baseSuccess: 75, reward: 110, image: 'images/L etoile Marine.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/11' },
    'royal-sovereign': { name: 'Royal Sovereign', type: 'Tanker', cargo: 160, speedBonus: -10, baseSuccess: 74, reward: 135, image: 'images/Royal sovereign.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/6' },
    'desert-wealth': { name: 'Desert Wealth', type: 'Tanker', cargo: 150, speedBonus: -8, baseSuccess: 76, reward: 125, image: 'images/Desert wealth.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/3' },
    'amaterasu-maru': { name: 'Amaterasu Maru', type: 'Tanker', cargo: 180, speedBonus: -10, baseSuccess: 65, reward: 160, image: 'images/Amaterasu maru.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/8' },
    'k-horizon': { name: 'K-Horizon', type: 'Tanker', cargo: 170, speedBonus: -12, baseSuccess: 70, reward: 145, image: 'images/K-horizon.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/10' },
    kormoran: { name: 'Kormoran', type: 'Tanker', cargo: 250, speedBonus: -50, baseSuccess: 55, reward: 250, image: 'images/ORP kormoran.jpg', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/8' },
    'poseidons-shield': { name: "Poseidon's Shield", type: 'Tanker', cargo: 155, speedBonus: -5, baseSuccess: 76, reward: 130, image: 'images/poseidons shields.jpg', openseaUrl: 'https://opensea.io/item/base/0x7a2b1c84bb265eda1f68ff40cb21c305f5440658/12' }
  },
  escorts: {
    'fleet-comand': { name: 'Fleet Comand', type: 'Escort', defenseBonus: 30, speedModifier: 15, image: 'images/Flet command.jpg', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/7' },
    'imperator-escort': { name: 'Imperator', type: 'Escort', defenseBonus: 25, speedModifier: 5, image: 'images/Imperator PH.jpg', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/5' },
    'air-force-one-ocean-command': { name: 'Air Force One: Ocean Command', type: 'Escort', defenseBonus: 20, speedModifier: 10, image: 'images/Air force one.jpg', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/1' },
  },
  weapons: {
    apex: { name: 'APEX', type: 'Weapon', charges: 1, image: 'images/apex.jpg', text: 'Niszczy rakiety', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/6' },
    'imperator-mine': { name: 'Imperator', type: 'Weapon', charges: 1, image: 'images/Imperator.jpg', text: 'Detonuje wroga', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/5' },
    'kestrel-x-hunter': { name: 'Kestrel-X Hunter', type: 'Weapon', charges: 1, image: 'images/Kestrel-X.jpg', text: 'Przechwytuje szybkie cele', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/2' },
    'overwatch-sentinel': { name: 'Overwatch Sentinel', type: 'Weapon', charges: 1, image: 'images/Overwatch sentinel.jpg', text: 'Wykrywa zagrożenia', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/4' },
    'leviathan-01': { name: 'Leviathan-01', type: 'Weapon', charges: 1, image: 'images/Leviathan-01.jpg', text: 'Niszczy ciężkie cele', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/3' }
  },
  pirates: {
    'the-outlaw': { name: 'The Outlaw', type: 'Pirate', attackBonus: 40, speedModifier: 10, image: 'images/The Outlaw.jpg', openseaUrl: 'https://opensea.io/collection/hormuz-tanker-chronicles' },
    'ghost-tanker': { name: 'Ghost Tanker', type: 'Pirate', attackBonus: 35, speedModifier: 15, image: 'images/Shadow Voyager.jpg', openseaUrl: 'https://opensea.io/item/base/0x40f6accbc1ae9ae3c17ce9177481413bad5077ae/9' }
  }
};

const DEFAULT_USER_NFTS = {
  'ocean-nomad': 1, republica: 1, 'persian-phantom': 1, 'shadow-voyager': 1, 'monsoon-titan': 2, 'l-etoile-marine': 0, 'royal-sovereign': 0, 'desert-wealth': 0, 'amaterasu-maru': 1, 'k-horizon': 0, kormoran: 0, 'poseidons-shield': 1,
  'fleet-comand': 1, 'imperator-escort': 1, 'air-force-one-ocean-command': 0, 'overwatch-sentinel': 1, 'kestrel-x-hunter': 0, 'the-outlaw': 1, 'ghost-tanker': 1,
  'imperator-mine': 0, 'leviathan-01': 1, apex: 2
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
    userNFTs['poseidons-shield'] = Math.max(1, userNFTs['poseidons-shield'] || 0);
    userNFTs['ghost-tanker'] = Math.max(1, userNFTs['ghost-tanker'] || 0);
    userNFTs['air-force-one-ocean-command'] = 0;
    userNFTs['imperator-mine'] = 0;
    userNFTs['kestrel-x-hunter'] = 0;
    userNFTs.apex = Math.max(1, userNFTs.apex || 0);
    userNFTs['overwatch-sentinel'] = Math.max(1, userNFTs['overwatch-sentinel'] || 0);
    userNFTs['leviathan-01'] = Math.max(1, userNFTs['leviathan-01'] || 0);
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
let voyageFleet = [];
let voyageEscorts = [];
let voyageStrategy = 'escort';
let nextVoyageEventAt = 0;
let nextRadioAt = 0;
let voyageInitialCargo = 0;
let voyageUsedWeapons = new Set();
let voyageUsedEscorts = new Set();
let attackPaused = false;
let attackPauseTimer = null;

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
  const routePenalty = { escort: 0, dark: 0.12, hunt: 0.2 }[$('route').value] || 0;
  const escortDefense = state.selectedEscorts.reduce((sum, id) => sum + (registryItem('escorts', id).defenseBonus || 0) / 100, 0);
  return Math.min(0.8, Math.max(0.08, 0.18 + escortDefense - routePenalty));
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
  const routePenalty = { escort: 0, dark: 14, hunt: 24 }[$('route').value] || 0;
  const fleetPenalty = Math.max(0, state.selectedTankers.length - state.selectedEscorts.length * 2) * 3;
  return Math.round(Math.max(20, Math.min(92, averageSuccess + protectionChance() * 18 - routePenalty - fleetPenalty)));
}

function liveCargo() {
  return voyageFleet.filter((tanker) => tanker.alive).reduce((sum, tanker) => sum + registryItem('tankers', tanker.id).cargo, 0);
}

function scheduleVoyageEvent() {
  const intervals = {
    escort: [12, 20],
    dark: [8, 14],
    hunt: [6, 11]
  };
  const [minimum, maximum] = intervals[voyageStrategy] || intervals.escort;
  nextVoyageEventAt = elapsed + minimum + Math.floor(Math.random() * (maximum - minimum + 1));
}

function scheduleRadioUpdate() {
  nextRadioAt = elapsed + 6 + Math.floor(Math.random() * 5);
}

function useDefenseWeapon() {
  const weaponOrder = ['apex', 'imperator-mine', 'kestrel-x-hunter', 'overwatch-sentinel', 'leviathan-01'];
  const availableWeapons = weaponOrder.filter((id) => state.selectedWeapons.includes(id)
    && state.userNFTs[id] > 0);
  const weaponId = availableWeapons.length
    ? availableWeapons[Math.floor(Math.random() * availableWeapons.length)]
    : null;
  if (!weaponId) return null;
  voyageUsedWeapons.add(weaponId);
  return registryItem('weapons', weaponId);
}

function routeRisk() {
  return { escort: 0.2, dark: 0.55, hunt: 0.8 }[voyageStrategy] || 0.2;
}

function pauseForAttack() {
  attackPaused = true;
  $('progress-box').classList.add('attack-alert');
  $('progressLabel').textContent = '⚠️ ATTACK IN PROGRESS — convoy paused';
  clearTimeout(attackPauseTimer);
  attackPauseTimer = setTimeout(() => {
    attackPaused = false;
    $('progress-box').classList.remove('attack-alert');
    $('progressLabel').textContent = 'Strait crossing in progress';
  }, 3000);
}

function checkForEnemies() {
  if (!voyageFleet.some((tanker) => tanker.alive)) return;
  pauseForAttack();
  const scenarios = [
    'DRONE ATTACK: Multiple hostile drones are approaching from the north.',
    'DRONE ATTACK: Low-flying attack drones are diving toward the lead tanker.',
    'MISSILE ATTACK: Anti-ship missiles launched from an unidentified position.',
    'MISSILE ATTACK: Incoming missile signatures detected on the starboard side.',
    'TORPEDO ATTACK: Torpedo wakes detected beneath the convoy.',
    'TORPEDO ATTACK: Submerged contact has launched toward the rear tanker.',
    'PIRATE ATTACK: Fast pirate boats are attempting to board the convoy.',
    'PIRATE ATTACK: Armed skiffs are closing at high speed from the port side.',
    'VESSEL ATTACK: Hostile attack craft is maneuvering into firing range.',
    'VESSEL ATTACK: Unidentified warship is shadowing the convoy and opening fire.'
  ];
  const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
  addLog(`[ALERT] ${scenario}`, 'failed');
  const weapon = Math.random() < Math.min(0.72, 0.34 + routeRisk() * 0.35)
    ? useDefenseWeapon()
    : null;
  if (weapon) {
    addLog(`[WEAPONS] ${weapon.name} fired. Hostile contact neutralized; convoy is resuming formation.`, 'success');
    addLog(`[CARGO] ${fmt(liveCargo())} kt remains in the convoy. Cargo loss: 0 kt.`);
    renderInventory();
    scheduleVoyageEvent();
    return;
  }

  const defenseRoll = Math.random();
  const activeEscorts = voyageEscorts.filter((escort) => escort.alive);
  const defenseChance = Math.min(0.8, protectionChance() + activeEscorts.length * 0.04 - voyageFleet.length * 0.025);
  if (defenseRoll < defenseChance) {
    addLog(`[DEFENSE] ${activeEscorts.length ? 'Escort formation' : 'Convoy crews'} repelled the attackers.`, 'success');
    addLog(`[CARGO] ${fmt(liveCargo())} kt remains in the convoy. Cargo loss: 0 kt.`);
    renderInventory();
    scheduleVoyageEvent();
    return;
  }

  if (activeEscorts.length && Math.random() < 0.38) {
    const targetEscort = activeEscorts[Math.floor(Math.random() * activeEscorts.length)];
    targetEscort.alive = false;
    voyageUsedEscorts.add(targetEscort.id);
    addLog(`[ESCORT LOST] ${registryItem('escorts', targetEscort.id).name} was destroyed protecting the convoy.`, 'failed');
    addLog(`[CARGO] Cargo loss: 0 kt. ${fmt(liveCargo())} kt remains in the convoy.`);
  } else {
    const survivors = voyageFleet.filter((tanker) => tanker.alive);
    const target = survivors[Math.floor(Math.random() * survivors.length)];
    target.alive = false;
    const lostCargo = registryItem('tankers', target.id).cargo;
    addLog(`[DESTROYED BY PIRATES] ${registryItem('tankers', target.id).name} was sunk. Its cargo is lost.`, 'failed');
    addLog(`[CARGO] Lost ${fmt(lostCargo)} kt. Remaining convoy cargo: ${fmt(liveCargo())} kt.`, 'failed');
  }
  renderInventory();
  if (!voyageFleet.some((tanker) => tanker.alive)) {
    addLog('[CRITICAL] Entire convoy lost. No cargo will reach port.', 'failed');
    finishVoyage();
    return;
  } else {
    scheduleVoyageEvent();
  }
}

function card(category, id) {
  const item = registryItem(category, id);
  const owned = state.userNFTs[id] || 0;
  const locked = owned === 0;
  const selected = category === 'tankers' ? selectedCount(id) : category === 'escorts' ? state.selectedEscorts.includes(id) : category === 'weapons' ? state.selectedWeapons.includes(id) : state.selectedPirates.includes(id);
  const sunk = category === 'tankers' && voyageFleet.some((tanker) => tanker.id === id && !tanker.alive);
  const escortSunk = category === 'escorts' && voyageEscorts.some((escort) => escort.id === id && !escort.alive);
  const used = category === 'weapons' ? voyageUsedWeapons.has(id) : category === 'escorts' ? voyageUsedEscorts.has(id) : sunk;
  const stats = category === 'tankers'
    ? `Cargo <b>${item.cargo} kt</b> · Speed <b>${item.speedBonus >= 0 ? '+' : ''}${item.speedBonus}s</b> · Reward <b>${item.reward} $HOC</b>`
    : category === 'escorts' || category === 'pirates'
      ? `${item.type === 'Pirate' ? 'Attack' : 'Defense'} <b>+${item.attackBonus || item.defenseBonus}%</b> · Speed <b>+${item.speedModifier}s</b>`
      : `${item.text} · Charges <b>${item.charges}</b>`;
  return `<article class="ship-card nft-card ${selected ? 'selected' : ''} ${locked ? 'locked-nft' : ''} ${sunk ? 'sunk' : ''} ${used ? 'used-nft' : ''}" data-category="${category}" data-id="${id}">
    <div class="nft-image-wrap"><img src="${item.image}" class="nft-card-img" alt="${item.name}" loading="lazy"><span class="owned-badge">x${owned}</span></div>
    <div class="nft-card-body"><h2>${item.name}</h2><div class="stats-line"><span>${stats}</span></div>
    ${locked ? '' : `<small class="selected-count">${sunk || escortSunk ? 'DESTROYED IN ATTACK' : used && category === 'weapons' ? 'USED IN ATTACK' : selected ? `Selected: ${selected}` : 'Click to select'}</small>`}</div>
    ${locked ? `<button class="buy-overlay" type="button" data-opensea-url="${item.openseaUrl}">BUY ON OPENSEA</button>` : ''}
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
  const escorts = state.selectedEscorts.map((id) => registryItem('escorts', id));
  const weapons = state.selectedWeapons.map((id) => registryItem('weapons', id));
  const manifestList = (items, emptyLabel) => items.length
    ? items.map((item) => `<li>${item.name}</li>`).join('')
    : `<li class="manifest-empty">${emptyLabel}</li>`;
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
    ? `<div class="manifest-columns">
        <div><b>Tankers</b><ul>${manifestList(tankers, 'None selected')}</ul></div>
        <div><b>Escorts</b><ul>${manifestList(escorts, 'None selected')}</ul></div>
        <div><b>Weapons</b><ul>${manifestList(weapons, 'None selected')}</ul></div>
      </div>
      <strong>Estimated voyage: ${clock(estimatedDuration())} · Safe arrival chance: ${estimatedSurvival()}%</strong>`
    : `<div class="manifest-columns">
        <div><b>Tankers</b><ul>${manifestList(tankers, 'No tankers selected')}</ul></div>
        <div><b>Escorts</b><ul>${manifestList(escorts, 'None selected')}</ul></div>
        <div><b>Weapons</b><ul>${manifestList(weapons, 'None selected')}</ul></div>
      </div>`;
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
  running = true;
  elapsed = 0;
  voyageSeconds = estimatedDuration();
  voyageStrategy = $('route').value;
  voyageFleet = state.selectedTankers.map((id) => ({ id, alive: true }));
  voyageEscorts = state.selectedEscorts.map((id) => ({ id, alive: true }));
  voyageInitialCargo = liveCargo();
  voyageUsedWeapons = new Set();
  voyageUsedEscorts = new Set();
  attackPaused = false;
  clearTimeout(attackPauseTimer);
  $('progress-box').classList.remove('attack-alert');
  scheduleVoyageEvent();
  scheduleRadioUpdate();
  $('startMission').textContent = 'CONVOY UNDERWAY'; $('voyageState').textContent = 'AT SEA';
  $('progressLabel').textContent = 'Strait crossing in progress'; $('missionLog').innerHTML = '';
  addLog(`Fleet launched. Fuel sink paid: ${fee} $HOC.`);
  timer = setInterval(tickVoyage, 1000); saveState(); updateSummary();
}
function tickVoyage() {
  if (attackPaused) return;
  elapsed++;
  $('progressFill').style.width = `${Math.min(100, elapsed / voyageSeconds * 100)}%`;
  $('progressText').textContent = `${clock(elapsed)} / ${clock(voyageSeconds)}`;
  if (elapsed >= nextRadioAt && elapsed < voyageSeconds) {
    const radioMessages = [
      `RADAR: Convoy signal stable. ${fmt(liveCargo())} kt of cargo currently secured.`,
      `ENGINE ROOM: Tankers holding formation. ${voyageFleet.filter((tanker) => tanker.alive).length} vessel(s) operational.`,
      'RADIO: Low visibility ahead. All escort crews remain at combat stations.',
      'SONAR: No confirmed contacts. Weapons systems remain on standby.'
    ];
    addLog(radioMessages[Math.floor(Math.random() * radioMessages.length)], 'system');
    scheduleRadioUpdate();
  }
  if (elapsed >= nextVoyageEventAt) checkForEnemies();
  if (elapsed >= voyageSeconds) finishVoyage();
}
function finishVoyage() {
  if (!running) return;
  clearInterval(timer);
  timer = null;
  running = false;
  elapsed = voyageSeconds;
  $('progressFill').style.width = '100%';
  $('progressText').textContent = `${clock(voyageSeconds)} / ${clock(voyageSeconds)}`;
  const survivingTankers = voyageFleet.filter((tanker) => tanker.alive);
  const payout = survivingTankers.reduce((sum, tanker) => sum + registryItem('tankers', tanker.id).reward, 0);
  state.wallet += payout; state.voyages += 1; state.selectedTankers = []; state.selectedEscorts = []; state.selectedWeapons = [];
  voyageFleet = [];
  voyageEscorts = [];
  voyageUsedWeapons = new Set();
  voyageUsedEscorts = new Set();
  attackPaused = false;
  clearTimeout(attackPauseTimer);
  $('progress-box').classList.remove('attack-alert');
  $('startMission').textContent = 'START VOYAGE'; $('voyageState').textContent = 'DOCKED';
  const arrivedCargo = survivingTankers.reduce((sum, tanker) => sum + registryItem('tankers', tanker.id).cargo, 0);
  const lostCargo = voyageInitialCargo - arrivedCargo;
  $('progressLabel').textContent = payout
    ? 'Voyage complete — convoy reached port'
    : 'Voyage ended — convoy lost';
  addLog(payout
    ? `CONVOY ARRIVED: ${fmt(arrivedCargo)} kt cargo delivered. ${fmt(lostCargo)} kt lost. Surviving tankers generated ${payout} $HOC.`
    : `MISSION ENDED: all convoy units were destroyed. ${fmt(voyageInitialCargo)} kt of cargo was lost.`, payout ? 'success' : 'failed');
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
$('route').addEventListener('change', updateSummary);
$('convoyTab').addEventListener('click', () => switchMode('convoy'));
$('pirateTab').addEventListener('click', () => switchMode('pirate'));
$('clearLog').addEventListener('click', () => { $('missionLog').innerHTML = ''; });
renderInventory();
addLog('NFT Registry online. Select owned assets from the vault.');
