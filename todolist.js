const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];


function loadTasks() {
    tasksData.forEach(task => addTask(task.text, task.id));
}


function addTask(taskText, nextId) {
    if (taskText) {
        taskList.innerHTML += `
            <li data-id="${nextId}">
                <input type="checkbox" class="task-checkbox">
                <span>${taskText}</span>
                <button class="delete-btn">✘</button>
            </li>
        `;
    }
}

function saveTasks() {
    const taskText = taskInput.value.trim();
    const nextId = Math.max(...tasksData.map(task => task.id), -1) + 1;
    addTask(taskText, nextId);
    tasksData.push({ id: nextId, text: taskText });
    localStorage.setItem('tasks', JSON.stringify(tasksData));
    taskInput.value = '';
}

addTaskBtn.addEventListener('click', () => {
    saveTasks()
});

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        saveTasks();
    }
});

// Suppression des tâches
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const taskId = event.target.parentElement.dataset.id;
        event.target.parentElement.remove();
        tasksData.splice(
            tasksData.findIndex(task => task.id === Number(taskId)), 1); 
        localStorage.setItem('tasks', JSON.stringify(tasksData));
    }
});

// Gestion des checkboxes
taskList.addEventListener('change', (event) => {
    if (event.target.classList.contains('task-checkbox')) {
        const taskSpan = event.target.nextElementSibling;
        if (event.target.checked) {
            taskSpan.style.textDecoration = 'line-through';
        } else {
            taskSpan.style.textDecoration = 'none';
        }
    }
});


loadTasks();