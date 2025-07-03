let pendingTasks = [];
let completedTasks = [];

// Add Task
function addTask() {
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  if (!title || !description) {
    alert('Please fill out both fields.');
    return;
  }

  const newTask = {
    id: Date.now(),
    title,
    description,
    createdAt: new Date().toLocaleString(),
    completedAt: null
  };

  pendingTasks.push(newTask);
  renderTasks();
  clearForm();
}

// Render Tasks
function renderTasks() {
  const pendingList = document.getElementById('pendingTasks');
  const completedList = document.getElementById('completedTasks');

  pendingList.innerHTML = '';
  completedList.innerHTML = '';

  pendingTasks.forEach(task => {
    const li = createTaskElement(task, false);
    pendingList.appendChild(li);
  });

  completedTasks.forEach(task => {
    const li = createTaskElement(task, true);
    completedList.appendChild(li);
  });
}

function createTaskElement(task, isCompleted) {
  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${task.title}</strong> - ${task.description}<br>
    Created: ${task.createdAt} ${task.completedAt ? `<br>Completed: ${task.completedAt}` : ''}
    <div class="task-buttons">
      ${!isCompleted ? `<button onclick="markComplete(${task.id})">Complete</button>` : ''}
      <button onclick="editTask(${task.id}, ${isCompleted})">Edit</button>
      <button onclick="deleteTask(${task.id}, ${isCompleted})">Delete</button>
    </div>
  `;
  return li;
}

function markComplete(id) {
  const index = pendingTasks.findIndex(task => task.id === id);
  if (index > -1) {
    const task = pendingTasks.splice(index, 1)[0];
    task.completedAt = new Date().toLocaleString();
    completedTasks.push(task);
    renderTasks();
  }
}

function editTask(id, isCompleted) {
  const taskList = isCompleted ? completedTasks : pendingTasks;
  const task = taskList.find(t => t.id === id);
  if (task) {
    const newTitle = prompt('Edit Title:', task.title);
    const newDesc = prompt('Edit Description:', task.description);
    if (newTitle && newDesc) {
      task.title = newTitle;
      task.description = newDesc;
      renderTasks();
    }
  }
}

function deleteTask(id, isCompleted) {
  const taskList = isCompleted ? completedTasks : pendingTasks;
  const index = taskList.findIndex(t => t.id === id);
  if (index > -1) {
    taskList.splice(index, 1);
    renderTasks();
  }
}

function clearForm() {
  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
}

// Hamburger Toggle
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
}

renderTasks();
