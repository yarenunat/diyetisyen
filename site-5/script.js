/* ==========================================================================
   SITE 5: AURA & CIRCADIAN LAB — CAFFEINE SIM, CIRCADIAN WHEEL & 3D BENTO
   ========================================================================== */

const auraToastWrap = document.getElementById('auraToastWrap');

function auraNotify(msg) {
  const el = document.createElement('div');
  el.className = 'aura-toast';
  el.textContent = msg;
  auraToastWrap.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

// 1. CAFFEINE HALF-LIFE & SLEEP BIOHACKING SIMULATOR
let selectedCaffeineMg = 160;
let selectedDrinkName = 'Iced Double Americano';
let selectedDrinkHour = 16.5;

function updateCaffeineSimulator() {
  const hoursElapsed = Math.max(0.5, 23.5 - selectedDrinkHour);
  // Average caffeine half-life in young adults ~ 5.2 hours
  const remainingMg = Math.round(selectedCaffeineMg * Math.pow(0.5, hoursElapsed / 5.2));

  const hInt = Math.floor(selectedDrinkHour);
  const mStr = selectedDrinkHour % 1 === 0.5 ? '30' : '00';
  document.getElementById('drinkTimeLabel').textContent = `${String(hInt).padStart(2, '0')}:${mStr}`;

  const valEl = document.getElementById('remCaffeineVal');
  const badgeEl = document.getElementById('caffStatusBadge');
  const antidoteEl = document.getElementById('caffAntidoteText');

  valEl.textContent = `${remainingMg} mg`;

  if (remainingMg >= 65) {
    valEl.style.color = '#C96A7E';
    badgeEl.textContent = '🚨 Derin Uykuyu %40 Böler & Gece Tatlı Krizi Yapar';
    badgeEl.style.color = '#C96A7E';
    antidoteEl.innerHTML =
      'Beynindeki adenozin reseptörleri hâlâ dolu! Akşam 21:30’da <strong>Vişne Suyu + Magnezyum Bisglisinat (Sleepy Girl Mocktail)</strong> iç ve C vitamini (kivi veya narenciye) ile kafein klirensini hızlandır.';
  } else if (remainingMg >= 35) {
    valEl.style.color = '#B8863B';
    badgeEl.textContent = '⚠️ Hafif REM Gecikmesi (Orta Seviye)';
    badgeEl.style.color = '#B8863B';
    antidoteEl.innerHTML =
      'Uykuya dalabilirsin ama sabah yorgun uyanmamak için akşam yemeğinde <strong>triptofan zengini (hindi, yumurta, kabak çekirdeği veya yulaf)</strong> bir öğünle melatonin üretimini destekle.';
  } else {
    valEl.style.color = '#4A8F82';
    badgeEl.textContent = '✅ Güvenli Bölge! Melatonin Salgısı Açık';
    badgeEl.style.color = '#4A8F82';
    antidoteEl.innerHTML =
      'Harika zamanlama! Gece 23:30’da kafein seviyen uykunu bölmeyecek düzeyde. Papatya veya melisa çayıyla hücresel onarım (otofaji) moduna geçebilirsin.';
  }
}

document.querySelectorAll('#drinkPills .c-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#drinkPills .c-pill').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    selectedCaffeineMg = parseFloat(btn.getAttribute('data-mg')) || 160;
    selectedDrinkName = btn.getAttribute('data-name') || '';
    updateCaffeineSimulator();
  });
});

const drinkTimeSlider = document.getElementById('drinkTimeSlider');
if (drinkTimeSlider) {
  drinkTimeSlider.addEventListener('input', (e) => {
    selectedDrinkHour = parseFloat(e.target.value);
    updateCaffeineSimulator();
  });
}

