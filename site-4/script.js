/* ==========================================================================
   SITE 4: KINETIC FUEL — MACRO ENGINE, HIGH-PROTEIN BOARD & PLATE SIMULATOR
   ========================================================================== */

const kToastWrap = document.getElementById('kToastWrap');

function kToast(msg) {
  const el = document.createElement('div');
  el.className = 'k-toast';
  el.textContent = msg;
  kToastWrap.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

// 1. HERO DAY-TYPE FUEL STRATEGY SWITCHER
const DAY_STRATEGIES = {
  lift: {
    badge: '🏋️‍♂️ AĞIRLIK / HYPERTROPHY GÜNÜ PROTOKOLÜ',
    text: '<strong>Pre-Workout (90 dk önce):</strong> Kompleks karbonhidrat (yulaf veya basmati) + orta protein + Double Espresso.<br /><strong>Post-Workout:</strong> 40-45g hızlı emilen protein + glikojen depolarını dolduran fırın patates veya ekşi maya.'
  },
  cardio: {
    badge: '⚽ MAÇ / HIIT / KONDİSYON GÜNÜ PROTOKOLÜ',
    text: '<strong>Pre-Workout:</strong> Sindirimi kolay muz + 1 tatlı kaşığı bal + elektrolit/maden suyu.<br /><strong>Post-Workout:</strong> Kas yıkımını önleyen 35g+ izole/yağsız protein, antioksidan kırmızı meyveler ve yüksek su/mineral.'
  },
  office: {
    badge: '💻 YOĞUN OFİS / DİNLENME GÜNÜ PROTOKOLÜ',
    text: '<strong>Odak & İnsülin Kontrolü:</strong> Öğleden sonra uyku basmaması için karbonhidratı %25 azaltıp sağlıklı yağları (avokado, zeytinyağı, ceviz) ve lifli yeşillikleri artırıyoruz.'
  }
};

document.querySelectorAll('.day-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.day-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    const data = DAY_STRATEGIES[tab.getAttribute('data-day')];
    if (data) {
      document.getElementById('strategyBadge').textContent = data.badge;
      document.getElementById('strategyText').innerHTML = data.text;
    }
  });
});

// 2. SCIENTIFIC CUT / BULK / RECOMP MACRO ENGINE
function calculateKineticMacros() {
  const gender = document.getElementById('mGender').value;
  const age = parseFloat(document.getElementById('mAge').value) || 26;
  const height = parseFloat(document.getElementById('mHeight').value) || 180;
  const weight = parseFloat(document.getElementById('mWeight').value) || 82;
  const activity = parseFloat(document.getElementById('mActivity').value) || 1.55;
  const goal = document.getElementById('mGoal').value;

  // Mifflin-St Jeor Equation
  const genderOffset = gender === 'male' ? 5 : -161;
  const bmr = 10 * weight + 6.25 * height - 5 * age + genderOffset;
  const tdee = Math.round(bmr * activity);

  let targetKcal = tdee;
  let goalTitle = 'LEAN CUT / DEFİNASYON';
  let proteinPerKg = 2.1;
  let fatRatio = 0.26;
  let coachNote = '';

  if (goal === 'cut') {
    targetKcal = Math.max(gender === 'male' ? 1650 : 1350, tdee - 480);
    goalTitle = '🔥 LEAN CUT / DEFİNASYON';
    proteinPerKg = 2.2;
    fatRatio = 0.25;
    coachNote =
      '💡 <strong>Dyt. Yaren’in Koçluk Notu:</strong> Definasyon döneminde kaloriyi kısarken proteini yüksek (2.2g/kg) tutarak kas kaybını sıfıra indiriyoruz. Haftada 0.6 - 0.8 kg net yağ kaybı için ideal aralıktasın.';
  } else if (goal === 'recomp') {
    targetKcal = tdee - 120;
    goalTitle = '⚡ BODY RECOMPOSITION';
    proteinPerKg = 2.1;
    fatRatio = 0.28;
    coachNote =
      '💡 <strong>Dyt. Yaren’in Koçluk Notu:</strong> Tartıdaki kilon sabit kalsa bile bel çevren incelirken omuz ve bacak kas kütlen artacak. Antrenman günlerinde karbonhidratı antrenman etrafında topla!';
  } else if (goal === 'bulk') {
    targetKcal = tdee + 300;
    goalTitle = '💪 CLEAN BULK / HİPERTROFİ';
    proteinPerKg = 1.9;
    fatRatio = 0.25;
    coachNote =
      '💡 <strong>Dyt. Yaren’in Koçluk Notu:</strong> Kirli bulk (dirty bulk) yapıp yağlanmak yerine +300 kcal temiz fazlalıkla maksimum kas sentezi ve antrenman patlayıcılığı sağlıyoruz.';
  }

  const proteinG = Math.round(weight * proteinPerKg);
  const fatG = Math.round((targetKcal * fatRatio) / 9);
  const remainingKcal = Math.max(400, targetKcal - proteinG * 4 - fatG * 9);
  const carbsG = Math.round(remainingKcal / 4);

  const waterL = ((weight * 38) / 1000).toFixed(1);
  const creatineG = weight >= 75 ? '5g / Gün' : '3-5g / Gün';

  document.getElementById('dashGoalTitle').textContent = goalTitle;
  document.getElementById('dashTdeeBadge').textContent = `TDEE: ${tdee.toLocaleString('tr-TR')} kcal`;
  document.getElementById('dashCalories').textContent = `${targetKcal.toLocaleString('tr-TR')} kcal`;
  document.getElementById('dashProtein').textContent = `${proteinG}g`;
  document.getElementById('dashProteinSub').textContent = `${proteinPerKg}g / kg • Kas Koruma`;
  document.getElementById('dashCarbs').textContent = `${carbsG}g`;
  document.getElementById('dashFat').textContent = `${fatG}g`;
  document.getElementById('dashWater').textContent = `${waterL} Litre`;
  document.getElementById('dashCreatine').textContent = creatineG;
  document.getElementById('dashCoachNote').innerHTML = coachNote;
}

