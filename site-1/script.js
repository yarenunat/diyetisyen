/* ==========================================================================
   DYT. YAREN STUDIO — INTERACTIVE PINTEREST BOARD, MOOD MATCHER & WELLNESS
   ========================================================================== */

// 1. HERO MOOD PRESCRIPTIONS
const MOOD_DATA = {
  enerji: {
    icon: '🍵',
    tag: 'Dyt. Yaren’in Enerji Notu',
    text: 'Sabah aç karnına sert kahve yerine <strong>Yulaf Sütlü Iced Matcha + 1 avuç çiğ badem</strong> dene. L-theanine kortizolü zıplatmadan 4 saat kesintisiz odak sağlar!'
  },
  tatli: {
    icon: '🍓',
    tag: 'Suçluluksuz Tatlı Formülü',
    text: 'Beynin enerji istiyor, seninle savaşmıyor! <strong>3 yemek kaşığı süzme yoğurt + 1 tatlı kaşığı fıstık ezmesi + donuk frambuaz + 2 kare bitter çikolata</strong> kaseni 3 dakikada hazırla.'
  },
  siskinlik: {
    icon: '🌿',
    tag: 'Gut-Friendly Rahatlama',
    text: 'Bugün çiğ salata yerine <strong>zeytinyağlı fırın kabak & rezene-taze zencefil çayı</strong> tercih et. Yemek sırasında pipetli soğuk içecekleri bir günlüğüne kenara bırak.'
  },
  fokus: {
    icon: '💻',
    tag: 'Sınav & Mesai Odak Paketi',
    text: 'Ders/iş masasında cips veya bisküvi yerine <strong>tuzlu-baharatlı fırın nohut + yaban mersini + 2 tam ceviz</strong> bulundur. Kan şekerin düşmeden zihnin açık kalır!'
  }
};

