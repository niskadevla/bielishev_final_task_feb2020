'use strict';

var itemWrap = document.getElementById('itemWrap');

//Check the viewed goods
function checkViewed() {
  if (localStorage.getItem('viewed')) {
    viewedId = localStorage.getItem('viewed');
  }
}

//Show viewed item on the page
function showViewdItem() {
  var viewedItem = void 0;

  for (var i = 0; i < window.catalog.length; i++) {
    if (window.catalog[i].id == viewedId) {
      viewedItem = window.catalog[i];
    }
  }

  var html = '';
  html += '\n  <div class="item-preview">\n    <div class="full-preview">\n      <div id="fullPreview" class="full-preview__img">\n        <img src="' + viewedItem.preview[0] + '" alt="' + viewedItem.title + '">\n      </div>\n    </div>\n\n    <div id="thumbs" class="thumbs-preview">';
  viewedItem.preview.forEach(function (src, i) {
    var colorUp = i === 0 ? 'color-up' : '';
    html += '\n          <div class="thumbs-preview__img ' + colorUp + '">\n            <img src="' + src + '" alt="' + viewedItem.title + '">\n          </div>';
  });

  var price = viewedItem.discountedPrice ? '<span class="old-price">' + currency + viewedItem.price.toFixed(2) + '</span>\n        <span class="card__price">' + currency + viewedItem.discountedPrice.toFixed(2) + '</span>' : '<span class="card__price">' + currency + viewedItem.price.toFixed(2) + '</span>';
  html += '\n    </div>\n  </div>\n\n  <div class="item-info">\n    <h2 class="item-info__title">' + viewedItem.title + '</h2>\n    <span class="item-info__price">\n      ' + price + '\n    </span>\n    <p class="item-info__des slogan">\n      Featuring fine Italian wool, this elegant suit has\n      pick-stitch edging, cascade buttons at the cuffs and a\n      subtle stripe pattern throughout.\n    </p>\n\n    <div class="item-choose">\n      <div id="itemSize" class="item-size">\n        <h6 class="item-choose__name">Size</h6>';
  viewedItem.sizes.forEach(function (size, i) {
    var first = i === 0 ? 'item-choose_active' : '';
    html += '\n            <a class="item-choose__value ' + first + '" data-size="' + i + '">' + size + '</a>';
  });

  html += '</div>\n\n      <div id="itemColor" class="item-color">\n        <h6 class="item-choose__name">Size</h6>';
  viewedItem.colors.forEach(function (color, i) {
    var first = i === 0 ? 'item-choose_active' : '';
    html += '\n            <a class="item-choose__value ' + first + '" data-color="' + i + '">' + color + '</a>';
  });
  html += '</div>\n    </div>\n\n    <a id="btnToBag" class="btn add-to-bag" href="./shopping-bag.html" data-size="0" data-color="0" data-id="' + viewedId + '">\n      <span>Add to bag</span>\n    </a>\n  </div>';

  itemWrap.innerHTML = html;
}

checkViewed();
showViewdItem();

window.addEventListener('load', function () {
  var btnToBag = document.getElementById('btnToBag');
  var itemSize = document.getElementById('itemSize');
  var itemColor = document.getElementById('itemColor');
  var fullPreview = document.getElementById('fullPreview');
  var thumbs = document.getElementById('thumbs');
  var activeImg = void 0;

  btnToBag.onclick = addToBag;

  //Add the good to bag
  function addToBag() {
    var id = this.dataset.id;
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

  //Select size
  itemSize.addEventListener('click', selectedSize);

  function selectedSize(e) {
    var target = e.target;
    var size = target.dataset.size;
    if (!size) return;

    this.querySelector('.item-choose_active').classList.remove('item-choose_active');
    target.classList.add('item-choose_active');

    btnToBag.dataset.size = size;
  }

  //Select color
  itemColor.addEventListener('click', selectedColor);

  function selectedColor(e) {
    var target = e.target;
    var color = target.dataset.color;
    if (!color) return;

    this.querySelector('.item-choose_active').classList.remove('item-choose_active');
    target.classList.add('item-choose_active');

    btnToBag.dataset.color = color;
  }

  //*********//
  //Select img
  //*********//
  thumbs.onclick = selectedImg;

  function selectedImg(e) {
    var target = e.target;

    if (target.tagName != 'IMG') return;

    if (!activeImg) {
      activeImg = this.querySelector('.color-up');
    }

    activeImg.classList.remove('color-up');
    activeImg = target.parentElement;
    activeImg.classList.add('color-up');

    var src = target.getAttribute('src');
    var previewImg = fullPreview.querySelector('img');
    previewImg.setAttribute('src', src);
  }
});