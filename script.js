document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Function to add a new task
    function addTask(taskText, save = true) {
        const trimmedText = taskText.trim();
        if (trimmedText === "") {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = trimmedText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeFromStorage(trimmedText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if (save) {
            saveToStorage(trimmedText);
        }

        taskInput.value = '';
    }

    // Save a task to local storage
    function saveToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Remove a task from local storage
    function removeFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // ✅ Required function: Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => addTask(task, false)); // Don't re-save to localStorage
    }

    // Event listener for Add button
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Event listener for Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});