// 2. PINTEREST MASONRY PINS DATA
const PINS_DATA = [
  {
    id: 'pin-1',
    type: 'recipe',
    category: 'icecek',
    categoryLabel: '🍵 Matcha & İçecek',
    size: 'pin-tall',
    title: 'Strawberry Cloud Iced Matcha Latte',
    desc: 'Kafein çarpıntısı yapmayan, antioksidan deposu çilek püreli estetik sabah ritüeli.',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    prepTime: '5 dk',
    kcal: '135 kcal',
    protein: '4g lif',
    ingredients: [
      '1 çay kaşığı seremonik derece toz matcha',
      '50 ml ılık su (80°C, kaynar olmamalı)',
      '4-5 adet taze çilek (çatalla ezilmiş)',
      '150 ml şekersiz badem veya yulaf sütü',
      'Bol buz & isteğe göre 1 çay kaşığı akçaağaç şurubu'
    ],
    steps: 'Çilekleri bardağın tabanında ezip buzları ekle. Üzerine bitkisel sütü dök. Ayrı bir kapta matcha tozunu ılık suyla köpürene kadar Bambu çırpıcı (veya süt köpürtücü) ile çırpıp bardağın en üstüne yavaşça ilave et.',
    dietitianTip: 'Sabah uyanır uyanmaz değil, kahvaltıdan 30-45 dakika sonra içersen demir emilimini korur ve öğleden sonra tatlı krizini %60 azaltırsın!'
  },
  {
    id: 'pin-2',
    type: 'recipe',
    category: 'kahvalti',
    categoryLabel: '🥣 Kahvaltı & Bowl',
    size: 'pin-medium',
    title: 'Tiramisu Overnight Oats (Yüksek Proteinli)',
    desc: 'Sabah 08:00 dersine veya işe yetişirken kavanozu kapıp çıkmalık, tatlı krizini kahvaltıda bitiren tarif.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    prepTime: '5 dk (Gece)',
    kcal: '340 kcal',
    protein: '19g protein',
    ingredients: [
      '4 yemek kaşığı ince öğütülmüş yulaf ezmesi',
      '1 tatlı kaşığı chia tohumu',
      '1 çay bardağı süt veya kefir',
      '1 fincan soğuk espresso veya filtre kahve (3 yemek kaşığı kullanılacak)',
      'Üzeri için: 2 yemek kaşığı labne veya süzme yoğurt + ham kakao tozu'
    ],
    steps: 'Yulaf, chia, süt ve kahveyi kavanozda karıştır. Üzerine süzme yoğurt katmanını yayıp buzdolabında gece boyu dinlendir. Sabah çıkmadan üzerine çay süzgeciyle kakao serp!',
    dietitianTip: 'Chia tohumu ve yulafın beta-glukan lifi sayesinde öğle yemeğine kadar kan şekerin dalgalanmaz.'
  },
  {
    id: 'pin-checklist',
    type: 'checklist',
    category: 'moodboard',
    categoryLabel: '💌 Günlük Rutin',
    size: 'pin-short',
    title: 'Bugünkü Glow Checklist ✨',
    habits: [
      { id: 'h1', label: 'Sabah uyanınca 1 büyük bardak su içildi 💧', checked: true },
      { id: 'h2', label: 'Tabakta en az 3 farklı renk besin var 🥗', checked: false },
      { id: 'h3', label: 'Aç karnına kahve yerine önce kahvaltı yapıldı 🍳', checked: false },
      { id: 'h4', label: '20 dakika açık hava yürüyüşü / esneme 👟', checked: false }
    ]
  },
  {
    id: 'pin-3',
    type: 'recipe',
    category: 'tatli',
    categoryLabel: '🍫 Suçluluksuz Tatlı',
    size: 'pin-tall',
    title: 'Fırınlanmadan 3 Malzemeli Brownie Topları',
    desc: 'Vize haftası ve PMS döneminde rafine şekersiz, yoğun çikolata hissiyatlı kurtarıcı atıştırmalık.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    prepTime: '10 dk',
    kcal: '95 kcal / adet',
    protein: 'Doğal Lif',
    ingredients: [
      '8 adet yumuşak Medine veya Kudüs hurması (çekirdeksiz)',
      '1 su bardağı çiğ ceviz veya fındık içi',
      '2 tepeleme yemek kaşığı ham kakao',
      '1 tutam deniz tuzu & vanilya özütü'
    ],
    steps: 'Tüm malzemeleri mutfak robotunda hamur kıvamına gelene kadar çek. Ceviz büyüklüğünde toplar yuvarla, dışını kakaoya veya toz Antep fıstığına bula.',
    dietitianTip: 'Hurmanın lifi ile cevizin omega-3 yağ asitleri birleştiğinde şekerin kana karışma hızı yavaşlar; 2 top kahve yanında harika bir ara öğündür.'
  },
  {
    id: 'pin-4',
    type: 'recipe',
    category: 'tuzlu',
    categoryLabel: '🥑 Pratik Öğün',
    size: 'pin-medium',
    title: 'Green Goddess Avokado & Poşe Yumurta Tost',
    desc: 'Pazar brunch’ı estetiğinde, sağlıklı yağ ve kaliteli protein dengeli ekşi maya tost.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    prepTime: '8 dk',
    kcal: '365 kcal',
    protein: '16g protein',
    ingredients: [
      '1 kalın dilim kızarmış ekşi mayalı tam buğday ekmeği',
      'Yarım olgun avokado',
      '1 yemek kaşığı lor peyniri veya süzme peynir',
      '1 adet poşe veya kayısı haşlanmış yumurta',
      'Üzeri için: Çörek otu, pul biber ve mikro filizler'
    ],
    steps: 'Avokadoyu limon suyu ve lor peyniriyle ezip kızarmış ekmeğin üzerine sür. Üzerine yumurtayı yerleştirip baharatlarla servis et.',
    dietitianTip: 'Ekşi maya ekmeği fermente yapısı sayesinde şişkinlik yapmaz ve bağırsak mikrobiyotası için çok daha naziktir.'
  },
  {
    id: 'pin-quote-1',
    type: 'quote',
    category: 'moodboard',
    categoryLabel: '💌 Mindset',
    size: 'pin-short',
    quote: '“Bedenin bir yapboz değil; tek bir dilim pasta yedin diye bütün emeğin bozulmaz. Sadece bir sonraki öğününde rutinine sevgiyle geri dön.”',
    author: 'Dyt. Yaren • Sezgisel Beslenme Notları'
  },
  {
    id: 'pin-5',
    type: 'recipe',
    category: 'tuzlu',
    categoryLabel: '🥑 Pratik Öğün',
    size: 'pin-tall',
    title: 'Crispy Somon & Edamame Poke Bowl',
    desc: 'Hem cildini parlatan kolajen/omega-3 deposu hem de akşam yemeğinde 15 dakikada hazır restoran kasesi.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    prepTime: '15 dk',
    kcal: '460 kcal',
    protein: '32g protein',
    ingredients: [
      '120g küp doğranmış somon (veya ızgara tavuk/tofu)',
      '4 yemek kaşığı haşlanmış basmati pirinç veya kinoa',
      'Yarım su bardağı haşlanmış edamame (veya bezelye)',
      'İnce dilim salatalık, mor lahana ve havuç',
      'Sos: 1 tatlı kaşığı düşük sodyumlu soya sosu + susam yağı + lime'
    ],
    steps: 'Somon küplerini airfryer veya tavada 8 dakika çıtırlaştır. Kaseye taban olarak kinoayı koy, etrafına renkli sebzeleri ve somonu dizip susam serp.',
    dietitianTip: 'Haftada 2 kez somon veya yağlı balık tüketmek cilt bariyerini güçlendirir ve sınav dönemlerinde hafızayı destekler.'
  },
  {
    id: 'pin-6',
    type: 'recipe',
    category: 'tatli',
    categoryLabel: '🍫 Suçluluksuz Tatlı',
    size: 'pin-medium',
    title: 'Donuk Yoğurt & Orman Meyveli Bark (Çıtır Bar)',
    desc: 'Buzlukta her an hazır bekleyen, dondurma yerine geçen ferah ve probiyotik atıştırmalık.',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=800&q=80',
    prepTime: '5 dk + Dondurma',
    kcal: '140 kcal / porsiyon',
    protein: '9g protein',
    ingredients: [
      '1.5 su bardağı süzme yoğurt',
      '1 yemek kaşığı bal veya elma suyu konsantresi',
      '1 avuç yaban mersini ve dilimlenmiş çilek',
      '1 yemek kaşığı şekersiz fıstık ezmesi',
      '1 yemek kaşığı kabak çekirdeği içi'
    ],
    steps: 'Yağlı kağıt serili tepsiye balla çırptığın yoğurdu 1 cm kalınlığında yay. Üzerine fıstık ezmesi gezdirip meyveleri diz. Buzlukta 2 saat dondurup kırarak tüket!',
    dietitianTip: 'Gece dizi izlerken bir şeyler kıtırdatma isteği geldiğinde paketli dondurma yerine en iyi probiyotik alternatiftir.'
  },
  {
    id: 'pin-7',
    type: 'recipe',
    category: 'icecek',
    categoryLabel: '🍵 Matcha & İçecek',
    size: 'pin-short',
    title: 'Ödem Atıcı Ananas & Nane Glow Smoothie',
    desc: 'Uzun yolculuklar, uykusuz geceler veya regl öncesi ödemini hızla hafifleten bromelain iksiri.',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80',
    prepTime: '4 dk',
    kcal: '115 kcal',
    protein: 'Yüksek Enzim',
    ingredients: [
      '2 halka taze veya donuk ananas',
      '1 adet küçük salatalık',
      '6-7 yaprak taze nane ve bir tutam maydanoz',
      'Yarım limonun suyu & 1 bardak hindistan cevizi suyu (veya su)'
    ],
    steps: 'Tüm malzemeleri blenderda pürüzsüz olana dek çek ve bekletmeden taze olarak tüket.',
    dietitianTip: 'Ananasın özellikle orta sert kısmında bulunan bromelain enzimi sindirimi hızlandırır ve dokulardaki ödemin atılmasına yardımcı olur.'
  },
  {
    id: 'pin-8',
    type: 'recipe',
    category: 'kahvalti',
    categoryLabel: '🥣 Kahvaltı & Bowl',
    size: 'pin-medium',
    title: 'Muzlu & Yulaflı Puff Pancake Kulesi',
    desc: 'Un yok, rafine şeker yok! Sadece blenderda 2 dakikada çırpıp tavaya dökülen puf puf pazar kahvaltısı.',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    prepTime: '12 dk',
    kcal: '310 kcal',
    protein: '15g protein',
    ingredients: [
      '1 adet olgun yerli muz',
      '1 adet yumurta',
      '4 yemek kaşığı yulaf ezmesi',
      '2 yemek kaşığı süt, yarım çay kaşığı kabartma tozu ve tarçın'
    ],
    steps: 'Malzemeleri blenderdan geçir. Yapışmaz tavada kısık ateşte arkalı önlü pişir. Üzerine taze meyveler ve tahin-pekmez ikilisiyle servis et.',
    dietitianTip: 'Tarçın insülin duyarlılığını artırır; tatlı kahvaltı yaptığında bile öğleden sonra uyku basmasını engeller.'
  }
];

