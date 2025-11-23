// discover.js
(function(){
  const shops = [
    {name:'Ananya Handloom',cat:'Textiles',dist:'1.2 km',desc:'Handloom sarees & fabrics'},
    {name:"Rao's Bakrey",cat:'Bakery',dist:'800 m',desc:'Sweets & breads'},
    {name:'Majestic Musicals',cat:'Musical instruments',dist:'2.1 km',desc:'Tablas & flutes'},
    {name:'Village Crafts',cat:'Handicrafts',dist:'1.6 km',desc:'Earthenware & decor'}
  ];
  const el = document.getElementById('shopsList');
  if(!el) return;
  shops.forEach(s=>{
    const card = document.createElement('div'); card.className='shop-card';
    card.innerHTML = `<strong>${s.name}</strong><div class="muted">${s.cat} • ${s.dist}</div><p class="muted">${s.desc}</p>`;
    card.addEventListener('click', ()=>{ localStorage.setItem('desi_search_q', s.name); window.location.href = 'search.html'; });
    el.appendChild(card);
  });
  // update nav cart count from saved cart
  const cart = JSON.parse(localStorage.getItem('dd_cart')||'{}'); const count = Object.values(cart).reduce((s,i)=>s+(i.qty||0),0); document.querySelectorAll('#navCartCount2').forEach(x=>x.textContent = count);
})();
