'use strict';

// Global Variables
let allProducts = [];
let clicks = 0;
let clicksAllowed = 25;
let renderListArray = [];

// DOM Entrance
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:last-child');

// Constructor
function Item(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}

// Instances of Items
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

//Random Index Generator
function selectRandomProducttIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

// Random Product Generator/Display
function renderRandomProducts() {
  while (renderListArray.length < 6) {
    let uniqueProduct = selectRandomProducttIndex();
    if (!renderListArray.includes(uniqueProduct)) {
      renderListArray.unshift(uniqueProduct);
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

// Product Clicker
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
    document.querySelector('#chart').style.display = 'block';
    renderChart();
  }
}

// Chart Render
function renderChart() {
  let clicksArray = [];
  let viewsArray = [];
  let namesArray = [];

  for (let i = 0; i < allProducts.length; i++) {
    clicksArray.push(allProducts[i].clicks);
    viewsArray.push(allProducts[i].views);
    namesArray.push(allProducts[i].name);
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Clicks',
        data: clicksArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: viewsArray,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

renderRandomProducts();

myContainer.addEventListener('click', handleProductClick);

