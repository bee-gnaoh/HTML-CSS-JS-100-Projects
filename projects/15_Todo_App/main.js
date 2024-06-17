const views = {};

views.init = function () {
  views.renderTasks();
  const toggleTheme = document.getElementById('toggleTheme');
  const inputEl = document.querySelector('input[name="create"]');
  const completedEl = document.querySelector('.todo-create .custom-checkbox');
  const filterEls = document.querySelectorAll('.item-filter ul li');
  const clearEl = document.getElementById('clearCompleted');
  const taskListEl = document.querySelectorAll('.todo-item');

  // Toggle theme
  toggleTheme.addEventListener('click', event => {
    event.preventDefault();
    views.toggleTheme();
  });

  // Filter
  for (const filter of filterEls) {
    filter.addEventListener('click', function () {
      views.filter = filter.innerText.toLowerCase();
      views.setFilterTask();
      views.renderTasks();
    });
  }

  // Create task
  clearEl.addEventListener('click', function () {
    views.clearCompletedTask();
    views.renderTasks();
  });
  completedEl.addEventListener('click', function () {
    completedEl.classList.toggle('checked');
    views.newTask.completed = completedEl.classList.contains('checked');
  });
  inputEl.addEventListener('input', function (event) {
    event.preventDefault();
    views.newTask.task = event.target.value;
  });
};

views.tasks = [];

views.newTask = { completed: false, task: '' };

views.filter = 'all';

views.clearNewTask = function () {
  views.newTask = { completed: false, task: '' };
  const inputEl = document.querySelector('input[name="create"]');
  const completedEl = document.querySelector('.todo-create .custom-checkbox');
  inputEl.value = '';
  completedEl.classList.remove('checked');
};

views.toggleTheme = function () {
  document.body.classList.toggle('dark-mode-variables');
};

views.createTask = function () {
  if (!views.newTask.task) return;
  views.tasks.push(views.newTask);
  views.clearNewTask();
};

views.renderTasks = function (tasks = views.tasks, filter = views.filter) {
  const todoListEl = document.querySelector('.todo-list');
  const countEl = document.querySelector('.item-count');
  todoListEl.innerHTML = '';
  let _tasks = tasks;
  if (filter === 'active') {
    _tasks = tasks.filter(task => !task.completed);
  } else if (filter === 'completed') {
    _tasks = tasks.filter(task => task.completed);
  }
  _tasks.forEach((task, idx) => {
    todoListEl.innerHTML += `
      <div class="todo-item" draggable="true">
        <div class="custom-checkbox ${task.completed && 'checked'}">
          <span></span>
        </div>
        <p>${task.task}</p>
        <div class="icon-cross"></div>
      </div>
    `;
  });

  // drag-drop and remove item
  const totoItemsEl = document.querySelectorAll('.todo-item');
  totoItemsEl.forEach((item, idx) => {
    const deleteEls = item.querySelector('.icon-cross');
    const completedEl = item.querySelector('.custom-checkbox');

    completedEl.addEventListener('click', function (event) {
      event.preventDefault();
      completedEl.classList.toggle('checked');
      views.tasks[idx].completed = !views.tasks[idx].completed;
    });

    item.addEventListener('dragstart', function (event) {
      item.classList.add('dragging');
    });

    item.addEventListener('dragend', function (event) {
      item.classList.remove('dragging');
    });

    deleteEls.addEventListener('click', function (event) {
      event.preventDefault();
      views.tasks.splice(idx, 1);
      views.renderTasks();
    });
  });

  todoListEl.addEventListener('dragover', function (event) {
    event.preventDefault();
    const draggingItem = document.querySelector('.dragging');
    let siblings = [...todoListEl.querySelectorAll('.todo-item:not(.dragging)')];
    let nextSibling = siblings.find(sibling => event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2);
    todoListEl.insertBefore(draggingItem, nextSibling);
  });
  countEl.innerText = `${_tasks.length} items left`;
};

views.setFilterTask = function () {
  const filterEls = document.querySelectorAll('.item-filter ul li');
  for (const filter of filterEls) {
    filter.classList.remove('active');
    if (filter.innerText.toLowerCase() === views.filter) filter.classList.add('active');
  }
  if (!views.filter) return;
};

views.clearCompletedTask = function () {
  views.tasks = views.tasks.filter(task => !task.completed);
};

window.onload = views.init;

window.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    views.createTask();
    views.renderTasks();
  }
});