// 2. 24-HOUR CIRCADIAN RHYTHM WHEEL
const CIRCADIAN_SLOTS = {
  morning: {
    time: '08:00',
    phase: 'KORTİZOL ZİRVESİ',
    angle: -65,
    dashOffset: 620,
    glow: 'radial-gradient(circle, rgba(253, 230, 138, 0.4), rgba(94, 234, 212, 0.2), transparent 70%)',
    hormone: '🌅 KORTİZOL & İNSÜLİN DUYARLILIĞI ZİRVEDE',
    title: 'Sabah Tuzlu & Yüksek Tirozinli Başlangıç',
    desc: 'Uyanır uyanmaz aç karnına şekerli poğaça veya sert kahve içmek kortizolü aşırı zıplatıp öğleden sonra çöküş yaşatır. İlk 60 dakikada protein + sağlıklı yağ ile dopamin öncüsü tirozini ateşle!',
    eat: '2 Yumurta + Avokado + Lor Peyniri + Ekşi Maya (Kahve kahvaltıdan 45 dk sonra!)',
    avoid: 'Aç karnına şuruplu kahve, kruvasan veya meyve suyu'
  },
  noon: {
    time: '12:30',
    phase: 'DOPAMİN & ODAK',
    angle: 15,
    dashOffset: 510,
    glow: 'radial-gradient(circle, rgba(94, 234, 212, 0.45), rgba(129, 140, 248, 0.25), transparent 70%)',
    hormone: '⚡ DOPAMİN, ASETİLKOLİN & SİNDİRİM ENZİMLERİ AKTİF',
    title: 'Öğle Yemeğinde "Yemek Sonrası Uyku"yu Önleyen Formül',
    desc: 'Vücut sıcaklığın ve sindirim ateşin en yüksek noktada. Ağır hamur işleri yerine kolin ve polifenol zengini bir kaseyle öğleden sonra 4 saat kesintisiz odak (deep work) yakala.',
    eat: 'Izgara Somon veya Tavuklu Kinoa Kasesi + Fermente Turşu + Zeytinyağlı Yeşillik',
    avoid: 'Tek başına beyaz unlu makarna veya ağır kızartmalar'
  },
  afternoon: {
    time: '16:00',
    phase: 'GLİKOJEN KÖPRÜSÜ',
    angle: 85,
    dashOffset: 410,
    glow: 'radial-gradient(circle, rgba(94, 234, 212, 0.38), rgba(192, 132, 252, 0.3), transparent 70%)',
    hormone: '🍵 KAFEİN KESİM SAATİ & L-THEANINE GEÇİŞİ',
    title: 'Akşam Yemeğinde Saldırmamak İçin Stratejik Köprü',
    desc: 'Saat 16:00’da kan şekerin düşmeye başlar. Bu saati boş geçirirsen akşam eve gittiğinde buzdolabındaki her şeye saldırırsın. Kafeini azaltıp lif + magnezyum ekleme zamanı!',
    eat: 'Iced Matcha veya Hojicha + 10 Çiğ Badem + 2 Kare %80 Bitter Çikolata',
    avoid: 'Yüksek kafeinli enerji içecekleri ve paketli gofretler'
  },
  evening: {
    time: '19:30',
    phase: 'SEROTONİN GEÇİŞİ',
    angle: 155,
    dashOffset: 300,
    glow: 'radial-gradient(circle, rgba(192, 132, 252, 0.45), rgba(251, 113, 133, 0.25), transparent 70%)',
    hormone: '🌇 İNSÜLİN DUYARLILIĞI YAVAŞLAR • SEROTONİN SENTEZİ',
    title: 'Geceyi Rahatlatan Akşam Sofrası',
    desc: 'Akşam saatlerinde pankreasın dinlenmeye geçer. Sıfır karbonhidrat yapmak gece 23:00’te tatlı krizine sokar; bu yüzden akşam yemeğine küçük bir porsiyon kompleks karbonhidrat (tatlı patates/karabuğday) eklemek serotonini yükseltir!',
    eat: 'Fırın Sebzeli Hindi/Balık + 4 Kaşık Karabuğday veya Fırın Tatlı Patates',
    avoid: 'Çok geç saatte ağır kırmızı et ve aşırı tuzlu soslar'
  },
  midnight: {
    time: '23:00',
    phase: 'MELATONİN & ONARIM',
    angle: 235,
    dashOffset: 180,
    glow: 'radial-gradient(circle, rgba(251, 113, 133, 0.42), rgba(192, 132, 252, 0.35), transparent 70%)',
    hormone: '🌙 MELATONİN & BÜYÜME HORMONU (YAĞ YAKIMI)',
    title: 'Gece Dizi / Ders Başında Kriz Kalkanı',
    desc: 'Gece 23:00’te gelen yeme isteği gerçek açlık değil, beynin günün yorgunluğunu ödüllendirme (dopamin) arayışıdır. İnsülini zıplatmadan ağzına kıtır veya ferah bir his veren düşük glisemik alternatiflerle büyüyü boz!',
    eat: 'Sleepy Girl Vişne Mocktail veya Deniz Tuzlu Buharda Edamame / Tarçınlı Yoğurt',
    avoid: 'Cips, mısır gevreği, dondurma ve beyaz şekerli atıştırmalıklar'
  }
};

function renderCircadianSlot(slotKey) {
  const d = CIRCADIAN_SLOTS[slotKey];
  if (!d) return;

  document.getElementById('wheelCenterTime').textContent = d.time;
  document.getElementById('wheelCenterPhase').textContent = d.phase;
  document.getElementById('wheelPointerGroup').style.transform = `rotate(${d.angle}deg)`;
  document.getElementById('wheelActiveArc').style.strokeDashoffset = d.dashOffset;
  document.getElementById('wheelAuraGlow').style.background = d.glow;

  document.getElementById('circadianDetailCard').innerHTML = `
    <span class="cd-hormone-pill">${d.hormone}</span>
    <h3>${d.title}</h3>
    <p style="color: var(--text-soft); font-size: 0.94rem;">${d.desc}</p>
    <div class="cd-plate-card">
      <div class="cd-box">
        <strong>✅ BU SAATTE NE YENMELİ?</strong>
        <span>${d.eat}</span>
      </div>
      <div class="cd-box">
        <strong style="color: var(--coral);">❌ NEDEN KAÇINMALI?</strong>
        <span>${d.avoid}</span>
      </div>
    </div>
  `;
}

