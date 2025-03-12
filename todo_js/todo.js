if ("Notification" in window) {
    Notification.requestPermission();
}

document.addEventListener("DOMContentLoaded", () => {
    fetchApiTask();
    loadTasks();
    checkDueTasks() ;
});


async function fetchApiTask() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit");
        const tasks = await response.json();
        let localTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        let uniqueTasks = tasks.filter(task => !localTasks.some(t => t.text === task.title));

        uniqueTasks.forEach(task => {
            localTasks.unshift({
                id: Date.now() + Math.random(),
                text: task.title,
                category: "General",
                dueDate: "No Date",
                priority: "Low",
                recurring: "none",
                completed: task.completed
            });
        });

        localStorage.setItem("tasks", JSON.stringify(localTasks));
        loadTasks();
    } catch (error) {
        console.error("Error Fetching Task", error);
    }
    
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskDueDate = document.getElementById("taskDueDate").value;
    let taskCategory = document.getElementById("taskCategory").value;
    let taskPriority = document.getElementById("taskPriority").value;
    let taskRecurring = document.getElementById("taskRecurring").value;

    if (taskInput.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Check for duplicates before adding a new task
    if (tasks.some(task => task.text === taskInput.value.trim())) {
        alert("Task already exists!");
        return;
    }

    let newTask = {
        id: Date.now(),
        text: taskInput.value,
        category: taskCategory,
        dueDate: taskDueDate || "No Date",
        priority: taskPriority,
        recurring: taskRecurring,
        completed: false
    };

    tasks.unshift(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    document.getElementById("taskDueDate").value = "";
    loadTasks();
}
let visibleTaskCount = 5;

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    let seeMoreBtn = document.getElementById("seeMoreBtn");
    taskList.innerHTML = "";
    
    let displayedTasks = tasks.slice(0, visibleTaskCount);
    displayedTasks.forEach(task => {
        let li = document.createElement("li");
        li.className = `flex flex-col bg-gray-200 p-2 rounded transition-opacity duration-300 opacity-100 
            ${task.priority === 'High' ? 'border-l-4 border-red-500' : task.priority === 'Medium' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-green-500'}`;
        li.setAttribute("data-id", task.id);
        
        li.innerHTML = `
            <div class="flex justify-between gap-3">
                <span onClick="toggleTask(${task.id})" class="flex-1 ${task.completed ? 'line-through text-green-400 cursor-pointer' : 'text-red-400 cursor-pointer'}">
                    ${task.text}
                </span>
                <button onClick="editTask(${task.id})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
                <button onClick="removeTask(${task.id})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">X</button>
            </div>
            <div class="text-sm text-gray-600 mt-1">
                Category: <span class="font-semibold">${task.category}</span> |
                Due: <span class="font-semibold">${task.dueDate}</span> |
                Priority: <span class="font-semibold">${task.priority}</span> |
                Recurs: <span class="font-semibold">${task.recurring}</span>
            </div>
        `;
        
        taskList.appendChild(li);
    });
}
function showMoreTasks() {
    visibleTaskCount += 5; 
        loadTasks();
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find(t => t.id == id);
    if (!task) return;

    let newText = prompt("Edit Your text:", task.text);
    let newCategory = prompt("Edit Category:", task.category);
    let newDueDate = prompt("Edit due date (yyyy-mm-dd):", task.dueDate);
    let newPriority = prompt("Edit Priority (Low, Medium, High):", task.priority);
    let newRecurring = prompt("Edit recurring (daily, weekly, monthly, none):", task.recurring);

    if (newText === null || newText.trim() === "") return;

    if (newText !== null && newText.trim() !== "") task.text = newText;
    if (newCategory !== null) task.category = newCategory;
    if (newDueDate !== null) task.dueDate = newDueDate;
    if (newPriority !== null) task.priority = newPriority;
    if (newRecurring !== null) task.recurring = newRecurring;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function toggleTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find(t => t.id === id);

    if (!task) return;

    if (task.recurring !== "none") {
        task.dueDate = getNextRecurringDate(task.dueDate, task.recurring);
        task.completed = false;
    } else {
        task.completed = !task.completed;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function removeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

function checkDueTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let today = new Date().toISOString().split("T")[0];
    let dueToday = tasks.filter(task => task.dueDate === today);
    let notificationCount = document.getElementById("notificationCount");

    if (notificationCount) {
        if (dueToday.length > 0) {
            notificationCount.textContent = dueToday.length;
            notificationCount.classList.remove("hidden"); 
            notificationCount.classList.add("inline-block");

            dueToday.forEach(task => showNotification(task.text));

        } else {
            notificationCount.classList.add("hidden"); 
            notificationCount.classList.remove("inline-block");
        }
    }
}



function showNotification(taskText) {
    if (Notification.permission === "granted") {
        new Notification("Task Reminder", {
            body: `Task due today: ${taskText}`
        });
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                new Notification("Task Reminder", {
                    body: `Task due today: ${taskText}`
                });
            }
        });
    }
}
