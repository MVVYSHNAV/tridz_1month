document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const limit = 5;
  const baseUrl = "https://jsonplaceholder.typicode.com/todos";
  let currentFilter = "all";

  // DOM Selectors
  const taskForm = document.getElementById("task-form");
  const taskInput = document.querySelector(".taskinput");
  const taskList = document.querySelector(".tasklist");
  const clearBtn = document.querySelector(".clearbtn");
  const prevBtn = document.querySelector(".prevBtn");
  const nextBtn = document.querySelector(".nextBtn");
  const taskSelect = document.querySelector(".taskselect");
  const pageCountEl = document.querySelector(".pagecount");

  function updatePageCount() {
      pageCountEl.textContent = `Page ${currentPage}`;
  }

  function loadTasks(page = 1, filter = "all") {
      taskList.innerHTML = "";
      updatePageCount();

      let url = `${baseUrl}?_limit=${limit}&_page=${page}`;
      if (filter === "completed") url += "&completed=true";
      else if (filter === "incomplete") url += "&completed=false";

      fetch(url)
          .then(response => response.json())
          .then(data => data.forEach(task => createTaskElement(task)))
          .catch(err => console.error("Error loading tasks:", err));
  }

  function createTaskElement(task) {
      const li = document.createElement("li");
      li.className = "bg-gray-800 p-4 rounded-lg flex justify-between items-center shadow-md";
      li.setAttribute("data-id", task.id);

      const titleSpan = document.createElement("span");
      titleSpan.textContent = task.title;
      titleSpan.className = "flex-1 text-white overflow-x-scroll";
      if (task.completed) titleSpan.classList.add("line-through", "text-green-400");

      const buttonContainer = document.createElement("div");
      buttonContainer.className = "flex gap-2";

      const editBtn = createButton("✏️", "editbtn bg-black text-white px-3 py-1 rounded-lg shadow-md", () =>
          enableEditTask(li, task.id, titleSpan)
      );

      const completeBtn = createButton(
          task.completed ? "❌" : "✅",
          `completebtn ${task.completed ? "bg-gray-500" : "bg-green-500"} text-white px-3 py-1 rounded-lg shadow-md`,
          () => toggleTaskCompletion(task.id, titleSpan, completeBtn)
      );

      const deleteBtn = createButton("delete", "trashbtn bg-red-500 text-white px-3 py-1 rounded-lg shadow-md", () => {
          deleteTask(task.id)
              .then(() => li.remove())
              .catch(err => console.error("Error deleting task:", err));
      });

      buttonContainer.append(editBtn, deleteBtn, completeBtn);
      li.append(titleSpan, buttonContainer);
      taskList.appendChild(li);
  }

  function createButton(text, className, onClick) {
      const button = document.createElement("button");
      button.innerHTML = text;
      button.className = className;
      button.addEventListener("click", onClick);
      return button;
  }

  function enableEditTask(li, taskId, titleSpan) {
      const input = document.createElement("input");
      input.type = "text";
      input.value = titleSpan.textContent;
      input.className = "text-black px-2 py-1 rounded";
      
      const saveBtn = createButton("💾", "savebtn bg-blue-500 text-white px-3 py-1 rounded-lg", () => {
          updateTask(taskId, { title: input.value })
              .then(() => {
                  titleSpan.textContent = input.value;
                  li.replaceChild(titleSpan, input);
                  li.replaceChild(li.querySelector(".editbtn"), saveBtn);
              })
              .catch(err => console.error("Error updating task:", err));
      });

      li.replaceChild(input, titleSpan);
      li.replaceChild(saveBtn, li.querySelector(".editbtn"));
  }

  function addTask(taskTitle) {
      const newTask = { title: taskTitle, completed: false, userId: 1 };
      return fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask)
      })
          .then(response => response.json())
          .then(addedTask => {
              if (currentPage === 1 && (currentFilter === "all" || currentFilter === "incomplete"))
                  createTaskElement(addedTask);
              taskInput.value = "";
          })
          .catch(err => console.error("Error adding task:", err));
  }

  function updateTask(taskId, updateData) {
      return fetch(`${baseUrl}/${taskId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData)
      }).then(response => response.json());
  }

  function deleteTask(taskId) {
      return fetch(`${baseUrl}/${taskId}`, { method: "DELETE" })
          .then(response => {
              if (!response.ok) throw new Error("Failed to delete task");
              return response.json();
          });
  }

  function toggleTaskCompletion(taskId, titleSpan, completeBtn) {
      const isCompleted = titleSpan.classList.contains("line-through");
      updateTask(taskId, { completed: !isCompleted })
          .then(updatedTask => {
              titleSpan.classList.toggle("line-through", updatedTask.completed);
              titleSpan.classList.toggle("text-green-400", updatedTask.completed);
              completeBtn.innerHTML = updatedTask.completed ? "❌" : "✅";
              completeBtn.classList.toggle("bg-gray-500", updatedTask.completed);
              completeBtn.classList.toggle("bg-green-500", !updatedTask.completed);
          })
          .catch(err => console.error("Error updating task:", err));
  }

  taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskTitle = taskInput.value.trim();
      if (taskTitle) addTask(taskTitle);
  });

  clearBtn.addEventListener("click", () => taskInput.value = "");

  taskSelect.addEventListener("change", (e) => {
      currentFilter = e.target.value;
      currentPage = 1;
      loadTasks(currentPage, currentFilter);
  });

  nextBtn.addEventListener("click", () => loadTasks(++currentPage, currentFilter));
  prevBtn.addEventListener("click", () => currentPage > 1 && loadTasks(--currentPage, currentFilter));

  loadTasks(currentPage, currentFilter);
});
