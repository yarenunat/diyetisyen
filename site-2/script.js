/* ==========================================================================
   SITE 2: BLUSH & BERRY CLUB — INTERACTIVE BOWL STUDIO, CYCLE SYNC & LOOKBOOK
   ========================================================================== */

const toastWrap = document.getElementById('toastWrap');

function notify(text) {
  const el = document.createElement('div');
  el.className = 'toast-msg';
  el.textContent = text;
  toastWrap.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

// 1. PINK TUMBLER WATER TRACKER IN BENTO HERO
let filledCups = 3;
const totalCups = 8;
const cupsGrid = document.getElementById('cupsGrid');
const waterCounterText = document.getElementById('waterCounterText');
const waterStatusMsg = document.getElementById('waterStatusMsg');

function renderWaterCups() {
  cupsGrid.innerHTML = '';
  for (let i = 1; i <= totalCups; i++) {
    const btn = document.createElement('button');
    btn.className = `cup-btn ${i <= filledCups ? 'filled' : ''}`;
    btn.textContent = i <= filledCups ? '🥤' : '💧';
    btn.setAttribute('aria-label', `${i}. bardak`);
    btn.addEventListener('click', () => {
      filledCups = i === filledCups ? i - 1 : i;
      renderWaterCups();
    });
    cupsGrid.appendChild(btn);
  }
  waterCounterText.textContent = `${filledCups} / ${totalCups} Bardak (${(filledCups * 0.25).toFixed(2)}L)`;
  if (filledCups === 0) {
    waterStatusMsg.textContent = '🌸 Güne 1 büyük bardak ılık suyla başla!';
  } else if (filledCups < 5) {
    waterStatusMsg.textContent = '✨ Harika gidiyorsun! Cilt bariyerin için yudumlamaya devam.';
  } else if (filledCups < 8) {
    waterStatusMsg.textContent = '🎀 Hedefe çok yaklaştın, ödemler atılıyor!';
  } else {
    waterStatusMsg.textContent = '👑 Günlük 2 Litre Pink Glow su hedefini tamamladın!';
  }
}

// 2. FAVORITES / COLLECTION DRAWER STATE (LOCALSTORAGE)
let savedFavs = [];
try {
  const stored = localStorage.getItem('blush_berry_favs');
  savedFavs = stored
    ? JSON.parse(stored)
    : [
        {
          id: 'l1',
          title: 'Pink Pitaya & Kolajen Smoothie',
          meta: '🩰 Pilates Sonrası • 260 kcal'
        }
      ];
} catch (e) {
  savedFavs = [];
}

const favCountBadge = document.getElementById('favCountBadge');
const favDrawerBackdrop = document.getElementById('favDrawerBackdrop');
const favDrawerList = document.getElementById('favDrawerList');

function syncFavorites() {
  try {
    localStorage.setItem('blush_berry_favs', JSON.stringify(savedFavs));
  } catch (e) {
    // ignore
  }
  favCountBadge.textContent = savedFavs.length;
  renderFavDrawer();
}

function toggleFavItem(itemObj) {
  const idx = savedFavs.findIndex((f) => f.id === itemObj.id);
  if (idx > -1) {
    savedFavs.splice(idx, 1);
    notify(`"${itemObj.title}" koleksiyondan çıkarıldı.`);
  } else {
    savedFavs.push(itemObj);
    notify(`🎀 "${itemObj.title}" koleksiyonuna eklendi!`);
  }
  syncFavorites();
  renderLookbook();
}

function renderFavDrawer() {
  if (savedFavs.length === 0) {
    favDrawerList.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2rem; margin-bottom: 0.4rem;">🎀</p>
        <p style="font-weight: 700; color: var(--cherry-deep);">Koleksiyonun henüz boş</p>
        <p style="font-size: 0.85rem; margin-top: 0.3rem;">Kendi tasarladığın Glow Bowl kaselerini veya Pinterest panosundaki tarifleri buraya kaydedebilirsin.</p>
      </div>
    `;
    return;
  }

  favDrawerList.innerHTML = savedFavs
    .map(
      (f) => `
      <div class="fav-item">
        <div>
          <div class="fav-item-title">${f.title}</div>
          <div class="fav-item-meta">${f.meta}</div>
        </div>
        <button class="close-btn" data-remove-fav="${f.id}" title="Sil">✕</button>
      </div>
    `
    )
    .join('');

  favDrawerList.querySelectorAll('[data-remove-fav]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-remove-fav');
      savedFavs = savedFavs.filter((f) => f.id !== id);
      syncFavorites();
      renderLookbook();
    });
  });
}

document.getElementById('openFavDrawerBtn').addEventListener('click', () => {
  renderFavDrawer();
  favDrawerBackdrop.classList.add('open');
});
document.getElementById('closeFavDrawerBtn').addEventListener('click', () => {
  favDrawerBackdrop.classList.remove('open');
});
favDrawerBackdrop.addEventListener('click', (e) => {
  if (e.target === favDrawerBackdrop) favDrawerBackdrop.classList.remove('open');
});

// 3. INTERACTIVE 3D ANIMATED "BUILD YOUR GLOW BOWL" STUDIO (MULTI-LAYER VISUAL RENDERER)
const BOWL_BASES = [
  {
    id: 'acai',
    name: 'Acai & Vişne Bazı',
    meta: '125 kcal • Antioksidan',
    kcal: 125,
    protein: 3,
    fiber: 5,
    glow: 35,
    emoji: '🍒',
    bg: '#F7D8E4',
    c1: '#8D1B47',
    c2: '#540D28',
    c3: '#C23B6E',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#6E1437"/><path d="M14 24c4-8 16-8 20 0-4 8-16 8-20 0z" fill="#A82857" opacity=".7"/><circle cx="19" cy="20" r="5" fill="#42081E"/><circle cx="29" cy="25" r="5.5" fill="#42081E"/><circle cx="17" cy="18" r="1.5" fill="#FFF" opacity=".7"/><circle cx="27" cy="23" r="1.5" fill="#FFF" opacity=".7"/></svg>`
  },
  {
    id: 'strawberry',
    name: 'Çilek & Kefir Bazı',
    meta: '110 kcal • Probiyotik',
    kcal: 110,
    protein: 6,
    fiber: 3,
    glow: 34,
    emoji: '🍓',
    bg: '#FFE3EC',
    c1: '#F26B8A',
    c2: '#C9385B',
    c3: '#FFA6BD',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#F47B98"/><path d="M24 12c6 0 10 6 8 14-2 7-6 11-8 11s-6-4-8-11c-2-8 2-14 8-14z" fill="#D92648"/><path d="M19 12l5 3 5-3-3-3h-4z" fill="#3B873E"/><circle cx="21" cy="20" r="1" fill="#FFE699"/><circle cx="26" cy="22" r="1" fill="#FFE699"/><circle cx="23" cy="27" r="1" fill="#FFE699"/></svg>`
  },
  {
    id: 'pitaya',
    name: 'Pembe Pitaya & Muz',
    meta: '135 kcal • Tropikal Glow',
    kcal: 135,
    protein: 2,
    fiber: 4,
    glow: 33,
    emoji: '🌺',
    bg: '#FFD9EE',
    c1: '#E02878',
    c2: '#9E104C',
    c3: '#FF6EB0',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#E02878"/><circle cx="24" cy="24" r="13" fill="#FFF5F9"/><circle cx="20" cy="21" r="1.2" fill="#222"/><circle cx="27" cy="20" r="1.2" fill="#222"/><circle cx="24" cy="26" r="1.2" fill="#222"/><circle cx="19" cy="27" r="1.2" fill="#222"/><circle cx="28" cy="27" r="1.2" fill="#222"/></svg>`
  },
  {
    id: 'cacao',
    name: 'Kakao & Fındık Sütü',
    meta: '145 kcal • Magnezyum',
    kcal: 145,
    protein: 4,
    fiber: 5,
    glow: 32,
    emoji: '🍫',
    bg: '#EFE2DC',
    c1: '#6E4534',
    c2: '#3D2217',
    c3: '#9C6B56',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#593527"/><rect x="15" y="15" width="18" height="18" rx="4" fill="#361D13"/><line x1="24" y1="15" x2="24" y2="33" stroke="#6E4534" stroke-width="2"/><line x1="15" y1="24" x2="33" y2="24" stroke="#6E4534" stroke-width="2"/></svg>`
  }
];

const BOWL_BOOSTS = [
  {
    id: 'collagen',
    name: 'Vanilyalı Kolajen & Whey',
    meta: '+90 kcal • +18g Prot',
    kcal: 90,
    protein: 18,
    fiber: 0,
    glow: 35,
    bg: '#FFF6E8',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#FDF1DC"/><path d="M14 26c4-9 16-9 20 0-3 6-17 6-20 0z" fill="#FFFDF9" stroke="#E5CBA3" stroke-width="2"/><circle cx="24" cy="20" r="6" fill="#FFF9EE" stroke="#E5CBA3" stroke-width="1.5"/></svg>`,
    layerSvg: `<svg viewBox="0 0 220 220">
      <path d="M55,95 C75,55 145,55 165,95 C180,125 140,165 110,160 C75,155 45,120 55,95 Z" fill="none" stroke="#FFF9F0" stroke-width="11" stroke-linecap="round" opacity="0.88" />
      <path d="M78,105 C92,82 132,82 142,108 C150,128 122,145 105,140" fill="none" stroke="#FFFDF9" stroke-width="7" stroke-linecap="round" opacity="0.92" />
      <circle cx="92" cy="78" r="3.5" fill="#FFF" opacity="0.9"/>
      <circle cx="138" cy="84" r="2.5" fill="#FFF" opacity="0.9"/>
    </svg>`
  },
  {
    id: 'greek',
    name: 'Süzme Yunan Yoğurdu',
    meta: '+85 kcal • +12g Prot',
    kcal: 85,
    protein: 12,
    fiber: 0,
    glow: 30,
    bg: '#F2F7FF',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#EBF3FA"/><circle cx="24" cy="24" r="12" fill="#FFFFFF" stroke="#D0E0F0" stroke-width="2"/><path d="M19 24c3-4 7-4 10 0" fill="none" stroke="#B8CEE4" stroke-width="2" stroke-linecap="round"/></svg>`,
    layerSvg: `<svg viewBox="0 0 220 220">
      <g filter="drop-shadow(0 6px 10px rgba(0,0,0,0.18))">
        <circle cx="82" cy="92" r="34" fill="#FFFFFF" opacity="0.95"/>
        <circle cx="96" cy="86" r="26" fill="#F8FAFC"/>
        <path d="M66,90 C78,74 102,76 106,94 C109,106 88,112 78,102" fill="none" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round"/>
      </g>
    </svg>`
  },
  {
    id: 'chia',
    name: 'Chia & Keten Tohumu',
    meta: '+65 kcal • Omega-3',
    kcal: 65,
    protein: 3,
    fiber: 5,
    glow: 32,
    bg: '#F4EDE6',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#EADFD5"/><ellipse cx="18" cy="20" rx="2.5" ry="1.6" transform="rotate(-20 18 20)" fill="#2D2926"/><ellipse cx="26" cy="18" rx="2.5" ry="1.6" transform="rotate(15 26 18)" fill="#8C583A"/><ellipse cx="22" cy="26" rx="2.5" ry="1.6" fill="#2D2926"/><ellipse cx="30" cy="25" rx="2.5" ry="1.6" transform="rotate(30 30 25)" fill="#2D2926"/><ellipse cx="19" cy="31" rx="2.5" ry="1.6" fill="#8C583A"/><ellipse cx="27" cy="31" rx="2.5" ry="1.6" fill="#2D2926"/></svg>`,
    layerSvg: `<svg viewBox="0 0 220 220">
      <g opacity="0.92">
        <ellipse cx="70" cy="75" rx="4" ry="2.2" transform="rotate(-25 70 75)" fill="#231F20"/>
        <ellipse cx="85" cy="68" rx="4" ry="2.2" transform="rotate(12 85 68)" fill="#9E6B43"/>
        <ellipse cx="102" cy="74" rx="4" ry="2.2" transform="rotate(-10 102 74)" fill="#231F20"/>
        <ellipse cx="62" cy="92" rx="4" ry="2.2" transform="rotate(20 62 92)" fill="#9E6B43"/>
        <ellipse cx="78" cy="88" rx="4" ry="2.2" fill="#231F20"/>
        <ellipse cx="94" cy="86" rx="4" ry="2.2" transform="rotate(-30 94 86)" fill="#FFF"/>
        <ellipse cx="112" cy="82" rx="4" ry="2.2" transform="rotate(18 112 82)" fill="#231F20"/>
        <ellipse cx="72" cy="104" rx="4" ry="2.2" transform="rotate(-15 72 104)" fill="#231F20"/>
        <ellipse cx="88" cy="100" rx="4" ry="2.2" fill="#9E6B43"/>
      </g>
    </svg>`
  },
  {
    id: 'maca',
    name: 'Pembe Maca & Bitkisel Prot',
    meta: '+80 kcal • Hormon Dostu',
    kcal: 80,
    protein: 15,
    fiber: 2,
    glow: 34,
    bg: '#FCE4EE',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#FAD2E2"/><path d="M14 28c5-12 15-12 20 0-5 5-15 5-20 0z" fill="#D95B8A"/><circle cx="24" cy="18" r="4" fill="#F294B8"/></svg>`,
    layerSvg: `<svg viewBox="0 0 220 220">
      <path d="M58,88 C85,48 152,58 162,102 C170,138 125,165 90,152 C60,140 50,110 58,88 Z" fill="none" stroke="#FFB8D6" stroke-width="10" stroke-dasharray="18 10" stroke-linecap="round" opacity="0.88"/>
      <circle cx="85" cy="85" r="22" fill="#FFD4E8" opacity="0.65"/>
    </svg>`
  }
];

const BOWL_TOPPINGS = [
  {
    id: 'granola',
    name: 'Bademli Granola',
    short: 'Granola',
    meta: '+75 kcal • Çıtır',
    kcal: 75,
    protein: 2,
    fiber: 2,
    glow: 9,
    emoji: '🥣',
    bg: '#FBF0D9',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#F7E4BE"/><circle cx="19" cy="21" r="6" fill="#C88A3B"/><circle cx="28" cy="19" r="5" fill="#B37428"/><circle cx="24" cy="28" r="6.5" fill="#D99B4E"/><ellipse cx="30" cy="28" rx="5" ry="3" transform="rotate(-30 30 28)" fill="#EED9B3" stroke="#A66521" stroke-width="1.5"/></svg>`,
    layerSvg: `<g class="topping-svg-group">
      <!-- Golden Granola Clusters Row -->
      <circle cx="65" cy="138" r="11" fill="#C98A3A" stroke="#8F5B18" stroke-width="1.5"/>
      <circle cx="80" cy="150" r="10" fill="#DDA152" stroke="#8F5B18" stroke-width="1.5"/>
      <circle cx="96" cy="160" r="11.5" fill="#B87729" stroke="#8F5B18" stroke-width="1.5"/>
      <circle cx="56" cy="154" r="9" fill="#E3AD62" stroke="#8F5B18" stroke-width="1.5"/>
      <circle cx="76" cy="132" r="8.5" fill="#E3AD62" stroke="#8F5B18" stroke-width="1.5"/>
      <!-- Sliced Almonds -->
      <ellipse cx="68" cy="144" rx="6" ry="3.2" transform="rotate(-25 68 144)" fill="#FFF5DF" stroke="#A86B24" stroke-width="1.2"/>
      <ellipse cx="90" cy="148" rx="6" ry="3.2" transform="rotate(20 90 148)" fill="#FFF5DF" stroke="#A86B24" stroke-width="1.2"/>
    </g>`
  },
  {
    id: 'peanut',
    name: 'Şekersiz Fıstık Ezmesi',
    short: 'Fıstık Ezmesi',
    meta: '+60 kcal • Sağlıklı Yağ',
    kcal: 60,
    protein: 3,
    fiber: 1,
    glow: 10,
    emoji: '🥜',
    bg: '#F7E5D2',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#F2DEC4"/><path d="M12 22q12-10 24 0t-24 8q12-6 24 2" fill="none" stroke="#B87333" stroke-width="4.5" stroke-linecap="round"/></svg>`,
    layerSvg: `<g class="topping-svg-group">
      <!-- Rich Peanut Butter Drizzle Zig-Zag across the Bowl -->
      <path d="M48,112 Q85,78 115,112 T176,105" fill="none" stroke="#C67D38" stroke-width="9" stroke-linecap="round" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.25))"/>
      <path d="M58,132 Q95,98 128,132 T170,126" fill="none" stroke="#DF9850" stroke-width="6" stroke-linecap="round"/>
    </g>`
  },
  {
    id: 'blueberry',
    name: 'Taze Yaban Mersini',
    short: 'Yaban Mersini',
    meta: '+30 kcal • Cilt Dostu',
    kcal: 30,
    protein: 0.5,
    fiber: 2,
    glow: 12,
    emoji: '🫐',
    bg: '#E3E8FA',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#D8E0F8"/><circle cx="19" cy="25" r="7.5" fill="#2A3875"/><circle cx="29" cy="22" r="7" fill="#1E295B"/><circle cx="25" cy="30" r="6.5" fill="#35468C"/><circle cx="17" cy="23" r="2" fill="#9BB0FF"/><circle cx="27" cy="20" r="1.8" fill="#9BB0FF"/></svg>`,
    layerSvg: `<g class="topping-svg-group" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.28))">
      <!-- Glossy 3D Blueberries Cluster -->
      <circle cx="135" cy="64" r="10.5" fill="#25336E"/><circle cx="132" cy="61" r="3" fill="#8FA8FF"/>
      <circle cx="154" cy="76" r="11" fill="#1B2654"/><circle cx="151" cy="73" r="3" fill="#8FA8FF"/>
      <circle cx="144" cy="94" r="10" fill="#2E3F82"/><circle cx="141" cy="91" r="2.8" fill="#8FA8FF"/>
      <circle cx="164" cy="94" r="9.5" fill="#222F66"/><circle cx="161" cy="91" r="2.5" fill="#8FA8FF"/>
      <circle cx="122" cy="80" r="9" fill="#2E3F82"/><circle cx="119" cy="77" r="2.5" fill="#8FA8FF"/>
    </g>`
  },
  {
    id: 'coconut',
    name: 'Hindistan Cevizi Yaprağı',
    short: 'Hindistan Cevizi',
    meta: '+40 kcal • Parlaklık',
    kcal: 40,
    protein: 0.5,
    fiber: 1,
    glow: 9,
    emoji: '🥥',
    bg: '#F4F7F6',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#E8ECEB"/><path d="M13 24a11 11 0 0 0 22 0z" fill="#6E472B"/><path d="M15 23a9 9 0 0 0 18 0z" fill="#FFFFFF"/></svg>`,
    layerSvg: `<g class="topping-svg-group" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))">
      <!-- Toasted White Coconut Flakes Arc -->
      <path d="M110,42 Q122,38 126,48 Q114,52 110,42 Z" fill="#FFFFFF" stroke="#E5D5C5" stroke-width="1"/>
      <path d="M128,48 Q140,44 144,54 Q132,58 128,48 Z" fill="#FFFDF9" stroke="#E5D5C5" stroke-width="1"/>
      <path d="M92,48 Q104,44 108,54 Q96,58 92,48 Z" fill="#FFFFFF" stroke="#E5D5C5" stroke-width="1"/>
      <path d="M148,148 Q160,144 164,154 Q152,158 148,148 Z" fill="#FFFFFF" stroke="#E5D5C5" stroke-width="1"/>
      <path d="M132,162 Q144,158 148,168 Q136,172 132,162 Z" fill="#FFFDF9" stroke="#E5D5C5" stroke-width="1"/>
    </g>`
  },
  {
    id: 'darkchoc',
    name: '%80 Bitter Çikolata',
    short: 'Bitter Çikolata',
    meta: '+55 kcal • Serotonin',
    kcal: 55,
    protein: 1,
    fiber: 1.5,
    glow: 10,
    emoji: '🍫',
    bg: '#EDE3DF',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#E5D5CE"/><rect x="14" y="16" width="11" height="11" rx="2" transform="rotate(-12 19 21)" fill="#331910"/><rect x="23" y="21" width="11" height="11" rx="2" transform="rotate(15 28 26)" fill="#4A2518"/></svg>`,
    layerSvg: `<g class="topping-svg-group" filter="drop-shadow(0 3px 5px rgba(0,0,0,0.3))">
      <!-- Rich Dark Chocolate Chunks -->
      <rect x="115" y="128" width="16" height="16" rx="3" transform="rotate(-18 123 136)" fill="#2D150D" stroke="#593022" stroke-width="1.2"/>
      <rect x="138" y="118" width="15" height="15" rx="3" transform="rotate(22 145 125)" fill="#3B1C12" stroke="#593022" stroke-width="1.2"/>
      <rect x="128" y="146" width="14" height="14" rx="3" transform="rotate(8 135 153)" fill="#241009" stroke="#593022" stroke-width="1.2"/>
      <rect x="152" y="136" width="12" height="12" rx="2.5" transform="rotate(-28 158 142)" fill="#3B1C12"/>
    </g>`
  },
  {
    id: 'hemp',
    name: 'Kabak Çekirdeği & Chia',
    short: 'Çekirdek',
    meta: '+45 kcal • Çinko & Demir',
    kcal: 45,
    protein: 3,
    fiber: 1,
    glow: 11,
    emoji: '🌱',
    bg: '#E4F0E2',
    thumbSvg: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="#D6E8D3"/><ellipse cx="19" cy="22" rx="6" ry="3.5" transform="rotate(-25 19 22)" fill="#558B3E"/><ellipse cx="29" cy="20" rx="6" ry="3.5" transform="rotate(20 29 20)" fill="#689F4E"/><ellipse cx="24" cy="29" rx="6" ry="3.5" transform="rotate(-10 24 29)" fill="#467830"/></svg>`,
    layerSvg: `<g class="topping-svg-group">
      <!-- Green Pumpkin Seeds (Pepitas) -->
      <ellipse cx="52" cy="86" rx="7.5" ry="4" transform="rotate(-30 52 86)" fill="#5C9442" stroke="#3B6627" stroke-width="1"/>
      <ellipse cx="66" cy="70" rx="7.5" ry="4" transform="rotate(15 66 70)" fill="#72AD56" stroke="#3B6627" stroke-width="1"/>
      <ellipse cx="48" cy="104" rx="7" ry="3.8" transform="rotate(25 48 104)" fill="#659E4B" stroke="#3B6627" stroke-width="1"/>
      <ellipse cx="98" cy="122" rx="7.5" ry="4" transform="rotate(-18 98 122)" fill="#5C9442" stroke="#3B6627" stroke-width="1"/>
      <ellipse cx="112" cy="108" rx="7" ry="3.8" transform="rotate(32 112 108)" fill="#72AD56" stroke="#3B6627" stroke-width="1"/>
    </g>`
  }
];

let selectedBase = BOWL_BASES[0];
let selectedBoost = BOWL_BOOSTS[0];
let selectedToppings = [BOWL_TOPPINGS[0], BOWL_TOPPINGS[2]];

function buildBaseSmoothieSvg(base) {
  return `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="grad-${base.id}" cx="38%" cy="35%" r="68%">
        <stop offset="0%" stop-color="${base.c3}" />
        <stop offset="55%" stop-color="${base.c1}" />
        <stop offset="100%" stop-color="${base.c2}" />
      </radialGradient>
    </defs>
    <circle cx="110" cy="110" r="110" fill="url(#grad-${base.id})" />
    <!-- Creamy Smoothie Swirl Ripples -->
    <path d="M35,105 C45,52 115,32 158,68 C195,100 175,165 122,178 C72,190 38,150 54,112 C68,78 118,68 142,96 C160,118 138,148 110,146" fill="none" stroke="${base.c3}" stroke-width="9" stroke-linecap="round" opacity="0.45" />
    <path d="M48,125 C65,168 135,175 162,132" fill="none" stroke="${base.c2}" stroke-width="7" stroke-linecap="round" opacity="0.35" />
    <!-- Subtle Gloss Highlight -->
    <ellipse cx="75" cy="58" rx="34" ry="14" transform="rotate(-22 75 58)" fill="#FFFFFF" opacity="0.18" />
  </svg>`;
}

function renderBowlStudio(changedLayer = null) {
  const baseEl = document.getElementById('baseOptions');
  const boostEl = document.getElementById('boostOptions');
  const toppingEl = document.getElementById('toppingOptions');

  baseEl.innerHTML = BOWL_BASES.map(
    (b) => `
    <button type="button" class="ing-option ${selectedBase.id === b.id ? 'selected' : ''}" data-base="${b.id}">
      <div class="ing-thumb-wrap" style="background: ${b.bg}">${b.thumbSvg}</div>
      <div class="ing-info">
        <strong>${b.emoji} ${b.name}</strong>
        <span>${b.meta}</span>
      </div>
    </button>
  `
  ).join('');

  boostEl.innerHTML = BOWL_BOOSTS.map(
    (bo) => `
    <button type="button" class="ing-option ${selectedBoost.id === bo.id ? 'selected' : ''}" data-boost="${bo.id}">
      <div class="ing-thumb-wrap" style="background: ${bo.bg}">${bo.thumbSvg}</div>
      <div class="ing-info">
        <strong>✨ ${bo.name}</strong>
        <span>${bo.meta}</span>
      </div>
    </button>
  `
  ).join('');

  toppingEl.innerHTML = BOWL_TOPPINGS.map((t) => {
    const isSel = selectedToppings.some((st) => st.id === t.id);
    return `
      <button type="button" class="ing-option ${isSel ? 'selected' : ''}" data-topping="${t.id}">
        <div class="ing-thumb-wrap" style="background: ${t.bg}">${t.thumbSvg}</div>
        <div class="ing-info">
          <strong>${t.emoji} ${t.name}</strong>
          <span>${t.meta}</span>
        </div>
      </button>
    `;
  }).join('');

  baseEl.querySelectorAll('[data-base]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedBase = BOWL_BASES.find((b) => b.id === btn.getAttribute('data-base'));
      renderBowlStudio('base');
    });
  });

  boostEl.querySelectorAll('[data-boost]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedBoost = BOWL_BOOSTS.find((bo) => bo.id === btn.getAttribute('data-boost'));
      renderBowlStudio('boost');
    });
  });

  toppingEl.querySelectorAll('[data-topping]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-topping');
      const existingIdx = selectedToppings.findIndex((st) => st.id === id);
      if (existingIdx > -1) {
        if (selectedToppings.length > 1) {
          selectedToppings.splice(existingIdx, 1);
        } else {
          notify('En az 1 topping seçili olmalı 🍓');
          return;
        }
      } else {
        if (selectedToppings.length >= 3) {
          notify('Maksimum 3 topping seçebilirsin ✨');
          return;
        }
        const found = BOWL_TOPPINGS.find((t) => t.id === id);
        if (found) selectedToppings.push(found);
      }
      renderBowlStudio('toppings');
    });
  });

  updateBowlPreview(changedLayer);
}

function updateBowlPreview(changedLayer = null) {
  const layerBase = document.getElementById('bowlLayerBase');
  const layerBoost = document.getElementById('bowlLayerBoost');
  const layerToppings = document.getElementById('bowlLayerToppings');
  const basePill = document.getElementById('bowlBasePill');
  const boostPill = document.getElementById('bowlBoostPill');
  const toppingsEmojis = document.getElementById('bowlToppingsEmojis');
  const svgRing = document.getElementById('bowlSvgRing');

  if (layerBase) {
    layerBase.innerHTML = buildBaseSmoothieSvg(selectedBase);
    if (changedLayer === 'base') {
      layerBase.classList.remove('anim-pop');
      void layerBase.offsetWidth;
      layerBase.classList.add('anim-pop');
    }
  }

  if (layerBoost) {
    layerBoost.innerHTML = selectedBoost.layerSvg;
    if (changedLayer === 'boost' || changedLayer === 'base') {
      layerBoost.classList.remove('anim-pop');
      void layerBoost.offsetWidth;
      layerBoost.classList.add('anim-pop');
    }
  }

  if (layerToppings) {
    layerToppings.innerHTML = `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      ${selectedToppings.map((t) => t.layerSvg).join('')}
    </svg>`;
  }

  if (basePill) basePill.textContent = `${selectedBase.emoji} ${selectedBase.name}`;
  if (boostPill) boostPill.textContent = `✨ ${selectedBoost.name}`;

  if (toppingsEmojis) {
    toppingsEmojis.innerHTML = selectedToppings
      .map(
        (t, idx) =>
          `<span class="topping-orb" style="animation-delay: ${idx * 0.06}s">${t.emoji} ${t.name}</span>`
      )
      .join('');
  }

  const totalKcal =
    selectedBase.kcal +
    selectedBoost.kcal +
    selectedToppings.reduce((acc, t) => acc + t.kcal, 0);
  const totalProtein = Math.round(
    selectedBase.protein +
      selectedBoost.protein +
      selectedToppings.reduce((acc, t) => acc + t.protein, 0)
  );
  const totalFiber = Math.round(
    selectedBase.fiber +
      selectedBoost.fiber +
      selectedToppings.reduce((acc, t) => acc + t.fiber, 0)
  );
  const glowScore = Math.min(
    100,
    selectedBase.glow +
      selectedBoost.glow +
      selectedToppings.reduce((acc, t) => acc + t.glow, 0)
  );

  if (svgRing) {
    const circumference = 942;
    svgRing.style.strokeDashoffset = circumference * (1 - glowScore / 100);
  }

  document.getElementById('bowlCustomTitle').textContent = `${selectedBase.name.split(' ')[0]} & ${selectedBoost.name.split(' ')[0]} Glow Bowl`;
  document.getElementById('bowlIngredientsSummary').textContent = `${selectedBase.name} + ${selectedBoost.name} + ${selectedToppings.map((t) => t.name).join(', ')}`;
  document.getElementById('bowlKcal').textContent = `${totalKcal} kcal`;
  document.getElementById('bowlProtein').textContent = `${totalProtein}g`;
  document.getElementById('bowlFiber').textContent = `${totalFiber}g`;
  document.getElementById('bowlGlowScore').textContent = `${glowScore}/100 ✨`;

  const noteEl = document.getElementById('bowlDietitianNote');
  if (totalProtein >= 20) {
    noteEl.innerHTML = `🩰 <strong>Dyt. Yaren’in Yorumu:</strong> ${totalProtein}g protein ile pilates ve antrenman sonrası kas sıkılaşması için kusursuz bir öğün!`;
  } else {
    noteEl.innerHTML = `🌸 <strong>Dyt. Yaren’in Yorumu:</strong> Yüksek lif (${totalFiber}g) ve antioksidan içeriğiyle ikindi tatlı krizini sıfır suçlulukla keser.`;
  }
}

// "🎲 Rastgele Kombinle" Spin Button & 3D Tilt
const randomBowlBtn = document.getElementById('randomBowlBtn');
if (randomBowlBtn) {
  randomBowlBtn.addEventListener('click', () => {
    const circle = document.getElementById('bowlVisualCircle');
    if (circle) {
      circle.classList.remove('bowl-spinning');
      void circle.offsetWidth;
      circle.classList.add('bowl-spinning');
    }
    selectedBase = BOWL_BASES[Math.floor(Math.random() * BOWL_BASES.length)];
    selectedBoost = BOWL_BOOSTS[Math.floor(Math.random() * BOWL_BOOSTS.length)];
    const shuffled = [...BOWL_TOPPINGS].sort(() => 0.5 - Math.random());
    selectedToppings = shuffled.slice(0, 3);
    setTimeout(() => {
      renderBowlStudio('base');
      notify('🎲 Yeni Glow Bowl kombinasyonun hazır!');
    }, 250);
  });
}

const bowlStage3D = document.getElementById('bowlStage3D');
const bowlVisualCircle = document.getElementById('bowlVisualCircle');
if (bowlStage3D && bowlVisualCircle) {
  bowlStage3D.addEventListener('mousemove', (e) => {
    const r = bowlStage3D.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -10;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 10;
    bowlVisualCircle.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  });
  bowlStage3D.addEventListener('mouseleave', () => {
    bowlVisualCircle.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

document.getElementById('saveCustomBowlBtn').addEventListener('click', () => {
  const title = document.getElementById('bowlCustomTitle').textContent;
  const kcal = document.getElementById('bowlKcal').textContent;
  const prot = document.getElementById('bowlProtein').textContent;
  const summary = document.getElementById('bowlIngredientsSummary').textContent;
  const customId = `bowl-${selectedBase.id}-${selectedBoost.id}`;

  const exists = savedFavs.some((f) => f.id === customId);
  if (!exists) {
    savedFavs.push({
      id: customId,
      title: `🥣 ${title}`,
      meta: `${kcal} • ${prot} Protein (${summary})`
    });
    syncFavorites();
  }
  notify(`🎀 "${title}" koleksiyonuna kaydedildi!`);
});

// 4. CYCLE SYNCING DATA & TABS
const CYCLE_PHASES = {
  menstrual: {
    title: '🌸 Menstrüasyon Fazı (İçsel Kış • Gün 1-5)',
    desc: 'Östrojen ve progesteron en düşük seviyededir. Bedenin dinlenmeye, ısıtıcı öğünlere ve kaybedilen demiri geri koymaya ihtiyaç duyar.',
    focusFood: 'Demir + C Vitamini & Magnezyum (Kırmızı pancar, ıspanak, kabak çekirdeği, ham kakao, zencefil)',
    workout: 'Yin Yoga, hafif esneme veya sakin 20 dk yürüyüş',
    menu: [
      '🥣 <strong>Kahvaltı:</strong> Sıcak tarçınlı, cevizli ve şekersiz kakaolu yulaf lapası',
      '🥗 <strong>Öğle:</strong> Izgara köfte veya mercimek + C vitaminli bol rokalı pancar salatası',
      '🍫 <strong>Ara Öğün:</strong> 2 kare %80 bitter çikolata + Papatya & Rezene çayı',
      '🍲 <strong>Akşam:</strong> Kemik suyuyla pişmiş kök sebze çorbası & fırın somon'
    ]
  },
  follicular: {
    title: '🌱 Foliküler Faz (İlkbahar • Gün 6-13)',
    desc: 'Enerjin ve yaratıcılığın yükselişe geçer! İnsülin duyarlılığın en iyi seviyededir; fermente gıdalar ve renkli taze tabaklar için en harika dönem.',
    focusFood: 'Probiyotikler & Filizlenmiş Besinler (Kefir, kimchi/ev turşusu, yulaf, narenciye, avokado)',
    workout: 'Reformer Pilates, Kardiyo, Koşu veya Dans Antrenmanı',
    menu: [
      '🍓 <strong>Kahvaltı:</strong> Çilekli & Kefirli Pembe Glow Smoothie Bowl',
      '🥑 <strong>Öğle:</strong> Kinoalı, nar ekşili ve ızgara tavuklu Akdeniz kasesi',
      '🍏 <strong>Ara Öğün:</strong> Yeşil elma dilimleri + 1 tatlı kaşığı fıstık ezmesi',
      '🐟 <strong>Akşam:</strong> Zeytinyağlı enginar veya kabak sote + karabuğday pilavı'
    ]
  },
  ovulatory: {
    title: '☀️ Ovulasyon Fazı (Yaz Parıltısı • Gün 14-17)',
    desc: 'Östrojen zirvededir; cildin parlar ve sosyal enerjin en üst noktadadır. Karaciğerin fazla östrojeni rahatça temizlemesi için antioksidan ve lif şart!',
    focusFood: 'Turpgiller & Kırmızı Meyveler (Brokoli, brüksel lahanası, ahududu, çilek, kinoa, badem)',
    workout: 'HIIT, Yüksek Tempolu Pilates veya Grup Dersleri',
    menu: [
      '🍳 <strong>Kahvaltı:</strong> Avokadolu ve mikro filizli poşe yumurta + kırmızı meyveler',
      '🥗 <strong>Öğle:</strong> Çıtır somonlu, edamameli ve mor lahanalı Poke Bowl',
      '🍒 <strong>Ara Öğün:</strong> Iced Berry Hibiscus Çayı + 10 adet çiğ badem',
      '🥦 <strong>Akşam:</strong> Fırında susamlı brokoli & hindi/tofu şiş'
    ]
  },
  luteal: {
    title: '🍂 Luteal Faz / PMS (Sonbahar • Gün 18-28)',
    desc: 'Bazal metabolizma hızın günde 150-250 kalori artar! Bu yüzden tatlı ve karbonhidrat isteğin tamamen biyolojiktir; kendini aç bırakma, doğru karbonhidratla besle.',
    focusFood: 'Kompleks Karbonhidrat + B6 Vitamini (Tatlı patates, esmer pirinç, muz, ceviz, tahin)',
    workout: 'Düşük etkili Mat Pilates, Yürüyüş ve Kuvvet egzersizi',
    menu: [
      '🥞 <strong>Kahvaltı:</strong> Muzlu & Yulaflı Tahinli Pancake Kulesi',
      '🍠 <strong>Öğle:</strong> Fırınlanmış tatlı patates, ızgara hindi ve avokado soslu kase',
      '🍫 <strong>Ara Öğün:</strong> Hurmalı & Cevizli Brownie Topları + Tarçınlı Süt',
      '🥣 <strong>Akşam:</strong> Kabak spagetti (Zoodles) üzerinde bol proteinli bolonez sos'
    ]
  }
};

function renderCyclePhase(phaseKey) {
  const data = CYCLE_PHASES[phaseKey];
  const panel = document.getElementById('cyclePanel');
  if (!data || !panel) return;

  panel.innerHTML = `
    <div class="cycle-info">
      <h3>${data.title}</h3>
      <p>${data.desc}</p>
      <div class="cycle-highlights">
        <div class="highlight-box">
          <strong>🛒 Tabağının Yıldızları</strong>
          <span>${data.focusFood}</span>
        </div>
        <div class="highlight-box">
          <strong>🩰 Egzersiz Eşleşmesi</strong>
          <span>${data.workout}</span>
        </div>
      </div>
    </div>
    <div class="cycle-menu-card">
      <h4>Örnek Günlük Döngü Menüsü ✨</h4>
      <ul class="sample-day-list">
        ${data.menu.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;
}

document.querySelectorAll('.cycle-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.cycle-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    renderCyclePhase(tab.getAttribute('data-phase'));
  });
});