// 3. STATE MANAGEMENT (SAVED PINS IN LOCALSTORAGE)
let savedPinIds = [];
try {
  const stored = localStorage.getItem('dyt_yaren_saved_pins');
  savedPinIds = stored ? JSON.parse(stored) : ['pin-1', 'pin-2'];
} catch (err) {
  savedPinIds = ['pin-1', 'pin-2'];
}

let activeFilter = 'all';
let searchQuery = '';

// DOM Elements
const masonryGrid = document.getElementById('masonryGrid');
const filterBar = document.getElementById('filterBar');
const pinSearchInput = document.getElementById('pinSearchInput');
const savedPinCountEl = document.getElementById('savedPinCount');
const pinModal = document.getElementById('pinModal');
const modalContent = document.getElementById('modalContent');
const closeModalBtn = document.getElementById('closeModalBtn');
const savedDrawerBackdrop = document.getElementById('savedDrawerBackdrop');
const savedDrawerList = document.getElementById('savedDrawerList');
const openSavedDrawerBtn = document.getElementById('openSavedDrawerBtn');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const toastContainer = document.getElementById('toastContainer');

// 4. TOAST HELPER
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2800);
}

// 5. SAVE / UNSAVE PIN LOGIC
function saveStateToStorage() {
  try {
    localStorage.setItem('dyt_yaren_saved_pins', JSON.stringify(savedPinIds));
  } catch (e) {
    // ignore storage errors
  }
  savedPinCountEl.textContent = savedPinIds.length;
  renderSavedDrawer();
}

