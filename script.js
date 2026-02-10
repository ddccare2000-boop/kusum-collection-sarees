let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Added to cart");
}

function openWhatsApp() {
  let msg = "Hello Kusum Collection,%0AI want to order:%0A";
  let total = 0;

  cart.forEach(item => {
    msg += `- ${item.name} (₹${item.price})%0A`;
    total += item.price;
  });

  msg += `%0ATotal: ₹${total}`;

  window.open(
    "https://wa.me/919784620776?text=" + msg,
    "_blank"
  );
}

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
