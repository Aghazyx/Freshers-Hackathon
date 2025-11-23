document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const sellerExtras = document.getElementById('sellerExtras');
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');
  const radios = document.getElementsByName('role');

  // Toggle forms
  signupBtn.addEventListener('click', () => {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
  });

  loginBtn.addEventListener('click', () => {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
  });

  // Show/hide Seller fields dynamically
  Array.from(radios).forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'Seller' && radio.checked) {
        sellerExtras.style.display = 'block';
        sellerExtras.querySelectorAll('input, textarea').forEach(f => f.setAttribute('required',''));
      } else if (radio.value === 'Buyer' && radio.checked) {
        sellerExtras.style.display = 'none';
        sellerExtras.querySelectorAll('input, textarea').forEach(f => f.removeAttribute('required'));
      }
    });
  });

  // Initialize display
  const selectedRole = document.querySelector('input[name="role"]:checked').value;
  if(selectedRole === 'Seller') {
    sellerExtras.style.display = 'block';
    sellerExtras.querySelectorAll('input, textarea').forEach(f => f.setAttribute('required',''));
  }

  // Sign up submit
  signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.querySelector('input[name="role"]:checked').value;
    const bizDesc = document.getElementById('bizDesc').value.trim();
    const shopAddr = document.getElementById('shopAddr').value.trim();

    if (!name || !email || !phone || !password || (role==='Seller' && (!bizDesc || !shopAddr))) {
      alert('Please fill all required fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('dd_users') || '[]');
    if(users.find(u=>u.name===name)) { alert('Name already exists'); return; }

    const user = { id:Date.now(), name, email, phone, password, role };
    if(role==='Seller'){ user.bizDesc = bizDesc; user.shopAddr = shopAddr; }

    users.push(user);
    localStorage.setItem('dd_users', JSON.stringify(users));
    alert('Account created! Redirecting to Home...');
    window.location.href = 'index.html';
  });

  // Log in submit
  loginForm.addEventListener('submit', e=>{
    e.preventDefault();
    const name = document.getElementById('loginName').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const users = JSON.parse(localStorage.getItem('dd_users')||'[]');
    const user = users.find(u=>u.name===name && u.password===password);
    if(!user){ alert('Invalid name or password'); return; }
    localStorage.setItem('dd_currentUser', JSON.stringify(user));
    alert('Login successful! Redirecting to Home...');
    window.location.href='index.html';
  });
});