document.querySelectorAll('.time-node').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.time-node').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderCircadianSlot(btn.getAttribute('data-slot'));
  });
});

// 3. INTERACTIVE 3D ANIMATED DOPAMINE & LATE-NIGHT BENTO BOX DESIGNER
const BENTO_DATA = {
  slot1: [
    {
      id: 'b1_onigiri',
      name: 'Somon & Avokado Onigiri',
      short: 'Somon Onigiri',
      macroLabel: '18g Prot',
      kcal: 195,
      prot: 18,
      dopamine: 36,
      sleep: 32,
      svg: `<svg viewBox="0 0 100 100">
        <path d="M50 14 L86 78 Q90 86 80 86 L20 86 Q10 86 14 78 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="3"/>
        <circle cx="50" cy="52" r="14" fill="#FB7185"/>
        <path d="M40 52 Q50 42 60 52" fill="none" stroke="#FFE4E6" stroke-width="2.5"/>
        <rect x="34" y="64" width="32" height="22" rx="3" fill="#1E293B"/>
        <circle cx="32" cy="40" r="2" fill="#334155"/><circle cx="66" cy="44" r="2" fill="#334155"/><circle cx="50" cy="30" r="2" fill="#334155"/>
      </svg>`
    },
    {
      id: 'b1_edamame',
      name: 'Deniz Tuzlu Edamame & Nohut',
      short: 'Edamame & Nohut',
      macroLabel: '14g Prot',
      kcal: 160,
      prot: 14,
      dopamine: 33,
      sleep: 35,
      svg: `<svg viewBox="0 0 100 100">
        <path d="M20 55 C25 30 75 25 82 48 C75 72 28 75 20 55 Z" fill="#4ADE80" stroke="#16A34A" stroke-width="3"/>
        <circle cx="38" cy="50" r="9" fill="#86EFAC"/><circle cx="54" cy="48" r="9.5" fill="#86EFAC"/><circle cx="70" cy="48" r="8.5" fill="#86EFAC"/>
        <circle cx="36" cy="74" r="8" fill="#FBBF24"/><circle cx="54" cy="76" r="8.5" fill="#F59E0B"/><circle cx="70" cy="72" r="7.5" fill="#FBBF24"/>
      </svg>`
    },
    {
      id: 'b1_yogurt',
      name: 'Yaban Mersinli Yunan Yoğurdu',
      short: 'Berry Yoğurt',
      macroLabel: '16g Prot',
      kcal: 155,
      prot: 16,
      dopamine: 35,
      sleep: 36,
      svg: `<svg viewBox="0 0 100 100">
        <circle cx="50" cy="52" r="36" fill="#F1F5F9" stroke="#CBD5E1" stroke-width="3"/>
        <path d="M30 50 C40 32 65 32 70 52 C74 68 45 74 35 60" fill="none" stroke="#C084FC" stroke-width="6" stroke-linecap="round"/>
        <circle cx="42" cy="44" r="7" fill="#312E81"/><circle cx="58" cy="48" r="7.5" fill="#1E1B4B"/><circle cx="48" cy="60" r="6.5" fill="#3730A3"/>
      </svg>`
    },
    {
      id: 'b1_chia',
      name: 'Kakaolu & Muzlu Triptofan Puding',
      short: 'Kakao Puding',
      macroLabel: '12g Lif',
      kcal: 180,
      prot: 9,
      dopamine: 34,
      sleep: 38,
      svg: `<svg viewBox="0 0 100 100">
        <circle cx="50" cy="52" r="35" fill="#451A03" stroke="#78350F" stroke-width="3"/>
        <circle cx="44" cy="46" r="11" fill="#FEF08A" stroke="#FACC15" stroke-width="2"/>
        <circle cx="60" cy="56" r="11" fill="#FEF08A" stroke="#FACC15" stroke-width="2"/>
        <circle cx="34" cy="62" r="2" fill="#FFF" opacity=".6"/><circle cx="64" cy="38" r="2" fill="#FFF" opacity=".6"/>
      </svg>`
    }
  ],
  slot2: [
    {
      id: 'b2_strawchoc',
      name: 'Bitter Çikolata Kaplı Çilek',
      short: 'Çikolatalı Çilek',
      macroLabel: 'Serotonin+',
      kcal: 95,
      prot: 2,
      dopamine: 34,
      sleep: 30,
      svg: `<svg viewBox="0 0 100 100">
        <path d="M50 18 C70 18 78 42 70 68 C62 84 54 88 50 88 C46 88 38 84 30 68 C22 42 30 18 50 18 Z" fill="#F43F5E"/>
        <path d="M27 52 Q50 42 73 52 L70 68 C62 84 54 88 50 88 C46 88 38 84 30 68 Z" fill="#27120B"/>
        <path d="M36 18 L50 26 L64 18 L56 10 L44 10 Z" fill="#22C55E"/>
      </svg>`
    },
    {
      id: 'b2_pepitamix',
      name: 'Kabak Çekirdeği & Çiğ Badem',
      short: 'Magnezyum Kıtırı',
      macroLabel: 'Magnezyum',
      kcal: 115,
      prot: 5,
      dopamine: 32,
      sleep: 36,
      svg: `<svg viewBox="0 0 100 100">
        <ellipse cx="36" cy="46" rx="16" ry="9" transform="rotate(-25 36 46)" fill="#4ADE80" stroke="#15803D" stroke-width="2"/>
        <ellipse cx="64" cy="44" rx="18" ry="10" transform="rotate(20 64 44)" fill="#D97706" stroke="#92400E" stroke-width="2"/>
        <ellipse cx="50" cy="68" rx="16" ry="9" transform="rotate(10 50 68)" fill="#22C55E" stroke="#15803D" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'b2_ricecake',
      name: 'Fıstık Ezmeli Mini Pirinç Patlağı',
      short: 'Fıstıklı Patlak',
      macroLabel: 'Kıtır Doku',
      kcal: 110,
      prot: 4,
      dopamine: 33,
      sleep: 31,
      svg: `<svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="34" fill="#FEF3C7" stroke="#D97706" stroke-width="2.5" stroke-dasharray="6 4"/>
        <circle cx="50" cy="50" r="24" fill="#B45309"/>
        <path d="M36 48 Q50 36 64 48 T38 58" fill="none" stroke="#FDE68A" stroke-width="3" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'b2_kiwi',
      name: 'Altın Kivi &Ceviz İkilisi',
      short: 'Kivi & Ceviz',
      macroLabel: 'Doğal Melatonin',
      kcal: 90,
      prot: 2,
      dopamine: 31,
      sleep: 37,
      svg: `<svg viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="34" fill="#84CC16" stroke="#4D7C0F" stroke-width="3"/>
        <circle cx="50" cy="50" r="14" fill="#ECFCCB"/>
        <circle cx="50" cy="30" r="2" fill="#1E293B"/><circle cx="68" cy="42" r="2" fill="#1E293B"/><circle cx="64" cy="62" r="2" fill="#1E293B"/><circle cx="36" cy="62" r="2" fill="#1E293B"/><circle cx="32" cy="42" r="2" fill="#1E293B"/>
      </svg>`
    }
  ],
  slot3: [
    {
      id: 'b3_cherry',
      name: 'Sleepy Girl Vişne & Magnezyum Mocktail',
      short: 'Vişne Mocktail',
      macroLabel: 'Melatonin+',
      kcal: 45,
      prot: 0,
      dopamine: 28,
      sleep: 32,
      svg: `<svg viewBox="0 0 100 100">
        <rect x="28" y="22" width="44" height="62" rx="12" fill="#9F1239" stroke="#FDA4AF" stroke-width="2.5"/>
        <rect x="34" y="32" width="12" height="12" rx="3" fill="#FFF" opacity=".45"/>
        <rect x="52" y="42" width="12" height="12" rx="3" fill="#FFF" opacity=".45"/>
        <line x1="60" y1="10" x2="48" y2="54" stroke="#5EEAD4" stroke-width="4" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'b3_matcha',
      name: 'Yulaf Sütlü Iced L-Theanine Matcha',
      short: 'Iced Matcha',
      macroLabel: 'Alfa Dalgaları',
      kcal: 65,
      prot: 2,
      dopamine: 33,
      sleep: 24,
      svg: `<svg viewBox="0 0 100 100">
        <rect x="28" y="22" width="44" height="62" rx="12" fill="#10B981" stroke="#A7F3D0" stroke-width="2.5"/>
        <path d="M28 56 Q50 48 72 56 L72 72 Q72 84 60 84 L40 84 Q28 84 28 72 Z" fill="#ECFDF5" opacity=".85"/>
        <line x1="38" y1="10" x2="50" y2="50" stroke="#FDE68A" stroke-width="4" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'b3_moonmilk',
      name: 'Vanilyalı & Papatyalı Ilık Moon Milk',
      short: 'Moon Milk',
      macroLabel: 'Kortizol -%35',
      kcal: 70,
      prot: 3,
      dopamine: 27,
      sleep: 34,
      svg: `<svg viewBox="0 0 100 100">
        <rect x="26" y="30" width="48" height="50" rx="14" fill="#DDD6FE" stroke="#C084FC" stroke-width="2.5"/>
        <ellipse cx="50" cy="32" rx="22" ry="7" fill="#FFFFFF"/>
        <circle cx="44" cy="32" r="3" fill="#FACC15"/><circle cx="56" cy="31" r="2.5" fill="#FACC15"/>
      </svg>`
    },
    {
      id: 'b3_kombucha',
      name: 'Zencefil & Hibiskus Probiyotik İksir',
      short: 'Probiyotik İksir',
      macroLabel: 'Gut-Brain+',
      kcal: 35,
      prot: 0,
      dopamine: 30,
      sleep: 29,
      svg: `<svg viewBox="0 0 100 100">
        <rect x="28" y="22" width="44" height="62" rx="12" fill="#F43F5E" stroke="#FECDD3" stroke-width="2.5"/>
        <circle cx="42" cy="64" r="3" fill="#FFF" opacity=".7"/>
        <circle cx="56" cy="52" r="2.5" fill="#FFF" opacity=".7"/>
        <circle cx="48" cy="40" r="3.5" fill="#FFF" opacity=".7"/>
      </svg>`
    }
  ]
};

