let user = JSON.parse(localStorage.getItem('user')) || null;
let cart = [];

function updateUserInfo() {
  const userInfo = document.getElementById('userInfo');
  if (user) {
    userInfo.innerHTML = `👋 Welcome <b>${user.username}</b>! Email: ${user.email}`;
    showOrders();
  } else {
    userInfo.innerHTML = '';
    document.getElementById('orderHistory').innerHTML = '';
  }
}

document.getElementById('authForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  user = { username, email, password, orders: [] };
  localStorage.setItem('user', JSON.stringify(user));
  updateUserInfo();
  alert('Logged in successfully');
});

function addToCart(name, price) {
  cart.push({ name, price });
  alert(`${name} added to cart`);
  showCart();
}

function showCart() {
  const list = document.getElementById('cartItems');
  list.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ৳${item.price}`;
    list.appendChild(li);
  });
}

function placeOrder() {
  if (!user) return alert('Login first');
  if (cart.length === 0) return alert('Cart is empty');
  user.orders.push(...cart);
  localStorage.setItem('user', JSON.stringify(user));
  cart = [];
  alert('Order placed successfully');
  showCart();
  showOrders();
}

function showOrders() {
  if (!user || !user.orders) return;
  const history = document.getElementById('orderHistory');
  history.innerHTML = '';
  user.orders.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ৳${item.price}`;
    history.appendChild(li);
  });
}
