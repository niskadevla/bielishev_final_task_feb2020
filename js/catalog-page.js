'use strict';

let switcher = document.getElementById('switcher');
let dropDown = document.getElementById('dropDown');
let filterMenu = document.getElementById('filterMenu');
let menuList = document.getElementById('menuList');
let selectedLi;
let selectedParentLi;
const FilterNames = {
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
let goods = document.getElementById('goods');
let data = sortByDateAdded( filterByWomen(window.catalog) );
const screenM = 375;
const screenT = 768;
const screenD = 1024;

window.onresize = function() {
  showPage();
}

// window.addEventListener('load', showPage);

function showPage() {
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

let promo = `
  <div class="banner-catalog">
    <h3 class="banner-catalog__title">
      Last weekend <strong class="mark">extra 50%</strong>
      off on all reduced boots and shoulder bags
    </h3>
    <p class="slogan banner-catalog__des">
      This offer is valid in-store and online. Prices displayed reflect this additional discount. This offer ends at 11:59 GMT on March 1st 2019
    </p>
  </div>`;

// function insertPromo(i) {
//
// }

/*Render goods on page*/
function renderGoods() {
  let html = '';

  //Find out which screen
  let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
  let amount = 2;

  if(clientWidth >= screenD) {
    amount = 4;
  } else if(clientWidth >= screenT) {
    amount = 3;
  } else if(clientWidth >= screenM) {
    amount = 2;
  }

  //Rendering page
  for(let i = 0; i < data.length; i++) {
    let neww = data[i].hasNew ? 'new' : '';
    let price = data[i].discountedPrice ?
      `<span class="old-price">${currency}${(data[i].price).toFixed(2)}</span>
      <span class="card__price">${currency}${(data[i].discountedPrice).toFixed(2)}</span>` :
      `<span class="card__price">${currency}${(data[i].price).toFixed(2)}</span>`;
    let pr = amount == i ? promo : '';

    html += `
      ${pr}
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

showPage();

//***************//
//Show filters
//***************//

  //Open and close filter
dropDown.addEventListener('click', function() {
  switcher.classList.toggle('switcher_open');
  filterMenu.classList.toggle('filter-menu_open');
});

menuList.addEventListener('click', addEventMenuList);

function addEventMenuList(e) {
  let target = e.target;
  let li = target.closest('.filter-submenu li');

  if(!li) return;

  let ul = target.closest('ul');

  selectedLi = ul.querySelector('.active');
  selectedLi.classList.remove('active');
  selectedLi = li;

  //reRendering
  showFilters(ul.dataset.name, +selectedLi.dataset.index);
  // selectedLi.classList.add('active');
}
  /****/

//Render filters
function showFilters(selectedName, activeNum) {
  let html = '';

  for(let name in FilterNames) {
    let selected = name === selectedName ? 'selected' : '';
    let span = '';

    if(!!selected && activeNum !== 0) {
      span = `<span>${FilterNames[name][activeNum]}</span>`;
    }

    html += `
      <li class="filter-menu-main__item ${selected}">
        <div class="filter-menu__head">
          <h4>${name}</h4>
          ${span}
        </div>
        <div class="switcher"></div>
        <div class="filter-submenu">
          <ul data-name="${name}">`;

    FilterNames[name].forEach( (item, i) => {
      // let active = (i === activeNum) && !!selectedName ? 'active' : '';
      let active = 'active';
      if(i === activeNum && !!selected) {
        html += `<li class="${active}" data-index="${i}"><a href="#">${item}</a></li>`;
      } else if(i === 0 && !selected) {
        html += `<li class="${active}" data-index="${i}"><a href="#">${item}</a></li>`;
      } else {
        html += `<li data-index="${i}"><a href="#">${item}</a></li>`;
      }
    });

    html += `</ul>
        </div>
      </li>`;
  }

  menuList.innerHTML = html;
}

showFilters('Fashion', 2);
