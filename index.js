let todos = [];

const ntod = JSON.parse(localStorage.getItem('todos'));

const taskListElement = document.querySelector('.task-list');
const newTaskForm = document.querySelector('#new-task-form');

const tasksList = document.querySelector('#tasks');

const save = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

class Task {
    constructor(title){
        this.title = title;
        this.id = Math.random();
    }

    create(){
        save();
        return `
        <div class="content">
            <input 
                type="text" 
                class="text" 
                value="${this.title}"
            readonly>
        </div>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        `
    }

    edit(){
        return `
        <div class="content">
            <input 
                type="text" 
                class="text" 
                value="${this.title}"
            >
        </div>
        <div class="actions">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        `
    }
}

const createElement = (task) =>{
    const div = document.createElement('div');
    div.classList.add('task');
    div.id = task.id;

    div.innerHTML = task.create();

    div.querySelector('.delete').addEventListener('click', () => {
        div.remove();

        todos = todos.filter(todo => todo.id !== task.id);
        save();
    });

    div.querySelector('.edit').addEventListener('click', () => {
        div.innerHTML = task.edit();
        div.querySelector('input').focus();


        div.querySelector('input').addEventListener('keydown', function(e){
            if (e.keyCode === 13) {
                task.title = div.querySelector('input').value;
                div.innerHTML = task.create();
            }
        });
    });

    return div;
}

const createTask = (taskTitle) => {
    const task = new Task(taskTitle);
    todos.push(task);

    tasksList.append(createElement(task));
}

newTaskForm.addEventListener('submit', function(event){
    event.preventDefault();
    const taskTitle = this.querySelector('#new-task-input');
    const taskTitleValue = taskTitle.value;
    taskTitle.value= '';

    createTask(taskTitleValue);
});

const display = () => {
    if(ntod){
        ntod.forEach(todo => {
            createTask(todo.title);
       })   
    }
};

display();