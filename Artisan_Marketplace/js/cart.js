(function(){
  const page = document.getElementById('cartPage');
  let cart = JSON.parse(localStorage.getItem('dd_cart')||'{}');
  const products = JSON.parse(localStorage.getItem('dd_products')||'[]');

  function renderCart() {
    page.innerHTML = '';
    if(Object.keys(cart).length === 0) { 
      page.innerHTML = '<div class="section-card">Cart is empty</div>'; 
      return; 
    }

    let total = 0;

    Object.keys(cart).forEach(k=>{
      const it = cart[k]; 
      const p = products.find(x=>x.id == it.id);
      const el = document.createElement('div'); 
      el.className='section-card'; 
      el.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center; flex-wrap:wrap; gap:10px">
          <div>
            <strong>${p.title}</strong>
            <div class="muted">${p.shop || ''}</div>
          </div>
          <div style="display:flex; gap:8px; align-items:center;">
            <div>₹${p.price} × ${it.qty}</div>
            <button class="btn review-btn" data-id="${p.id}">Review</button>
            <button class="btn remove-btn" data-id="${p.id}">Remove</button>
          </div>
        </div>`;
      page.appendChild(el);
      total += p.price * it.qty;
    });

    const totalEl = document.createElement('div');
    totalEl.className = 'section-card';
    totalEl.innerHTML = `<strong>Total ₹${total}</strong>`;
    page.appendChild(totalEl);

    updateButtons();
  }

  function updateButtons() {
    // Remove button functionality
    document.querySelectorAll('.remove-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = btn.dataset.id;
        delete cart[id];
        localStorage.setItem('dd_cart', JSON.stringify(cart));
        renderCart();
      });
    });

    // Review button functionality
    document.querySelectorAll('.review-btn').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const id = +btn.dataset.id;
        localStorage.setItem('desi_review_id', id);
        window.location.href = 'review.html';
      });
    });
  }

  renderCart();

})();
