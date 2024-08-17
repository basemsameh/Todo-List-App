let taskName = document.querySelector("#taskName");
let addTask = document.querySelector("#addTask");
let tasks;

if (localStorage.getItem("tasks") === null) {
  tasks = [];
} else {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  displayTasks();
}

// Add function
function add() {
  let task = {
    completed: false,
    name: taskName.value
  }
  if (task.name !== '') {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    taskName.value = "";
    taskName.focus();
  }
}

addTask.onclick = () => { add() }

// Display Tasks to page 
function displayTasks() {
  let content = '';
  tasks = JSON.parse(localStorage.getItem("tasks"));
  for (let i = 0; i < tasks.length; i++) {
    content += `
      <tr class="${doneOrNot(i)}">
        <td>
          <div onclick="checked(${i})"
            class="checkbox rounded-circle text-primary form-check-input border-2"
            id="checkbox${i}">
            <i class="fa-solid fa-circle-check ${hideOrNot(i)}"></i>
          </div>
        </td>
        <td>${tasks[i].name}</td>
        <td>
          <button class="btn btn-info text-white me-2" title="Update" onclick="updateTask(${i})">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger" title="Remove" onclick="deleteTask(${i})">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `
  }
  document.querySelector("tbody").innerHTML = content;
  allTasks();
  finishedTasks();
}

function checked(index) {
  let selectedTask = document.querySelectorAll(".checkbox")[index];
  selectedTask.children[0].classList.toggle("hide");
  selectedTask.parentElement.parentElement.classList.toggle('done');
  if (tasks[index].completed === true) {
    tasks[index].completed = false;
  } else {
    tasks[index].completed = true;
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
}

function hideOrNot(index) {
  if (tasks[index].completed) {
    return '';
  } else {
    return 'hide';
  }
}

function doneOrNot(index) {
  if (tasks[index].completed) {
    return 'done';
  } else {
    return '';
  }
}

// Delete Task 
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  taskName.focus();
}

// Update Task Name
function updateTask(index) {
  taskName.value = tasks[index].name;
  taskName.focus();
  addTask.textContent = "Update Task";
  addTask.onclick = () => {
    tasks[index].name = taskName.value;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskName.value = "";
    taskName.focus();
    displayTasks();
    addTask.textContent = "Add Task";
    addTask.onclick = () => { add() }
  }
}

// Number of Finised Tasks
function finishedTasks() {
  let num = 0;
  for (const index in tasks) {
    if (tasks[index].completed) {
      num += 1;
    }
  }
  document.querySelector("#doneTasks").textContent = num;
}

// Number of available tasks
function allTasks() {
  document.querySelector("#allTasks").innerHTML = tasks.length;
}