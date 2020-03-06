'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var goods = document.getElementById('goods');
var data = sortByDateAdded(filterByWomen(window.catalog));
var leftSlider = document.getElementById('leftSlider');
var rightSlider = document.getElementById('rightSlider');
var totalPriceBO = document.getElementById('totalPriceBO');
var btnToBag = document.getElementById('btnToBag');

//isObjectEmpty
function isObjectEmpty(obj) {
  for (var key in obj) {
    return;
  }
  return true;
}

function showPage() {
  renderGoods();
}

//Filter goods By Women and Casual style
function filterByWomen(arr) {
  return arr.filter(function (obj) {
    return obj.category == 'women' && obj.fashion == 'Casual style';
  });
}

//Sort goods by newest
function sortByDateAdded(arr) {
  var newArr = [].concat(_toConsumableArray(arr));
  newArr.sort(function (a, b) {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });
  return newArr;
}

/*Render goods on page*/
function renderGoods() {
  var VisibleQty = 4;
  var html = '';

  //Rendering all Arrivals
  for (var i = 0; i < VisibleQty; i++) {
    var neww = data[i].hasNew ? 'new' : '';
    var price = data[i].discountedPrice ? '<span class="old-price">' + currency + data[i].price.toFixed(2) + '</span>\n      <span class="card__price">' + currency + data[i].discountedPrice.toFixed(2) + '</span>' : '<span class="card__price">' + currency + data[i].price.toFixed(2) + '</span>';

    html += '\n      <div class="card">\n        <div class="card-inner ' + neww + '">\n          <a href="./item.html" data-id="' + data[i].id + '">\n            <div class="card__img">\n              <img src="' + data[i].thumbnail + '" alt="' + data[i].title + '">\n            </div>\n            <h5 class="card__title">' + data[i].title + '</h5>\n            ' + price + '\n          </a>\n        </div>\n      </div>\n    ';
  }
  goods.innerHTML = html;
}

//***********
//Best offer
//***********

var lefts = sortByBestOffer(window.bestOffer.left);
var rights = sortByBestOffer(window.bestOffer.right);
var leftPrice = void 0;
var rightPrice = void 0;
var discountBO = window.bestOffer.discount;

function sortByBestOffer(arr) {
  var newArr = [];
  arr.forEach(function (str) {
    for (var i = 0; i < window.catalog.length; i++) {
      if (window.catalog[i].id === str) {
        newArr.push(window.catalog[i]);
        break;
      }
    }
  });

  return newArr;
}

leftPrice = parseFloat(lefts[0].price);
rightPrice = parseFloat(rights[0].price);

function renderLeftSlider(e) {
  var target = e.target;
  var index = +target.dataset.index;
  var direction = target.dataset.direction;

  if (!direction) return;

  var leftQty = window.bestOffer.left.length;

  var newIndexUp = void 0;
  var newIndexDown = void 0;

  leftPrice = parseFloat(lefts[index].price);

  renderPrice();

  btnToBag.dataset.id_1 = lefts[index].id;

  if (direction === 'up') {
    newIndexUp = index - 1;
    newIndexDown = index - 1;
  }

  if (direction === 'down') {
    newIndexUp = index + 1;
    newIndexDown = index + 1;
  }

  if (newIndexUp > leftQty - 1) {
    newIndexUp = 0;
  }

  if (newIndexDown > leftQty - 1) {
    newIndexDown = 0;
  }

  if (newIndexUp < 0) {
    newIndexUp = leftQty - 1;
  }

  if (newIndexDown < 0) {
    newIndexDown = leftQty - 1;
  }

  var neww = lefts[index].hasNew ? 'new' : '';

  var html = '\n    <div class="slider__card ' + neww + '">\n      <a href="./item.html" data-id="' + lefts[index].id + '">\n        <img src="' + lefts[index].thumbnail + '" alt="' + lefts[index].title + '">\n        <h5 class="card__title">' + lefts[index].title + '</h5>\n        <span class="card__price">' + currency + lefts[index].price + '</span>\n      </a>\n    </div>\n    <a class="slider-control slider-control_up" data-index="' + newIndexUp + '" data-direction="up"></a>\n    <a class="slider-control slider-control_down" data-index="' + newIndexDown + '" data-direction="down"></a>';

  leftSlider.innerHTML = html;
}

