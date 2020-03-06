'use strict';

window.addEventListener('load', () => {
  showBag();
  showTotalSum();
});

//let bag from common.js (Global)

let allOrder = document.getElementById('allOrder');
let emptyBag = document.getElementById('emptyBag');
let checkout = document.getElementById('checkout');
let isPurchased = false;
let orderSum = document.getElementById('orderSum');
let discounts = {}; // discounts Object of Arrays

/*Render goods on page*/
function showBag() {
  let html = '';

  if(isPurchased && !bag.length) {
    html = `
      <p class="bag-empty">
        Thank you for your purchase
      </p>`;
  } else if(!bag.length) {
    //Bag is empty
    html = `
      <p class="bag-empty">
        Your shopping bag is empty.
        <a href="./catalog.html"> Use Catalog to add new items</a>
      </p>`;
  } else {
    //Rendering page
    for(let i = 0; i < bag.length; i++) {
      let item = {};

      for(let k = 0; k < window.catalog.length; k++) {
        if(window.catalog[k].id === bag[i].id) {
          item = window.catalog[k];
        }
      }

      let neww = item.hasNew ? 'new' : '';
      let price = item.discountedPrice || item.price;

      html += `
      <div class="one-order-item">
        <div class="one-order-thumb ${neww}">
          <a href="./item.html" data-id="${item.id}">
            <img src="${item.thumbnail}" alt="${item.title}">
          </a>
        </div>

        <div class="one-order-right">
          <div class="one-order-info">
            <h6 class="one-order-info__title">${item.title}</h6>
            <span class="one-order-info__price">&pound;${price}</span>
          </div>

          <div class="one-order-control">
            <p class="one-order-control__color">
              Color: <span>${item.colors[bag[i].color]}</span>
            </p>
            <p class="one-order-control__size">
              Size: <span>${item.sizes[bag[i].size]}</span>
            </p>
            <div class="one-order-control__qty">
              Quantity:
              <span class="minus" data-index="${i}">_</span>
              <input class="input-qty" type="text" value="${bag[i].count}" maxlength="3" >
              <span class="plus" data-index="${i}">+</span>
            </div>
          </div>

          <div class="remove-item" data-index="${i}">
            <span>Remove item</span>
          </div>
        </div>
      </div> `;
    }
  }

  allOrder.innerHTML = html;

  let pluses = document.getElementsByClassName('plus');
  for(let i = 0; i < pluses.length; i++) {
    pluses[i].onclick = function() {
      plusGoods.call(this);
    }
  }

  let minuses = document.getElementsByClassName('minus');
  for (var i = 0; i < minuses.length; i++) {
    minuses[i].onclick = minusGoods;
  }

  let removes = document.getElementsByClassName('remove-item');
  for (let i = 0; i < removes.length; i++) {
    removes[i].onclick = removeGoods;
  }
}

//Show bottom total sum
function showTotalSum() {
  let count = 0;
  let totalPrice = 0;

  bag.forEach( (obj) => {
    count += obj.count;

    window.catalog.forEach( (el) => {
      if(el.id === obj.id) {
        let price = el.discountedPrice || el.price;
        totalPrice += parseFloat(price) * obj.count;
        totalPrice = +totalPrice.toFixed(2);
      }
    });
  });

  let dis = `
    <div class="order-sum__discount">
        Applied discount: <span>${currency} ${window.bestOffer.discount.toFixed(2)}</span>
    </div>`;

  let isDis = hasDiscount() ? dis : '';
  let curr = count > 0 ? currency : '';

  let html = `
    ${isDis}
    <p>Total price: <strong>${curr} ${totalPrice}</strong></p>`;
  orderSum.innerHTML = html;
}

//Increase the quantity of goods
function plusGoods() {
  let index = this.dataset.index;

  plusDiscount(bag[index].id);

  bag[index].count++;
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//Decrease the quantity of goods
function minusGoods() {
  let index = this.dataset.index;

  removeDiscount(bag[index].id);

  if(bag[index].count > 1) {
    bag[index].count--;
  } else {
     bag.splice(index,1);
  }

  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//Delete the good
function removeGoods() {
  let index = this.dataset.index;

  removeDiscount(bag[index].id);

  bag.splice(index,1);
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}


//Save bag to localStorage
function saveBagToLS() {
  localStorage.setItem('bag', JSON.stringify(bag));
}

//Empty bag
emptyBag.onclick = () => removeBag();

function removeBag() {
  bag = [];
  removeDiscount();
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//Checkout
checkout.onclick = () => clearBag();

function clearBag() {
  if(bag.length) {
    isPurchased = true;
  }
  bag = [];
  removeDiscount();
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//****************//
// Check discount //
//****************//

//Check the discounts from the localStorage
function checkDiscount() {
  if( localStorage.getItem('discounts') ) {
    discounts = JSON.parse( localStorage.getItem('discounts') );
  }
}

function saveDiscountToLS() {
  localStorage.setItem('discounts', JSON.stringify(discounts));
}

function hasDiscount() {
  checkDiscount();

  if(!discounts.left || !discounts.right) return;

  let isDiscount = (discounts.left.length > 0) &&
               (discounts.right.length > 0) ? true : false;

  return isDiscount;
}

function removeDiscount(id) {
  // if it has not id remove All
  if(!id) discounts = {};

  window.bestOffer.left.forEach( (item) => {
    if(item === id && discounts.left) {
      let index = discounts.left.indexOf(id);
      if(index !== -1) {
        discounts.left.splice(index,1);
      }
    }
  });

  window.bestOffer.right.forEach( (item) => {
    if(item === id && discounts.right) {
      let index = discounts.right.indexOf(id);
      if(index !== -1) {
        discounts.right.splice(index,1);
      }
    }
  });

  saveDiscountToLS();
}

function plusDiscount(id) {
  // if it has not id remove All
  if(!id) return;

  window.bestOffer.left.forEach( (item) => {
    if(item === id && discounts.left) {
      discounts.left.push(id);
    }
  });

  window.bestOffer.right.forEach( (item) => {
    if(item === id && discounts.right) {
      discounts.right.push(id);
    }
  });

  saveDiscountToLS();
}
