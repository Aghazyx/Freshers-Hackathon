// add-product.js
document.addEventListener('DOMContentLoaded', ()=>{
  const save = document.getElementById('saveProd');
  save.addEventListener('click', ()=>{
    const title = document.getElementById('pTitle').value.trim();
    const desc = document.getElementById('pDesc').value.trim();
    const price = Number(document.getElementById('pPrice').value);
    const cat = document.getElementById('pCat').value;
    const shop = document.getElementById('pShop').value.trim();
    const img = document.getElementById('pImg').value.trim() || 'assets/images/placeholder.jpg';
    if(!title||!desc||!price||!shop){ alert('Please fill required fields'); return; }
    const list = JSON.parse(localStorage.getItem('dd_products')||'[]');
    const id = Date.now();
    list.push({id,title,desc,price,category:cat,shop,img});
    localStorage.setItem('dd_products', JSON.stringify(list));
    alert('Product added (prototype).'); window.location.href = 'seller-dashboard.html';
  });
});
