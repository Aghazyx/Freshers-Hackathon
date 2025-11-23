// seller-dashboard.js
(function(){
  const state = JSON.parse(localStorage.getItem('dd_products')||'[]').length ? JSON.parse(localStorage.getItem('dd_products')) : (window.DesiState && window.DesiState.products) || [];
  const modal = document.createElement('div');
  modal.id = 'modal'; modal.style.display='none'; document.body.appendChild(modal);
  const openBtn = document.getElementById('openAddProduct');
  const viewBtn = document.getElementById('viewMyProducts');
  const main = document.getElementById('sellerContent');

  function openAddProductForm(){
    // open add-product page instead of modal for clarity
    window.location.href = 'add-product.html';
  }
  function viewProducts(){
    const list = JSON.parse(localStorage.getItem('dd_products')||'[]');
    main.innerHTML = '';
    if(list.length===0) { main.innerHTML = '<div>No products yet</div>'; return; }
    list.forEach(p=>{
      const el = document.createElement('div'); el.className='section-card'; el.innerHTML = `<strong>${p.title}</strong><div class="muted">${p.shop} • ${p.category}</div><div style="text-align:right"><button class="btn ghost edit" data-id="${p.id}">Edit</button></div>`;
      main.appendChild(el);
    });
  }

  if(openBtn) openBtn.addEventListener('click', openAddProductForm);
  if(viewBtn) viewBtn.addEventListener('click', viewProducts);
})();
