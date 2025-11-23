(function () {

  const PRODUCTS = [
    { id: 1, title: "Handcrafted Terracotta Vase", category: "Handicrafts", price: 499, desc: "Decorative handmade terracotta vase", featured: true },
    { id: 2, title: "Traditional Bandhani Fabric", category: "Textiles", price: 799, desc: "Authentic Bandhani printed textile" },
    { id: 3, title: "Organic Millet Cookies", category: "Bakery", price: 299, desc: "Fresh organic millet cookies", featured: true },
    { id: 4, title: "Handcrafted Bamboo Flute", category: "Musical instruments", price: 349, desc: "Traditional crafted bamboo flute" },
    { id: 5, title: "Clay Festival Diyas (Pack of 6)", category: "Handicrafts", price: 199, desc: "Handmade clay diya set", featured: true },
    { id: 6, title: "Handwoven Cotton Shawl", category: "Textiles", price: 999, desc: "Soft hand-woven winter cotton shawl" }
  ];

  localStorage.setItem("dd_products", JSON.stringify(PRODUCTS));

  const featuredWrap = document.getElementById("homeProducts");

  function render(list, container) {
    container.innerHTML = "";
    list.forEach(p => {
      const card = document.createElement("div");
      card.className = "product";
      card.innerHTML = `
        <h4>${p.title}</h4>
        <p class="meta">${p.category}</p>
        <p class="desc">${p.desc}</p>
        <div class="price">₹${p.price}</div>
        <div class="actions">
          <button class="btn primary add" data-id="${p.id}">Add to cart</button>
          <button class="icon-like wish" data-id="${p.id}">🤍</button>
          <button class="btn ghost review" data-id="${p.id}">Review</button>
        </div>
      `;
      container.appendChild(card);
    });

    // Add to cart
    container.querySelectorAll(".add").forEach(btn =>
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const cart = JSON.parse(localStorage.getItem("dd_cart") || "{}");
        const item = cart[id] || { id: +id, qty: 0 };
        item.qty++;
        cart[id] = item;
        localStorage.setItem("dd_cart", JSON.stringify(cart));
        document.querySelectorAll("#navCartCount,#navCartCount2,#navCartCount3")
          .forEach(x => x.textContent = Object.values(cart).reduce((s, i) => s + i.qty, 0));
        alert("Added to cart");
      })
    );

    // Wishlist
    container.querySelectorAll(".wish").forEach(btn =>
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        const w = JSON.parse(localStorage.getItem("dd_wishlist") || "{}");
        if (w[id]) { delete w[id]; btn.textContent = '🤍'; }
        else { w[id] = true; btn.textContent = '💛'; }
        localStorage.setItem("dd_wishlist", JSON.stringify(w));
      })
    );

    // Review button
    container.querySelectorAll(".review").forEach(btn =>
      btn.addEventListener("click", () => {
        const id = +btn.dataset.id;
        localStorage.setItem("desi_review_id", id);
        window.location.href = "review.html";
      })
    );
  }

  render(PRODUCTS.filter(p => p.featured), featuredWrap);

})();
