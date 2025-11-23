document.addEventListener('DOMContentLoaded', () => {
  const productId = localStorage.getItem('desi_review_product');
  const PRODUCTS = JSON.parse(localStorage.getItem('dd_products') || '[]');
  const REVIEWS = JSON.parse(localStorage.getItem('dd_reviews') || '{}');

  const product = PRODUCTS.find(p => p.id == productId);
  const productDiv = document.getElementById('productReview');
  const reviewsList = document.getElementById('reviewsList');

  if (product) {
    productDiv.innerHTML = `
      <h2>${product.title}</h2>
      <div class="meta">${product.shop} • ${product.category}</div>
      <img src="${product.img}" style="width:200px;border-radius:12px;margin-top:12px">
    `;
  }

  function renderReviews() {
    const list = REVIEWS[productId] || [];
    reviewsList.innerHTML = '';
    if (list.length === 0) {
      reviewsList.innerHTML = '<p>No reviews yet.</p>';
      return;
    }
    list.forEach(r => {
      const div = document.createElement('div');
      div.className = 'section-card';
      div.innerHTML = `<strong>Rating: ${'★'.repeat(r.rating)}</strong><p>${r.text}</p>`;
      reviewsList.appendChild(div);
    });
  }

  document.getElementById('submitReview').addEventListener('click', () => {
    const rating = document.getElementById('reviewRating').value;
    const text = document.getElementById('reviewText').value.trim();
    if (!text) { alert('Please write a review'); return; }
    if (!REVIEWS[productId]) REVIEWS[productId] = [];
    REVIEWS[productId].push({ rating, text });
    localStorage.setItem('dd_reviews', JSON.stringify(REVIEWS));
    document.getElementById('reviewText').value = '';
    renderReviews();
    alert('Review submitted!');
  });

  renderReviews();
});
