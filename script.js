/* ============================================================
   ЖАРА — FOOD DELIVERY  |  script.js
   ============================================================ */

'use strict';

/* ─── DATA ─── */
const UNS = 'https://images.unsplash.com/photo-';
const Q   = '?auto=format&fit=crop&w=500&q=80';

const MENU = [
  // PIZZA
  { id: 1,  cat: 'pizza',   emoji: '🍕', img: UNS+'1574071318508-1cdbab80d002'+Q, name: 'Маргарита',        desc: 'Томатный соус, моцарелла, базилик', price: 450, badge: null },
  { id: 2,  cat: 'pizza',   emoji: '🍕', img: UNS+'1628840042765-356cda07504e'+Q, name: 'Пепперони',         desc: 'Пикантная салями, моцарелла, орегано', price: 550, badge: 'hot' },
  { id: 3,  cat: 'pizza',   emoji: '🍕', img: UNS+'1565299624946-b28f40a0ae38'+Q, name: 'BBQ Чикен',         desc: 'Курица, соус BBQ, красный лук, кукуруза', price: 590, badge: 'hit' },
  { id: 4,  cat: 'pizza',   emoji: '🍕', img: UNS+'1513104890138-7c749659a591'+Q, name: 'Четыре сыра',       desc: 'Моцарелла, пармезан, чеддер, горгонзола', price: 640, badge: null },
  { id: 5,  cat: 'pizza',   emoji: '🍕', img: UNS+'1565958011703-44f9829ba187'+Q, name: 'Гавайская',         desc: 'Ветчина, ананас, моцарелла', price: 520, badge: null },
  { id: 6,  cat: 'pizza',   emoji: '🍕', img: UNS+'1511689660979-10d2b1afd49d'+Q, name: 'Грибная',           desc: 'Шампиньоны, трюфельный соус, пармезан', price: 480, badge: 'new' },

  // DRINKS
  { id: 7,  cat: 'drinks',  emoji: '🥤', img: UNS+'1622483767028-3f66f32aef97'+Q, name: 'Кола',              desc: 'Классическая, 0.5 л', price: 120, badge: null },
  { id: 8,  cat: 'drinks',  emoji: '🧃', img: UNS+'1621506289937-a8e4df240d0b'+Q, name: 'Апельсиновый сок',  desc: 'Свежевыжатый, 0.4 л', price: 160, badge: 'new' },
  { id: 9,  cat: 'drinks',  emoji: '🍋', img: UNS+'1556679343-c7306c1976bc'+Q,    name: 'Лимонад',           desc: 'Домашний, имбирь и мята', price: 180, badge: 'hit' },
  { id: 10, cat: 'drinks',  emoji: '☕', img: UNS+'1509042239860-f550ce710b93'+Q, name: 'Кофе латте',        desc: 'Двойной эспрессо, молоко', price: 200, badge: null },
  { id: 11, cat: 'drinks',  emoji: '💧', img: UNS+'1548839140-29a749e1cf4d'+Q,    name: 'Вода',              desc: 'Негазированная, 0.5 л', price: 80,  badge: null },
  { id: 12, cat: 'drinks',  emoji: '🧋', img: UNS+'1558618666-fcd25c85cd64'+Q,    name: 'Bubble Tea',        desc: 'Тайский чай, жемчуг тапиока', price: 250, badge: 'new' },

  // DESSERTS
  { id: 13, cat: 'desserts', emoji: '🍰', img: UNS+'1571877227200-a0d98ea607e9'+Q, name: 'Тирамису',          desc: 'Классический итальянский, маскарпоне', price: 290, badge: null },
  { id: 14, cat: 'desserts', emoji: '🧁', img: UNS+'1567171466153-0c53a7e9a6e1'+Q, name: 'Чизкейк',           desc: 'Нью-Йорк стайл, ягодный соус', price: 320, badge: 'hit' },
  { id: 15, cat: 'desserts', emoji: '🍫', img: UNS+'1606313564200-e75d5e30476c'+Q, name: 'Брауни',            desc: 'Шоколадный, с грецким орехом', price: 260, badge: null },
  { id: 16, cat: 'desserts', emoji: '🍦', img: UNS+'1488900128323-21503983a07e'+Q, name: 'Мороженое',         desc: 'Три шарика на выбор', price: 230, badge: null },

  // SNACKS
  { id: 17, cat: 'snacks',  emoji: '🍟', img: UNS+'1573080496219-bb964701c394'+Q, name: 'Картофель фри',     desc: 'Хрустящий, с соусом чили', price: 190, badge: null },
  { id: 18, cat: 'snacks',  emoji: '🧀', img: UNS+'1548943487-a2e4e43b4853'+Q,    name: 'Сырные палочки',    desc: 'Моцарелла во фритюре, соус маринара', price: 230, badge: 'hot' },
  { id: 19, cat: 'snacks',  emoji: '🍗', img: UNS+'1527477396000-e27163b481c2'+Q, name: 'Куриные крылья',    desc: '6 шт., Buffalo или BBQ', price: 350, badge: 'hit' },
  { id: 20, cat: 'snacks',  emoji: '🍗', img: UNS+'1562802378-063ec186a863'+Q,    name: 'Наггетсы',          desc: '8 шт., фирменный соус', price: 300, badge: null },
  { id: 21, cat: 'snacks',  emoji: '🥗', img: UNS+'1546793665-c74683f339c1'+Q,    name: 'Цезарь',            desc: 'Курица, пармезан, гренки, соус', price: 340, badge: 'new' },
  { id: 22, cat: 'snacks',  emoji: '🌮', img: UNS+'1551504734-5ee1c4a1479b'+Q,    name: 'Такос',             desc: '3 шт., говядина, авокадо, пико де гальо', price: 380, badge: 'new' },
];

