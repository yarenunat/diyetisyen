/* ==========================================================================
   SITE 3: CASA SOLIS — WEEKLY MEAL & MARKET LIST PLANNER + RECIPE INDEX
   ========================================================================== */

const edToastWrap = document.getElementById('edToastWrap');

function showEdToast(msg) {
  const el = document.createElement('div');
  el.className = 'ed-toast';
  el.textContent = msg;
  edToastWrap.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

// 1. CURATED MEDITERRANEAN MEALS & INGREDIENTS DATABASE
const MEALS_DB = {
  breakfast: [
    {
      id: 'b1',
      name: 'Avokado, Lor & Ekşi Maya Tost',
      ingredients: { manav: ['Avokado', 'Çeri Domates', 'Limon'], mandira: ['Lor Peyniri', 'Yumurta'], kiler: ['Ekşi Mayalı Ekmek', 'Zeytinyağı'] }
    },
    {
      id: 'b2',
      name: 'İncirli, Cevizli & Süzme Yoğurtlu Yulaf',
      ingredients: { manav: ['Taze İncir veya Elma'], mandira: ['Süzme Yoğurt'], kiler: ['Yulaf Ezmesi', 'Çiğ Ceviz', 'Tarçın'] }
    },
    {
      id: 'b3',
      name: 'Ege Otlu & Beyaz Peynirli Omlet',
      ingredients: { manav: ['Maydanoz & Dereotu', 'Salatalık'], mandira: ['Yumurta', 'Ezine Beyaz Peynir'], kiler: ['Zeytinyağı', 'Çörek Otu'] }
    },
    {
      id: 'b4',
      name: 'Tahin-Pekmezli & Muzlu Chia Kavanozu',
      ingredients: { manav: ['Muz'], mandira: ['Badem Sütü veya Kefir'], kiler: ['Chia Tohumu', 'Tahin'] }
    }
  ],
  lunch: [
    {
      id: 'l1',
      name: 'Nohutlu, Nar Ekşili & Kinoalı Akdeniz Kasesi',
      ingredients: { manav: ['Roka', 'Kapya Biber', 'Limon'], mandira: ['Hellim veya Beyaz Peynir'], kiler: ['Haşlanmış Nohut', 'Kinoa', 'Zeytinyağı'] }
    },
    {
      id: 'l2',
      name: 'Zeytinyağlı Enginar & Karabuğday Salatası',
      ingredients: { manav: ['Enginar Kalbi', 'Dereotu', 'Bezelye & Havuç'], mandira: ['Süzme Yoğurt'], kiler: ['Karabuğday (Greçka)', 'Zeytinyağı'] }
    },
    {
      id: 'l3',
      name: 'Izgara Tavuklu & Avokadolu Sezar Dürüm',
      ingredients: { manav: ['Marul', 'Avokado'], mandira: ['Tavuk Göğsü', 'Parmesan / Eski Kaşar'], kiler: ['Tam Buğday Lavaş'] }
    },
    {
      id: 'l4',
      name: 'Yeşil Mercimekli & Cevizli Semizotu Salatası',
      ingredients: { manav: ['Semizotu', 'Çilek veya Nar'], mandira: ['Keçi Peyniri veya Süzme Yoğurt'], kiler: ['Yeşil Mercimek', 'Çiğ Ceviz'] }
    }
  ],
  dinner: [
    {
      id: 'd1',
      name: 'Biberiyeli Fırın Somon & Kuşkonmaz/Kabak',
      ingredients: { manav: ['Kabak', 'Taze Biberiye', 'Limon'], mandira: ['Somon Fileto'], kiler: ['Zeytinyağı', 'Deniz Tuzu'] }
    },
    {
      id: 'd2',
      name: 'Fırınlanmış Tatlı Patates & Izgara Köfte',
      ingredients: { manav: ['Tatlı Patates', 'Mor Lahana', 'Roka'], mandira: ['Yağsız Dana Kıyma'], kiler: ['Zeytinyağı', 'Kimyon & Kekik'] }
    },
    {
      id: 'd3',
      name: 'Fesleğenli & Domates Soslu Kabak Spagetti',
      ingredients: { manav: ['Kabak', 'Taze Fesleğen', 'Domates', 'Sarımsak'], mandira: ['Mozzarella veya Lor'], kiler: ['Zeytinyağı', 'Çam Fıstığı / Ceviz'] }
    },
    {
      id: 'd4',
      name: 'Fırında Sebzeli & Zerdeçallı Hindi/Tofu Şiş',
      ingredients: { manav: ['Brokoli', 'Kırmızı Soğan', 'Mantar'], mandira: ['Hindi Göğüs veya Tofu'], kiler: ['Basmati Pirinç', 'Zeytinyağı'] }
    }
  ]
};

const PRESET_PLANS = {
  glow: [
    { day: 'Pazartesi', sub: 'GÜN 01', b: 'b1', l: 'l1', d: 'd1' },
    { day: 'Salı', sub: 'GÜN 02', b: 'b2', l: 'l2', d: 'd3' },
    { day: 'Çarşamba', sub: 'GÜN 03', b: 'b3', l: 'l4', d: 'd2' },
    { day: 'Perşembe', sub: 'GÜN 04', b: 'b1', l: 'l2', d: 'd4' },
    { day: 'Cuma', sub: 'GÜN 05', b: 'b4', l: 'l1', d: 'd1' }
  ],
  campus: [
    { day: 'Pazartesi', sub: 'GÜN 01', b: 'b2', l: 'l3', d: 'd2' },
    { day: 'Salı', sub: 'GÜN 02', b: 'b4', l: 'l1', d: 'd3' },
    { day: 'Çarşamba', sub: 'GÜN 03', b: 'b2', l: 'l3', d: 'd4' },
    { day: 'Perşembe', sub: 'GÜN 04', b: 'b1', l: 'l4', d: 'd2' },
    { day: 'Cuma', sub: 'GÜN 05', b: 'b4', l: 'l1', d: 'd3' }
  ],
  fit: [
    { day: 'Pazartesi', sub: 'GÜN 01', b: 'b3', l: 'l3', d: 'd1' },
    { day: 'Salı', sub: 'GÜN 02', b: 'b1', l: 'l4', d: 'd2' },
    { day: 'Çarşamba', sub: 'GÜN 03', b: 'b3', l: 'l1', d: 'd4' },
    { day: 'Perşembe', sub: 'GÜN 04', b: 'b2', l: 'l3', d: 'd1' },
    { day: 'Cuma', sub: 'GÜN 05', b: 'b3', l: 'l4', d: 'd2' }
  ]
};

let currentSchedule = JSON.parse(JSON.stringify(PRESET_PLANS.glow));

function renderPlanner() {
  const daysBoard = document.getElementById('daysBoard');

  daysBoard.innerHTML = currentSchedule
    .map(
      (item, idx) => `
      <div class="day-row-card">
        <div class="day-badge">
          <span class="mono-text">${item.sub}</span>
          <strong>${item.day}</strong>
        </div>
        <div class="day-meals-selects">
          <div class="meal-slot">
            <label>KAHVALTI</label>
            <select data-day="${idx}" data-slot="b">
              ${MEALS_DB.breakfast
                .map((m) => `<option value="${m.id}" ${m.id === item.b ? 'selected' : ''}>${m.name}</option>`)
                .join('')}
            </select>
          </div>
          <div class="meal-slot">
            <label>ÖĞLE</label>
            <select data-day="${idx}" data-slot="l">
              ${MEALS_DB.lunch
                .map((m) => `<option value="${m.id}" ${m.id === item.l ? 'selected' : ''}>${m.name}</option>`)
                .join('')}
            </select>
          </div>
          <div class="meal-slot">
            <label>AKŞAM</label>
            <select data-day="${idx}" data-slot="d">
              ${MEALS_DB.dinner
                .map((m) => `<option value="${m.id}" ${m.id === item.d ? 'selected' : ''}>${m.name}</option>`)
                .join('')}
            </select>
          </div>
        </div>
      </div>
    `
    )
    .join('');

  daysBoard.querySelectorAll('select').forEach((sel) => {
    sel.addEventListener('change', (e) => {
      const dIdx = parseInt(sel.getAttribute('data-day'), 10);
      const slot = sel.getAttribute('data-slot');
      currentSchedule[dIdx][slot] = e.target.value;
      updateMarketBasket();
    });
  });

  updateMarketBasket();
}

function updateMarketBasket() {
  const manavSet = new Set();
  const mandiraSet = new Set();
  const kilerSet = new Set();

  currentSchedule.forEach((day) => {
    const bMeal = MEALS_DB.breakfast.find((m) => m.id === day.b);
    const lMeal = MEALS_DB.lunch.find((m) => m.id === day.l);
    const dMeal = MEALS_DB.dinner.find((m) => m.id === day.d);

    [bMeal, lMeal, dMeal].forEach((meal) => {
      if (!meal) return;
      meal.ingredients.manav.forEach((i) => manavSet.add(i));
      meal.ingredients.mandira.forEach((i) => mandiraSet.add(i));
      meal.ingredients.kiler.forEach((i) => kilerSet.add(i));
    });
  });

  const totalCount = manavSet.size + mandiraSet.size + kilerSet.size;
  document.getElementById('basketCountBadge').textContent = `${totalCount} Malzeme`;

  const container = document.getElementById('basketCategories');
  container.innerHTML = `
    <div class="basket-group">
      <h4>🍋 MANAV & YEŞİLLİK (${manavSet.size})</h4>
      <ul class="basket-items">
        ${Array.from(manavSet)
          .map((item) => `<li><label><input type="checkbox" /><span>${item}</span></label></li>`)
          .join('')}
      </ul>
    </div>
    <div class="basket-group">
      <h4>🧀 PROTEİN & MANDIRA (${mandiraSet.size})</h4>
      <ul class="basket-items">
        ${Array.from(mandiraSet)
          .map((item) => `<li><label><input type="checkbox" /><span>${item}</span></label></li>`)
          .join('')}
      </ul>
    </div>
    <div class="basket-group">
      <h4>🌾 KİLER, TAHIL & YAĞ (${kilerSet.size})</h4>
      <ul class="basket-items">
        ${Array.from(kilerSet)
          .map((item) => `<li><label><input type="checkbox" /><span>${item}</span></label></li>`)
          .join('')}
      </ul>
    </div>
  `;
}

document.querySelectorAll('.preset-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preset-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const presetKey = btn.getAttribute('data-preset');
    if (PRESET_PLANS[presetKey]) {
      currentSchedule = JSON.parse(JSON.stringify(PRESET_PLANS[presetKey]));
      renderPlanner();
      showEdToast('🍋 Haftalık menü ve alışveriş sepetin güncellendi!');
    }
  });
});

