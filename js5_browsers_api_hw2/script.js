"use strict";

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.

// Для создания элементов интерфейса используйте HTML.
// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

const images = [
  "https://firstphotographerdubai.com/wp-content/uploads/2022/08/jfhvsq75znocrr1r-lg.jpg",
  "https://prosto.aero/uploads/posts/2017-05/1494659013_osaka.jpg",
  "https://s01.cdn-pegast.net/get/14/8b/2d/c83d45707a271b32c6e05b6b3d9df4e1b69efce8d42b44d36c83829b96/saigon-1-1.png",
  "https://planetofhotels.com/guide/sites/default/files/styles/node__blog_post__bp_banner/public/live_banner/berlin.jpg",
  "https://5slov.ru/images/foto/100/89-stokgolm.jpg",
  "https://kidpassage.com/images/publications/9-interesnyih-faktov-o-prage/1298_Prague_gallery.jpg",
  "https://nashvancouver.com/wp-content/uploads/2019/05/%D0%BE%D1%82%D1%82%D0%B0%D0%B2%D0%B0-1.jpg",
];

const slideEl = document.querySelector(".container__image");
const prevBtnEl = document.querySelector(".container__prev_button");
const nextBtnEl = document.querySelector(".container__next_button");
const paginationEl = document.querySelector(".container__pagination");
const pointEls = document.querySelectorAll(".container__point");

let slideIndex = 0;

window.addEventListener("resize", drawSlides(slideIndex));

prevBtnEl.addEventListener("click", () => {
  slideIndex--;
  changeSlides(slideIndex);
});

nextBtnEl.addEventListener("click", () => {
  slideIndex++;
  changeSlides(slideIndex);
});

paginationEl.addEventListener("click", ({ target }) => {
  slideIndex = Number(target.textContent) - 1;
  [...pointEls]
    .find((point) => point.classList.contains("active"))
    .classList.remove("active");
  target.classList.add("active");
  changeSlides(slideIndex);
  updatePagination(slideIndex);
});

function changeSlides() {
  slideEl.classList.remove("fade");
  slideEl.offsetWidth;
  if (slideIndex < 0) {
    slideIndex = images.length - 1;
  } else if (slideIndex >= images.length) {
    slideIndex = 0;
  }
  drawSlides(slideIndex);
  updatePagination(slideIndex);
}

function drawSlides(index) {
  slideEl.classList.add("fade");
  slideEl.style.backgroundImage = `url(${images[index]})`;
}

function updatePagination(index) {
  [...pointEls]
    .find((point) => point.classList.contains("active"))
    .classList.remove("active");
  if (index >= 1 && index < images.length - 1) {
    for (let i = 0; i < pointEls.length; i++) {
      pointEls[i].textContent = slideIndex + i;
    }
    pointEls[1].classList.add("active");
  } else if (index === 0) {
    for (let i = 0; i < pointEls.length; i++) {
      pointEls[i].textContent = slideIndex + i + 1;
    }
    pointEls[0].classList.add("active");
  } else if (index === images.length - 1) {
    for (let i = 0; i < pointEls.length; i++) {
      pointEls[i].textContent = slideIndex + i - 1;
    }
    pointEls[2].classList.add("active");
  }
}