const FREE_DELIVERY_THRESHOLD = 800;

/* ─── STATE ─── */
let cart = {};       // { id: { item, qty } }
let activeFilter = 'all';

/* ─── ELEMENTS ─── */
const cardsGrid    = document.getElementById('cardsGrid');
const cartBtn      = document.getElementById('cartBtn');
const cartCount    = document.getElementById('cartCount');
const cartPanel    = document.getElementById('cartPanel');
const cartOverlay  = document.getElementById('cartOverlay');
const cartClose    = document.getElementById('cartClose');
const cartBody     = document.getElementById('cartBody');
const cartEmpty    = document.getElementById('cartEmpty');
const cartItems    = document.getElementById('cartItems');
const cartFooter   = document.getElementById('cartFooter');
const cartTotalPrice = document.getElementById('cartTotalPrice');
const cartFreeFill = document.getElementById('cartFreeFill');
const cartFreeLabel = document.getElementById('cartFreeLabel');
const freeBarWrap  = document.getElementById('freeBarWrap');
const toast        = document.getElementById('toast');
const timerMin     = document.getElementById('timerMin');
const timerSec     = document.getElementById('timerSec');

/* ─── RENDER CARDS ─── */
function renderCards(filter) {
  const items = filter === 'all' ? MENU : MENU.filter(i => i.cat === filter);
  cardsGrid.innerHTML = '';

  items.forEach((item, idx) => {
    const card = document.createElement('div');
    card.className = 'food-card';
    card.style.animationDelay = `${idx * 0.05}s`;

    const badgeHTML = item.badge
      ? `<span class="card-badge badge-${item.badge}">${badgeLabel(item.badge)}</span>`
      : '';

    card.innerHTML = `
      <div class="card-img-wrap">
        <img
          class="card-img"
          src="${item.img}"
          alt="${item.name}"
          loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"
        />
        <span class="card-emoji-fb">${item.emoji}</span>
        ${badgeHTML}
      </div>
      <div class="card-body">
        <p class="card-name">${item.name}</p>
        <p class="card-desc">${item.desc}</p>
      </div>
      <div class="card-footer">
        <div>
          <span class="card-price">${item.price} ₽</span>
        </div>
        <button class="add-btn" data-id="${item.id}" aria-label="Добавить ${item.name}">+</button>
      </div>`;

    cardsGrid.appendChild(card);
  });
}

function badgeLabel(badge) {
  return { new: 'Новинка', hot: '🔥 Хит тепла', hit: '⭐ Хит' }[badge] || '';
}

