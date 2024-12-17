const inputText = document.getElementById("taskInput");
const addNewTask = document.getElementById("addNewTask");
const taskList = document.getElementById("displayTask");
const clearCompleteTask = document.getElementById("clearCompleteBtn");

let todoItems = "";
let todosList = [];
todosList = JSON.parse(localStorage.getItem("todos")) || [];

function saveTask() {
  let todoObject = {
    todo: inputText.value || "",
    completed: false,
  };

  if (inputText.value !== "") {
    todosList.push(todoObject);
    localStorage.setItem("todos", JSON.stringify(todosList));
  }

  inputText.value = "";
  location.reload();
}

function displayTodos(listToShow) {
  todoItems = "";

  listToShow.map(({ todo, completed }, index) => {
    todoItems += `<li >`;
    todoItems += `<input type='checkbox' id=idx-${index} ${
      completed ? "checked" : ""
    } onchange="toggleComplete(${index})"
    >`;
    todoItems += "</input>";

    todoItems += `<label> ${todo} </label>`;
    todoItems += "</li>";
  });

  taskList.innerHTML = todoItems;
}

if (!todosList || todosList.length === 0) {
  taskList.innerHTML = "<li> No items found.</li>";
} else {
  displayTodos(todosList);
}

function toggleComplete(index) {
  todosList[index].completed = !todosList[index].completed;
  localStorage.setItem("todos", JSON.stringify(todosList));
  location.reload();
}

function clearCompletedTodos() {
  const completedList = todosList.filter(
    (completedTask) => !completedTask.completed
  );
  todosList = todosList.filter((completed) =>
    completedList.includes(completed)
  );

  displayTodos(todosList);
}