document.getElementById('copyShoppingListBtn').addEventListener('click', () => {
  const items = Array.from(document.querySelectorAll('.basket-items span')).map((s) => `• ${s.textContent}`);
  const text = `CASA SOLIS • HAFTALIK PAZAR LİSTESİ 🧺\n\n${items.join('\n')}`;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showEdToast('📋 Pazar & market listen panoya kopyalandı!');
    });
  } else {
    showEdToast('📋 Alışveriş listen hazır!');
  }
});

// 2. ARCHED MEDITERRANEAN RECIPE INDEX
const ARCH_RECIPES = [
  {
    id: 'ar1',
    num: 'Nº 01',
    cat: 'kahvalti',
    title: 'İncirli, Ricottalı & Biberiye Ballı Ekşi Maya',
    desc: 'Sabah kahvesinin yanına 5 dakikada hazırlanan, kan şekerini koruyan Akdeniz bruschetta.',
    img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    meta1: '10 DK',
    meta2: '290 KCAL',
    recipe: 'Kızarmış ekşi maya dilimine 2 yemek kaşığı lor veya ricotta peyniri sür. Üzerine dilimlenmiş taze incir (veya şeftali/armut), kırık ceviz, taze biberiye yaprakları ve yarım çay kaşığı çiğ bal gezdir.'
  },
  {
    id: 'ar2',
    num: 'Nº 02',
    cat: 'anaogun',
    title: 'Limon Kabuklu & Kaparili Fırın Levrek/Somon',
    desc: 'Tek tepside hiç bulaşık çıkarmadan pişen, omega-3 ve antioksidan polifenol deposu akşam öğünü.',
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    meta1: '20 DK',
    meta2: '410 KCAL',
    recipe: 'Balık filetosunu fırın kağıdına al; etrafına çeri domates, kapari, ince limon dilimleri ve kuşkonmaz/kabak diz. Soğuk sıkım zeytinyağı gezdirip 190°C fırında 18 dakika pişir.'
  },
  {
    id: 'ar3',
    num: 'Nº 03',
    cat: 'anaogun',
    title: 'Portakallı & Dereotlu Zeytinyağlı Enginar Kasesi',
    desc: 'Karaciğer dostu sinarin içeriğiyle hem cildi parlatan hem de sindirimi rahatlatan bahar tabağı.',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    meta1: '15 DK',
    meta2: '260 KCAL',
    recipe: 'Küp doğranmış haşlanmış enginarları haşlanmış karabuğday, bol dereotu, taze nane ve portakal-limon-zeytinyağı sosuyla harmanla.'
  },
  {
    id: 'ar4',
    num: 'Nº 04',
    cat: 'tatli',
    title: 'Zeytinyağlı, Deniz Tuzlu & Portakallı Bitter Mus',
    desc: 'İtalyan ve İspanyol sahillerinin meşhur avokado-kakao bazlı, rafine şekersiz ipeksi tatlısı.',
    img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    meta1: '8 DK',
    meta2: '185 KCAL',
    recipe: '1 olgun avokado, 2 yemek kaşığı ham kakao, 2 yemek kaşığı bal/hurma özü ve rendelenmiş portakal kabuğunu mutfak robotunda krema olana dek çek. Üzerine birkaç damla sızma zeytinyağı ve yaprak deniz tuzu ekle!'
  },
  {
    id: 'ar5',
    num: 'Nº 05',
    cat: 'kahvalti',
    title: 'Çılbır 2.0: Sarımsaklı Süzme Yoğurt & Poşe Yumurta',
    desc: 'Anadolu ve Akdeniz’in en yüksek proteinli, en estetik brunch tabağı.',
    img: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80',
    meta1: '10 DK',
    meta2: '320 KCAL',
    recipe: 'Tabağın tabanına dereotlu süzme yoğurt yay. Üzerine 2 adet poşe yumurta yerleştir ve zeytinyağında hafifçe ısıtılmış toz kırmızı biber + çörek otu gezdir.'
  },
  {
    id: 'ar6',
    num: 'Nº 06',
    cat: 'tatli',
    title: 'Fırınlanmış Tarçınlı Şeftali / Armut & Cevizli Labne',
    desc: 'Akşam çayının yanına sıcak, tarçın kokulu ve bağırsak dostu hafif meyve tatlısı.',
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    meta1: '15 DK',
    meta2: '165 KCAL',
    recipe: 'İkiye bölünmüş şeftali veya armutları tarçın serperek airfryer/fırında 12 dk karamelize et. Ortasına 1 tatlı kaşığı süzme yoğurt/labne ve dövülmüş ceviz koy.'
  }
];

