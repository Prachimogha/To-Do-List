// script.js
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const completeBtn = document.getElementById('complete-btn');
const incompleteBtn = document.getElementById('incomplete-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const todoList = document.getElementById('todo-list');
let todoItems = [];

addBtn.addEventListener('click', addTodoItem);
completeBtn.addEventListener('click', showComplete);
incompleteBtn.addEventListener('click', showIncomplete);
deleteAllBtn.addEventListener('click', deleteAll);

function addTodoItem() {
    const todoItem = todoInput.value.trim();
    if (todoItem !== '') {
        const todoListItem = document.createElement('li');
        todoListItem.textContent = todoItem;
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete-btn';
        todoListItem.appendChild(completeBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        todoListItem.appendChild(deleteBtn);
        todoList.appendChild(todoListItem);
        todoItems.push({ text: todoItem, completed: false });
        todoInput.value = '';
        saveTodoItems();
    }
}

function showComplete() {
    todoList.innerHTML = '';
    todoItems.forEach((todoItem) => {
        if (todoItem.completed) {
            const todoListItem = document.createElement('li');
            todoListItem.textContent = todoItem.text;
            todoList.appendChild(todoListItem);
        }
    });
}

function showIncomplete() {
    todoList.innerHTML = '';
    todoItems.forEach((todoItem) => {
        if (!todoItem.completed) {
            const todoListItem = document.createElement('li');
            todoListItem.textContent = todoItem.text;
            const completeBtn = document.createElement('button');
            completeBtn.textContent = 'Complete';
            completeBtn.className = 'complete-btn';
            todoListItem.appendChild(completeBtn);
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            todoListItem.appendChild(deleteBtn);
            todoList.appendChild(todoListItem);
        }
    });
}

function deleteAll() {
    todoItems.length = 0;
    todoList.innerHTML = '';
    saveTodoItems();
}

function saveTodoItems() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
}

function loadTodoItems() {
    const storedTodoItems = localStorage.getItem('todoItems');
    if (storedTodoItems) {
        todoItems = JSON.parse(storedTodoItems);
        todoItems.forEach((todoItem) => {
            const todoListItem = document.createElement('li');
            todoListItem.textContent = todoItem.text;
            if (todoItem.completed) {
                todoListItem.className = 'completed';
            } else {
                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Complete';
                completeBtn.className = 'complete-btn';
                todoListItem.appendChild(completeBtn);
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.className = 'delete-btn';
                todoListItem.appendChild(deleteBtn);
            }
            todoList.appendChild(todoListItem);
        });
    }
}

loadTodoItems();

// Add event listener to complete and delete buttons
todoList.addEventListener('click', handleTodoListClick);

function handleTodoListClick(event) {
    if (event.target.className === 'complete-btn') {
        const todoItem = event.target.parentNode;
        const index = Array.prototype.indexOf.call(todoList.children, todoItem);
        todoItems[index].completed = true;
        todoItem.className = 'completed';
        saveTodoItems();
    } else if (event.target.className === 'delete-btn') {
        const todoItem = event.target.parentNode;
        const index = Array.prototype.indexOf.call(todoList.children, todoItem);
        todoItems.splice(index, 1);
        todoList.removeChild(todoItem);
        saveTodoItems();
    }
}