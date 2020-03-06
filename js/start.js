'use strict';

let goods = document.getElementById('goods');
let data = sortByDateAdded( filterByWomen(window.catalog) );
let leftSlider = document.getElementById('leftSlider');
let rightSlider = document.getElementById('rightSlider');
let totalPriceBO = document.getElementById('totalPriceBO');
let btnToBag = document.getElementById('btnToBag');

// let leftQty = window.bestOffer.left.length;
// let rightQty = window.bestOffer.right.length;
// let bestOfferInner = document.getElementById('bestOfferInner');

//isObjectEmpty
function isObjectEmpty(obj) {
  console.log(obj);
  for(var key in obj) {
    console.log(key);
    return;
  }
  return true;
}

function showPage() {
  // renderBestOffer();
  renderGoods();
}

//Filter goods By Women and Casual style
function filterByWomen(arr) {
  return arr.filter( (obj) => obj.category == 'women' && obj.fashion == 'Casual style' );
}

//Sort goods by newest
function sortByDateAdded(arr) {
  let newArr = [...arr];
  newArr.sort( (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
  return newArr;
}

/*Render goods on page*/
function renderGoods() {
  const VisibleQty = 4;
  let html = '';

  //Rendering all Arrivals
  for(let i = 0; i < VisibleQty; i++) {
    let neww = data[i].hasNew ? 'new' : '';
    let price = data[i].discountedPrice ?
      `<span class="old-price">${currency}${(data[i].price).toFixed(2)}</span>
      <span class="card__price">${currency}${(data[i].discountedPrice).toFixed(2)}</span>` :
      `<span class="card__price">${currency}${(data[i].price).toFixed(2)}</span>`;

    html += `
      <div class="card">
        <div class="card-inner ${neww}">
          <a href="./item.html" data-id="${data[i].id}">
            <div class="card__img">
              <img src="${data[i].thumbnail}" alt="${data[i].title}">
            </div>
            <h5 class="card__title">${data[i].title}</h5>
            ${price}
          </a>
        </div>
      </div>
    `;
  }
  goods.innerHTML = html;
}

//***********
//Best offer
//***********

let lefts = sortByBestOffer(window.bestOffer.left);
let rights = sortByBestOffer(window.bestOffer.right);
let leftPrice;
let rightPrice;
let discountBO = window.bestOffer.discount;

function sortByBestOffer(arr) {
  let newArr = [];
  arr.forEach( (str) => {
    for(let i = 0; i < window.catalog.length; i++)
      if(window.catalog[i].id === str) {
        newArr.push(window.catalog[i]);
        break;
      }
  });

  return newArr;
}

// window.bestOffer.left.forEach( (str) => {
//   for(let i = 0; i < window.catalog.length; i++)
//     if(window.catalog[i].id === str) {
//       lefts.push(window.catalog[i]);
//       break;
//     }
// });

// window.bestOffer.right.forEach( (str) => {
//   for(let i = 0; i < window.catalog.length; i++)
//     if(window.catalog[i].id === str) {
//       rights.push(window.catalog[i]);
//       break;
//     }
// });

leftPrice = parseFloat(lefts[0].price);
rightPrice = parseFloat(rights[0].price);

// function eventLeftSlider(e) {
//   let target = e.target;
// }

function renderLeftSlider(e) {
  let target = e.target;
  let index = +target.dataset.index;
  let direction = target.dataset.direction;

  if(!direction) return;

  let leftQty = window.bestOffer.left.length;

  // let newIndexUp = index > 0 && index < leftQty - 1 ? index - 1 : 0;
  // let newIndexDown = index < leftQty - 1 ? index + 1 : 0;
  let newIndexUp;
  let newIndexDown;

  leftPrice = parseFloat(lefts[index].price);

  renderPrice();

  btnToBag.dataset.id_1 = lefts[index].id;

  if(direction === 'up') {
    newIndexUp = index - 1;
    newIndexDown = index - 1;
  }

  if(direction === 'down') {
    newIndexUp = index + 1;
    newIndexDown = index + 1;
  }

  if(newIndexUp > leftQty - 1) {
    newIndexUp = 0;
  }

  if(newIndexDown > leftQty - 1) {
    newIndexDown = 0;
  }

  if(newIndexUp < 0) {
    newIndexUp = leftQty - 1;
  }

  if(newIndexDown < 0) {
    newIndexDown = leftQty - 1;
  }

  let neww = lefts[index].hasNew ? 'new' : '';

  let html = `
    <div class="slider__card ${neww}">
      <a href="./item.html" data-id="${lefts[index].id}">
        <img src="${lefts[index].thumbnail}" alt="${lefts[index].title}">
        <h5 class="card__title">${lefts[index].title}</h5>
        <span class="card__price">${currency}${lefts[index].price}</span>
      </a>
    </div>
    <a class="slider-control slider-control_up" data-index="${newIndexUp}" data-direction="up"></a>
    <a class="slider-control slider-control_down" data-index="${newIndexDown}" data-direction="down"></a>`;

  leftSlider.innerHTML = html;
}

leftSlider.addEventListener('click', renderLeftSlider);


function renderRightSlider(e) {
  let target = e.target;
  let index = +target.dataset.index;
  let direction = target.dataset.direction;

  if(!direction) return;

  let rightQty = window.bestOffer.right.length;
  let newIndexUp;
  let newIndexDown;

  // leftPrice = parseFloat(lefts[0].price);
  rightPrice = parseFloat(rights[index].price);

  renderPrice();
  btnToBag.dataset.id_2 = rights[index].id;

  if(direction === 'up') {
    newIndexUp = index - 1;
    newIndexDown = index - 1;
  }

  if(direction === 'down') {
    newIndexUp = index + 1;
    newIndexDown = index + 1;
  }

  if(newIndexUp > rightQty - 1) {
    newIndexUp = 0;
  }

  if(newIndexDown > rightQty - 1) {
    newIndexDown = 0;
  }

  if(newIndexUp < 0) {
    newIndexUp = rightQty - 1;
  }

  if(newIndexDown < 0) {
    newIndexDown = rightQty - 1;
  }

  let neww = rights[index].hasNew ? 'new' : '';

  let html = `
    <div class="slider__card ${neww}">
      <a href="./item.html" data-id="${rights[index].id}">
        <img src="${rights[index].thumbnail}" alt="${rights[index].title}">
        <h5 class="card__title">${rights[index].title}</h5>
        <span class="card__price">${currency}${rights[index].price}</span>
      </a>
    </div>
    <a class="slider-control slider-control_up" data-index="${newIndexUp}" data-direction="up"></a>
    <a class="slider-control slider-control_down" data-index="${newIndexDown}" data-direction="down"></a>`;

rightSlider.innerHTML = html;
}

rightSlider.addEventListener('click', renderRightSlider);

function renderPrice() {
  let price = leftPrice + rightPrice;
  let newPrice = price - discountBO;
  let html = `
    <div class="main-total-price__old-price old-price">
      <span>&pound;</span><span>${price}</span>
    </div>

    <div class="main-total-price__new-price">
      <span>${currency}</span>${newPrice}<span></span>
    </div>`;
  totalPriceBO.innerHTML = html;
}

/**********/
//Add to bag
/**********/
let discounts = {
  left: [],
  right: []
};

// console.log(isObjectEmpty(localStorage.getItem('discounts')) );

//Check the discounts from the localStorage
function checkDiscount() {
  if( !isObjectEmpty( JSON.parse(localStorage.getItem('discounts') )) ) {
    discounts = JSON.parse( localStorage.getItem('discounts') );
  }
}

btnToBag.onclick = function(e) {
  // e.preventDefault();
  addToBag.call(this, this.dataset.id_1);
  addToBag.call(this, this.dataset.id_2);

  let leftId = this.dataset.id_1;
  let rightId = this.dataset.id_2;
  // [this.dataset.id_1, this.dataset.id_2];

  checkDiscount();

  discounts.left.push(leftId);
  discounts.right.push(rightId);

  localStorage.setItem('discounts', JSON.stringify(discounts));
}


//Add the good to bag
function addToBag(id) {
  id = id || this.dataset.id;
  let color = this.dataset.color;
  let size = this.dataset.size;

  let obj = {
    id: id,
    color: color,
    size: size
  };

  if(!bag.length) {
    obj.count = 1;
    bag.push(obj);
  } else {
    /*Is there product with the same property*/
    let isExist = bag.some( (el) => (el.id === id && el.color === color && el.size === size) );
    if(!isExist) {
      obj.count = 1;
      bag.push(obj);
    } else {
      bag.forEach( (el) => {
        if(el.id === id && el.color === color && el.size === size) {
          el.count++;
        }
      });
    }
  }

  localStorage.setItem('bag', JSON.stringify(bag));
  showMiniBag();
}

//Initial
renderPrice();
showPage();
