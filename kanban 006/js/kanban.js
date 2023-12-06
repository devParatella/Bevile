// Define as constantes para as colunas do kanban
const toDoList = document.getElementById('to-do');
const doingList = document.getElementById('doing');
const doneList = document.getElementById('done');

// Define o evento de dragstart para os itens do kanban
let draggedItem = null;

function dragStart() {
  draggedItem = this;
  setTimeout(() => {
    this.style.display = 'none';
  }, 0);
}

function dragEnd() {
  setTimeout(() => {
    draggedItem.style.display = 'block';
    draggedItem = null;
  }, 0);
}

// Define os eventos de dragover e drop para as colunas do kanban
function dragOver(e) {
  e.preventDefault();
}

function drop() {
  const parentList = this;
  const items = parentList.querySelectorAll('.kanban-item:not(.kanban-item-placeholder)');
  const dropIndex = [...items].indexOf(this.placeholder);
  const dragIndex = [...items].indexOf(draggedItem);

  if (dragIndex > dropIndex) {
    parentList.insertBefore(draggedItem, this.placeholder);
  } else {
    parentList.insertBefore(draggedItem, this.placeholder.nextSibling);
  }
}

// Define os eventos de click para os botões de excluir e duplicar tarefa
function deleteItem() {
  const item = this.closest('.kanban-item');
  item.remove();
}
function duplicateItem() {
  const item = this.closest('.kanban-item');
  const newItem = item.cloneNode(true);
  const title = newItem.querySelector('.kanban-item-title');
  title.textContent += ' (cópia)';
  newItem.classList.remove('selected');

  // Define o evento de click para os botões de excluir e duplicar tarefa do novo item
  const deleteButton = newItem.querySelector('.delete-item-button');
  deleteButton.addEventListener('click', deleteItem);

  const duplicateButton = newItem.querySelector('.duplicate-item-button');
  duplicateButton.addEventListener('click', duplicateItem);

  // Adiciona o novo item à coluna correta
  const parentList = item.closest('.kanban-list');

  if (parentList === toDoList) {
    toDoList.insertBefore(newItem, item.nextSibling);
  } else if (parentList === doingList) {
    doingList.insertBefore(newItem, item.nextSibling);
  } else if (parentList === doneList) {
    doneList.insertBefore(newItem, item.nextSibling);
  }
}

// Define o evento de click para o botão de adicionar tarefa
const addItemButton = document.getElementById('add-item-button');
addItemButton.addEventListener('click', addItem);

// Define o evento de click para os itens do kanban
const kanbanItems = document.querySelectorAll('.kanban-item');

kanbanItems.forEach(item => {
  item.addEventListener('click', selectItem);
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});

// Define o evento de dragover e drop para as colunas do kanban
const kanbanLists = document.querySelectorAll('.kanban-list');

kanbanLists.forEach(list => {
  list.addEventListener('dragover', dragOver);
  list.addEventListener('drop', drop);
});

// Define o placeholder para os itens do kanban durante a operação de drag and drop
const itemPlaceholder = document.createElement('div');
itemPlaceholder.classList.add('kanban-item-placeholder');

kanbanItems.forEach(item => {
  item.addEventListener('dragstart', () => {
    item.classList.add('dragging');
    item.after(itemPlaceholder);
  });

  item.addEventListener('dragend', () => {
    item.classList.remove('dragging');
    itemPlaceholder.remove();
  });
});