"use strict"

const products = [ // making array
    { 
        id: 1, 
        name: "Floral Summer Dress", 
        price: 27, 
        image: "dress1.png" ,
        description: "A light, breezy cotton dress with pastel floral prints. Perfect for warm days and casual outings."
    },
    { 
        id: 2, 
        name: "Classic Black Dress", 
        price: 30, 
        image: "dress2.png", 
        description: "A floor-length satin gown with a fitted waist and flowing skirt. Ideal for weddings and formal events."
    },
    { 
        id: 3, 
        name: "Casual Denim Dress", 
        price: 40, 
        image: "dress3.png",
        description: "A timeless little black dress with a modern cut. Versatile and stylish for any occasion."
    }
]

function displayContetn () {

    // the title, p , price, description and image of first product 
    const title1 = document.querySelector(".title1");
    title1.textContent = products[0].name;
    const p1 = document.querySelector('.p1');
    p1.textContent = products[0].description;
    const price1 = document.querySelector('.price1');
    price1.textContent = `price : ${products[0].price}$`;
    const img1 = document.getElementById('img1');
    img1.setAttribute("src", "dress1.png");

    // the title, p , price, description and image of second product 
    const img2 = document.getElementById('img2');
    img2.setAttribute("src", "dress2.png");
    const title2 = document.querySelector('.title2');
    title2.textContent = products[1].name;
    const p2 = document.querySelector('.p2');
    p2.textContent = products[1].description;
    const price2 = document.querySelector('.price2');
    price2.textContent = `price: ${products[1].price}$`;

    // the title, p , price, description and image of third product 
    const img3 = document.getElementById('img3');
    img3.setAttribute("src", "dress3.png");
    const title3 = document.querySelector('.title3');
    title3.textContent = products[2].name;
    const p3 = document.querySelector('.p3');
    p3.textContent = products[2].description;
    const price3 = document.querySelector('.price3');
    price3.textContent = `price: ${products[2].price}$`;
}

displayContetn(); //invoking the function

//the first animation wehn page is loaded
document.addEventListener("DOMContentLoaded", () => { //arrow function - we choose all of the documnet to have this function
    const elements = document.querySelectorAll(".animate-on-scroll");
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // animate once
        }
      });
    }, { threshold: 0.2 });
    elements.forEach(el => observer.observe(el));
  });

// this function adds a product to the cart wehn the button is clicked
function addToCart(product) {
    // Checking if the product is existed from before in the cart
    const existing = cart.find(item => item.id === product.id);
    if (existing) { //If it exists, increasing the quantity
      existing.quantity++;
    } else { // If not, adding it to the cart with quantity 1
      cart.push({ ...product, quantity: 1 });
    }
    alert("✅ Item Added to Cart Successfully!")
    updateCartDisplay();
  }

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".addBtn");
    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            addToCart(products[index]);
        });
    });
});

  
// Opening the cart
const chosenCart = document.querySelector('#chosenCart');
const cartSection = document.querySelector("#cartSection");

chosenCart.addEventListener("click", function (e) {
    e.preventDefault(); // prevent page jump
    cartSection.classList.remove("d-none"); 
    backdrop.classList.remove("d-none");
});

// Closing the cart
const closeCartBtn = document.getElementById('close-cart');
closeCartBtn.addEventListener("click", function () {
    cartSection.classList.add("d-none");
    backdrop.classList.add("d-none");
});
// telling the div with the class of backdrop when to have the calss of d-none or when not
const backdrop = document.getElementById('backdrop');
backdrop.addEventListener("click", function () {
    cartSection.classList.add("d-none");
    backdrop.classList.add("d-none");
});


// Function to update the cart display
function updateCartDisplay() {
    const cartItemsDiv = document.querySelector("#cart-items");
    cartItemsDiv.innerHTML = ""; // Clear old items

    let total = 0;

    cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    // Creating a cart item element
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item", "d-flex", "justify-content-between", "align-items-center", "mb-2");

    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
      <span>Qty: ${item.quantity}</span>
      <span>Subtotal: $${subtotal}</span>
      <button class="btn btn-sm btn-success increase">+</button>
      <button class="btn btn-sm btn-warning decrease">-</button>
      <button class="btn btn-sm btn-danger remove">Remove</button>
    `;

    // incresing the quantity
    itemDiv.querySelector(".increase").addEventListener("click", () => {
      item.quantity++;
      updateCartDisplay();
    });

    // decrasing the quantity
    itemDiv.querySelector(".decrease").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart.splice(index, 1); // removinf item if qty was equal to 0
      }
      updateCartDisplay();
    });

    // removing the item completely from the cart
    itemDiv.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      updateCartDisplay();
    });

    cartItemsDiv.appendChild(itemDiv);
  });

  // Update total
  document.querySelector("#cart-total").innerText = `Total: $${total}`;
  
  // Saving the cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Load cart from localStorage
cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartDisplay();