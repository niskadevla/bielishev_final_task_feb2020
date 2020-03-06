'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var switcher = document.getElementById('switcher');
var dropDown = document.getElementById('dropDown');
var filterMenu = document.getElementById('filterMenu');
var menuList = document.getElementById('menuList');
var filterNav = document.getElementById('filterNav');
var selectedLi = void 0;
var selectedParentLi = void 0;
var FilterNames = {
  'Fashion': ['Not selected', 'Nail the 90s', 'Casual style', 'New Look', 'Sport', 'Vintage', 'Сlassical style'],
  'Product type': ['Not selected', 'Coats & Jackets', 'Dresses', 'Jersey Tops'],
  'Color': ['Not selected', 'Black', 'Blue', 'Red', 'Green', 'Golden'],
  'Brand': ['Not selected', 'Chi Chi London', 'Antipodium', 'Adidas', 'New Balance', 'River Island'],
  'Price range': ['Not selected', 'To £99', '£100-£299', 'From £300']
};

/**********/
//RENDERING
/*********/
//window.catalog
var goods = document.getElementById('goods');
var data = sortByDateAdded(filterByWomen(window.catalog));
var screenM = 375;
var screenT = 768;
var screenD = 1024;

window.onresize = function () {
  showPage();
};

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

var promo = '\n  <div class="banner-catalog">\n    <h3 class="banner-catalog__title">\n      Last weekend <strong class="mark">extra 50%</strong>\n      off on all reduced boots and shoulder bags\n    </h3>\n    <p class="slogan banner-catalog__des">\n      This offer is valid in-store and online. Prices displayed reflect this additional discount. This offer ends at 11:59 GMT on March 1st 2019\n    </p>\n  </div>';

/*Render goods on page*/
function renderGoods() {
  var html = '';

  //Find out which screen
  var clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
  var amount = 2;

  if (clientWidth >= screenD) {
    amount = 4;
  } else if (clientWidth >= screenT) {
    amount = 3;
  } else if (clientWidth >= screenM) {
    amount = 2;
  }

  //Rendering page
  for (var i = 0; i < data.length; i++) {
    var neww = data[i].hasNew ? 'new' : '';
    var price = data[i].discountedPrice ? '<span class="old-price">' + currency + data[i].price.toFixed(2) + '</span>\n      <span class="card__price">' + currency + data[i].discountedPrice.toFixed(2) + '</span>' : '<span class="card__price">' + currency + data[i].price.toFixed(2) + '</span>';
    var pr = amount == i ? promo : '';

    html += '\n      ' + pr + '\n      <div class="card">\n        <div class="card-inner ' + neww + '">\n          <a href="./item.html" data-id="' + data[i].id + '">\n            <div class="card__img">\n              <img src="' + data[i].thumbnail + '" alt="' + data[i].title + '">\n            </div>\n            <h5 class="card__title">' + data[i].title + '</h5>\n            ' + price + '\n          </a>\n        </div>\n      </div>\n    ';
  }
  goods.innerHTML = html;
}

showPage();

//***************//
//Show filters
//***************//

//Open and close filter
dropDown.addEventListener('click', function () {
  switcher.classList.toggle('switcher_open');
  filterMenu.classList.toggle('filter-menu_open');
});

menuList.addEventListener('click', addEventMenuList);

function addEventMenuList(e) {
  var target = e.target;
  var li = target.closest('.filter-submenu li');

  if (!li) return;

  var ul = target.closest('ul');

  selectedLi = ul.querySelector('.active');
  selectedLi.classList.remove('active');
  selectedLi = li;

  //reRendering
  showFilters(ul.dataset.name, +selectedLi.dataset.index);
}
/****/

//Render filters
function showFilters(selectedName, activeNum) {
  var html = '';
  var arr = [];
  var ul = filterNav.querySelector('ul');

  //Remove list for filte nav mobile
  if (ul) {
    ul.remove();
  }

  var _loop = function _loop(name) {
    var selected = name === selectedName ? 'selected' : '';
    var span = '';
    var name2 = name;

    if (!!selected && activeNum !== 0) {
      span = '<span>' + FilterNames[name][activeNum] + '</span>';
      name2 = '<span class="' + selected + '">' + FilterNames[name][activeNum] + '</span>';
    }

    arr.push(name2);

    html += '\n      <li class="filter-menu-main__item ' + selected + '">\n        <div class="filter-menu__head">\n          <h4>' + name + '</h4>\n          ' + span + '\n        </div>\n        <div class="switcher"></div>\n        <div class="filter-submenu">\n          <ul data-name="' + name + '">';

    FilterNames[name].forEach(function (item, i) {
      var active = 'active';
      if (i === activeNum && !!selected) {
        html += '<li class="' + active + '" data-index="' + i + '"><a href="#">' + item + '</a></li>';
      } else if (i === 0 && !selected) {
        html += '<li class="' + active + '" data-index="' + i + '"><a href="#">' + item + '</a></li>';
      } else {
        html += '<li data-index="' + i + '"><a href="#">' + item + '</a></li>';
      }
    });

    html += '</ul>\n        </div>\n      </li>';
  };

  for (var name in FilterNames) {
    _loop(name);
  }

  menuList.innerHTML = html;

  var html2 = '<ul><li class="filter-nav__link">';
  html2 += arr.join(', ');
  html2 += '</li><ul>';
  filterNav.insertAdjacentHTML('afterBegin', html2);
}

showFilters('Fashion', 2);