function renderArchRecipes(cat = 'all') {
  const grid = document.getElementById('archRecipeGrid');
  const list = cat === 'all' ? ARCH_RECIPES : ARCH_RECIPES.filter((r) => r.cat === cat);

  grid.innerHTML = list
    .map(
      (r) => `
      <article class="arch-card" data-arch="${r.id}">
        <div class="arch-img-wrap">
          <img src="${r.img}" alt="${r.title}" loading="lazy" />
          <span class="arch-num-tag">${r.num}</span>
        </div>
        <div class="arch-body">
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
          <div class="arch-meta">
            <span>⏱ ${r.meta1}</span>
            <span>🔥 ${r.meta2}</span>
            <span>REÇETEYİ AÇ ↗</span>
          </div>
        </div>
      </article>
    `
    )
    .join('');

  grid.querySelectorAll('[data-arch]').forEach((card) => {
    card.addEventListener('click', () => {
      const item = ARCH_RECIPES.find((r) => r.id === card.getAttribute('data-arch'));
      if (item) openEdModal(item);
    });
  });
}

document.querySelectorAll('.idx-filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.idx-filter').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderArchRecipes(btn.getAttribute('data-cat'));
  });
});

// Modal
const edModal = document.getElementById('edModal');
const edModalContent = document.getElementById('edModalContent');
document.getElementById('edCloseBtn').addEventListener('click', () => {
  edModal.classList.remove('open');
});
edModal.addEventListener('click', (e) => {
  if (e.target === edModal) edModal.classList.remove('open');
});

function openEdModal(item) {
  edModalContent.innerHTML = `
    <span class="mono-label">${item.num} • CASA SOLIS MUTFAK ARŞİVİ</span>
    <h2 style="font-family: var(--font-serif); font-size: 2.1rem; margin-bottom: 0.5rem;">${item.title}</h2>
    <p style="color: var(--umber); margin-bottom: 1.1rem;">${item.desc}</p>
    <img src="${item.img}" alt="${item.title}" style="width: 100%; height: 260px; object-fit: cover; border-radius: 16px; margin-bottom: 1.2rem; border: 1px solid var(--line-bold);" />
    <div style="background: var(--citrus-soft); border: 1px solid var(--espresso); padding: 1.25rem; border-radius: 16px; margin-bottom: 1rem;">
      <span class="mono-label" style="margin-bottom: 0.3rem;">HAZIRLANIŞI & SOFRA NOTU</span>
      <p style="font-size: 0.94rem;">${item.recipe}</p>
    </div>
    <div class="mono-text" style="color: var(--olive-deep);">SÜRE: ${item.meta1} • ENERJİ: ${item.meta2}</div>
  `;
  edModal.classList.add('open');
}

// Package pick & booking
document.querySelectorAll('.pkg-pick-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const pkg = btn.getAttribute('data-pkg');
    const sel = document.getElementById('rProgram');
    if (sel && pkg) sel.value = pkg;
    document.getElementById('atelier-booking').scrollIntoView({ behavior: 'smooth' });
    showEdToast(`🍋 "${pkg}" seçildi!`);
  });
});

