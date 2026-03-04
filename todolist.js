const addTaskBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const taskContainer = document.querySelector('.task-container');

const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];


// Chargement des tâches depuis le localStorage au démarrage de l'application
function loadTasks() {
    tasksData.forEach(task => addTask(task.text, task.id));
    addBtnClearTasks();
}


// Ajout ou mise à jour d'une tâche
function addTask(taskText, nextId) {
    if (taskText) {
        const li = document.createElement('li');
        li.dataset.id = nextId;
        const input = document.createElement('input');
        input.setAttribute('type', 'checkbox');
        input.classList.add('task-checkbox');
        input.setAttribute('aria-label', `${taskText}`);
        const span = document.createElement('span');
        span.textContent = taskText;
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '✘';
        deleteBtn.setAttribute('aria-label', `Supprimer la tâche "${taskText}"`);
        deleteBtn.setAttribute('title', `Supprimer la tâche "${taskText}"`);
        document.querySelector('.sr-only').textContent = `Tâche "${taskText}" ajoutée`;

        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    }
}


// Sauvegarde des tâches dans le localStorage
function saveTasks() {
    const taskText = taskInput.value.trim();
    const nextId = Math.max(...tasksData.map(task => task.id), -1) + 1;
    addTask(taskText, nextId);
    tasksData.push({ id: nextId, text: taskText });
    localStorage.setItem('tasks', JSON.stringify(tasksData));
    taskInput.value = '';
    addBtnClearTasks();
}


// Tout supprimer
function clearTasks() {
    if (confirm("Êtes-vous sûr de vouloir supprimer toutes les tâches ?")) {
        taskList.innerHTML = '';
        tasksData.length = 0;
        localStorage.removeItem('tasks');
        addBtnClearTasks();
    }
}


function addBtnClearTasks() {
    let clearBtn = document.getElementById('clear-btn');
    if (taskList.children.length > 3){    
        if (!clearBtn) {
            clearBtn = document.createElement('button');
            clearBtn.id = 'clear-btn';
            clearBtn.textContent = 'Tout supprimer';
            clearBtn.setAttribute('aria-label', 'Supprimer toutes les tâches');
            clearBtn.addEventListener('click', clearTasks);
            document.querySelector('.sr-only').textContent = `Bouton "Tout supprimer" ajouté`;
            taskContainer.appendChild(clearBtn);
        }
    } else {
        if (clearBtn) {
            clearBtn.remove();
            document.querySelector('.sr-only').textContent = `Bouton "Tout supprimer" supprimé`;
        }
    }
}



// Ajout des tâches au clic sur le bouton ou à l'appui de la touche Entrée
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
        const taskText = event.target.previousElementSibling.textContent;
        event.target.parentElement.remove();
        tasksData.splice(
            tasksData.findIndex(task => task.id === Number(taskId)), 1); 
        localStorage.setItem('tasks', JSON.stringify(tasksData));
        document.querySelector('.sr-only').textContent = `Tâche "${taskText}" supprimée`;
        addBtnClearTasks();
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