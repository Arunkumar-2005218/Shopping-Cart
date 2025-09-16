
const products = [
    { id: 1, name: "Hertfoid Upholstered Chair", price: 101 ,img:"images/1.png " },
    { id: 2, name: "Abingdon Upholstered Chair", price: 151,img:"images/2.png" },
    { id: 3, name: "Jesses Minimore Modern Style", price: 181,img:"images/3.png" },
    { id: 4, name: "JJeses Minimore Modern Style", price: 204, img:"images/4.png"},
    { id: 5, name: "Bolanle Upholstered Armchair", price: 252,img:"images/5.png" },
    { id: 6, name: "Jaqueze Upholstered Armchair", price: 450, img:"images/6.png"},
    { id: 7, name: "Leston Wide Upholstered", price: 121, img:"images/7.png"},
    { id: 8, name: "Stephanny Wide Tufted", price: 220,img:"images/8.png" }
];
function searchProduct() {
  const query = document.getElementById("search").value.toLowerCase();
  let filters = products.filter(product =>
    product.name.toLowerCase().includes(query)
    
  );

  const productsContainer = document.querySelector('.products');
  productsContainer.innerHTML = '';

  filters.forEach(product => {
    const html = `
      <div class="product" data-id="${product.id}">
        <img src="${product.img}" alt="${product.name}" width="100" />
        <p class="name">${product.name}</p>
        <p class="price">${product.price}</p>
        <button class="button" onclick="addToCart('${product.name}', ${product.price}, '${product.img}')" >Add to Cart</button>
       
      </div>
    `;
    productsContainer.innerHTML += html;
     updateCartDisplay();
     
  })};
   
   
   const cart = {};

function addToCart(name, price, imgSrc) {
    if (cart[name]) {
        cart[name].quantity++;
    } else if (true) {  
        cart[name] = {
            price: price,
            imgSrc: imgSrc,
            quantity: 1
        };
        
    }  
     updateCartDisplay();
     
      
}

  function removeFromCart(name) {
    delete cart[name];
    updateCartDisplay();
  }
  function updateQuantity(name, quantity ) {
    cart[name].quantity = Math.max(1, parseInt(quantity));
    updateCartDisplay();
}

  function updateCartDisplay() {
    const cartList = document.getElementById('cart');
    const totalElem = document.getElementById('total');
    cartList.innerHTML = '';
    let total = 0;
    for (const itemName in cart) {
      const item = cart[itemName];
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <img src="${item.imgSrc}" alt="${itemName}">
        <span>${itemName}</span>
        <input type="number" min="1" value="${item.quantity}"  
           onchange="updateQuantity('${itemName}',this.value)" >
        
        <span>Rs${ (item.price * item.quantity).toFixed(2) }</span>
        <button onclick="removeFromCart('${itemName}')">Remove</button>
      `;
      cartList.appendChild(li);
      total = total+item.price * item.quantity ;
      
    }
     
     
    totalElem.textContent = total.toFixed(2);
  }
   