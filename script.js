let user = JSON.parse(localStorage.getItem('user')) || null;
let cart = [];
let orders = JSON.parse(localStorage.getItem('allOrders')) || [];

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
  const paymentMethod = document.getElementById('paymentMethod').value;
  const transactionId = document.getElementById('transactionId').value || 'N/A';
  const order = {
    id: Date.now(),
    user: user.username,
    items: [...cart],
    status: 'pending',
    payment: paymentMethod,
    txn: transactionId
  };
  orders.push(order);
  localStorage.setItem('allOrders', JSON.stringify(orders));
  user.orders.push(order);
  localStorage.setItem('user', JSON.stringify(user));
  alert('Order placed successfully');
  cart = [];
  showCart();
  showOrders();
  showAdminOrders();
}

function showOrders() {
  const history = document.getElementById('orderHistory');
  if (!user || !user.orders) return;
  history.innerHTML = '';
  user.orders.forEach(order => {
    const li = document.createElement('li');
    li.textContent = `${order.items.length} item(s), Payment: ${order.payment}, Status: ${order.status}`;
    history.appendChild(li);
  });
}

function showAdminOrders() {
  const adminOrders = document.getElementById('adminOrders');
  if (!adminOrders) return;
  adminOrders.innerHTML = '';
  orders.forEach(order => {
    const li = document.createElement('li');
    li.innerHTML = `<b>${order.user}</b>: ${order.items.length} items | Payment: ${order.payment} | Txn: ${order.txn} | Status: ${order.status} 
      <button onclick="updateStatus(${order.id}, 'accepted')">Accept</button>
      <button onclick="updateStatus(${order.id}, 'cancelled')">Cancel</button>`;
    adminOrders.appendChild(li);
  });
}

function updateStatus(orderId, status) {
  orders = orders.map(order => {
    if (order.id === orderId) order.status = status;
    return order;
  });
  localStorage.setItem('allOrders', JSON.stringify(orders));
  showAdminOrders();
  showOrders();
}
