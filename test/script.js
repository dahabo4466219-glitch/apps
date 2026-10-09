// script.js – To‑Do List logic

const STORAGE_KEY = "todo-tasks";

let tasks = [];

const taskListEl = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const footerCount = document.getElementById("footer-count");

// Load tasks from localStorage
function loadTasks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            tasks = JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse stored tasks", e);
            tasks = [];
        }
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Render the task list
function render() {
    // Clear existing items
    taskListEl.innerHTML = "";
    tasks.forEach((task, index) => {
        const item = document.createElement("div");
        item.className = "task-item" + (task.completed ? " completed" : "");
        item.dataset.index = index;

        const textSpan = document.createElement("span");
        textSpan.className = "task-text";
        textSpan.textContent = task.text;
        textSpan.addEventListener("click", () => toggleComplete(index));
        item.appendChild(textSpan);

        const delBtn = document.createElement("button");
        delBtn.setAttribute("aria-label", "Delete task");
        delBtn.innerHTML = "&times;"; // simple × symbol
        delBtn.addEventListener("click", () => deleteTask(index));
        item.appendChild(delBtn);

        taskListEl.appendChild(item);
    });
    updateFooter();
}

function updateFooter() {
    const remaining = tasks.filter(t => !t.completed).length;
    footerCount.textContent = `${remaining} item${remaining !== 1 ? "s" : ""} left`;
}

function addTask() {
    const text = newTaskInput.value.trim();
    if (!text) return;
    tasks.push({ text, completed: false });
    newTaskInput.value = "";
    saveTasks();
    render();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    render();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    render();
}

// Event listeners
addBtn.addEventListener("click", addTask);
newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

// Initial load
loadTasks();
render();