document.getElementById('runMacroBtn').addEventListener('click', () => {
  calculateKineticMacros();
  kToast('⚡ Performans ve makro protokolün güncellendi!');
});

// 3. PINTEREST HIGH-PROTEIN KITCHEN BOARD
const KINETIC_PINS = [
  {
    id: 'kp1',
    cat: 'cheat',
    size: 'k-tall',
    title: 'Ev Yapımı Double Fit Smash Burger',
    desc: 'Dışarıdan söylediğinden daha lezzetli, yarı kalorisinde ve tam 48g protein içeren cuma akşamı klasiği.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    protein: '48G PROTEİN',
    kcal: '540 KCAL',
    time: '12 DK',
    recipe: '160g %5 yağlı dana döş kıymayı iki top yapıp kızgın döküm tavada ezerek (smash) mühürle. Üzerine 1 dilim cheddar, karamelize soğan ve süzme yoğurt-hardal-kornişon turşulu fit burger sos ekleyip tam buğday burger ekmeğinde servis et.'
  },
  {
    id: 'kp2',
    cat: 'main',
    size: 'k-med',
    title: 'Döküm Tavada Chimichurri Steak & Fırın Patates',
    desc: 'Demir, çinko, doğal kreatin ve kaliteli kompleks karbonhidrat bir arada.',
    img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    protein: '52G PROTEİN',
    kcal: '590 KCAL',
    time: '18 DK',
    recipe: '180g dana bonfile veya kontrfileyi döküm tavada mühürle. Yanında airfryer’da 1 tatlı kaşığı zeytinyağı ve biberiyeyle çıtırlaşmış bebek patates ve ince kıyım maydanoz-sarımsak-zeytinyağı (Chimichurri) sosla tüket.'
  },
  {
    id: 'kp3',
    cat: 'prep',
    size: 'k-tall',
    title: 'Airfryer Çıtır Tavuklu & Avokadolu Burrito Dürüm',
    desc: 'Ofise veya kampüse götürmelik, soğuk da sıcak da efsane olan yüksek proteinli dürüm.',
    img: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    protein: '42G PROTEİN',
    kcal: '480 KCAL',
    time: '10 DK',
    recipe: '150g jülyen tavuk göğsünü cajun baharatı ve 1 yemek kaşığı mısır gevreği tozuyla airfryer’da 9 dk pişir. Tam buğday lavaşa süzme yoğurtlu sriracha sos, çeyrek avokado, marul ve tavukları sarıp tost makinesinde mühürle!'
  },
  {
    id: 'kp4',
    cat: 'prepost',
    size: 'k-med',
    title: 'Iced Espresso & Muzlu Pro-Oats Shake',
    desc: 'Sabah antrenmanına giderken hem kafein hem de 34g protein + hızlı karbonhidrat sağlayan yakıt.',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    protein: '34G PROTEİN',
    kcal: '370 KCAL',
    time: '3 DK',
    recipe: '1 double shot soğuk espresso, 1 olgun muz, 3 yemek kaşığı yulaf, 1 ölçek çikolatalı/vanilyalı whey protein, 1 tatlı kaşığı fıstık ezmesi ve 200ml sütü buzla blenderda çek.'
  },
  {
    id: 'kp5',
    cat: 'main',
    size: 'k-tall',
    title: 'Teriyaki Soslu Fırın Somon & Basmati Kasesi',
    desc: 'Omega-3 yağ asitleriyle antrenman sonrası eklem ve kas toparlanmasını hızlandıran kase.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    protein: '38G PROTEİN',
    kcal: '520 KCAL',
    time: '15 DK',
    recipe: 'Somon filetoyu düşük sodyumlu soya sosu, zencefil ve 1 çay kaşığı balla fırınla. Altına haşlanmış basmati pirinç, edamame ve salatalık ekle.'
  },
  {
    id: 'kp6',
    cat: 'prep',
    size: 'k-med',
    title: 'Kıymalı & Meksika Fasulyeli Fajita Meal-Prep Kutusu',
    desc: 'Pazar gününden 3 günlük öğle yemeğini 20 dakikada hazırlatan ekonomik ve doyurucu kutu.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    protein: '44G PROTEİN',
    kcal: '495 KCAL',
    time: '15 DK',
    recipe: 'Renkli biberler ve soğanla sotelenmiş yağsız dana kıyma, haşlanmış Meksika fasulyesi, karabuğday/pirinç ve üzerine 1 yemek kaşığı süzme yoğurt.'
  }
];

