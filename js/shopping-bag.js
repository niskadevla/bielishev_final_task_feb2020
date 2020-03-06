'use strict';

// document.onclick = function(e) {
//   console.log(e.target);
//   alert(e.target);
// }

window.addEventListener('load', () => {
  showBag();
  showTotalSum();
});

//bag from common.js

let allOrder = document.getElementById('allOrder');
let emptyBag = document.getElementById('emptyBag');
let checkout = document.getElementById('checkout');
let isPurchased = false;
let orderSum = document.getElementById('orderSum');

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
  // for(let plus of pluses) {
  //   plus.onclick = function() {
  //     plusGoods.call(this);
  //   }
  // }

  let minuses = document.getElementsByClassName('minus');
  for(let minus of minuses) {
    minus.onclick = function() {
      minusGoods.call(this);
    }
  }

  let removes = document.getElementsByClassName('remove-item');
  for(let remove of removes) {
    remove.onclick = function() {
      removeGoods.call(this);
    }
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

  // currency = count != 0 ? currency : '';

  let html = `
    <p>Total price: <strong>${currency} ${totalPrice}</strong></p>`;
  orderSum.innerHTML = html;
}

//Increase the quantity of goods
function plusGoods() {
  let index = this.dataset.index;
  bag[index].count++;
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//Decrease the quantity of goods
function minusGoods() {
  let index = this.dataset.index;
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
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}
