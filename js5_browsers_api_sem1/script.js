"use strict";

// // Задание 1.
// // 1. Необходимо выводить на страницу текущую ширину
// // и высоту окна браузера, при изменении значений, вывод
// // также должен меняться.

// let containerEl = document.querySelector(".task1");

// function printDesctopSize() {
//   let windowheight = window.outerHeight;
//   let windowWidth = window.outerWidth;
//   containerEl.innerHTML = `<p>Высота окна: ${windowheight}</p><p>Ширина окна: ${windowWidth}</p>`;
// }

// printDesctopSize();

// window.addEventListener("resize", printDesctopSize);

// // 2. При закрытии страницы (вкладки), необходимо выводить
// // всплывающее окно или диалоговое окно браузера и
// // спросить, уверен ли пользователь, что хочет покинуть
// // страницу?

// // ВАЖНО! Не работает в современных браузерах

// window.addEventListener("close", (e) => {
//   e.preventDefault();
//   confirm("ВЫ уверены, что хочет покинуть страницу?");
// });

// // 3. Используйте объект history для управления историей
// // переходов на веб-странице. Создайте кнопки "Назад" и
// // "Вперед" для перемещения по истории.

// let backBtn = document.createElement("button");
// backBtn.className = "back_button";
// backBtn.innerText = "back";
// backBtn.addEventListener("click", () => {
//   window.history.back();
// });

// let nextBtn = document.createElement("button");
// nextBtn.className = "next_button";
// nextBtn.innerText = "next";
// nextBtn.addEventListener("click", () => {
//   window.history.forward();
// });

// containerEl.appendChild(backBtn);
// containerEl.appendChild(nextBtn);

// // ====================================================================
// // Задание 2
// // Даны html и css:
// // <style>
// //   .box {
// //     width: 100px;
// //     height: 100px;
// //     background-color: lightblue;
// //     margin: 10px;
// //     display: inline-block;
// //   }
// // </style>

// // <button id="addButton">Добавить элемент</button>
// // <button id="removeButton">Удалить элемент</button>
// // <button id="cloneButton">Клонировать элемент</button>
// // <div id="container">
// //   <div class="box">1</div>
// //   <div class="box">2</div>
// //   <div class="box">3</div>
// // </div>

// // Необходимо создать страницу, в которой будут работать
// // все три кнопки.
// // - При нажатии на кнопку "Добавить элемент" на страницу
// // добавляется новый квадратный элемент (<div>) с размерами
// // 100x100 пикселей. Этот элемент должен иметь класс .box
// // и содержать текст, указывающий порядковый номер элемента
// // (1, 2, 3 и так далее).
// // - При нажатии на кнопку "Удалить элемент" удаляется
// // последний добавленный элемент, если таковой имеется.
// // - При нажатии на кнопку "Клонировать элемент" создается
// // копия последнего добавленного элемента и добавляется на
// // страницу. Если последнего добавленного элемента нет на
// // странице, необходимо вывести сообщение в alert, с надписью
// // о невозможности клонирования, так как клонировать нечего.

// const addBtnEl = document.getElementById("addButton");
// const removeBtnEl = document.getElementById("removeButton");
// const cloneBtnEl = document.getElementById("cloneButton");
// const containerEl = document.getElementById("container");

// addBtnEl.addEventListener("click", () => {
//   containerEl.insertAdjacentHTML(
//     "beforeend",
//     `<div class="box">${containerEl.children.length + 1}</div>`
//   );
// });

// removeBtnEl.addEventListener("click", () => {
//   containerEl.lastElementChild?.remove();
// });

// cloneBtnEl.addEventListener("click", () => {
//   const newBox = containerEl.lastElementChild?.cloneNode(true);
//   newBox
//     ? containerEl.insertAdjacentElement("beforeend", newBox)
//     : alert("Невозможно клонировать");
// });