function togglePinSave(pinId, event) {
  if (event) event.stopPropagation();
  const idx = savedPinIds.indexOf(pinId);
  const pinObj = PINS_DATA.find((p) => p.id === pinId);
  if (idx > -1) {
    savedPinIds.splice(idx, 1);
    showToast(`"${pinObj ? pinObj.title : 'Pin'}" panondan çıkarıldı.`);
  } else {
    savedPinIds.push(pinId);
    showToast(`📌 "${pinObj ? pinObj.title : 'Pin'}" Wellness Panona kaydedildi!`);
  }
  saveStateToStorage();
  renderMasonryBoard();
}

// 6. RENDER PINTEREST MASONRY BOARD
function renderMasonryBoard() {
  const query = searchQuery.trim().toLowerCase();

  const filtered = PINS_DATA.filter((item) => {
    const matchesCategory = activeFilter === 'all' || item.category === activeFilter;
    if (!matchesCategory) return false;
    if (!query) return true;

    const haystack = [
      item.title || '',
      item.desc || '',
      item.quote || '',
      item.categoryLabel || '',
      ...(item.ingredients || [])
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  });

  if (filtered.length === 0) {
    masonryGrid.innerHTML = `
      <div class="pin-card pin-quote-card" style="column-span: all; text-align: center; padding: 2.5rem;">
        <p style="font-size: 1.2rem; margin-bottom: 0.5rem;">Aradığın kriterde bir pin bulamadık 🍵</p>
        <p style="color: var(--ink-muted); font-size: 0.9rem;">Farklı bir kelime (örn. "matcha", "yulaf", "protein") deneyebilir veya "Tümü" sekmesine dönebilirsin.</p>
      </div>
    `;
    return;
  }

  masonryGrid.innerHTML = filtered
    .map((item) => {
      const isSaved = savedPinIds.includes(item.id);

      // Checklist Pin
      if (item.type === 'checklist') {
        const doneCount = item.habits.filter((h) => h.checked).length;
        return `
          <article class="pin-card pin-checklist-card" data-id="${item.id}">
            <div class="checklist-header">
              <h3 class="checklist-title">${item.title}</h3>
              <span class="checklist-progress" id="checklistBadge">${doneCount}/${item.habits.length} tamam</span>
            </div>
            <ul class="habit-list">
              ${item.habits
                .map(
                  (h, i) => `
                <li class="habit-item">
                  <label>
                    <input type="checkbox" data-habit-idx="${i}" ${h.checked ? 'checked' : ''} />
                    <span>${h.label}</span>
                  </label>
                </li>
              `
                )
                .join('')}
            </ul>
          </article>
        `;
      }

      // Quote Pin
      if (item.type === 'quote') {
        return `
          <article class="pin-card pin-quote-card" data-id="${item.id}">
            <div class="quote-mark">“</div>
            <blockquote>${item.quote.replace(/“|”/g, '')}</blockquote>
            <div class="pin-footer" style="border-top-color: rgba(60,84,56,0.18);">
              <span class="pin-author">${item.author}</span>
              <button class="pin-save-btn ${isSaved ? 'saved' : ''}" data-save-id="${item.id}">
                ${isSaved ? '✓ Kaydedildi' : '📌 Pinle'}
              </button>
            </div>
          </article>
        `;
      }

      // Recipe Pin
      return `
        <article class="pin-card ${item.size}" data-open-id="${item.id}">
          <div class="pin-media">
            <img src="${item.image}" alt="${item.title}" loading="lazy" />
            <div class="pin-overlay">
              <div class="pin-top-bar">
                <span class="pin-category-badge">${item.categoryLabel}</span>
                <button class="pin-save-btn ${isSaved ? 'saved' : ''}" data-save-id="${item.id}">
                  ${isSaved ? '✓ Panoda' : '📌 Pinle'}
                </button>
              </div>
              <div class="pin-bottom-bar">
                <span class="pin-meta-pill">⏱ ${item.prepTime}</span>
                <span class="pin-meta-pill">🔥 ${item.kcal}</span>
                <span class="pin-meta-pill">✨ ${item.protein}</span>
              </div>
            </div>
          </div>
          <div class="pin-body">
            <h3 class="pin-title">${item.title}</h3>
            <p class="pin-desc">${item.desc}</p>
            <div class="pin-footer">
              <span class="pin-author">🌿 Dyt. Yaren</span>
              <span>Tarifi Aç →</span>
            </div>
          </div>
        </article>
      `;
    })
    .join('');

  // Attach Event Listeners to rendered cards
  masonryGrid.querySelectorAll('[data-save-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-save-id');
      togglePinSave(id, e);
    });
  });

  masonryGrid.querySelectorAll('[data-open-id]').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-save-id]')) return;
      const id = card.getAttribute('data-open-id');
      openRecipeModal(id);
    });
  });

  // Checklist habit toggles
  masonryGrid.querySelectorAll('[data-habit-idx]').forEach((checkbox) => {
    checkbox.addEventListener('change', (e) => {
      const idx = parseInt(checkbox.getAttribute('data-habit-idx'), 10);
      const checklistPin = PINS_DATA.find((p) => p.id === 'pin-checklist');
      if (checklistPin && checklistPin.habits[idx]) {
        checklistPin.habits[idx].checked = e.target.checked;
        const doneCount = checklistPin.habits.filter((h) => h.checked).length;
        const badge = document.getElementById('checklistBadge');
        if (badge) badge.textContent = `${doneCount}/${checklistPin.habits.length} tamam`;
        if (doneCount === checklistPin.habits.length) {
          showToast('🎉 Harikasın! Bugünkü tüm Glow rutinlerini tamamladın!');
        }
      }
    });
  });
}

