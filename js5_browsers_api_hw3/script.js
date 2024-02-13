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

const imagesStorageKey = "viewedImages";
let viewedImages = [];
let currentObject;

if (localStorage.getItem(imagesStorageKey)) {
  viewedImages = JSON.parse(localStorage.getItem(imagesStorageKey));
}

const imageEl = document.querySelector(".container__image");
const authorEl = document.querySelector(".container__author");
const ratingEl = document.querySelector(".container__rating_total");
const likeEl = document.querySelector(".container__rating_like");
const historyEl = document.querySelector(".container__history");

const apiUrl = "https://api.unsplash.com";
const accessKey = ""; // Access Key

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Получение данных от сервера
async function getRandomPhoto() {
  const url = `${apiUrl}/photos/random?client_id=${accessKey}`;
  const request_options = { method: "GET" };
  try {
    const res = await fetch(url, request_options);
    if (!res.ok) {
      throw new Error("Server error");
    }
    return await res.json();
  } catch (error) {
    throw error;
  }
}

// Отображение данных на странице
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

/* 
   Реализация "исторической" проверки.
   Если пользователь уже просматривал полученное изображение, 
   то статус лайка будет загружен из локального хранилища, 
   а показатель "лайков" будет определен на основе полученных от сервера данных, 
   увеличенных на единицу, если пользователь "лайкал" ранее данное фото. 
   Все обнолвенные данные сохраняются в локальном хранилище.
   P.S. Так не должно быть, но с авторизацией "завис".
*/
function checkViewHistory(randomImage) {
  let renderindObject = viewedImages.find((item) => item.id === randomImage.id);
  if (!renderindObject) {
    renderindObject = randomImage;
    viewedImages.push(randomImage);
  }
  if (renderindObject.liked_by_user) {
    renderindObject.likes = randomImage.likes + 1;
  }
  updateLocalStorage(renderindObject);
  return renderindObject;
}

/* 
   Функционал "лайка".
   Когда пользователь кликает "лайк", счетчик увеличивается на единицу, а иконка изменяется. 
   Повторный клик возвращается все в исходное значение.
   Каждое дайствие обновляет данныев локальном хранилище.
*/
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
  updateLocalStorage(currentObject);
}

// Обновление (без дубликатов) данных перед сохранением в локальное хранилище
function updateLocalStorage(image) {
  const index = viewedImages.findIndex((item) => item.id === image.id);
  if (index) {
    viewedImages.splice(index, 1);
  }
  viewedImages.push(image);
  saveData();
}

// Cохранение данных в локальное хранилище
function saveData() {
  localStorage.setItem(imagesStorageKey, JSON.stringify(viewedImages));
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    currentObject = checkViewHistory(await getRandomPhoto());
    renderPage(currentObject);
  } catch (error) {
    console.error(error);
    alert(error);
  }
});

likeEl.addEventListener("click", swapLikes);

historyEl.addEventListener("click", () => {
  currentObject = viewedImages[random(0, viewedImages.length - 1)];
  renderPage(currentObject);
});
