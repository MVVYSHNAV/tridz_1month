// Select Elements
const taskInput = document.querySelector(".taskinput");
const taskBtn = document.querySelector(".taskbtn");
const taskFilter = document.querySelector(".taskselect");
const taskList = document.querySelector(".tasklist");
const clearBtn = document.querySelector(".clearbtn");
const nextBtn = document.querySelector(".nextBtn");
const seeAllBtn = document.querySelector(".seeAllBtn");
const prevBtn = document.querySelector(".prevBtn");

let currentPage = 0;
const tasksPerPage = 5;

document.addEventListener("DOMContentLoaded", async () => {
    await fetchApiTasks();
    renderTasks();
});

// Event Listeners
taskBtn?.addEventListener("click", addTask);
taskList?.addEventListener("click", handleTaskAction);
taskFilter?.addEventListener("change", renderTasks);
clearBtn?.addEventListener("click", clearAllTasks);
prevBtn?.addEventListener("click", showPrevPage);
seeAllBtn?.addEventListener("click", showAllTasks);
nextBtn?.addEventListener("click", showNextPage);

async function fetchApiTasks() {
    if (getTasksFromStorage().length > 0) return;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=11");
        const tasks = await response.json();
        tasks.forEach(task => saveTask(task.title, task.completed, false, task.id));
        renderTasks();
    } catch (error) {
        console.error("Error fetching tasks:", error);
    }
}

function addTask(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (!taskText) return alert("Task cannot be empty!");
    if (isTaskDuplicate(taskText)) return alert("Task already exists!");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.unshift({ text: taskText, completed: false, important: true, timestamp: Date.now() }); // Add new task at the beginning
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    renderTasks();
}


// Handle Task Actions (Edit, Delete, Complete)
function handleTaskAction(e) {
    const taskDiv = e.target.closest(".task");
    if (!taskDiv) return;

    const taskTextElement = taskDiv.querySelector(".taskitem");
    const taskId = taskDiv.dataset.id;

    if (e.target.classList.contains("trashbtn")) deleteTask(tasks);
    if (e.target.classList.contains("completebtn")) toggleTaskCompletion(tasks.id);
    if (e.target.classList.contains("editbtn")) enableEditTask(taskDiv, tasks, taskTextElement.textContent);
}

// Render Tasks with Pagination & Filtering
function renderTasks() {
    taskList.innerHTML = "";
    let tasks = getTasksFromStorage();

    // Apply Filter
    if (taskFilter.value === "completed") tasks = tasks.filter(task => task.completed);
    else if (taskFilter.value === "incomplete") tasks = tasks.filter(task => !task.completed);

    // Pagination
    const paginatedTasks = tasks.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage);
    paginatedTasks.forEach(task => createTaskElement(task.text, task.completed, task.id));

    // Toggle Button Visibility
    nextBtn.style.display = tasks.length > (currentPage + 1) * tasksPerPage ? "block" : "none";
    prevBtn.style.display = currentPage > 0 ? "block" : "none";
    seeAllBtn.style.display = tasks.length > tasksPerPage ? "block" : "none";
}


function showNextPage() {
    currentPage++;
    renderTasks();
}


function showPrevPage() {
    if (currentPage > 0) {
        currentPage--;
        renderTasks();
    }
}

// Show All Tasks
function showAllTasks() {
    taskList.innerHTML = "";
    getTasksFromStorage().forEach(task => createTaskElement(task.text, task.completed, task.id));

    // Hide buttons when showing all
    nextBtn.style.display = "none";
    prevBtn.style.display = "none";
    seeAllBtn.style.display = "none";
}

// Create Task Element
function createTaskElement(taskText, completed, id) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task", "flex", "justify-between", "items-center", "bg-gray-800", "p-3", "rounded-lg");
    if (completed) taskDiv.classList.add("completed", "bg-green-600");
    taskDiv.dataset.id = id; // Assign ID to the task

    const newTask = document.createElement("li");
    newTask.textContent = taskText;
    newTask.classList.add("taskitem", "flex-grow", "max-w-86", "overflow-x-scroll", "cursor-pointer", "[&::-webkit-scrollbar]:hidden", "[-ms-overflow-style:none]" ,"[scrollbar-width:none]");
    taskDiv.appendChild(newTask);

    // Buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "gap-2", "p-2" );

    buttonContainer.appendChild(createButton("edit", "editbtn text-yellow-400", () => enableEditTask(taskDiv, id, taskText)));
    buttonContainer.appendChild(createButton("✅", "completebtn text-green-400", () => toggleTaskCompletion(id)));
    buttonContainer.appendChild(createButton("❌", "trashbtn text-red-400", () => deleteTask(id)));

    taskDiv.appendChild(buttonContainer);
    taskList.prepend(taskDiv); // Add new tasks at the top
}

// Enable Edit Mode for Task
function enableEditTask(taskDiv, taskId, oldTask) {
    taskDiv.innerHTML = ""; // Clear existing task

    const input = document.createElement("input");
    input.type = "text";
    input.value = oldTask;
    input.classList.add("taskeditinput", "p-2", "rounded", "w-full", "text-black", "max-w-96");

    const saveButton = createButton("Save", "savebtn bg-blue-500 text-white p-2 rounded", () => {
        const newText = input.value.trim();
        if (newText && !isTaskDuplicate(newText)) {
            updateTaskText(taskId, newText);
            renderTasks();
        } else if (!newText) {
            alert("Task cannot be empty!");
        } else {
            alert("Task already exists!");
        }
    });

    taskDiv.appendChild(input);
    taskDiv.appendChild(saveButton);
    input.focus();
}

// Toggle Task Completion
function toggleTaskCompletion(taskId) {
    let tasks = getTasksFromStorage();
    tasks = tasks.map(task => (task.id == taskId ? { ...task, completed: !task.completed } : task));
    saveTasksToStorage(tasks);
    renderTasks();
}

// Save Task to Local Storage (Ensuring Order)
function saveTask(taskText, completed, addToTop = false, id) {
    let tasks = getTasksFromStorage();
    if (addToTop) {
        tasks.unshift({ id, text: taskText, completed }); // Add new tasks to the top
    } else {
        tasks.push({ id, text: taskText, completed });
    }
    saveTasksToStorage(tasks);
}

// Delete Task
function deleteTask(taskId) {
    const isConfirmed = confirm("Are you sure you want to Delete the tasks?");
    if(isConfirmed) {
    let tasks = getTasksFromStorage().filter(task => task.id != taskId);
    saveTasksToStorage(tasks);
    renderTasks();
}
}

// Update Task Text
function updateTaskText(taskId, newTask) {
    let tasks = getTasksFromStorage();
    tasks = tasks.map(task => (task.id == taskId ? { ...task, text: newTask } : task));
    saveTasksToStorage(tasks);
}

// Clear All Tasks
function clearAllTasks() {
    const isConfirmed = confirm("Are you sure you want to clear all tasks?");
    if (isConfirmed) {
        localStorage.removeItem("tasks");
        currentPage = 0;
        renderTasks();
    }
}

// Utility Functions
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isTaskDuplicate(taskText) {
    return getTasksFromStorage().some(task => task.text === taskText);
}

function createButton(text, className, onClick) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add(...className.split(" "), "p-1", "rounded");
    btn.addEventListener("click", onClick);
    return btn;
}
