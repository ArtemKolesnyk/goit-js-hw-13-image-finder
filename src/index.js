import './sass/main.scss';

import '@pnotify/core/dist/BrightTheme.css';
const { error } = require('@pnotify/core');

import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

import imgTemp from './templates/cardImg.hbs';
import getRefs from './js/getRefs';
const refs = getRefs();

import PixabayApiService from './js/apiService';
const pixabayApiService = new PixabayApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMore.addEventListener('click', onLoadMore);
refs.galleryList.addEventListener('click', openLargeImage);
refs.loadMore.style.display = 'none';

function onSearch(e) {
  e.preventDefault();
  refs.galleryList.innerHTML = '';

  pixabayApiService.query = e.currentTarget.elements.query.value;
  if (pixabayApiService.query === '') {
    return error({
      text: 'Введите текст для поиска!',
      delay: 300,
    });
  }

  clearHitsContainer();
  pixabayApiService.resetPage();
  pixabayApiService.fetchPhotos()
  .then(appendImgMarkup)
  .cetch(error ({
    text: 'oops! Не найдено картинки с таким именем!',
    delay: 250,
  }));
}

function onLoadMore() {
  pixabayApiService.fetchPhotos()
  .then(appendImgMarkup)
  .cetch(error ({
    text: 'oops! Что-то пошло не так!',
    delay: 250,
  })); 
}

function appendImgMarkup(image) {
  refs.loadMore.style.display = 'block';
  refs.galleryList.insertAdjacentHTML('beforeend', imgTemp(image));
  scrollInto();
}
function clearHitsContainer() {
  refs.galleryList.innerHTML = '';
}
function scrollInto() {
  refs.loadMore.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function openLargeImage(e) {
  if (!e.target.dataset.source) {
    return;
  }
  const instance = basicLightbox.create(`<img src="${e.target.dataset.source}" />`);
  instance.show();
}