/* ─── FILTER LOGIC ─── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderCards(activeFilter);
  });
});

/* ─── ADD TO CART (event delegation) ─── */
cardsGrid.addEventListener('click', e => {
  const btn = e.target.closest('.add-btn');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  const item = MENU.find(i => i.id === id);
  addToCart(item);

  /* ripple effect */
  btn.style.transform = 'scale(.85) rotate(0)';
  setTimeout(() => { btn.style.transform = ''; }, 200);

  showToast(`${item.emoji} ${item.name} добавлена в корзину`);
});

function addToCart(item) {
  if (cart[item.id]) {
    cart[item.id].qty++;
  } else {
    cart[item.id] = { item, qty: 1 };
  }
  updateCartUI();
}

/* ─── CART UI ─── */
function updateCartUI() {
  const entries = Object.values(cart);
  const totalQty = entries.reduce((s, e) => s + e.qty, 0);
  const totalPrice = entries.reduce((s, e) => s + e.item.price * e.qty, 0);

  /* badge */
  cartCount.textContent = totalQty;
  cartCount.classList.toggle('visible', totalQty > 0);

  /* empty/filled */
  const hasItems = entries.length > 0;
  cartEmpty.style.display = hasItems ? 'none' : 'flex';
  cartFooter.style.display = hasItems ? 'flex' : 'none';

  /* list */
  cartItems.innerHTML = '';
  entries.forEach(({ item, qty }) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.id = item.id;
    li.innerHTML = `
      <span class="cart-item-emoji">${item.emoji}</span>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${item.price * qty} ₽</p>
      </div>
      <div class="cart-qty">
        <button class="qty-btn qty-minus" data-id="${item.id}" aria-label="Убрать одну">−</button>
        <span class="qty-num">${qty}</span>
        <button class="qty-btn qty-plus" data-id="${item.id}" aria-label="Добавить одну">+</button>
      </div>`;
    cartItems.appendChild(li);
  });

  /* total */
  cartTotalPrice.textContent = `${totalPrice} ₽`;

  /* free delivery bar */
  const progress = Math.min(totalPrice / FREE_DELIVERY_THRESHOLD, 1);
  cartFreeFill.style.width = `${progress * 100}%`;
  if (totalPrice >= FREE_DELIVERY_THRESHOLD) {
    cartFreeLabel.textContent = '🎉 Бесплатная доставка!';
    cartFreeLabel.style.color = '#66bb6a';
  } else {
    const left = FREE_DELIVERY_THRESHOLD - totalPrice;
    cartFreeLabel.textContent = `Ещё ${left} ₽ до бесплатной доставки`;
    cartFreeLabel.style.color = '';
  }
}

/* ─── CART ITEM CONTROLS (event delegation) ─── */
cartItems.addEventListener('click', e => {
  const btn = e.target.closest('.qty-btn');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  if (btn.classList.contains('qty-plus')) {
    cart[id].qty++;
  } else {
    cart[id].qty--;
    if (cart[id].qty <= 0) delete cart[id];
  }
  updateCartUI();
});

/* ─── OPEN/CLOSE CART ─── */
function openCart() {
  cartPanel.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCart() {
  cartPanel.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCart();
});

/* ─── TOAST ─── */
let toastTimer = null;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

/* ─── DELIVERY TIMER (counts down, resets to random) ─── */
let timerSeconds = 28 * 60;

function randomDeliveryTime() {
  return (Math.floor(Math.random() * 12) + 22) * 60; // 22–33 minutes
}

function tickTimer() {
  timerSeconds--;
  if (timerSeconds <= 0) {
    timerSeconds = randomDeliveryTime();
  }
  const m = Math.floor(timerSeconds / 60);
  const s = timerSeconds % 60;
  timerMin.textContent = String(m).padStart(2, '0');
  timerSec.textContent = String(s).padStart(2, '0');
}

setInterval(tickTimer, 1000);

/* ─── INTERSECTION OBSERVER — animate on scroll ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeCards() {
  document.querySelectorAll('.food-card, .stat-card').forEach(el => {
    observer.observe(el);
  });
}

/* ─── HEADER SCROLL EFFECT ─── */
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 20
    ? '0 4px 32px rgba(0,0,0,.4)'
    : 'none';
}, { passive: true });

/* ─── SMOOTH SCROLL FOR NAV LINKS ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ─── INIT ─── */
renderCards('all');
observeCards();
