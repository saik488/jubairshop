let user = JSON.parse(localStorage.getItem('user')) || null;
let cart = [];

function updateUserUI() {
  const userInfo = document.getElementById('userInfo');
  if (user) {
    userInfo.innerHTML = `<p>Logged in as: <strong>${user.username}</strong><br>Email: ${user.email}</p>`;
  } else {
    userInfo.innerHTML = '';
  }
}

document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  user = { username, email, password, orders: [] };
  localStorage.setItem('user', JSON.stringify(user));
  alert(`🎉 Logged in as ${username}`);
  updateUserUI();
});

function addToCart(name, price) {
  cart.push({ name, price });
  alert(`${name} added to cart!`);
  showCart();
}

function showCart() {
  const cartList = document.getElementById('cartItems');
  cartList.innerHTML = '';
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ৳${item.price}`;
    cartList.appendChild(li);
  });
}

function placeOrder() {
  if (!user) {
    alert('❌ Please login first!');
    return;
  }
  if (cart.length === 0) {
    alert('🛒 Your cart is empty!');
    return;
  }
  user.orders = [...(user.orders || []), ...cart];
  localStorage.setItem('user', JSON.stringify(user));
  alert('✅ Order placed successfully!');
  cart = [];
  showCart();
}