// 7. RECIPE DETAIL MODAL
function openRecipeModal(pinId) {
  const item = PINS_DATA.find((p) => p.id === pinId);
  if (!item || item.type !== 'recipe') return;

  const isSaved = savedPinIds.includes(item.id);

  modalContent.innerHTML = `
    <div class="modal-img-col">
      <img src="${item.image}" alt="${item.title}" />
    </div>
    <div class="modal-info-col">
      <div>
        <span class="eyebrow">${item.categoryLabel}</span>
        <h2 id="modalTitle" style="font-family: var(--font-serif); font-size: 2.1rem; line-height: 1.1; margin-bottom: 0.4rem;">
          ${item.title}
        </h2>
        <p style="color: var(--ink-body); font-size: 0.92rem;">${item.desc}</p>
      </div>

      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <span class="cred-pill">⏱ Hazırlık: ${item.prepTime}</span>
        <span class="cred-pill">🔥 Enerji: ${item.kcal}</span>
        <span class="cred-pill">💪 Besin: ${item.protein}</span>
      </div>

      <div>
        <h4 style="font-size: 0.92rem; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--matcha-dark);">
          🛒 Malzemeler (Üzerine tıklayarak işaretle)
        </h4>
        <ul class="modal-ingredients">
          ${item.ingredients
            .map(
              (ing) => `
            <li>
              <label>
                <input type="checkbox" />
                <span>${ing}</span>
              </label>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <div>
        <h4 style="font-size: 0.92rem; margin-bottom: 0.35rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--matcha-dark);">
          👩‍🍳 Hazırlanışı
        </h4>
        <p style="font-size: 0.9rem; color: var(--ink-body);">${item.steps}</p>
      </div>

      <div class="modal-tip-box">
        <strong style="display:block; margin-bottom: 0.2rem; color: var(--matcha-dark);">🍵 Dyt. Yaren’in Tüyosu</strong>
        <span>${item.dietitianTip}</span>
      </div>

      <div style="display: flex; gap: 0.75rem; margin-top: auto; padding-top: 0.5rem;">
        <button class="btn btn-primary" id="modalSavePinBtn" style="flex: 1;">
          ${isSaved ? '✓ Wellness Panomda Kayıtlı' : '📌 Kendi Panoma Kaydet'}
        </button>
      </div>
    </div>
  `;

  const modalSaveBtn = document.getElementById('modalSavePinBtn');
  if (modalSaveBtn) {
    modalSaveBtn.addEventListener('click', () => {
      togglePinSave(item.id);
      openRecipeModal(item.id);
    });
  }

  pinModal.classList.add('open');
  pinModal.setAttribute('aria-hidden', 'false');
}

function closeRecipeModal() {
  pinModal.classList.remove('open');
  pinModal.setAttribute('aria-hidden', 'true');
}

closeModalBtn.addEventListener('click', closeRecipeModal);
pinModal.addEventListener('click', (e) => {
  if (e.target === pinModal) closeRecipeModal();
});

// 8. SAVED PINS DRAWER ("BENİM WELLNESS PANOM")
function renderSavedDrawer() {
  if (savedPinIds.length === 0) {
    savedDrawerList.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--ink-muted);">
        <p style="font-size: 2rem; margin-bottom: 0.5rem;">📌</p>
        <p style="font-weight: 600; color: var(--ink-dark); margin-bottom: 0.3rem;">Panon henüz boş</p>
        <p style="font-size: 0.86rem;">Pinterest panosundaki tariflerin üzerinde bulunan "📌 Pinle" butonuna tıklayarak favori tariflerini buraya toplayabilirsin.</p>
      </div>
    `;
    return;
  }

  const items = savedPinIds
    .map((id) => PINS_DATA.find((p) => p.id === id))
    .filter(Boolean);

  savedDrawerList.innerHTML = items
    .map((item) => {
      const thumb =
        item.image ||
        'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=300&q=80';
      return `
        <div class="saved-item-card" data-drawer-open="${item.id}" style="cursor: pointer;">
          <img src="${thumb}" alt="${item.title || 'Motivasyon Notu'}" />
          <div class="saved-item-info">
            <h4>${item.title || 'Sezgisel Beslenme Notu'}</h4>
            <span>${item.categoryLabel} ${item.kcal ? '• ' + item.kcal : ''}</span>
          </div>
          <button class="remove-pin-btn" data-remove-id="${item.id}" aria-label="Kaldır">Sil</button>
        </div>
      `;
    })
    .join('');

  savedDrawerList.querySelectorAll('[data-remove-id]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-remove-id');
      togglePinSave(id, e);
    });
  });

  savedDrawerList.querySelectorAll('[data-drawer-open]').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-drawer-open');
      const item = PINS_DATA.find((p) => p.id === id);
      if (item && item.type === 'recipe') {
        savedDrawerBackdrop.classList.remove('open');
        openRecipeModal(id);
      }
    });
  });
}

