// Разработать веб-приложение, которое будет отображать новое случайное изображение из коллекции Unsplash, давая пользователю возможность узнать больше о фотографе и сделать "лайк" изображению.

// Регистрация на Unsplash:

// • Перейдите на веб-сайт Unsplash (https://unsplash.com/).
// • Зарегистрируйтесь или войдите в свой аккаунт. (если у вас не было регистрации до этого, новый аккаунт создавать не нужно).

// Создание приложения:

// • Перейдите на страницу разработчика Unsplash (https://unsplash.com/developers).
// • Нажмите "New Application".
// • Заполните необходимую информацию о приложении (можете использовать http://localhost для тестирования).
// • Получите свой API-ключ после создания приложения.

// Разработка веб-приложения:

// • Создайте HTML-страницу с элементами: изображение, имя фотографа, кнопка "лайк" и счетчик лайков.
// • Используя JavaScript и ваш API-ключ, получите случайное изображение из Unsplash каждый раз, когда пользователь загружает страницу. Обратите внимание, что должно подгружаться всегда случайное изображение, для этого есть отдельная ручка (эндпоинт) у API.
// • Отобразите информацию о фотографе под изображением.
// • Реализуйте функционал "лайка". Каждый раз, когда пользователь нажимает кнопку "лайк", счетчик должен увеличиваться на единицу. Одну фотографию пользователь может лайкнуть только один раз. Также должна быть возможность снять лайк, если ему разонравилась картинка.
// • Добавьте функцию сохранения количества лайков в локальное хранилище, чтобы при новой загрузке страницы счетчик не сбрасывался, если будет показана та же самая картинка.
// • Реализуйте возможность просмотра предыдущих фото с сохранением их в истории просмотров в localstorage.
// • Реализовать все с помощью async/await, без цепочем then.

const limit = 10;
const imagesStorageKey = "viewedImages";
let viewedImages;
let currentObject;

if (!localStorage.getItem(imagesStorageKey)) {
  viewedImages = [];
} else {
  viewedImages = JSON.parse(localStorage.getItem(imagesStorageKey));
}

const imageEl = document.querySelector(".container__image");
const authorEl = document.querySelector(".container__author");
const ratingEl = document.querySelector(".container__rating_total");
const likeEl = document.querySelector(".container__rating_like");

const apiUrl = "https://api.unsplash.com/photos/";
const accessKey = "k5jTTO58_6F3ahigaKHn8kiegfGkwtAXjhBvR744QFE";

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const url = `${apiUrl}?client_id=${accessKey}&page=${random(
  0,
  limit
)}&per_page=${limit}`;

async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

function renderPage(obj) {
  imageEl.style.backgroundImage = `url(${obj.urls.small})`;
  authorEl.innerHTML = `<h3>by ${obj.user.name}</h3>`;
  if (obj.liked_by_user) {
    likeEl.innerHTML = `<img class="liked" src="./assets/liked.svg" alt="Like icon">`;
  } else {
    likeEl.innerHTML = `<img class="unliked" src="./assets/like.svg" alt="Like icon">`;
  }
  ratingEl.innerHTML = `Total likes: ${obj.likes}`;
}

function isViewed(image) {
  let renderindObject = viewedImages.find((item) => item.id === image.id);
  if (!renderindObject) {
    renderindObject = image;
    viewedImages.push(image);
  }
  if (renderindObject.liked_by_user) {
    renderindObject.likes = image.likes + 1;
  }
  saveData();
  return renderindObject;
}

function swapLikes() {
  if (currentObject.liked_by_user) {
    likeEl.innerHTML = `<img class="unliked" src="./assets/like.svg" alt="Like icon">`;
    currentObject.liked_by_user = false;
    currentObject.likes -= 1;
  } else {
    likeEl.innerHTML = `<img class="liked" src="./assets/liked.svg" alt="Like icon">`;
    currentObject.liked_by_user = true;
    currentObject.likes += 1;
  }
  ratingEl.innerHTML = `Total likes: ${currentObject.likes}`;
  saveData();
}

function saveData() {
  localStorage.setItem(imagesStorageKey, JSON.stringify(viewedImages));
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getData(url);
    const selectedImage = data[random(0, data.length - 1)];
    currentObject = isViewed(selectedImage);
    renderPage(currentObject);
  } catch (error) {
    console.error(error);
  }
});

likeEl.addEventListener("click", swapLikes);
