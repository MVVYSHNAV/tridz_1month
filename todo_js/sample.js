// Request notification permission
if ("Notification" in window) {
  Notification.requestPermission();
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

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

  let newTask = {
      id: Date.now(),
      text: taskInput.value,
      category: taskCategory,
      dueDate: taskDueDate || "No Date",
      priority: taskPriority,
      recurring: taskRecurring,
      completed: false
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  document.getElementById("taskDueDate").value = "";

  console.log("Task Added:", newTask);
  loadTasks(); // Refresh the task list
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  console.log("Loading Tasks:", tasks);

  tasks.forEach(task => {
      let li = document.createElement("li");
      li.className = `flex flex-col bg-gray-200 p-2 rounded transition-opacity duration-300 opacity-100 
          ${task.priority === 'High' ? 'border-l-4 border-red-500' : task.priority === 'Medium' ? 'border-l-4 border-yellow-500' : 'border-l-4 border-green-500'}`;
      li.setAttribute("data-id", task.id);

      li.innerHTML = `
          <div class="flex justify-between">
              <span onclick="toggleTask(${task.id})" class="flex-1 ${task.completed ? 'line-through' : ''}">
                  ${task.text}
              </span>
              <button onclick="editTask(${task.id})" class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600">Edit</button>
              <button onclick="removeTask(${task.id})" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">X</button>
          </div>
          <div class="text-sm text-gray-600 mt-1">
              Category: <span class="font-semibold">${task.category}</span> |
              Due: <span class="font-semibold">${task.dueDate}</span> |
              Priority: <span class="font-semibold">${task.priority}</span> |
              Recurs: <span class="font-semibold">${task.recurring !== "none" ? task.recurring : "No"}</span>
          </div>
      `;

      taskList.appendChild(li);
  });

  checkDueTasks();
}
function editTask(id) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let task = tasks.find(t => t.id === id);

  if (!task) return;

  // Get updated values from user
  let newText = prompt("Edit your task:", task.text);
  let newCategory = prompt("Edit category:", task.category);
  let newDueDate = prompt("Edit due date (YYYY-MM-DD):", task.dueDate);
  let newPriority = prompt("Edit priority (Low, Medium, High):", task.priority);
  let newRecurring = prompt("Edit recurring (daily, weekly, monthly, none):", task.recurring);

  // Ensure user doesn't leave it blank
  if (newText === null || newText.trim() === "") return;

  // Update task properties
  task.text = newText;
  task.category = newCategory || task.category;
  task.dueDate = newDueDate || task.dueDate;
  task.priority = newPriority || task.priority;
  task.recurring = newRecurring || task.recurring;

  // Save updated tasks
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Refresh task list
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

  if (dueToday.length > 0) {
      notificationCount.textContent = dueToday.length;
      notificationCount.classList.remove("hidden");
      dueToday.forEach(task => showNotification(task.text));
      alert(`You have ${dueToday.length} task(s) due today!`);
  } else {
      notificationCount.classList.add("hidden");
  }
}

function showNotification(taskText) {
  if (Notification.permission === "granted") {
      new Notification("Task Reminder 📝", { body: `Task due today: ${taskText}` });
  }
}
