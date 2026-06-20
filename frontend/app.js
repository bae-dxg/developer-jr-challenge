const API_URL = 'http://localhost:3000/api/tasks';

// dom elements
const tasksContainer = document.getElementById('tasks-container');
const taskCount = document.getElementById('task-count');
const taskForm = document.getElementById('task-form');
const fabBtn = document.getElementById('fab-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const formOverlay = document.getElementById('form-overlay');

// ================= ui state =================
// show modal
fabBtn.addEventListener('click', () => {
    formOverlay.classList.remove('hidden');
    document.getElementById('title').focus();
});

// close modal
closeModalBtn.addEventListener('click', () => {
    formOverlay.classList.add('hidden');
});

// 1. get and show tasks
async function fetchTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        renderTasks(tasks);
    } catch (error) {
        console.error('error al cargar las tareas:', error);
    }
}

// 2. add task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, description })
        });

        // clean form and close modal
        taskForm.reset();
        formOverlay.classList.add('hidden');
        
        fetchTasks();
    } catch (error) {
        console.error('error al crear la tarea:', error);
    }
});

// 3. delete task
window.deleteTask = async function(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        
        fetchTasks();
    } catch (error) {
        console.error('error al eliminar la tarea:', error);
    }
}

// render
function renderTasks(tasks) {
    tasksContainer.innerHTML = '';
    taskCount.textContent = tasks.length;

    if (tasks.length === 0) {
        tasksContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center; margin-top: 20px;">añade una tarea para ver</p>';
        return;
    }

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-card';
        
        taskElement.innerHTML = `
            <div class="task-content">
                <div class="task-title">${task.title}</div>
                <div class="task-desc">${task.description}</div>
            </div>
            <button class="delete-btn" onclick="deleteTask('${task.id}')">✕</button>
        `;
        
        tasksContainer.appendChild(taskElement);
    });
}

// init app
fetchTasks();