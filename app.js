// Day and Night Mode
const checkbox = document.querySelector('.checkbox');
const slider = document.querySelector('.slider');
const switchMode = document.querySelector('.switch');
const body = document.querySelector('body');
const mode = document.querySelector('.mode');
const form = document.querySelector('form');

checkbox.addEventListener('click', () => {
    setTimeout(function changeText() {
        if (mode.textContent === "Day") {
            mode.textContent = "Night";
        } else if (mode.textContent === "Night") {
            mode.textContent = "Day";
        }
    }, 150)
    todoInput.classList.toggle('form-background');
    addBtn.classList.toggle('form-background');
    form.classList.toggle('form-background');
    body.classList.toggle('dark-mode');
    slider.classList.toggle('active');
    switchMode.classList.toggle('background-active');
})

// Selectors
const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('#filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodo);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event) {
    // Prevent from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.classList.add('uncompleted');
    // Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add Todo to Local Storage
    saveLocal(newTodo.innerText);
    // Check Mark Button
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn);
    // Trash Button
    const trashBtn = document.createElement('button');
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add('trash-btn');
    todoDiv.appendChild(trashBtn);
    // Add All to Todo List
    todoList.appendChild(todoDiv);
    // Clear Input Value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    // Delete Todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        removeTodo(todo.children[0].innerText);
        todo.classList.add('fall');
        setTimeout(() => {
            todo.remove();
        }, 800);
    }
    // Complete Todo
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        todo.classList.toggle('uncompleted');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains('uncompleted')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

function saveLocal(todo) {
    // Check if todo already in storage
    let todoArray;
    if (localStorage.getItem('todos') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todos'));
    }
    todoArray.push(todo);
    localStorage.setItem('todos', JSON.stringify(todoArray));
    console.log(todoArray);
}

function getTodo() {
    // Check if todo already in storage
    let todoArray;
    if (localStorage.getItem('todos') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todos'));
    }

    todoArray.forEach(function(todo) {
        // Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        todoDiv.classList.add('uncompleted');
        // Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        // Check Mark Button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn);
        // Trash Button
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);
        // Add All to Todo List
        todoList.appendChild(todoDiv);
        // Make sure completed task has breakthrough on the div
        
    })
}

function removeTodo(todo) {
    // Check if todo already in storage
    let todoArray;
    if (localStorage.getItem('todos') === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todoArray.indexOf(todo);
    todoArray.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todoArray));
    console.log(todoArray);
}

