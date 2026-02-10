let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.innerText = cart.length;
}

function addToCart(name, price) {
  const found = cart.find(item => item.name === name);
  if (found) {
    found.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  saveCart();
  updateCartCount();
  alert("Added to cart");
}

/* CART PAGE */
function loadCartPage() {
  const cartPage = document.getElementById("cartPage");
  if (!cartPage) return;

  cartPage.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartPage.innerHTML += `
      <div class="cart-item">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <div class="qty">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
        <button class="remove" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText = total;
}

function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  saveCart();
  loadCartPage();
  updateCartCount();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  loadCartPage();
  updateCartCount();
}

/* WHATSAPP CHECKOUT */
function checkoutWhatsApp() {
  let msg = "Hello Kusum Collection,%0AI want to order:%0A";
  let total = 0;

  cart.forEach(item => {
    msg += `- ${item.name} x${item.qty} (₹${item.price * item.qty})%0A`;
    total += item.price * item.qty;
  });

  msg += `%0ATotal: ₹${total}`;
  window.open(
    "https://wa.me/919784620776?text=" + msg,
    "_blank"
  );
}

/* CATEGORY FILTER */
function filterItems(category) {
  const cards = document.querySelectorAll(".card");
  document.querySelectorAll(".categories button")
    .forEach(b => b.classList.remove("active"));

  event.target.classList.add("active");

  cards.forEach(card => {
    card.style.display =
      category === "all" || card.classList.contains(category)
        ? "block"
        : "none";
  });
}

updateCartCount();
loadCartPage();