leftSlider.addEventListener('click', renderLeftSlider);

function renderRightSlider(e) {
  var target = e.target;
  var index = +target.dataset.index;
  var direction = target.dataset.direction;

  if (!direction) return;

  var rightQty = window.bestOffer.right.length;
  var newIndexUp = void 0;
  var newIndexDown = void 0;

  rightPrice = parseFloat(rights[index].price);

  renderPrice();
  btnToBag.dataset.id_2 = rights[index].id;

  if (direction === 'up') {
    newIndexUp = index - 1;
    newIndexDown = index - 1;
  }

  if (direction === 'down') {
    newIndexUp = index + 1;
    newIndexDown = index + 1;
  }

  if (newIndexUp > rightQty - 1) {
    newIndexUp = 0;
  }

  if (newIndexDown > rightQty - 1) {
    newIndexDown = 0;
  }

  if (newIndexUp < 0) {
    newIndexUp = rightQty - 1;
  }

  if (newIndexDown < 0) {
    newIndexDown = rightQty - 1;
  }

  var neww = rights[index].hasNew ? 'new' : '';

  var html = '\n    <div class="slider__card ' + neww + '">\n      <a href="./item.html" data-id="' + rights[index].id + '">\n        <img src="' + rights[index].thumbnail + '" alt="' + rights[index].title + '">\n        <h5 class="card__title">' + rights[index].title + '</h5>\n        <span class="card__price">' + currency + rights[index].price + '</span>\n      </a>\n    </div>\n    <a class="slider-control slider-control_up" data-index="' + newIndexUp + '" data-direction="up"></a>\n    <a class="slider-control slider-control_down" data-index="' + newIndexDown + '" data-direction="down"></a>';

  rightSlider.innerHTML = html;
}

rightSlider.addEventListener('click', renderRightSlider);

function renderPrice() {
  var price = leftPrice + rightPrice;
  var newPrice = price - discountBO;
  var html = '\n    <div class="main-total-price__old-price old-price">\n      <span>&pound;</span><span>' + price + '</span>\n    </div>\n\n    <div class="main-total-price__new-price">\n      <span>' + currency + '</span>' + newPrice + '<span></span>\n    </div>';
  totalPriceBO.innerHTML = html;
}

/**********/
//Add to bag
/**********/
var discounts = {
  left: [],
  right: []
};

//Check the discounts from the localStorage
function checkDiscount() {
  if (!isObjectEmpty(JSON.parse(localStorage.getItem('discounts')))) {
    discounts = JSON.parse(localStorage.getItem('discounts'));
  }
}

btnToBag.onclick = function () {
  addToBag.call(this, this.dataset.id_1);
  addToBag.call(this, this.dataset.id_2);

  var leftId = this.dataset.id_1;
  var rightId = this.dataset.id_2;

  checkDiscount();

  discounts.left.push(leftId);
  discounts.right.push(rightId);

  localStorage.setItem('discounts', JSON.stringify(discounts));
};

//Add the good to bag
function addToBag(id) {
  id = id || this.dataset.id;
  var color = this.dataset.color;
  var size = this.dataset.size;

  var obj = {
    id: id,
    color: color,
    size: size
  };

  if (!bag.length) {
    obj.count = 1;
    bag.push(obj);
  } else {
    /*Is there product with the same property*/
    var isExist = bag.some(function (el) {
      return el.id === id && el.color === color && el.size === size;
    });
    if (!isExist) {
      obj.count = 1;
      bag.push(obj);
    } else {
      bag.forEach(function (el) {
        if (el.id === id && el.color === color && el.size === size) {
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