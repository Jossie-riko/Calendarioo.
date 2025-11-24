const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";
    span.onclick = () => toggleDone(index);

    const actions = document.createElement("div");
    actions.className = "actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑";
    deleteBtn.onclick = () => deleteTask(index);

    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;
  tasks.push({ text, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTaskBtn.addEventListener("click", addTask);
renderTasks();