// 5. PINTEREST LOOKBOOK & RECIPE ARCHIVE
const LOOKBOOK_ITEMS = [
  {
    id: 'l1',
    cat: 'pilates',
    size: 'look-tall',
    tag: '🩰 Pilates Sonrası',
    title: 'Pink Pitaya & Kolajen Smoothie',
    desc: 'Reformer dersinden çıktıktan sonraki ilk 45 dakikada kaslarını ve cildini besleyen pembe iksir.',
    img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    kcal: '260 kcal',
    protein: '21g Protein',
    recipe: '1 paket donuk pitaya (veya 1 su bardağı çilek), yarım muz, 1 ölçek vanilyalı kolajen/whey ve 150 ml badem sütünü blenderda çek. Üzerine hindistan cevizi ve chia serp!'
  },
  {
    id: 'l2',
    cat: 'sweet',
    size: 'look-med',
    tag: '🍫 PMS Kurtarıcı',
    title: 'Çilekli & Bitter Çikolatalı Yoğurt Küpleri',
    desc: 'Regl öncesi çikolata krizini 120 kaloriyle ve probiyotik desteğiyle çözen dondurulmuş lokmalar.',
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    kcal: '120 kcal',
    protein: '8g Protein',
    recipe: 'Küp doğranmış çilekleri süzme yoğurt ve 1 çay kaşığı bal ile karıştır. Yağlı kağıda kaşıkla porsiyonla, dondur ve benmari usulü erimiş %80 bitter çikolataya batır!'
  },
  {
    id: 'l3',
    cat: 'glow',
    size: 'look-tall',
    tag: '🍒 Skin Glow İçecek',
    title: 'Iced Hibiscus & Berry Glow Tea',
    desc: 'Ödem atıcı, C vitamini deposu ve öğleden sonra soğuk kahve yerine geçen sıfır kalorili pembe çay.',
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    kcal: '25 kcal',
    protein: 'Yüksek Antioksidan',
    recipe: '1 tatlı kaşığı hibiskus ve kuşburnunu sıcak suda 6 dk demle, soğut. Bol buz, taze ahududu, lime dilimleri ve maden suyu ekleyerek servis et.'
  },
  {
    id: 'l4',
    cat: 'pilates',
    size: 'look-med',
    tag: '🩰 Pratik Kahvaltı',
    title: 'Cottage Cheese & Berry Brioche Tost',
    desc: 'Hem tatlı hem tuzlu sevenlere; 5 dakikada 18 gram protein sağlayan Pinterest kahvaltısı.',
    img: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=800&q=80',
    kcal: '295 kcal',
    protein: '18g Protein',
    recipe: 'Kızarmış ekşi maya ekmeğin üzerine 3 yemek kaşığı lor/süzme peynir sür. Üzerine taze böğürtlen, çilek dilimleri, 1 çay kaşığı bal ve toz Antep fıstığı ekle.'
  },
  {
    id: 'l5',
    cat: 'sweet',
    size: 'look-tall',
    tag: '🍫 Gece Atıştırmalığı',
    title: 'Raspberry Chia Jam Pudding',
    desc: 'Akşam yemeğinden sonra tatlı bir şey aradığında bağırsaklarını çalıştıran katmanlı kavanoz.',
    img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80',
    kcal: '210 kcal',
    protein: '11g Lif',
    recipe: '3 yemek kaşığı chia tohumunu 1 su bardağı badem sütüyle şişir. Üzerine sıcak suda ezilmiş frambuaz püresi ekle.'
  },
  {
    id: 'l6',
    cat: 'lunch',
    size: 'look-med',
    tag: '🥗 Lunchbox',
    title: 'Avokado & Narlı Pembe Kinoa Salatası',
    desc: 'Ofise veya kampüse yanına alabileceğin, E vitamini ve polifenol zengini öğle kutusu.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    kcal: '380 kcal',
    protein: '14g Protein',
    recipe: 'Haşlanmış kinoa, bebek ıspanak, yarım avokado, nar taneleri ve ızgara hellim/tofu parçalarını zeytinyağı-limon sosla harmanla.'
  }
];

