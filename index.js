const products = [
    { id: 1, name: 'Web3x 1', amount: 10.99 },
    { id: 2, name: 'Web3X 2', amount: 20.49 },
    { id: 2, name: 'Web3X 3', amount: 30.49 },
    { id: 2, name: 'Web3X 4', amount: 40.49 },
    { id: 2, name: 'Web3x 5', amount: 50.49 },
    { id: 2, name: 'Web3X 6', amount: 60.49 },
    { id: 2, name: 'Web3X 7', amount: 70.49 },
    { id: 2, name: 'Web3X 8', amount: 80.49 },
    { id: 2, name: 'Web3X 9', amount: 90.49 },
    { id: 2, name: 'Web3X 10', amount: 100.49 }
   
  ];
  
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  function displayProducts() {
    const productsContainer = document.querySelector('.productsContainer');
  
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.classList.add('productCard');
      productCard.innerHTML = `
        <h4>${product.name}</h4>
        <p>$${product.amount.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
  
      productsContainer.appendChild(productCard);
    });
  }
  
  function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
  
    cart.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cartItem');
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <div>
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
        <span>$${(item.amount * item.quantity).toFixed(2)}</span>
      `;
  
      cartItemsContainer.appendChild(cartItem);
    });
  
    updateTotalAmount();
  }
  
  function updateTotalAmount() {
    const totalAmountElement = document.getElementById('totalAmount');
    const totalAmount = cart.reduce((total, item) => total + item.amount * item.quantity, 0);
    totalAmountElement.textContent = `Total Amount: $${totalAmount.toFixed(2)}`;
  }
  
  function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    const cartItem = cart.find(item => item.id === productId);
  
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ id: product.id, name: product.name, amount: product.amount, quantity: 1 });
    }
  
    updateLocalStorage();
    displayCart();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateLocalStorage();
    displayCart();
  }
  
  function increaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    cartItem.quantity += 1;
    updateLocalStorage();
    displayCart();
  }
  
  function decreaseQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
  
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      removeFromCart(productId);
    }
  
    updateLocalStorage();
    displayCart();
  }

  function handleError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
  
    // You can also consider adding a timeout to hide the error message after a few seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000); // 5000 milliseconds (5 seconds) timeout
  }
  
  document.getElementById('applyCoupon').addEventListener('click', () => {
    try {
      applyCoupon();
    } catch (error) {
      handleError(error.message);
    }
  });
  
  function applyCoupon() {
    const couponInput = document.getElementById('coupon');
    const couponCode = couponInput.value.trim();
  
    if (couponCode === 'WEB3BRIDGECOHORTx') {
      const totalAmount = cart.reduce((total, item) => total + item.amount * item.quantity, 0);
      const discount = totalAmount * 0.1;
      const discountedAmount = totalAmount - discount;
  
      document.getElementById('totalAmount').textContent = `Total Amount (After 10% Discount): $${discountedAmount.toFixed(2)}`;
    } else {
      alert('Invalid coupon code. Try again.');
    }
  
    couponInput.value = '';
  }
  
  function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  document.getElementById('applyCoupon').addEventListener('click', applyCoupon);
  
  displayProducts();
  displayCart();

  const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.type = 'text/css';
linkElement.href = 'styles.css';
document.head.appendChild(linkElement);