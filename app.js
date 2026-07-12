const addTask = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const todoContainer = document.querySelector('.todoContainer');
const remainder = document.getElementById('remainder');

// create an array for the tasks
let tasksArray = [];

function updateRemainder() {
    const remainingCount = tasksArray.filter(
        (task) => !task.isCompleted,
    ).length;
    remainder.innerText = `Your remaining todos: ${remainingCount}`;
}

// function to save to Local Storage
function saveToStorage() {
    localStorage.setItem('myTodoList', JSON.stringify(tasksArray));
}

function createTodo(value) {
    const todo = `
        <p>${value}</p>
        <i class="fa-solid fa-xmark removeTask"></i>`;
    return todo;
}

function addTodo(taskObj) {
    const div = document.createElement('div');
    div.innerHTML = createTodo(taskObj.text);
    div.classList.add('todo', 'flex');

    // checks if task object is active
    if (taskObj.isCompleted) {
        div.classList.add('active');
    }

    todoContainer.prepend(div);
    updateRemainder();

    div.addEventListener('click', (e) => {
        if (e.target.classList.contains('removeTask')) {
            return;
        }
        div.classList.toggle('active');

        // Update the active state in our array
        taskObj.isCompleted = div.classList.contains('active');

        updateRemainder();
        saveToStorage(); // Save change when a task is toggled
    });

    const removeIcon = div.querySelector('.removeTask');

    removeIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        tasksArray = tasksArray.filter((item) => item.id !== taskObj.id);
        div.remove();
        updateRemainder();
        saveToStorage();
    });
}

function initApp() {
    const storedTasks = localStorage.getItem('myTodoList');

    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        tasksArray.forEach((task) => {
            addTodo(task);
        });
        updateRemainder();
    } else {
        const defaultTask = {
            id: Date.now(),
            text: 'This is an example of task #1',
            isCompleted: false,
        };
        tasksArray.push(defaultTask);
        addTodo(defaultTask);
        saveToStorage();
    }
}

addTask.addEventListener('click', () => {
    const currentInputValue = taskInput.value.trim();
    if (currentInputValue) {
        const newTask = {
            id: Date.now(),
            text: currentInputValue,
            isCompleted: false,
        };

        tasksArray.push(newTask);
        addTodo(newTask);
        saveToStorage();
        taskInput.value = '';
    }
});

initApp();
