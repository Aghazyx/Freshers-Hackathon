(function(){
  const PRODUCTS = JSON.parse(localStorage.getItem('dd_products') || '[]');
  const CATEGORIES = ['All','Handicrafts','Textiles','Bakery','Musical instruments'];

  const catEl = document.getElementById('searchCategories');
  const results = document.getElementById('searchResults');
  const shown = document.getElementById('searchShown');
  const searchInput = document.getElementById('searchQ');
  const sortSelect = document.getElementById('searchSort');

  const CLASS_MAP = {
    'All': 'all',
    'Handicrafts': 'handicrafts',
    'Textiles': 'textiles',
    'Bakery': 'bakery',
    'Musical instruments': 'music'
  };

  let currentCategory = 'All';

  function renderCategories() {
    CATEGORIES.forEach(c => {
      const btn = document.createElement('button');
      btn.className = `chip ${CLASS_MAP[c]}`;
      btn.textContent = c;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.chip').forEach(x => x.classList.remove('active'));
        btn.classList.add('active');

        currentCategory = c;
        doSearch();
      });

      catEl.appendChild(btn);
    });

    const first = document.querySelector('.chip');
    if(first) first.classList.add('active');
  }

  function doSearch() {
    const input = searchInput.value.toLowerCase().trim();
    const catQuery = currentCategory.toLowerCase();

    let list = PRODUCTS.filter(p => {
      const matchesSearch = !input || p.title.toLowerCase().includes(input) ||
                             p.desc.toLowerCase().includes(input) ||
                             p.shop.toLowerCase().includes(input) ||
                             p.category.toLowerCase().includes(input);

      const matchesCategory = catQuery === 'all' || p.category.toLowerCase() === catQuery;

      return matchesSearch && matchesCategory;
    });

    const sort = sortSelect.value;
    if(sort === 'price_low') list.sort((a,b) => a.price - b.price);
    if(sort === 'price_high') list.sort((a,b) => b.price - a.price);

    renderList(list);
  }

  function renderList(list) {
    results.innerHTML = '';
    list.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product';
      card.innerHTML = `
        <h4>${p.title}</h4>
        <div class="meta">${p.shop} • ${p.category}</div>
        <div class="desc">${p.desc}</div>
        <div class="price">₹${p.price}</div>
        <div class="actions">
          <button class="btn primary add" data-id="${p.id}">Add to cart</button>
          <button class="icon-like wish" data-id="${p.id}">🤍</button>
          <button class="btn ghost review" data-id="${p.id}">Review</button>
        </div>`;
      results.appendChild(card);
    });

    shown.textContent = list.length;

    results.querySelectorAll('.add').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        const cart = JSON.parse(localStorage.getItem('dd_cart') || '{}');
        const it = cart[id] || {id: +id, qty: 0};
        it.qty++;
        cart[id] = it;
        localStorage.setItem('dd_cart', JSON.stringify(cart));
        document.querySelectorAll('#navCartCount3,#navCartCount,#navCartCount2').forEach(x => {
          x.textContent = Object.values(cart).reduce((s,i)=>s+(i.qty||0),0);
        });
        alert('Added to cart');
      });
    });

    results.querySelectorAll('.wish').forEach(b => {
      b.addEventListener('click', () => {
        const id = b.dataset.id;
        const w = JSON.parse(localStorage.getItem('dd_wishlist') || '{}');
        if(w[id]) { delete w[id]; b.textContent='🤍'; } 
        else { w[id] = true; b.textContent='💛'; }
        localStorage.setItem('dd_wishlist', JSON.stringify(w));
      });
    });

    results.querySelectorAll('.review').forEach(b => {
      b.addEventListener('click', () => {
        const id = +b.dataset.id;
        localStorage.setItem('desi_review_id', id);
        window.location.href = 'review.html';
      });
    });
  }

  searchInput.addEventListener('keypress', e => {
    if(e.key === 'Enter') doSearch();
  });
  document.getElementById('searchBtn').addEventListener('click', doSearch);
  sortSelect.addEventListener('change', doSearch);

  renderCategories();

  const pre = localStorage.getItem('desi_search_q');
  if(pre) {
    searchInput.value = pre;
    localStorage.removeItem('desi_search_q');
  }

  doSearch();

  const cart = JSON.parse(localStorage.getItem('dd_cart') || '{}');
  document.querySelectorAll('#navCartCount3,#navCartCount,#navCartCount2').forEach(x=>{
    x.textContent = Object.values(cart).reduce((s,i)=>s+(i.qty||0),0);
  });

})();
