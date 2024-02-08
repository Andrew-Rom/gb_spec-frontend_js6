"use strict";

// Необходимо создать веб-страницу с динамическими элементами с расписанием занятий.

// На странице должна быть таблица с расписанием занятий, на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии, а именно:
// - название занятия
// - время проведения занятия
// - максимальное количество участников
// - текущее количество участников
// - кнопка "записаться"
// - кнопка "отменить запись"

// Если максимальное количество участников достигнуто, либо пользователь уже записан на занятие, сделайте кнопку "записаться" неактивной.
// Кнопка "отменить запись" активна в случае, если пользователь записан на занятие, иначе она должна быть неактивна.

// Пользователь может записаться на один курс только один раз.

// При нажатии на кнопку "записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.

// Если количество участников уже максимально, то пользователь не может записаться, даже если он не записывался ранее.

// Сохраняйте данные в LocalStorage, чтобы они сохранялись и отображались при перезагрузке страницы.

const initialDataJson = `[
    {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "maxParticipants": 15,
        "currentParticipants": 8
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "11:30 - 12:30",
        "maxParticipants": 10,
        "currentParticipants": 5
    },
    {
        "id": 3,
        "name": "Кроссфит",
        "time": "13:00 - 14:00",
        "maxParticipants": 20,
        "currentParticipants": 15
    },
    {
        "id": 4,
        "name": "Танцы",
        "time": "14:30 - 15:30",
        "maxParticipants": 12,
        "currentParticipants": 12
    },
    {
        "id": 5,
        "name": "Бокс",
        "time": "16:00 - 17:00",
        "maxParticipants": 8,
        "currentParticipants": 6
    }
]`;

const workoutsStorageKey = "workouts";
const subscridedWorkoutsStorageKey = "subscridedWorkouts";

let workouts = [];
let subscridedWorkouts = [];

if (!localStorage.getItem(workoutsStorageKey)) {
  localStorage.setItem(workoutsStorageKey, initialDataJson);
}

if (!localStorage.getItem(subscridedWorkoutsStorageKey)) {
  localStorage.setItem(subscridedWorkoutsStorageKey, subscridedWorkouts);
}

workouts = JSON.parse(localStorage.getItem(workoutsStorageKey));
subscridedWorkouts = localStorage
  .getItem(subscridedWorkoutsStorageKey)
  .split(",")
  .map((item) => Number(item));

function update() {
  localStorage.setItem(workoutsStorageKey, JSON.stringify(workouts));
  localStorage.setItem(subscridedWorkoutsStorageKey, subscridedWorkouts.join());
}

function subscribe(workout) {
  if (
    !subscridedWorkouts.includes(workout.id) &&
    workout.currentParticipants < workout.maxParticipants
  ) {
    subscridedWorkouts.push(workout.id);
    workout.currentParticipants += 1;
    return true;
  }
  return false;
}

function unsubscribe(workout) {
  if (subscridedWorkouts.includes(workout.id)) {
    const deletingWorkoutIndex = subscridedWorkouts.findIndex((item) => {
      return item === workout.id;
    });
    subscridedWorkouts.splice(deletingWorkoutIndex, 1);
    workout.currentParticipants -= 1;
    return true;
  }
  return false;
}

const workoutsEl = document.querySelector(".workouts");
workoutsEl.insertAdjacentHTML(
  "beforeend",
  `
    <table>
    <caption>Расписание занятий</caption>
      <tbody>
        <tr>
          <th>№ п/п</th>
          <th>Наименование занятия</th>
          <th>Время проведения</th>
          <th>Максимальное количество участников</th>
          <th>Текущее количество участников</th>
          <th>Действия</th>
        </tr>
      </tbody>
    </table>`
);

const workoutsTableBodyEl = workoutsEl.querySelector("tbody");

workouts.forEach((workout) => {
  workoutsTableBodyEl.insertAdjacentHTML(
    "beforeend",
    `
    <tr class="workout">
        <td class="workout_id">${workout.id}</td>
        <td class="workout_name">${workout.name}</td>
        <td class="workout_time">${workout.time}</td>
        <td class="workout_max_participants">${workout.maxParticipants}</td>
        <td class="workout_current_participants">${
          workout.currentParticipants
        }</td>
        <td class="operation_buttons">
          <button id="workout_enroll" ${
            !subscridedWorkouts.includes(workout.id) &&
            workout.currentParticipants !== workout.maxParticipants
              ? ""
              : "disabled"
          }>записаться</button>
          <button id="workout_cancel" ${
            subscridedWorkouts.includes(workout.id) ? "" : "disabled"
          }>отменить запись</button>
        </td>
    </tr/>
    `
  );
});

workoutsEl.addEventListener("click", ({ target }) => {
  const selectedWorkoutId = target
    .closest(".operation_buttons")
    ?.parentNode.querySelector(".workout_id").textContent;

  const selectedWorkout = workouts.find((item) => {
    return item.id === Number(selectedWorkoutId);
  });

  let quantityUsersEl = target
    .closest(".workout")
    .querySelector(".workout_current_participants");

  if (target.matches("#workout_enroll") && subscribe(selectedWorkout)) {
    let subscribeBtnEl = target.closest("#workout_enroll");
    let unsubscribeBtnEl = target
      .closest(".workout")
      .querySelector("#workout_cancel");
    quantityUsersEl.innerHTML = selectedWorkout.currentParticipants;
    subscribeBtnEl.disabled = true;
    unsubscribeBtnEl.disabled = false;
    update();
  } else if (
    target.matches("#workout_cancel") &&
    unsubscribe(selectedWorkout)
  ) {
    let subscribeBtnEl = target
      .closest(".workout")
      .querySelector("#workout_enroll");
    let unsubscribeBtnEl = target.closest("#workout_cancel");
    quantityUsersEl.innerHTML = selectedWorkout.currentParticipants;
    subscribeBtnEl.disabled = false;
    unsubscribeBtnEl.disabled = true;
    update();
  }
});

workoutsEl.addEventListener("change", () => {
  const selectedWorkoutId = target
    .closest(".operation_buttons")
    .parentNode?.querySelector(".workout_id").textContent;

  const selectedWorkout = workouts.find((item) => {
    return item.id === Number(selectedWorkoutId);
  });

  let quantityUsersEl = target
    .closest(".workout")
    .querySelector(".workout_current_participants");

  if (target.matches("#workout_enroll") && subscribe(selectedWorkout)) {
    let subscribeBtnEl = target.closest("#workout_enroll");
    let unsubscribeBtnEl = target
      .closest(".workout")
      .querySelector("#workout_cancel");
    quantityUsersEl.innerHTML = selectedWorkout.currentParticipants;
    subscribeBtnEl.disabled = true;
    unsubscribeBtnEl.disabled = false;
    update();
  } else if (
    target.matches("#workout_cancel") &&
    unsubscribe(selectedWorkout)
  ) {
    let subscribeBtnEl = target
      .closest(".workout")
      .querySelector("#workout_enroll");
    let unsubscribeBtnEl = target.closest("#workout_cancel");
    quantityUsersEl.innerHTML = selectedWorkout.currentParticipants;
    subscribeBtnEl.disabled = false;
    unsubscribeBtnEl.disabled = true;
    update();
  }
});
