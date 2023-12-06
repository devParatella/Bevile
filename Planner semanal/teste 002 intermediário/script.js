// Função para adicionar uma nova tarefa
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const tasksContainer = document.getElementById('tasks');

    if (taskInput.value.trim() !== '') {
        // Criar uma nova tarefa
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.textContent = taskInput.value;

        // Adicionar botões de edição e exclusão à tarefa
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editTask(taskElement));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deleteTask(taskElement));

        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        // Adicionar a nova tarefa ao contêiner
        tasksContainer.appendChild(taskElement);
        taskInput.value = '';

        // Salvar as tarefas no armazenamento local
        saveTasksToLocalStorage();
    }
}

// Função para editar uma tarefa
function editTask(taskElement) {
    const newText = prompt('Editar Tarefa:', taskElement.textContent.trim());
    if (newText !== null) {
        taskElement.textContent = newText;

        // Salvar as tarefas atualizadas no armazenamento local
        saveTasksToLocalStorage();
    }
}

// Função para excluir uma tarefa
function deleteTask(taskElement) {
    if (confirm('Tem certeza de que deseja excluir esta tarefa?')) {
        taskElement.remove();

        // Salvar as tarefas atualizadas no armazenamento local
        saveTasksToLocalStorage();
    }
}

// Função para salvar as tarefas no armazenamento local
function saveTasksToLocalStorage() {
    const tasks = document.querySelectorAll('.task');
    const tasksData = [];

    tasks.forEach(task => {
        tasksData.push({
            text: task.textContent.trim(),
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasksData));
}

// Função para carregar as tarefas do armazenamento local
function loadTasksFromLocalStorage() {
    const tasksContainer = document.getElementById('tasks');
    const tasksData = JSON.parse(localStorage.getItem('tasks')) || [];

    tasksData.forEach(taskData => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.textContent = taskData.text;

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editTask(taskElement));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.addEventListener('click', () => deleteTask(taskElement));

        taskElement.appendChild(editButton);
        taskElement.appendChild(deleteButton);

        tasksContainer.appendChild(taskElement);
    });
}

// Carregar as tarefas salvas ao carregar a página
loadTasksFromLocalStorage();