// ====================================================================
// Задание 3.
// Необходимо создать страницу со списком статей.
// Каждая статья состоит из id, заголовка, текста статьи.
// id - будем брать из unix timestamp.
// Необходимо подготовить список статей в JSON-формате,
// которые будут выводиться на странице при первом ее
// открытии.
// Необходимо реализовать возможность удаления статьи.
// Необходимо реализовать возможность добавления статьи.
// Необходимо реализовать возможность изменения статьи,
// ввод данных можно реализовать через prompt.
// Статьи должны сохраняться в локальное хранилище
// браузера, и должны быть доступны после перезагрузки
// страницы.

const data = [
  {
    id: Date.now(),
    title: "Title of first  article",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad culpa ex magni repellendus? Repellat non blanditiis aut. Porro, iste facilis nemo laboriosam, hic pariatur tempora exercitationem deserunt voluptates maiores illo.",
  },
  {
    id: Date.now(),
    title: "Title of second  article",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad culpa ex magni repellendus? Repellat non blanditiis aut. Porro, iste facilis nemo laboriosam, hic pariatur tempora exercitationem deserunt voluptates maiores illo.",
  },
  {
    id: Date.now(),
    title: "Title of third article",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad culpa ex magni repellendus? Repellat non blanditiis aut. Porro, iste facilis nemo laboriosam, hic pariatur tempora exercitationem deserunt voluptates maiores illo.",
  },
];

// console.log(JSON.stringify(data));

const initialValuesJSON = `[
    {
        "id":1707324978473,
        "title":"Title of first  article",
        "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad culpa ex magni repellendus? Repellat non blanditiis aut. Porro, iste facilis nemo laboriosam, hic pariatur tempora exercitationem deserunt voluptates maiores illo."
    },
    {
        "id":1707324978473,
        "title":"Title of second  article",
        "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad culpa ex magni repellendus? Repellat non blanditiis aut. Porro, iste facilis nemo laboriosam, hic pariatur tempora exercitationem deserunt voluptates maiores illo."
    },
    {
        "id":1707324978473,
        "title":"Title of third article",
        "text":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad culpa ex magni repellendus? Repellat non blanditiis aut. Porro, iste facilis nemo laboriosam, hic pariatur tempora exercitationem deserunt voluptates maiores illo."
    }
]`;

const localStorageKey = "articles";

if (!localStorage.getItem(localStorageKey)) {
  localStorage.setItem(localStorageKey, initialValuesJSON);
}

let db = [];

const articles = JSON.parse(localStorage.getItem(localStorageKey));

const articlesEl = document.querySelector(".articles");
const btnAddNewArticle = document.querySelector("#add_article");

articles.forEach((article) => {
  addArticle(article);
});

function addArticle(element) {
  articlesEl.insertAdjacentHTML(
    "beforeend",
    `
        <div class="article" data-id="${element.id}">
            <div class="article_title">${element.title}</div>
            <div class="article_text">${element.text}</div>
            <button id="update_article">Изменить</button>
            <button id="remove_article">Удалить</button>
        </div>
        `
  );
}

articlesEl.addEventListener("click", ({ target }) => {
  if (target.matches("#remove_article")) {
    const fatherEl = target.closest(".article");
    fatherEl.remove();
    const delArticleIndex = articles.findIndex((item) => {
      return item.id === +fatherEl.dataset.id;
    });
    articles.splice(delArticleIndex, 1);
    saveData(articles);
  } else if (target.matches("#update_article")) {
    const fatherEl = target.closest(".article");
    const titleEl = fatherEl.querySelector(".article_title");
    const textEl = fatherEl.querySelector(".article_text");
    const title = titleEl.textContent;
    const text = textEl.textContent;
    const newTitle = prompt("Введите заголок статьи", title);
    const newText = prompt("Введите текст статьи", text);
    titleEl.textContent = newTitle;
    textEl.textContent = newText;
    const modArticle = articles.find((item) => {
      return item.id === +fatherEl.dataset.id;
    });
    modArticle.title = newTitle;
    modArticle.text = newText;
    saveData(articles);
  }
});

btnAddNewArticle.addEventListener("click", () => {
  const title = prompt("Введите заголок статьи");
  const text = prompt("Введите текст статьи");
  const newArticle = { id: Date.now(), title: title, text: text };
  addArticle(newArticle);
  articles.push(newArticle);
  saveData(articles);
});

function saveData(data) {
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}
