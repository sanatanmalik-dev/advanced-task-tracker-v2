const taskTitle = document.getElementById('task-title');
const taskCategory = document.getElementById('task-category');
const taskPriority = document.getElementById('task-priority');
const addTaskBtn = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');
const filterCategory = document.getElementById('filter-category');
const filterPriority = document.getElementById('filter-priority');
const clearFilters = document.getElementById('clear-filters');
const toggleDark = document.getElementById('toggle-dark');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    tasksList.innerHTML = '';
    let filteredTasks = tasks.filter(task => {
        return (filterCategory.value === '' || task.category.toLowerCase().includes(filterCategory.value.toLowerCase())) &&
               (filterPriority.value === '' || task.priority === filterPriority.value);
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.title} [${task.category} | ${task.priority}]</span>
            <div>
                <button onclick="editTask(${index})">Edit</button>
                <button onclick="deleteTask(${index})">Delete</button>
            </div>
        `;
        tasksList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const task = tasks[index];
    const newTitle = prompt("Edit Task Title:", task.title);
    const newCategory = prompt("Edit Category:", task.category);
    const newPriority = prompt("Edit Priority (High/Medium/Low):", task.priority);
    if (newTitle && newCategory && newPriority) {
        tasks[index] = { title: newTitle, category: newCategory, priority: newPriority };
        saveTasks();
        renderTasks();
    }
}

addTaskBtn.addEventListener('click', () => {
    if(taskTitle.value.trim() === '' || taskCategory.value.trim() === '') return;
    const newTask = {
        title: taskTitle.value,
        category: taskCategory.value,
        priority: taskPriority.value
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskTitle.value = '';
    taskCategory.value = '';
});

clearFilters.addEventListener('click', () => {
    filterCategory.value = '';
    filterPriority.value = '';
    renderTasks();
});

toggleDark.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

renderTasks();
