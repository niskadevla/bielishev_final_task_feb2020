'use strict';
/********************/
//Open and close menu //
/********************/
let burger = document.getElementById('burger');
let headerBottom = document.getElementById('headerBottom');
burger.addEventListener('click', function() {
  this.classList.toggle('burger_open');
  headerBottom.classList.toggle('header-bottom_open');
});


/** COMMON **/
let bag = []; //My cart (Global)
let viewedId; //Viewed goods Id (Global)
const currency = '£'; // Currency (Global)
let miniBag = document.getElementById('miniBag'); //Bag in Header (Global)

window.addEventListener('load', () => {
  checkBag();
  showMiniBag();
});

//Check the goods in the localStorage
function checkBag() {
  if( localStorage.getItem('bag') ) {
    bag = JSON.parse( localStorage.getItem('bag') );
  }
}

//Show content in the mini bag
function showMiniBag() {
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

  let curren = count != 0 ? currency : '';
  let html = `Bag <span>${curren}${totalPrice || ''}(${count})</span>`;
  miniBag.innerHTML = html;
}
/****/

document.addEventListener('click', addToView);

function addToView(e) {
  let a = e.target.closest('a[href$="item.html"]');

  if(a) {
    viewedId = a.dataset.id;
    localStorage.setItem('viewed', viewedId);
  }
}