let savedKIds = [];
try {
  const s = localStorage.getItem('kinetic_saved_pins');
  savedKIds = s ? JSON.parse(s) : ['kp1', 'kp2'];
} catch (e) {
  savedKIds = ['kp1'];
}

let activeKCat = 'all';
let kSearch = '';

const savedCountEl = document.getElementById('savedCount');
const kDrawerList = document.getElementById('kDrawerList');
const kDrawerBackdrop = document.getElementById('kDrawerBackdrop');

function syncKSaved() {
  try {
    localStorage.setItem('kinetic_saved_pins', JSON.stringify(savedKIds));
  } catch (e) {
    // ignore
  }
  savedCountEl.textContent = savedKIds.length;
  renderKDrawer();
}

function toggleKSave(id) {
  const idx = savedKIds.indexOf(id);
  const item = KINETIC_PINS.find((p) => p.id === id);
  if (idx > -1) {
    savedKIds.splice(idx, 1);
    kToast(`"${item ? item.title : 'Tarif'}" listeden çıkarıldı.`);
  } else {
    savedKIds.push(id);
    kToast(`📌 "${item ? item.title : 'Tarif'}" kaydedildi!`);
  }
  syncKSaved();
  renderKineticBoard();
}

function renderKineticBoard() {
  const grid = document.getElementById('kineticMasonry');
  const q = kSearch.trim().toLowerCase();

  const list = KINETIC_PINS.filter((p) => {
    const cMatch = activeKCat === 'all' || p.cat === activeKCat;
    if (!cMatch) return false;
    if (!q) return true;
    return `${p.title} ${p.desc} ${p.protein} ${p.recipe}`.toLowerCase().includes(q);
  });

  grid.innerHTML = list
    .map((p) => {
      const isSaved = savedKIds.includes(p.id);
      return `
        <article class="k-pin ${p.size}" data-open="${p.id}">
          <div class="k-pin-img">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <span class="k-macro-tag">⚡ ${p.protein} • ${p.kcal}</span>
            <button class="k-save-btn ${isSaved ? 'saved' : ''}" data-save="${p.id}">
              ${isSaved ? '✓ Kayıtlı' : '📌 Kaydet'}
            </button>
          </div>
          <div class="k-pin-body">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="k-pin-foot">
              <span>⏱ ${p.time} HAZIRLIK</span>
              <span>DETAY & MAKRO →</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  grid.querySelectorAll('[data-save]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleKSave(btn.getAttribute('data-save'));
    });
  });

  grid.querySelectorAll('[data-open]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-save]')) return;
      const item = KINETIC_PINS.find((p) => p.id === card.getAttribute('data-open'));
      if (item) openKModal(item);
    });
  });
}

document.querySelectorAll('.b-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.b-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeKCat = chip.getAttribute('data-cat');
    renderKineticBoard();
  });
});

document.getElementById('boardSearchInput').addEventListener('input', (e) => {
  kSearch = e.target.value;
  renderKineticBoard();
});

// Modal & Drawer
const kModal = document.getElementById('kModal');
const kModalBody = document.getElementById('kModalBody');
document.getElementById('kCloseBtn').addEventListener('click', () => kModal.classList.remove('open'));
kModal.addEventListener('click', (e) => {
  if (e.target === kModal) kModal.classList.remove('open');
});

function openKModal(item) {
  kModalBody.innerHTML = `
    <span class="mono-label">⚡ ${item.protein} • ${item.kcal} • ${item.time}</span>
    <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 0.45rem;">${item.title}</h2>
    <p style="color: var(--slate-text); margin-bottom: 1rem;">${item.desc}</p>
    <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 16px; margin-bottom: 1.2rem;" />
    <div style="background: var(--bg-stone); border-left: 4px solid var(--amber); padding: 1.2rem; border-radius: 10px;">
      <strong style="display: block; margin-bottom: 0.35rem;">👨‍🍳 Performans Mutfak Notu & Hazırlanışı</strong>
      <p style="font-size: 0.92rem;">${item.recipe}</p>
    </div>
  `;
  kModal.classList.add('open');
}

function renderKDrawer() {
  if (savedKIds.length === 0) {
    kDrawerList.innerHTML = `<p style="color: var(--slate-text); text-align: center; padding: 2rem;">Henüz kayıtlı tarifin yok.</p>`;
    return;
  }
  const items = savedKIds.map((id) => KINETIC_PINS.find((p) => p.id === id)).filter(Boolean);
  kDrawerList.innerHTML = items
    .map(
      (i) => `
      <div style="background: #FFF; border: 1.5px solid var(--border-bold); padding: 0.85rem 1rem; border-radius: 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <strong style="display: block; font-size: 0.92rem;">${i.title}</strong>
          <span class="mono-tag" style="color: var(--amber);">${i.protein} • ${i.kcal}</span>
        </div>
        <button class="k-close" data-rem="${i.id}">✕</button>
      </div>
    `
    )
    .join('');

  kDrawerList.querySelectorAll('[data-rem]').forEach((btn) => {
    btn.addEventListener('click', () => toggleKSave(btn.getAttribute('data-rem')));
  });
}

document.getElementById('openSavedBtn').addEventListener('click', () => {
  renderKDrawer();
  kDrawerBackdrop.classList.add('open');
});
document.getElementById('kCloseDrawerBtn').addEventListener('click', () => {
  kDrawerBackdrop.classList.remove('open');
});

// 4. INTERACTIVE 3D ANIMATED PLATE SIMULATOR
const PLATE_DATA = {
  proteins: [
    {
      id: 'p1',
      name: '180g Izgara Bonfile / Köfte',
      shortName: '180g Bonfile',
      prot: 42,
      carb: 0,
      fat: 11,
      kcal: 275,
      img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p2',
      name: '180g Cajun Tavuk Göğsü',
      shortName: 'Cajun Tavuk',
      prot: 44,
      carb: 2,
      fat: 5,
      kcal: 235,
      img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p3',
      name: '160g Fırın Somon Fileto',
      shortName: 'Fırın Somon',
      prot: 35,
      carb: 0,
      fat: 16,
      kcal: 290,
      img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'p4',
      name: '4 Yumurta + 100g Lor Omlet',
      shortName: 'Protein Omlet',
      prot: 38,
      carb: 3,
      fat: 18,
      kcal: 330,
      img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80'
    }
  ],
  carbs: [
    {
      id: 'c1',
      name: '200g Fırın Tatlı Patates',
      shortName: 'Tatlı Patates',
      prot: 3,
      carb: 41,
      fat: 0,
      kcal: 175,
      img: 'https://images.unsplash.com/photo-1639024471283-03518883512d?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'c2',
      name: '150g Basmati Pirinç & Edamame',
      shortName: 'Basmati Pirinç',
      prot: 4,
      carb: 44,
      fat: 0.5,
      kcal: 195,
      img: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'c3',
      name: '2 Dilim Kızarmış Ekşi Maya',
      shortName: 'Ekşi Maya',
      prot: 6,
      carb: 36,
      fat: 1,
      kcal: 180,
      img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'c4',
      name: '150g Haşlanmış Kinoa & Nohut',
      shortName: 'Kinoa & Nohut',
      prot: 7,
      carb: 34,
      fat: 2,
      kcal: 185,
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80'
    }
  ],
  sides: [
    {
      id: 's1',
      name: 'Avokado & Roka Salatası',
      shortName: 'Avokado Roka',
      prot: 2,
      carb: 5,
      fat: 8,
      kcal: 100,
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 's2',
      name: 'Zeytinyağlı Fırın Brokoli',
      shortName: 'Fırın Brokoli',
      prot: 3,
      carb: 8,
      fat: 7,
      kcal: 110,
      img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 's3',
      name: 'Süzme Yoğurtlu Cevizli Atom',
      shortName: 'Cevizli Yoğurt',
      prot: 6,
      carb: 5,
      fat: 6,
      kcal: 105,
      img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 's4',
      name: 'Izgara Kuşkonmaz & Çeri Domates',
      shortName: 'Kuşkonmaz',
      prot: 3,
      carb: 6,
      fat: 6,
      kcal: 95,
      img: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?auto=format&fit=crop&w=500&q=80'
    }
  ]
};

let selProt = PLATE_DATA.proteins[0];
let selCarb = PLATE_DATA.carbs[0];
let selSide = PLATE_DATA.sides[0];

function triggerSlotPop(slotId) {
  const slot = document.getElementById(slotId);
  const hub = document.getElementById('plateCenterHub');
  if (slot) {
    slot.classList.remove('pop-anim');
    void slot.offsetWidth;
    slot.classList.add('pop-anim');
  }
  const tagMap = {
    slotProt: '.tag-prot',
    slotCarb: '.tag-carb',
    slotSide: '.tag-side'
  };
  if (tagMap[slotId]) {
    const tagEl = document.querySelector(tagMap[slotId]);
    if (tagEl) {
      tagEl.classList.remove('tag-flash');
      void tagEl.offsetWidth;
      tagEl.classList.add('tag-flash');
    }
  }
  if (hub) {
    hub.classList.add('hub-pulse');
    setTimeout(() => hub.classList.remove('hub-pulse'), 320);
  }
}

function updateSvgMacroRing(totProt, totCarb, totFat) {
  const circumference = 1055; // 2 * PI * 168
  const pRatio = Math.min(0.45, totProt / 130);
  const cRatio = Math.min(0.35, totCarb / 140);
  const fRatio = Math.min(0.2, totFat / 80);

  const ringP = document.getElementById('svgRingProt');
  const ringC = document.getElementById('svgRingCarb');
  const ringF = document.getElementById('svgRingFat');

  if (ringP && ringC && ringF) {
    ringP.style.strokeDashoffset = circumference * (1 - pRatio);
    ringC.style.strokeDashoffset = circumference * (1 - (pRatio + cRatio));
    ringF.style.strokeDashoffset = circumference * (1 - (pRatio + cRatio + fRatio));
  }
}

function renderPlateSimulator(changedSlot = null) {
  const pEl = document.getElementById('proteinOpts');
  const cEl = document.getElementById('carbOpts');
  const sEl = document.getElementById('sideOpts');

  pEl.innerHTML = PLATE_DATA.proteins
    .map(
      (p) => `
      <button type="button" class="p-opt-btn ${selProt.id === p.id ? 'active' : ''}" data-p="${p.id}">
        <img src="${p.img}" alt="${p.name}" class="p-opt-thumb" loading="lazy" />
        <div class="p-opt-info">
          <span>${p.name}</span>
          <small>🥩 ${p.prot}g Prot • ${p.kcal} kcal</small>
        </div>
      </button>
    `
    )
    .join('');

  cEl.innerHTML = PLATE_DATA.carbs
    .map(
      (c) => `
      <button type="button" class="p-opt-btn ${selCarb.id === c.id ? 'active' : ''}" data-c="${c.id}">
        <img src="${c.img}" alt="${c.name}" class="p-opt-thumb" loading="lazy" />
        <div class="p-opt-info">
          <span>${c.name}</span>
          <small>🍠 ${c.carb}g Karb • ${c.kcal} kcal</small>
        </div>
      </button>
    `
    )
    .join('');

  sEl.innerHTML = PLATE_DATA.sides
    .map(
      (s) => `
      <button type="button" class="p-opt-btn ${selSide.id === s.id ? 'active' : ''}" data-s="${s.id}">
        <img src="${s.img}" alt="${s.name}" class="p-opt-thumb" loading="lazy" />
        <div class="p-opt-info">
          <span>${s.name}</span>
          <small>🥑 ${s.fat}g Yağ • ${s.kcal} kcal</small>
        </div>
      </button>
    `
    )
    .join('');

  pEl.querySelectorAll('[data-p]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selProt = PLATE_DATA.proteins.find((x) => x.id === btn.getAttribute('data-p'));
      renderPlateSimulator('slotProt');
    });
  });

  cEl.querySelectorAll('[data-c]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selCarb = PLATE_DATA.carbs.find((x) => x.id === btn.getAttribute('data-c'));
      renderPlateSimulator('slotCarb');
    });
  });

  sEl.querySelectorAll('[data-s]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selSide = PLATE_DATA.sides.find((x) => x.id === btn.getAttribute('data-s'));
      renderPlateSimulator('slotSide');
    });
  });

  // Update Visual Ceramic Plate Compartment Images & Labels
  document.getElementById('plateImgProt').src = selProt.img;
  document.getElementById('plateImgCarb').src = selCarb.img;
  document.getElementById('plateImgSide').src = selSide.img;
  document.getElementById('labelNameProt').textContent = `🥩 ${selProt.shortName}`;
  document.getElementById('labelNameCarb').textContent = `🍠 ${selCarb.shortName}`;
  document.getElementById('labelNameSide').textContent = `🥑 ${selSide.shortName}`;
  document.getElementById('compProtLabel').textContent = `${selProt.prot}g`;
  document.getElementById('compCarbLabel').textContent = `${selCarb.carb}g`;
  document.getElementById('compSideLabel').textContent = `${selSide.fat}g`;

  if (changedSlot) {
    triggerSlotPop(changedSlot);
  }

  const totProt = selProt.prot + selCarb.prot + selSide.prot;
  const totCarb = selProt.carb + selCarb.carb + selSide.carb;
  const totFat = Math.round(selProt.fat + selCarb.fat + selSide.fat);
  const totKcal = selProt.kcal + selCarb.kcal + selSide.kcal;

  document.getElementById('plateName').textContent = `${selProt.name} + ${selCarb.name} + ${selSide.name}`;
  document.getElementById('plateProt').textContent = `${totProt}g`;
  document.getElementById('plateKcal').textContent = `${totKcal}`;
  document.getElementById('plateCarb').textContent = `${totCarb}g`;
  document.getElementById('plateFat').textContent = `${totFat}g`;

  // Update progress bars & SVG Ring
  document.getElementById('barProt').style.width = `${Math.min(100, Math.round((totProt / 60) * 100))}%`;
  document.getElementById('barCarb').style.width = `${Math.min(100, Math.round((totCarb / 65) * 100))}%`;
  document.getElementById('barFat').style.width = `${Math.min(100, Math.round((totFat / 35) * 100))}%`;
  updateSvgMacroRing(totProt, totCarb, totFat);

  const verdictEl = document.getElementById('plateVerdict');
  if (totProt >= 48) {
    verdictEl.textContent = `🔥 ${totProt}g yüksek protein! Ağır hipertrofi antrenmanı sonrası kas onarımı ve tokluk için üst düzey bir kombinasyon.`;
  } else {
    verdictEl.textContent = `✅ ${totKcal} kcal dengeli makro dağılımı! Kan şekerini zıplatmadan saatlerce keskin odak ve kas koruması sağlar.`;
  }
}

// "🎲 Tabağı Çevir" Spin & Randomize Button
const randomPlateBtn = document.getElementById('randomPlateBtn');
if (randomPlateBtn) {
  randomPlateBtn.addEventListener('click', () => {
    const rim = document.getElementById('ceramicPlateRim');
    if (rim) {
      rim.classList.remove('spinning');
      void rim.offsetWidth;
      rim.classList.add('spinning');
    }
    selProt = PLATE_DATA.proteins[Math.floor(Math.random() * PLATE_DATA.proteins.length)];
    selCarb = PLATE_DATA.carbs[Math.floor(Math.random() * PLATE_DATA.carbs.length)];
    selSide = PLATE_DATA.sides[Math.floor(Math.random() * PLATE_DATA.sides.length)];
    setTimeout(() => {
      renderPlateSimulator('slotProt');
      triggerSlotPop('slotCarb');
      triggerSlotPop('slotSide');
      kToast('🎲 Şefin yeni performans tabağı kombinasyonu hazır!');
    }, 260);
  });
}

// 3D Interactive Mouse Tilt on the Ceramic Plate
const plateStage3D = document.getElementById('plateStage3D');
const ceramicPlateRim = document.getElementById('ceramicPlateRim');
const plateGlare = document.getElementById('plateGlare');

if (plateStage3D && ceramicPlateRim) {
  plateStage3D.addEventListener('mousemove', (e) => {
    const rect = plateStage3D.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    ceramicPlateRim.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    if (plateGlare) {
      const glareX = Math.round((x / rect.width) * 100);
      const glareY = Math.round((y / rect.height) * 100);
      plateGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.34) 0%, transparent 60%)`;
    }
  });

  plateStage3D.addEventListener('mouseleave', () => {
    ceramicPlateRim.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

const saveCustomPlateBtn = document.getElementById('saveCustomPlateBtn');
if (saveCustomPlateBtn) {
  saveCustomPlateBtn.addEventListener('click', () => {
    const plateTitle = document.getElementById('plateName').textContent;
    const protText = document.getElementById('plateProt').textContent;
    const kcalText = document.getElementById('plateKcal').textContent;
    const customId = `plate-${selProt.id}-${selCarb.id}-${selSide.id}`;

    if (!KINETIC_PINS.some((p) => p.id === customId)) {
      KINETIC_PINS.unshift({
        id: customId,
        cat: 'main',
        size: 'k-med',
        title: `🍽️ Özel Tabak: ${selProt.shortName} & ${selCarb.shortName}`,
        desc: plateTitle,
        img: selProt.img,
        protein: `${protText.toUpperCase()} PROTEİN`,
        kcal: `${kcalText} KCAL`,
        time: '15 DK',
        recipe: `${plateTitle} kombinasyonu. Antrenman sonrası kas protein sentezi ve glikojen yenilenmesi için özel olarak oluşturuldu.`
      });
    }
    if (!savedKIds.includes(customId)) {
      savedKIds.push(customId);
      syncKSaved();
      renderKineticBoard();
    }
    kToast(`📌 "${selProt.shortName} & ${selCarb.shortName}" Kayıtlı Listene eklendi!`);
  });
}

// Live Macro Calculator Input Listeners
['mGender', 'mAge', 'mHeight', 'mWeight', 'mActivity', 'mGoal'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', calculateKineticMacros);
    el.addEventListener('change', calculateKineticMacros);
  }
});

// Close Drawer on Backdrop Click or Escape Key
kDrawerBackdrop.addEventListener('click', (e) => {
  if (e.target === kDrawerBackdrop) kDrawerBackdrop.classList.remove('open');
});
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    kModal.classList.remove('open');
    kDrawerBackdrop.classList.remove('open');
  }
});

// Ambient Cursor Glow Tracker
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
}

// Program buttons & form
document.querySelectorAll('.select-prog-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const prog = btn.getAttribute('data-prog');
    const sel = document.getElementById('cProg');
    if (sel && prog) sel.value = prog;
    document.getElementById('coaching-form').scrollIntoView({ behavior: 'smooth' });
    kToast(`⚡ "${prog}" seçildi!`);
  });
});

document.getElementById('cForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('cName').value;
  kToast(`🚀 Harika ${name}! Strateji görüşmesi talebin alındı.`);
  e.target.reset();
});

// Mobile toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Initialize
syncKSaved();
calculateKineticMacros();
renderKineticBoard();
renderPlateSimulator();
