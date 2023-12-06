const todoList = document.getElementById('todo');
const inProgressList = document.getElementById('in-progress');
const doneList = document.getElementById('done');

let draggedItem = null;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedItem = event.target;
  event.dataTransfer.setData('text/html', draggedItem);
}

function drop(event) {
  event.preventDefault();
  const targetList = event.target.closest('.kanban-list');
  targetList.appendChild(draggedItem);
}

const allItems = document.querySelectorAll('.kanban-list li');
allItems.forEach((item) => {
  item.addEventListener('dragstart', drag);
});

const allLists = document.querySelectorAll('.kanban-list');
allLists.forEach((list) => {
  list.addEventListener('dragover', allowDrop);
  list.addEventListener('drop', drop);
});