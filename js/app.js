'use strict';

// console.log('hello world');

// Global Variables
let allProducts = [];
let clicks = 0;
// remember to change back to 25
let clicksAllowed = 6;

let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
// let imageThree = document.querySelector('section img:last-child');

function Item(name, fileExtension = '.jpg') {
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


function selectRandomProducttIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderRandomProducts() {
  let productOne = selectRandomProducttIndex();
  let productTwo = selectRandomProducttIndex();
  // let productThree = selectRandomProducttIndex();
  while (productOne === productTwo) {
    productTwo = selectRandomProducttIndex();
  }

  imageOne.src = allProducts[productOne].src;
  imageOne.alt = allProducts[productOne].name;
  allProducts[productOne].views++;

  imageTwo.src = allGoats[goatTwo].src;
  imageTwo.alt = allGoats[goatTwo].name;
  allProducts[productTwo].views++;
}

function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('click on an IMAGE please');
  }

  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allGoats.length; i++) {
    if (clickedProduct === allGoats[i].name) {
      allProducts[i].clicks++;
    }
  }

  renderRandomProducts();
  
  if(clicks === clicksAllowed){
    myContainer.removeEventListener('click', handleProductClick);
  }
}

function renderResults(){
  let ul = document.querySelector('ul');
  for(let i = 0; i < allProducts.length; i++){
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and was clicked ${allProducts[i].clicks} times.`;
    ul.appendChild(li);
  }
}

function handleButtonClick(event){ //eslint-disable-line
  if(clicks === clicksAllowed){
    renderResults();
  }
}

renderRandomProducts();

myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);
