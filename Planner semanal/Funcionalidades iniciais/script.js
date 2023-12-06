document.addEventListener('DOMContentLoaded', function () {
    const diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

    const semanaContainer = document.getElementById('semana');
    const tarefasContainer = document.getElementById('tarefas-container');
    const diaSelect = document.getElementById('dia');

    // Preenche os dias da semana no seletor
    diasSemana.forEach(dia => {
        const option = document.createElement('option');
        option.value = dia;
        option.textContent = dia;
        diaSelect.appendChild(option);
    });

    // Adiciona os dias da semana no cabeçalho
    diasSemana.forEach(dia => {
        const divDia = document.createElement('div');
        divDia.classList.add('dia');
        divDia.textContent = dia;
        semanaContainer.appendChild(divDia);
    });

    function adicionarTarefa() {
        const dia = diaSelect.value;
        const tarefaTexto = document.getElementById('tarefa').value;

        if (dia && tarefaTexto) {
            const divTarefa = document.createElement('div');
            divTarefa.classList.add('tarefa');
            divTarefa.innerHTML = `<strong>${dia}:</strong> ${tarefaTexto} 
                <button onclick="removerTarefa(this)">Remover</button>
                <button onclick="editarTarefa(this)">Editar</button>`;
            tarefasContainer.appendChild(divTarefa);

            const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
            tarefas.push({ dia, tarefa: tarefaTexto });
            localStorage.setItem('tarefas', JSON.stringify(tarefas));

            document.getElementById('tarefa').value = '';
        } else {
            alert('Por favor, preencha o dia e a tarefa.');
        }
    }

    function removerTarefa(element) {
        const tarefa = element.parentElement;
        tarefasContainer.removeChild(tarefa);

        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        const diaTarefa = tarefa.firstChild.textContent.replace(':', '');
        const novaListaTarefas = tarefas.filter(t => !(t.dia === diaTarefa && t.tarefa === tarefa.childNodes[1].textContent.trim()));
        localStorage.setItem('tarefas', JSON.stringify(novaListaTarefas));
    }

    function visualizarPlanner() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        tarefasContainer.innerHTML = '';

        tarefas.forEach(tarefa => {
            const divTarefa = document.createElement('div');
            divTarefa.classList.add('tarefa');
            divTarefa.innerHTML = `<strong>${tarefa.dia}:</strong> ${tarefa.tarefa} 
                <button onclick="removerTarefa(this)">Remover</button>
                <button onclick="editarTarefa(this)">Editar</button>`;
            tarefasContainer.appendChild(divTarefa);
        });
    }

    function editarTarefa(element) {
        const tarefa = element.parentElement;
        const diaTarefa = tarefa.firstChild.textContent.replace(':', '');
        const tarefaTexto = tarefa.childNodes[1].textContent.trim();

        // Cria um formulário de edição
        const formularioEdicao = document.createElement('div');
        formularioEdicao.classList.add('edicao-tarefa');
        formularioEdicao.innerHTML = `
            <input type="text" value="${tarefaTexto}">
            <button onclick="confirmarEdicao('${diaTarefa}')">Confirmar</button>
        `;

        // Substitui a tarefa pelo formulário de edição
        tarefasContainer.replaceChild(formularioEdicao, tarefa);
    }

    function confirmarEdicao(diaTarefa) {
        const formularioEdicao = document.querySelector('.edicao-tarefa');
        const novoTexto = formularioEdicao.querySelector('input').value;

        // Recupera as tarefas salvas
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

        // Atualiza a tarefa correspondente no array
        tarefas.forEach(tarefa => {
            if (tarefa.dia === diaTarefa && tarefa.tarefa === novoTexto) {
                tarefa.tarefa = novoTexto;
            }
        });

        // Atualiza o localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));

        // Atualiza a interface
        visualizarPlanner();
    }

    function carregarTarefasSalvas() {
        const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
        tarefas.forEach(tarefa => {
            const divTarefa = document.createElement('div');
            divTarefa.classList.add('tarefa');
            divTarefa.innerHTML = `<strong>${tarefa.dia}:</strong> ${tarefa.tarefa} 
                <button onclick="removerTarefa(this)">Remover</button>
                <button onclick="editarTarefa(this)">Editar</button>`;
            tarefasContainer.appendChild(divTarefa);
        });
    }

    carregarTarefasSalvas();

    // Adiciona a função de visualização do planner ao botão correspondente
    document.querySelector('.visualizar-planner button').addEventListener('click', visualizarPlanner);
});
