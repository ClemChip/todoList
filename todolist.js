const addTaskBtn = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        taskList.innerHTML += `
            <li>
                <input type="checkbox" class="task-checkbox">
                <span>${taskText}</span>
                <button class="delete-btn">X</button>
            </li>
        `;
        taskInput.value = '';
    }
});

// Suppression des tâches
taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
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
