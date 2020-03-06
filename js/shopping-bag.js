'use strict';

window.addEventListener('load', function () {
  showBag();
  showTotalSum();
});

//let bag from common.js (Global)

var allOrder = document.getElementById('allOrder');
var emptyBag = document.getElementById('emptyBag');
var checkout = document.getElementById('checkout');
var isPurchased = false;
var orderSum = document.getElementById('orderSum');
var discounts = {}; // discounts Object of Arrays

/*Render goods on page*/
function showBag() {
  var html = '';

  if (isPurchased && !bag.length) {
    html = '\n      <p class="bag-empty">\n        Thank you for your purchase\n      </p>';
  } else if (!bag.length) {
    //Bag is empty
    html = '\n      <p class="bag-empty">\n        Your shopping bag is empty.\n        <a href="./catalog.html"> Use Catalog to add new items</a>\n      </p>';
  } else {
    //Rendering page
    for (var _i = 0; _i < bag.length; _i++) {
      var item = {};

      for (var k = 0; k < window.catalog.length; k++) {
        if (window.catalog[k].id === bag[_i].id) {
          item = window.catalog[k];
        }
      }

      var neww = item.hasNew ? 'new' : '';
      var price = item.discountedPrice || item.price;

      html += '\n      <div class="one-order-item">\n        <div class="one-order-thumb ' + neww + '">\n          <a href="./item.html" data-id="' + item.id + '">\n            <img src="' + item.thumbnail + '" alt="' + item.title + '">\n          </a>\n        </div>\n\n        <div class="one-order-right">\n          <div class="one-order-info">\n            <h6 class="one-order-info__title">' + item.title + '</h6>\n            <span class="one-order-info__price">&pound;' + price + '</span>\n          </div>\n\n          <div class="one-order-control">\n            <p class="one-order-control__color">\n              Color: <span>' + item.colors[bag[_i].color] + '</span>\n            </p>\n            <p class="one-order-control__size">\n              Size: <span>' + item.sizes[bag[_i].size] + '</span>\n            </p>\n            <div class="one-order-control__qty">\n              Quantity:\n              <span class="minus" data-index="' + _i + '">_</span>\n              <input class="input-qty" type="text" value="' + bag[_i].count + '" maxlength="3" >\n              <span class="plus" data-index="' + _i + '">+</span>\n            </div>\n          </div>\n\n          <div class="remove-item" data-index="' + _i + '">\n            <span>Remove item</span>\n          </div>\n        </div>\n      </div> ';
    }
  }

  allOrder.innerHTML = html;

  var pluses = document.getElementsByClassName('plus');
  for (var _i2 = 0; _i2 < pluses.length; _i2++) {
    pluses[_i2].onclick = function () {
      plusGoods.call(this);
    };
  }

  var minuses = document.getElementsByClassName('minus');
  for (var i = 0; i < minuses.length; i++) {
    minuses[i].onclick = minusGoods;
  }

  var removes = document.getElementsByClassName('remove-item');
  for (var _i3 = 0; _i3 < removes.length; _i3++) {
    removes[_i3].onclick = removeGoods;
  }
}

//Show bottom total sum
function showTotalSum() {
  var count = 0;
  var totalPrice = 0;

  bag.forEach(function (obj) {
    count += obj.count;

    window.catalog.forEach(function (el) {
      if (el.id === obj.id) {
        var price = el.discountedPrice || el.price;
        totalPrice += parseFloat(price) * obj.count;
        totalPrice = +totalPrice.toFixed(2);
      }
    });
  });

  var dis = '\n    <div class="order-sum__discount">\n        Applied discount: <span>' + currency + ' ' + window.bestOffer.discount.toFixed(2) + '</span>\n    </div>';

  var isDis = hasDiscount() ? dis : '';
  var curr = count > 0 ? currency : '';

  var html = '\n    ' + isDis + '\n    <p>Total price: <strong>' + curr + ' ' + totalPrice + '</strong></p>';
  orderSum.innerHTML = html;
}

//Increase the quantity of goods
function plusGoods() {
  var index = this.dataset.index;

  plusDiscount(bag[index].id);

  bag[index].count++;
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//Decrease the quantity of goods
function minusGoods() {
  var index = this.dataset.index;

  removeDiscount(bag[index].id);

  if (bag[index].count > 1) {
    bag[index].count--;
  } else {
    bag.splice(index, 1);
  }

  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//Delete the good
function removeGoods() {
  var index = this.dataset.index;

  removeDiscount(bag[index].id);

  bag.splice(index, 1);
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
emptyBag.onclick = function () {
  return removeBag();
};

function removeBag() {
  bag = [];
  removeDiscount();
  showBag();
  saveBagToLS();
  showMiniBag();
  showTotalSum();
}

//Checkout
checkout.onclick = function () {
  return clearBag();
};

function clearBag() {
  if (bag.length) {
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
  if (localStorage.getItem('discounts')) {
    discounts = JSON.parse(localStorage.getItem('discounts'));
  }
}

function saveDiscountToLS() {
  localStorage.setItem('discounts', JSON.stringify(discounts));
}

function hasDiscount() {
  checkDiscount();

  if (!discounts.left || !discounts.right) return;

  var isDiscount = discounts.left.length > 0 && discounts.right.length > 0 ? true : false;

  return isDiscount;
}

function removeDiscount(id) {
  // if it has not id remove All
  if (!id) discounts = {};

  window.bestOffer.left.forEach(function (item) {
    if (item === id && discounts.left) {
      var index = discounts.left.indexOf(id);
      if (index !== -1) {
        discounts.left.splice(index, 1);
      }
    }
  });

  window.bestOffer.right.forEach(function (item) {
    if (item === id && discounts.right) {
      var index = discounts.right.indexOf(id);
      if (index !== -1) {
        discounts.right.splice(index, 1);
      }
    }
  });

  saveDiscountToLS();
}

function plusDiscount(id) {
  // if it has not id remove All
  if (!id) return;

  window.bestOffer.left.forEach(function (item) {
    if (item === id && discounts.left) {
      discounts.left.push(id);
    }
  });

  window.bestOffer.right.forEach(function (item) {
    if (item === id && discounts.right) {
      discounts.right.push(id);
    }
  });

  saveDiscountToLS();
}