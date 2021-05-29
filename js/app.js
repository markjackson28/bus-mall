'use strict';

// Global Variables
let allProducts = [];
let clicks = 0;
// remember to change back to 25
let clicksAllowed = 20;

let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');
let renderListArray = [];

// constructor
function Item(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

new Item('bag');
new Item('banana');
new Item('bathroom');
new Item('boots');
new Item('breakfast');
new Item('bubblegum');
new Item('chair');
new Item('cthulhu')
new Item('dog-duck');
new Item('dragon');
new Item('pen');
new Item('pet-sweep');
new Item('scissors');
new Item('shark');
new Item('sweep', 'png');
new Item('tauntaun');
new Item('unicorn');
new Item('water-can');
new Item('wine-glass');


function selectRandomProducttIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderRandomProducts() {
  while (renderListArray.length < 3) {
    let uniqueProduct = selectRandomProducttIndex();
    // while the unique product is not included in the render list array, push the unique product into the array
    while (!renderListArray.includes(uniqueProduct)) {
      renderListArray.push(uniqueProduct);
    }
  }

  let productOne = renderListArray.pop();
  let productTwo = renderListArray.pop();
  let productThree = renderListArray.pop();

  imageOne.src = allProducts[productOne].src;
  imageOne.alt = allProducts[productOne].name;
  allProducts[productOne].views++;

  imageTwo.src = allProducts[productTwo].src;
  imageTwo.alt = allProducts[productTwo].name;
  allProducts[productTwo].views++;

  imageThree.src = allProducts[productThree].src;
  imageThree.alt = allProducts[productThree].name;
  allProducts[productThree].views++;
}

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('Please click on an IMAGE to continue.');
  }

  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderRandomProducts();

  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
  }
}

function renderResults() {
  let ul = document.querySelector('ul');
  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

function handleButtonClick(event) { //eslint-disable-line
  if (clicks === clicksAllowed) {
    renderResults();
  }
}

renderRandomProducts();

myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);