openSavedDrawerBtn.addEventListener('click', () => {
  renderSavedDrawer();
  savedDrawerBackdrop.classList.add('open');
  savedDrawerBackdrop.setAttribute('aria-hidden', 'false');
});

closeDrawerBtn.addEventListener('click', () => {
  savedDrawerBackdrop.classList.remove('open');
  savedDrawerBackdrop.setAttribute('aria-hidden', 'true');
});

savedDrawerBackdrop.addEventListener('click', (e) => {
  if (e.target === savedDrawerBackdrop) {
    savedDrawerBackdrop.classList.remove('open');
  }
});

// 9. FILTER & SEARCH CONTROLS
filterBar.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    filterBar.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeFilter = chip.getAttribute('data-filter');
    renderMasonryBoard();
  });
});

pinSearchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderMasonryBoard();
});

// 10. HERO MOOD MATCHER INTERACTION
document.querySelectorAll('.mood-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    document.querySelectorAll('.mood-pill').forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    const moodKey = pill.getAttribute('data-mood');
    const data = MOOD_DATA[moodKey];
    if (data) {
      document.getElementById('moodIcon').textContent = data.icon;
      document.getElementById('moodTag').textContent = data.tag;
      document.getElementById('moodText').innerHTML = data.text;
    }
  });
});