let activeLookCat = 'all';
let lookQuery = '';

function renderLookbook() {
  const grid = document.getElementById('lookbookGrid');
  const q = lookQuery.trim().toLowerCase();

  const filtered = LOOKBOOK_ITEMS.filter((i) => {
    const matchCat = activeLookCat === 'all' || i.cat === activeLookCat;
    if (!matchCat) return false;
    if (!q) return true;
    return `${i.title} ${i.desc} ${i.tag} ${i.recipe}`.toLowerCase().includes(q);
  });

  grid.innerHTML = filtered
    .map((item) => {
      const isFav = savedFavs.some((f) => f.id === item.id);
      return `
        <article class="look-card ${item.size}" data-look="${item.id}">
          <div class="look-img">
            <img src="${item.img}" alt="${item.title}" loading="lazy" />
            <span class="look-tag">${item.tag}</span>
            <button class="look-pin-btn ${isFav ? 'saved' : ''}" data-pin="${item.id}">
              ${isFav ? '✓ Kayıtlı' : '🎀 Pinle'}
            </button>
          </div>
          <div class="look-body">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            <div class="look-meta">
              <span>🔥 ${item.kcal}</span>
              <span>✨ ${item.protein}</span>
              <span>Tarifi Gör →</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  grid.querySelectorAll('[data-pin]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-pin');
      const item = LOOKBOOK_ITEMS.find((i) => i.id === id);
      if (item) {
        toggleFavItem({
          id: item.id,
          title: item.title,
          meta: `${item.tag} • ${item.kcal}`
        });
      }
    });
  });

  grid.querySelectorAll('[data-look]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-pin]')) return;
      const item = LOOKBOOK_ITEMS.find((i) => i.id === card.getAttribute('data-look'));
      if (item) openLookModal(item);
    });
  });
}

document.querySelectorAll('.feed-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.feed-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeLookCat = chip.getAttribute('data-cat');
    renderLookbook();
  });
});

document.getElementById('lookSearchInput').addEventListener('input', (e) => {
  lookQuery = e.target.value;
  renderLookbook();
});

// Modal
const recipeModal = document.getElementById('recipeModal');
const modalBody = document.getElementById('modalBody');
document.getElementById('closeModal').addEventListener('click', () => {
  recipeModal.classList.remove('open');
});
recipeModal.addEventListener('click', (e) => {
  if (e.target === recipeModal) recipeModal.classList.remove('open');
});

function openLookModal(item) {
  modalBody.innerHTML = `
    <span class="pill-tag">${item.tag}</span>
    <h2 style="font-family: var(--font-serif); font-size: 2.2rem; margin-bottom: 0.5rem;">${item.title}</h2>
    <p style="color: var(--text-body); margin-bottom: 1rem;">${item.desc}</p>
    <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 18px; margin-bottom: 1.2rem;" />
    <div style="background: var(--bg-blush); padding: 1.25rem; border-radius: 16px; margin-bottom: 1rem;">
      <strong style="display: block; color: var(--cherry-deep); margin-bottom: 0.35rem;">🥣 Hazırlanışı & Dyt. Yaren Notu</strong>
      <p style="font-size: 0.92rem; color: var(--text-dark);">${item.recipe}</p>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; font-weight: 700; color: var(--cherry-main); font-size: 0.9rem;">
      <span>🔥 ${item.kcal} • ✨ ${item.protein}</span>
    </div>
  `;
  recipeModal.classList.add('open');
}

// Package select & form
document.querySelectorAll('.choose-pass-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const passName = btn.getAttribute('data-pass');
    const sel = document.getElementById('jPass');
    if (sel && passName) sel.value = passName;
    document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
    notify(`🎀 "${passName}" seçildi!`);
  });
});

document.getElementById('joinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('jName').value;
  notify(`🍒 Harika ${name}! Ön görüşme talebin alındı.`);
  e.target.reset();
});

// Mobile Burger Menu
const burgerBtn = document.getElementById('burgerBtn');
const navMenu = document.getElementById('navMenu');
if (burgerBtn && navMenu) {
  burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
  navMenu.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => navMenu.classList.remove('open'));
  });
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    recipeModal.classList.remove('open');
    favDrawerBackdrop.classList.remove('open');
  }
});

// Initialize
syncFavorites();
renderWaterCups();
renderBowlStudio();
renderCyclePhase('menstrual');
renderLookbook();