document.getElementById('resForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('rName').value;
  showEdToast(`✉️ Teşekkürler ${name}! Atölye ön görüşme talebin alındı.`);
  e.target.reset();
});

// 3. LONGEVITY & MEDITERRANEAN RHYTHM CALCULATOR
function updateLongevityCalc() {
  const w = parseFloat(document.getElementById('lWeight').value) || 60;
  const h = parseFloat(document.getElementById('lHeight').value) || 167;
  const goal = document.getElementById('lGoal').value;

  const base = Math.round((10 * w + 6.25 * h - 5 * 24 - 161) * 1.38);
  let kcal = base;
  let oil = '3 Yemek Kaşığı';
  let fiber = '32g / 5 Porsiyon';
  let advice =
    '“Akdeniz ritminde kalorileri tek tek saymak yerine tabağının yarısını renkli mevsim sebzeleriyle, çeyreğini kaliteli proteinle, kalan çeyreğini ise ekşi maya veya karabuğdayla doldur.”';

  if (goal === 'light') {
    kcal = Math.max(1350, base - 280);
    oil = '2.5 Yemek Kaşığı';
    fiber = '35g / 6 Porsiyon';
    advice =
      '“Hafifleme döneminde zeytinyağını sıfırlamak yerine öğün başına 1 tatlı kaşığı soğuk sıkım zeytinyağı ve bol yeşillik kullanarak tokluk hormonunu (leptin) aktif tutuyoruz.”';
  } else if (goal === 'muscle') {
    kcal = base + 150;
    oil = '3.5 Yemek Kaşığı';
    fiber = '30g + Yüksek Protein';
    advice =
      '“Antrenman sonrası ızgara balık, hindi veya bakliyat-tahıl kombinasyonlarıyla kas onarımını desteklerken zeytinyağı polifenolleriyle eklem inflamasyonunu azaltıyoruz.”';
  }

  const water = ((w * 35) / 1000).toFixed(1);

  document.getElementById('lResKcal').textContent = `${kcal.toLocaleString('tr-TR')} kcal`;
  document.getElementById('lResOil').textContent = oil;
  document.getElementById('lResFiber').textContent = fiber;
  document.getElementById('lResWater').textContent = `${water} Litre`;
  document.getElementById('lResAdvice').textContent = advice;
}

const calcLongevityBtn = document.getElementById('calcLongevityBtn');
if (calcLongevityBtn) {
  calcLongevityBtn.addEventListener('click', () => {
    updateLongevityCalc();
    showEdToast('⚖️ Akdeniz Longevity reçeten güncellendi!');
  });
}

['lWeight', 'lHeight', 'lGoal'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', updateLongevityCalc);
    el.addEventListener('change', updateLongevityCalc);
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    edModal.classList.remove('open');
  }
});

// Mobile menu toggle
const edMobileBtn = document.getElementById('edMobileBtn');
const edMobileNav = document.getElementById('edMobileNav');
if (edMobileBtn && edMobileNav) {
  edMobileBtn.addEventListener('click', () => {
    edMobileNav.classList.toggle('open');
  });
  edMobileNav.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => edMobileNav.classList.remove('open'));
  });
}

// Initialize
renderPlanner();
renderArchRecipes('all');
updateLongevityCalc();
