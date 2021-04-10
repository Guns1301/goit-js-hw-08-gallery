import images from "./gallery-items.js";

const galleryListRef = document.querySelector('.gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const galleryImg = document.querySelector('.lightbox__image');;
const btnClose = document.querySelector('.lightbox__button');
const lightboxOverlay = document.querySelector('.lightbox__overlay');

// let index = 0; // устанавливаем дата атрибут индекс для пролистывания галереи

// создаем шаблонную строку
const createGalleryHtml = ({ preview, original, description }, index) => {
    return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          data-index="${index++}"    
          alt="${description}"
        />
      </a>
    </li>`;
  }
// добавляем строку в DOM
const createGalleryMurkup = images.map(createGalleryHtml).join('');
// console.log(createGalleryMurkup);

galleryListRef.insertAdjacentHTML('beforeend', createGalleryMurkup);

// вешаем слушателя на ul
galleryListRef.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();
  const isSwatchImageEl = event.target.classList.contains('gallery__image'); // целевой элемент
  const originalImageUrl = event.target.dataset.source; //получаем url большого изображения

  if (!isSwatchImageEl) {
    return;
  }
  
  openModal(); // при нажатии на элемент добавляем класс открытия модального окна

  const galleryImgFunc = (src, alt) => {
    galleryImg.src = originalImageUrl; // подмена значений
    galleryImg.alt = event.target.alt;
  };
  
  galleryImgFunc(originalImageUrl, event.target.alt);
 
  galleryImg.dataset.index = +event.target.dataset.index;
 
}



function openModal() {
  window.addEventListener('keydown', onPressEscape);
  window.addEventListener('keydown', onPressRightArrow);
  window.addEventListener('keydown', onPressLeftArrow);
  lightboxRef.classList.add('is-open');
}

btnClose.addEventListener('click', closeModal)

function closeModal() {
  window.removeEventListener('keydown', onPressEscape);
  window.removeEventListener('keydown', onPressRightArrow);
  window.removeEventListener('keydown', onPressLeftArrow);
  lightboxRef.classList.remove('is-open');

  galleryImgFunc('','')
  // galleryImg.src = '';
  // galleryImg.alt = '';
}

lightboxOverlay.addEventListener('click', onLightboxEvent)

function onLightboxEvent(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

function onPressEscape(event) {
  if (event.code === 'Escape') {
      closeModal();
    }
}

function onPressRightArrow(event) {
  if (event.key === 'ArrowRight') {
    onSwitchImg(+galleryImg.dataset.index, +1);
  }
}

function onPressLeftArrow(event) {
  if (event.key === 'ArrowLeft') {
    // console.log(galleryImg.dataset.index);
    onSwitchImg(+galleryImg.dataset.index, -1);
  }
}

function onSwitchImg(index, step) {
  let newIndex = index + step;

  if (newIndex === images.length) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = images.length - 1;
  }

  galleryImg.setAttribute('src', images[newIndex].original);
  galleryImg.setAttribute('alt', images[newIndex].description);
  galleryImg.setAttribute('data-index', newIndex);
}