// 11. WELLNESS & GLOW CALCULATOR
function updateWellnessCalculator() {
  const age = parseFloat(document.getElementById('calcAge').value) || 23;
  const height = parseFloat(document.getElementById('calcHeight').value) || 166;
  const weight = parseFloat(document.getElementById('calcWeight').value) || 62;
  const activity = parseFloat(document.getElementById('calcActivity').value) || 1.375;
  const goal = document.getElementById('calcGoal').value;

  // Mifflin-St Jeor (female baseline for target demographic)
  const bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  let tdee = Math.round(bmr * activity);

  let targetCalories = tdee;
  let goalLabel = 'Enerji koruma ve sezgisel denge ritmi';

  if (goal === 'lose') {
    targetCalories = Math.max(1350, tdee - 320);
    goalLabel = 'Kas kaybı olmadan nazik yağ yakımı açığı ✨';
  } else if (goal === 'tone') {
    targetCalories = tdee + 120;
    goalLabel = 'Sıkılaşma ve kas onarımı odaklı enerji 💪';
  }

  // Water calculation (35ml per kg)
  const waterLiters = ((weight * 35) / 1000).toFixed(1);
  const glasses = Math.round((weight * 35) / 240);

  // Macros
  const proteinGrams = Math.round((targetCalories * 0.25) / 4);
  const fatGrams = Math.round((targetCalories * 0.3) / 9);
  const carbGrams = Math.round((targetCalories * 0.45) / 4);

  // BMI & Holistic Note
  const heightM = height / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);
  let bmiNote = '';
  if (bmi < 18.5) {
    bmiNote = `BKİ değerin (${bmi}) narin aralıkta. Kısıtlayıcı listeler yerine sağlıklı yağlar (avokado, tahin, ceviz) ve kuvvet egzersizleriyle enerjini yükseltmeye odaklanalım 🌿`;
  } else if (bmi <= 24.9) {
    bmiNote = `BKİ değerin (${bmi}) ideal dengede! Tartıdaki sayıya takılmak yerine tabaklarında protein + lif dengesini kurarak ödem atabilir ve gün boyu enerjik hissedebilirsin ✨`;
  } else {
    bmiNote = `BKİ değerin (${bmi}). Hiçbir besini yasaklamadan, kan şekerini dengeleyen doyurucu tabaklar ve akşam yürüyüşleriyle haftada 0.5 - 1 kg arası kalıcı incelme sağlayabiliriz 🍵`;
  }

  document.getElementById('resCalories').textContent = `${targetCalories.toLocaleString('tr-TR')} kcal`;
  document.getElementById('resGoalLabel').textContent = goalLabel;
  document.getElementById('resWater').textContent = `${waterLiters} Litre`;
  document.getElementById('resWaterGlasses').textContent = `💧 Günde yaklaşık ${glasses} su bardağı + 1 bitki çayı`;
  document.getElementById('resProtein').textContent = `${proteinGrams}g`;
  document.getElementById('resFat').textContent = `${fatGrams}g`;
  document.getElementById('resCarb').textContent = `${carbGrams}g`;
  document.getElementById('resBmiNote').textContent = bmiNote;
}

document.getElementById('calculateBtn').addEventListener('click', () => {
  updateWellnessCalculator();
  showToast('✨ Kişisel Glow & Denge kartın güncellendi!');
});

['calcAge', 'calcHeight', 'calcWeight', 'calcActivity', 'calcGoal'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', updateWellnessCalculator);
    el.addEventListener('change', updateWellnessCalculator);
  }
});

// 12. PACKAGE SELECTION & BOOKING FORM
document.querySelectorAll('.select-package-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const pkg = btn.getAttribute('data-package');
    const selectEl = document.getElementById('clientProgram');
    if (selectEl && pkg) {
      selectEl.value = pkg;
    }
    const bookingSection = document.getElementById('randevu');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`💌 "${pkg}" seçildi! Formu doldurarak ön görüşmeni oluşturabilirsin.`);
  });
});

document.getElementById('bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('clientName').value.trim();
  const program = document.getElementById('clientProgram').value;
  showToast(`🍵 Teşekkürler ${name}! "${program}" için talebin alındı.`);
  e.target.reset();
});

// Escape key closes modals
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeRecipeModal();
    savedDrawerBackdrop.classList.remove('open');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Initialize on page load
saveStateToStorage();
renderMasonryBoard();
updateWellnessCalculator();