let selB1 = BENTO_DATA.slot1[0];
let selB2 = BENTO_DATA.slot2[0];
let selB3 = BENTO_DATA.slot3[0];

function triggerBentoCellPop(cellId) {
  const cell = document.getElementById(cellId);
  if (cell) {
    cell.classList.remove('cell-pop');
    void cell.offsetWidth;
    cell.classList.add('cell-pop');
  }
}

function renderBentoDesigner(changedCell = null) {
  const s1El = document.getElementById('bentoSlot1Opts');
  const s2El = document.getElementById('bentoSlot2Opts');
  const s3El = document.getElementById('bentoSlot3Opts');

  s1El.innerHTML = BENTO_DATA.slot1
    .map(
      (item) => `
      <button type="button" class="bento-opt-btn ${selB1.id === item.id ? 'active' : ''}" data-b1="${item.id}">
        <div class="b-thumb-icon">${item.svg}</div>
        <div class="b-opt-copy">
          <strong>${item.name}</strong>
          <span>${item.kcal} kcal • ${item.macroLabel}</span>
        </div>
      </button>
    `
    )
    .join('');

  s2El.innerHTML = BENTO_DATA.slot2
    .map(
      (item) => `
      <button type="button" class="bento-opt-btn ${selB2.id === item.id ? 'active' : ''}" data-b2="${item.id}">
        <div class="b-thumb-icon">${item.svg}</div>
        <div class="b-opt-copy">
          <strong>${item.name}</strong>
          <span>${item.kcal} kcal • ${item.macroLabel}</span>
        </div>
      </button>
    `
    )
    .join('');

  s3El.innerHTML = BENTO_DATA.slot3
    .map(
      (item) => `
      <button type="button" class="bento-opt-btn ${selB3.id === item.id ? 'active' : ''}" data-b3="${item.id}">
        <div class="b-thumb-icon">${item.svg}</div>
        <div class="b-opt-copy">
          <strong>${item.name}</strong>
          <span>${item.kcal} kcal • ${item.macroLabel}</span>
        </div>
      </button>
    `
    )
    .join('');

  s1El.querySelectorAll('[data-b1]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selB1 = BENTO_DATA.slot1.find((x) => x.id === btn.getAttribute('data-b1'));
      renderBentoDesigner('bentoCell1');
    });
  });

  s2El.querySelectorAll('[data-b2]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selB2 = BENTO_DATA.slot2.find((x) => x.id === btn.getAttribute('data-b2'));
      renderBentoDesigner('bentoCell2');
    });
  });

  s3El.querySelectorAll('[data-b3]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selB3 = BENTO_DATA.slot3.find((x) => x.id === btn.getAttribute('data-b3'));
      renderBentoDesigner('bentoCell3');
    });
  });

  // Update 3D Glass Bento Compartments
  document.getElementById('cellArt1').innerHTML = selB1.svg;
  document.getElementById('cellName1').textContent = selB1.short;
  document.getElementById('cellMacro1').textContent = selB1.macroLabel;

  document.getElementById('cellArt2').innerHTML = selB2.svg;
  document.getElementById('cellName2').textContent = selB2.short;
  document.getElementById('cellMacro2').textContent = selB2.macroLabel;

  document.getElementById('cellArt3').innerHTML = selB3.svg;
  document.getElementById('cellName3').textContent = selB3.short;
  document.getElementById('cellMacro3').textContent = selB3.macroLabel;

  if (changedCell) {
    triggerBentoCellPop(changedCell);
  }

  const totKcal = selB1.kcal + selB2.kcal + selB3.kcal;
  const totProt = selB1.prot + selB2.prot + selB3.prot;
  const dopScore = Math.min(100, selB1.dopamine + selB2.dopamine + selB3.dopamine);
  const sleepScore = Math.min(100, selB1.sleep + selB2.sleep + selB3.sleep);

  document.getElementById('bentoComboTitle').textContent = `${selB1.short} & ${selB3.short} Bento`;
  document.getElementById('neuroDopamine').textContent = `${dopScore}%`;
  document.getElementById('barDopamine').style.width = `${dopScore}%`;
  document.getElementById('neuroSleep').textContent = `${sleepScore}%`;
  document.getElementById('barSleep').style.width = `${sleepScore}%`;

  document.getElementById('bentoTotalKcal').textContent = `${totKcal} kcal`;
  document.getElementById('bentoTotalProt').textContent = `${totProt}g`;
}

