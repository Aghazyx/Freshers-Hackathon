// wishlist.js
(function(){
  const page = document.getElementById('wishlistPage');
  const wishlist = JSON.parse(localStorage.getItem('dd_wishlist')||'{}');
  const products = JSON.parse(localStorage.getItem('dd_products')||'[]');
  const ids = Object.keys(wishlist);
  if(ids.length === 0){ page.innerHTML = '<div class="section-card">No wishlist items yet.</div>'; return; }
  ids.forEach(id=>{
    const p = products.find(x=>x.id == id);
    const el = document.createElement('div'); el.className='section-card';
    el.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center"><div><strong>${p.title}</strong><div class="muted">${p.shop}</div></div><div><button class="btn primary addFromWish" data-id="${p.id}">Add to cart</button><button class="btn ghost remWish" data-id="${p.id}">Remove</button></div></div>`;
    page.appendChild(el);
  });
  document.querySelectorAll('.addFromWish').forEach(b=> b.addEventListener('click', ()=>{
    const id = b.dataset.id; const cart = JSON.parse(localStorage.getItem('dd_cart')||'{}'); cart[id] = cart[id] || {id:+id,qty:0}; cart[id].qty++; localStorage.setItem('dd_cart', JSON.stringify(cart)); alert('Added to cart');
  }));
  document.querySelectorAll('.remWish').forEach(b=> b.addEventListener('click', ()=>{
    const id = b.dataset.id; const w = JSON.parse(localStorage.getItem('dd_wishlist')||'{}'); delete w[id]; localStorage.setItem('dd_wishlist', JSON.stringify(w)); location.reload();
  }));
})();
