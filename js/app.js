document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
                <button onclick="deleteTask(${index})">❌</button>
            `;
            taskList.appendChild(taskElement);
        });
    }
    
    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ text, completed: false });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
            loadTasks();
        }
    }
    
    window.toggleTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };
    
    window.deleteTask = function(index) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    };
    
    addTaskButton.addEventListener('click', addTask);
    loadTasks();
});