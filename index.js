let todos = [];

const taskListElement = document.querySelector('.task-list');
const newTaskForm = document.querySelector('#new-task-form');

const tasksList = document.querySelector('#tasks');

class Task {
    constructor(title){
        this.title = title;
        this.id = Math.random();
    }

    create(){
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
}

const createElement = (task) =>{
    const div = document.createElement('div');
    div.classList.add('task');
    div.id = task.id;

    div.innerHTML = task.create();

    return div;
}

newTaskForm.addEventListener('submit', function(event){
    event.preventDefault();
    const taskTitle = this.querySelector('#new-task-input');
    const taskTitleVale = taskTitle.value;

    const task = new Task(taskTitleVale);
    todos.push(task);

    tasksList.append(createElement(task));
});