// Shake Bento Button & 3D Mouse Tilt
const shakeBentoBtn = document.getElementById('shakeBentoBtn');
if (shakeBentoBtn) {
  shakeBentoBtn.addEventListener('click', () => {
    const box = document.getElementById('glassBentoBox');
    if (box) {
      box.classList.remove('shaking');
      void box.offsetWidth;
      box.classList.add('shaking');
    }
    selB1 = BENTO_DATA.slot1[Math.floor(Math.random() * BENTO_DATA.slot1.length)];
    selB2 = BENTO_DATA.slot2[Math.floor(Math.random() * BENTO_DATA.slot2.length)];
    selB3 = BENTO_DATA.slot3[Math.floor(Math.random() * BENTO_DATA.slot3.length)];
    setTimeout(() => {
      renderBentoDesigner('bentoCell1');
      triggerBentoCellPop('bentoCell2');
      triggerBentoCellPop('bentoCell3');
      auraNotify('🎲 Yeni Dopamin & Gece Bento kombinasyonun hazır!');
    }, 240);
  });
}

const bentoTrayStage = document.getElementById('bentoTrayStage');
const glassBentoBox = document.getElementById('glassBentoBox');
if (bentoTrayStage && glassBentoBox) {
  bentoTrayStage.addEventListener('mousemove', (e) => {
    const r = bentoTrayStage.getBoundingClientRect();
    const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -10;
    const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 10;
    glassBentoBox.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
  });
  bentoTrayStage.addEventListener('mouseleave', () => {
    glassBentoBox.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}

// 4. PINTEREST MIDNIGHT & DOPAMINE MASONRY BOARD + SAVED DRAWER
const AURA_PINS = [
  {
    id: 'ap1',
    cat: 'elixir',
    timeTag: '🌙 21:30 • MELATONİN İKSİRİ',
    title: 'Viral "Sleepy Girl" Vişne & Magnezyum Mocktail',
    desc: 'Doğal melatonin kaynağı şekersiz vişne suyu, magnezyum ve maden suyuyla uykuya geçişi hızlandıran gece kokteyli.',
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    meta: '45 KCAL • DERİN UYKU',
    recipe: 'Yarım su bardağı %100 doğal ekşi vişne suyunu bol buzlu kadehe al. İçine 1 ölçek toz magnezyum bisglisinat (veya sitrat) karıştır, üzerini sade maden suyu ve taze nane ile tamamla.'
  },
  {
    id: 'ap2',
    cat: 'focus',
    timeTag: '🧠 09:00 • ADHD & DOPAMİN',
    title: 'Yüksek Tirozinli Somon, Avokado & Yumurta Kasesi',
    desc: 'Sabahları odaklanmakta zorlananlar için beynin dopamin ve asetilkolin üretimini ateşleyen kahvaltı.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    meta: '380 KCAL • 28G PROTEİN',
    recipe: '2 adet kayısı yumurta, 80g füme veya fırın somon, çeyrek avokado, çörek otu ve 1 dilim kızarmış ekşi maya ekmeği.'
  },
  {
    id: 'ap3',
    cat: 'night',
    timeTag: '🌙 23:00 • DİZİ YANI KURTARICI',
    title: 'Sriracha & Deniz Tuzlu Buharda Edamame',
    desc: 'Gece bir şeyler atıştırma isteği geldiğinde insülini hiç yükseltmeden el-ağız alışkanlığını doyuran kase.',
    img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    meta: '140 KCAL • 13G PROTEİN',
    recipe: 'Dondurulmuş edamame fasulyelerini kaynar suda 5 dk haşla. Üzerine yaprak deniz tuzu, sarımsak tozu ve birkaç damla acı sos/limon gezdir.'
  },
  {
    id: 'ap4',
    cat: 'focus',
    timeTag: '⚡ 14:30 • ALFA DALGASI',
    title: 'Tuzlu Karamel Tadında Buzlu Matcha & Kolajen Latte',
    desc: 'Kahvenin yaptığı el titremesi ve anksiyete olmadan 4 saat sakin odaklanma sağlayan L-theanine içeceği.',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    meta: '115 KCAL • L-THEANINE',
    recipe: '1 çay kaşığı matcha tozunu ılık suyla çırp. Bardağa buz, yulaf sütü, 1 ölçek vanilyalı kolajen ve bir çimdik pembe kaya tuzu ekle.'
  },
  {
    id: 'ap5',
    cat: 'night',
    timeTag: '🍫 22:00 • SEROTONİN TATLI',
    title: 'Magnezyumlu & Fıstık Ezmeli Donuk Muz Lokmaları',
    desc: 'Gece çikolata krizini 2 lokmada kesen, potasyum ve triptofan zengini buzluk atıştırmalığı.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    meta: '125 KCAL • RAFİNE ŞEKERSİZ',
    recipe: 'Halka doğranmış muzların arasına şekersiz fıstık ezmesi sürüp sandviç yap. Eritilmiş %80 bitter çikolataya половиasını batırıp buzlukta dondur.'
  },
  {
    id: 'ap6',
    cat: 'elixir',
    timeTag: '🌇 20:30 • KORTİZOL DETOKSU',
    title: 'Altın Zerdeçal & Tarçınlı Ilık Badem Moon Milk',
    desc: 'Stresli bir günün ardından kortizolü düşüren ve tatlı isteğini sıfırlayan baharatlı gece sütü.',
    img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    meta: '80 KCAL • ANTİ-İNFLAMATUAR',
    recipe: '1 su bardağı şekersiz badem sütünü yarım çay kaşığı toz zerdeçal, tarçın, bir çimdik karabiber ve yarım çay kaşığı bal ile ısıtıp köpürt.'
  }
];

let savedAuraList = [];
try {
  const s = localStorage.getItem('aura_saved_items');
  savedAuraList = s
    ? JSON.parse(s)
    : [{ id: 'ap1', title: 'Viral "Sleepy Girl" Vişne & Magnezyum Mocktail', meta: '45 KCAL • DERİN UYKU' }];
} catch (e) {
  savedAuraList = [];
}

let activeAuraCat = 'all';
let auraQuery = '';

function syncAuraSaved() {
  try {
    localStorage.setItem('aura_saved_items', JSON.stringify(savedAuraList));
  } catch (e) {
    // ignore
  }
  document.getElementById('auraSavedCount').textContent = savedAuraList.length;
  renderAuraDrawer();
}

function toggleAuraSave(itemObj) {
  const idx = savedAuraList.findIndex((x) => x.id === itemObj.id);
  if (idx > -1) {
    savedAuraList.splice(idx, 1);
    auraNotify(`"${itemObj.title}" panodan çıkarıldı.`);
  } else {
    savedAuraList.push(itemObj);
    auraNotify(`🔮 "${itemObj.title}" Aura Panona kaydedildi!`);
  }
  syncAuraSaved();
  renderAuraBoard();
}

document.getElementById('saveCustomBentoBtn').addEventListener('click', () => {
  const title = document.getElementById('bentoComboTitle').textContent;
  const kcal = document.getElementById('bentoTotalKcal').textContent;
  const prot = document.getElementById('bentoTotalProt').textContent;
  const id = `bento-${selB1.id}-${selB2.id}-${selB3.id}`;

  if (!savedAuraList.some((x) => x.id === id)) {
    savedAuraList.push({
      id,
      title: `🍱 ${title}`,
      meta: `${kcal} • ${prot} Protein (${selB1.short} + ${selB2.short} + ${selB3.short})`
    });
    syncAuraSaved();
  }
  auraNotify(`🔮 "${title}" koleksiyonuna eklendi!`);
});

function renderAuraBoard() {
  const grid = document.getElementById('auraMasonry');
  const q = auraQuery.trim().toLowerCase();

  const filtered = AURA_PINS.filter((p) => {
    const cMatch = activeAuraCat === 'all' || p.cat === activeAuraCat;
    if (!cMatch) return false;
    if (!q) return true;
    return `${p.title} ${p.desc} ${p.timeTag} ${p.recipe}`.toLowerCase().includes(q);
  });

  grid.innerHTML = filtered
    .map((p) => {
      const isSaved = savedAuraList.some((x) => x.id === p.id);
      return `
        <article class="a-pin glass-card" data-open="${p.id}">
          <div class="a-pin-media">
            <img src="${p.img}" alt="${p.title}" loading="lazy" />
            <span class="a-time-tag">${p.timeTag}</span>
            <button type="button" class="a-pin-save" data-save="${p.id}">
              ${isSaved ? '✓ Kayıtlı' : '🔮 Pinle'}
            </button>
          </div>
          <div class="a-pin-body">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="a-pin-foot">
              <span>${p.meta}</span>
              <span>REÇETEYİ AÇ →</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  grid.querySelectorAll('[data-save]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = AURA_PINS.find((p) => p.id === btn.getAttribute('data-save'));
      if (item) toggleAuraSave({ id: item.id, title: item.title, meta: item.meta });
    });
  });

  grid.querySelectorAll('[data-open]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-save]')) return;
      const item = AURA_PINS.find((p) => p.id === card.getAttribute('data-open'));
      if (item) openAuraModal(item);
    });
  });
}

document.querySelectorAll('.a-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.a-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeAuraCat = chip.getAttribute('data-cat');
    renderAuraBoard();
  });
});

document.getElementById('auraSearchInput').addEventListener('input', (e) => {
  auraQuery = e.target.value;
  renderAuraBoard();
});

// Modal & Drawer
const auraModal = document.getElementById('auraModal');
const auraModalBody = document.getElementById('auraModalBody');
const auraDrawerBackdrop = document.getElementById('auraDrawerBackdrop');
const auraDrawerList = document.getElementById('auraDrawerList');

function openAuraModal(item) {
  auraModalBody.innerHTML = `
    <span class="mono-label">${item.timeTag}</span>
    <h2 style="font-family: var(--font-serif); font-size: 2.2rem; font-weight: 400; margin-bottom: 0.5rem;">${item.title}</h2>
    <p style="color: var(--text-soft); margin-bottom: 1rem;">${item.desc}</p>
    <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 250px; object-fit: cover; border-radius: 18px; margin-bottom: 1.2rem;" />
    <div style="background: var(--violet-tint); border-left: 3px solid var(--violet); padding: 1.2rem; border-radius: 12px;">
      <strong style="display: block; color: var(--violet); margin-bottom: 0.35rem;">🔮 Hazırlanışı & Biyoritim Etkisi</strong>
      <p style="font-size: 0.92rem; color: var(--text-bright);">${item.recipe}</p>
    </div>
  `;
  auraModal.classList.add('open');
}

function renderAuraDrawer() {
  if (savedAuraList.length === 0) {
    auraDrawerList.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Panon henüz boş.</p>`;
    return;
  }
  auraDrawerList.innerHTML = savedAuraList
    .map(
      (x) => `
      <div style="background: #FFFFFF; border: 1px solid var(--glass-border); padding: 0.85rem 1rem; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; gap: 0.75rem;">
        <div>
          <strong style="display: block; font-size: 0.9rem;">${x.title}</strong>
          <span class="mono-sub" style="color: var(--violet);">${x.meta}</span>
        </div>
        <button class="aura-close" data-rem="${x.id}">✕</button>
      </div>
    `
    )
    .join('');

  auraDrawerList.querySelectorAll('[data-rem]').forEach((btn) => {
    btn.addEventListener('click', () => {
      savedAuraList = savedAuraList.filter((x) => x.id !== btn.getAttribute('data-rem'));
      syncAuraSaved();
      renderAuraBoard();
    });
  });
}

document.getElementById('closeAuraModal').addEventListener('click', () => auraModal.classList.remove('open'));
auraModal.addEventListener('click', (e) => {
  if (e.target === auraModal) auraModal.classList.remove('open');
});

document.getElementById('openAuraDrawerBtn').addEventListener('click', () => {
  renderAuraDrawer();
  auraDrawerBackdrop.classList.add('open');
});
document.getElementById('closeAuraDrawer').addEventListener('click', () => auraDrawerBackdrop.classList.remove('open'));
auraDrawerBackdrop.addEventListener('click', (e) => {
  if (e.target === auraDrawerBackdrop) auraDrawerBackdrop.classList.remove('open');
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    auraModal.classList.remove('open');
    auraDrawerBackdrop.classList.remove('open');
  }
});

// Package pick & form
document.querySelectorAll('.pick-aura-pkg').forEach((btn) => {
  btn.addEventListener('click', () => {
    const pkg = btn.getAttribute('data-pkg');
    const sel = document.getElementById('aProg');
    if (sel && pkg) sel.value = pkg;
    document.getElementById('aura-booking').scrollIntoView({ behavior: 'smooth' });
    auraNotify(`🔮 "${pkg}" seçildi!`);
  });
});

document.getElementById('auraForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('aName').value;
  auraNotify(`✨ Harika ${name}! Biyoritim analizi talebin alındı.`);
  e.target.reset();
});

// Mobile Burger
const auraBurger = document.getElementById('auraBurger');
const auraLinks = document.getElementById('auraLinks');
if (auraBurger && auraLinks) {
  auraBurger.addEventListener('click', () => auraLinks.classList.toggle('open'));
  auraLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => auraLinks.classList.remove('open'));
  });
}

// Cursor glow
const auraCursor = document.getElementById('auraCursor');
if (auraCursor) {
  window.addEventListener('mousemove', (e) => {
    auraCursor.style.left = `${e.clientX}px`;
    auraCursor.style.top = `${e.clientY}px`;
  });
}

// Initialize
updateCaffeineSimulator();
renderCircadianSlot('morning');
renderBentoDesigner();
syncAuraSaved();
renderAuraBoard();
