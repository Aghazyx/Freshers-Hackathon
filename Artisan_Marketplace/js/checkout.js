// checkout.js
document.addEventListener('DOMContentLoaded', ()=>{
  const cart = JSON.parse(localStorage.getItem('dd_cart')||'{}');
  const products = JSON.parse(localStorage.getItem('dd_products')||'[]');
  const container = document.getElementById('checkoutItems');
  const totalEl = document.getElementById('checkoutTotal');
  let total = 0;

  if(Object.keys(cart).length===0){
    container.innerHTML = '<div>No items in cart</div>';
    return;
  }

  Object.keys(cart).forEach(id=>{
    const item = cart[id]; 
    const prod = products.find(p=>p.id==id);
    const el = document.createElement('div');
    el.innerHTML = `<span>${prod.title} × ${item.qty}</span><span>₹${prod.price*item.qty}</span>`;
    container.appendChild(el);
    total += prod.price*item.qty;
  });

  totalEl.textContent = total;

  document.getElementById('payBtn').addEventListener('click', ()=>{
    const name = document.getElementById('cardName').value.trim();
    const number = document.getElementById('cardNumber').value.trim();
    const expiry = document.getElementById('expiry').value.trim();
    const cvv = document.getElementById('cvv').value.trim();

    if(!name||!number||!expiry||!cvv){
      alert('Please fill all payment details');
      return;
    }
    if(!/^\d{16}$/.test(number)){ alert('Card number must be 16 digits'); return; }
    if(!/^\d{2}\/\d{2}$/.test(expiry)){ alert('Expiry must be MM/YY'); return; }
    if(!/^\d{3,4}$/.test(cvv)){ alert('CVV must be 3 or 4 digits'); return; }

    alert('Payment successful! Thank you for your order.');
    localStorage.setItem('dd_cart','{}'); // clear cart after payment
    window.location.href = 'index.html';
  });
});
