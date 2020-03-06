'use strict';

let itemWrap = document.getElementById('itemWrap');

//Empty viewed from bag
// window.addEventListener('unload', function() {
//   localStorage.removeItem('viewed');
// });

//Check the viewed goods
function checkViewed() {
  if( localStorage.getItem('viewed') ) {
    // viewedId = JSON.parse( localStorage.getItem('viewed') );
    viewedId = localStorage.getItem('viewed');
  }
}

//Show viewed item on the page
function showViewdItem() {
  let viewedItem;

  for(let i = 0; i < window.catalog.length; i++) {
    if(window.catalog[i].id == viewedId) {
      viewedItem = window.catalog[i];
    }
  }

  let html = '';
  html += `
  <div class="item-preview">
    <div class="full-preview">
      <div id="fullPreview" class="full-preview__img">
        <img src="${viewedItem.preview[0]}" alt="${viewedItem.title}">
      </div>
    </div>

    <div id="thumbs" class="thumbs-preview">`;
      viewedItem.preview.forEach( (src, i) => {
        let colorUp = i === 0 ? 'color-up' : '';
        html += `
          <div class="thumbs-preview__img ${colorUp}">
            <img src="${src}" alt="${viewedItem.title}">
          </div>`;
      });

      let price = viewedItem.discountedPrice ?
        `<span class="old-price">${currency}${(viewedItem.price).toFixed(2)}</span>
        <span class="card__price">${currency}${(viewedItem.discountedPrice).toFixed(2)}</span>` :
        `<span class="card__price">${currency}${(viewedItem.price).toFixed(2)}</span>`;
      //${currency}${viewedItem.price}
      // <span class="item-info__price">
      //   ${price}
      // </span>
  html += `
    </div>
  </div>

  <div class="item-info">
    <h2 class="item-info__title">${viewedItem.title}</h2>
    <span class="item-info__price">
      ${price}
    </span>
    <p class="item-info__des slogan">
      Featuring fine Italian wool, this elegant suit has
      pick-stitch edging, cascade buttons at the cuffs and a
      subtle stripe pattern throughout.
    </p>

    <div class="item-choose">
      <div id="itemSize" class="item-size">
        <h6 class="item-choose__name">Size</h6>`;
        viewedItem.sizes.forEach( (size, i) => {
          let first = i === 0 ? 'item-choose_active' : '';
          html += `
            <a class="item-choose__value ${first}" data-size="${i}">${size}</a>`;
        });

    html += `</div>

      <div id="itemColor" class="item-color">
        <h6 class="item-choose__name">Size</h6>`;
        viewedItem.colors.forEach( (color, i) => {
          let first = i === 0 ? 'item-choose_active' : '';
          html += `
            <a class="item-choose__value ${first}" data-color="${i}">${color}</a>`;
        });
    html += `</div>
    </div>

    <a id="btnToBag" class="btn add-to-bag" href="./shopping-bag.html" data-size="0" data-color="0" data-id="${viewedId}">
      <span>Add to bag</span>
    </a>
  </div>`;

  itemWrap.innerHTML = html;
}

checkViewed();
showViewdItem();

window.addEventListener('load', function() {
  let btnToBag = document.getElementById('btnToBag');
  let itemSize = document.getElementById('itemSize');
  let itemColor = document.getElementById('itemColor');
  let fullPreview = document.getElementById('fullPreview');
  let thumbs = document.getElementById('thumbs');
  let activeImg;



  btnToBag.onclick = addToBag;
  // function(e) {
  //   // e.preventDefault();
  //   addToBag.call(this);
  // }

  //Add the good to bag
  function addToBag() {
    let id = this.dataset.id;
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


  //Select size
  itemSize.addEventListener('click', selectedSize);

  function selectedSize(e) {
    let target = e.target;
    let size = target.dataset.size;
    if(!size) return;

    this.querySelector('.item-choose_active').classList.remove('item-choose_active');
    target.classList.add('item-choose_active');

    btnToBag.dataset.size = size;
  }


  //Select color
  itemColor.addEventListener('click', selectedColor);

  function selectedColor(e) {
    let target = e.target;
    let color = target.dataset.color;
    if(!color) return;

    this.querySelector('.item-choose_active').classList.remove('item-choose_active');
    target.classList.add('item-choose_active');

    btnToBag.dataset.color = color;
  }

  //*********//
  //Select img
  //*********//
  thumbs.onclick = selectedImg;

  function selectedImg(e) {
    let target = e.target;

    if(target.tagName != 'IMG') return;

    if(!activeImg) {
      activeImg = this.querySelector('.color-up');
    }

    activeImg.classList.remove('color-up');
    activeImg = target.parentElement;
    activeImg.classList.add('color-up');

    let src = target.getAttribute('src');
    let previewImg = fullPreview.querySelector('img');
    previewImg.setAttribute('src', src);
  }
});
