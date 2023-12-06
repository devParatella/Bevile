const todoList = document.getElementById('todo');
const inProgressList = document.getElementById('in-progress');
const doneList = document.getElementById('done');
const newTodoInput = document.getElementById('new-todo');
const addTodoButton = document.getElementById('add-todo');

function addTodo() {
  if (newTodoInput.value !== '') {
    const newTodo = document.createElement('li');
    newTodo.innerText = newTodoInput.value;
    newTodoInput.value = '';
    newTodo.addEventListener('click', () => {
      if (newTodo.parentNode === todoList) {
        inProgressList.appendChild(newTodo);
      } else if (newTodo.parentNode === inProgressList) {
        doneList.appendChild(newTodo);
      } else {
        doneList.removeChild(newTodo);
      }
    });
    todoList.appendChild(newTodo);
  }
}

addTodoButton.addEventListener('click', addTodo);

newTodoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    addTodo();
  }
});