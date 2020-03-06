'use strict';
/********************/
//Open and close menu //
/********************/

var burger = document.getElementById('burger');
var headerBottom = document.getElementById('headerBottom');
burger.addEventListener('click', function () {
  this.classList.toggle('burger_open');
  headerBottom.classList.toggle('header-bottom_open');
});

/** COMMON **/
var bag = []; //My cart (Global)
var viewedId = void 0; //Viewed goods Id (Global)
var currency = '£'; // Currency (Global)
var miniBag = document.getElementById('miniBag'); //Bag in Header (Global)

window.addEventListener('load', function () {
  checkBag();
  showMiniBag();
});

//Check the goods in the localStorage
function checkBag() {
  if (localStorage.getItem('bag')) {
    bag = JSON.parse(localStorage.getItem('bag'));
  }
}

//Show content in the mini bag
function showMiniBag() {
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

  var curren = count != 0 ? currency : '';
  var html = 'Bag <span>' + curren + (totalPrice || '') + '(' + count + ')</span>';
  miniBag.innerHTML = html;
}
/****/

document.addEventListener('click', addToView);

function addToView(e) {
  var a = e.target.closest('a[href$="item.html"]');

  if (a) {
    viewedId = a.dataset.id;
    localStorage.setItem('viewed', viewedId);
  }
}