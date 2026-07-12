const addTask = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const todoContainer = document.querySelector('.todoContainer');
const remainder = document.getElementById('remainder');

let todoCount = 0;

function updateRemainder() {
    remainder.innerText = `Your remaining todos: ${todoCount}`;
}

function createTodo(value) {
    const todo = `
        <p>${value}</p>
        <i class="fa-solid fa-xmark removeTask"></i>`;
    return todo;
}

function addTodo(value) {
    const div = document.createElement('div');
    div.innerHTML = createTodo(value);
    div.classList.add('todo', 'flex');
    todoContainer.prepend(div);

    todoCount++;
    updateRemainder();

    div.addEventListener('click', (e) => {
        if (e.target.classList.contains('removeTask')) {
            return;
        }
        div.classList.toggle('active');

        if (div.classList.contains('active')) {
            todoCount--;
        } else {
            todoCount++;
        }
        updateRemainder();
    });

    const removeIcon = div.querySelector('.removeTask');

    removeIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!div.classList.contains('active')) {
            todoCount--;
        }
        div.remove();
        updateRemainder();
    });
}

// create inital task
addTodo('This is an example of task #1');

// task creation event
addTask.addEventListener('click', () => {
    const currentInputValue = taskInput.value.trim();
    if (currentInputValue) {
        addTodo(currentInputValue);
        taskInput.value = '';
    }
});
