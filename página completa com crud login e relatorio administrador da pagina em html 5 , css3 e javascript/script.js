// Simule um banco de dados para armazenar os relatórios
const reportsDB = [];

// Função para preencher a tabela de relatórios
function populateReportTable() {
    const tableBody = document.getElementById('report-table-body');
    tableBody.innerHTML = '';

    reportsDB.forEach((report, index) => {
        const row = tableBody.insertRow();
        const cellId = row.insertCell(0);
        const cellName = row.insertCell(1);
        const cellEmail = row.insertCell(2);
        const cellActions = row.insertCell(3);

        cellId.innerHTML = index + 1;
        cellName.innerHTML = report.name;
        cellEmail.innerHTML = report.email;
        cellActions.innerHTML = `<button onclick="editReport(${index})">Editar</button>
                                <button onclick="deleteReport(${index})">Excluir</button>`;
    });
}

// Função para adicionar ou editar um relatório
function addOrEditReport(report) {
    if (report.id === undefined) {
        // Adicionar um novo relatório
        reportsDB.push(report);
    } else {
        // Editar um relatório existente
        reportsDB[report.id] = report;
    }
    populateReportTable();
    clearReportForm();
}

// Função para editar um relatório
function editReport(id) {
    const report = reportsDB[id];
    document.getElementById('report-id').value = id;
    document.getElementById('report-name').value = report.name;
    document.getElementById('report-email').value = report.email;
}

// Função para excluir um relatório
function deleteReport(id) {
    reportsDB.splice(id, 1);
    populateReportTable();
}

// Função para limpar o formulário de relatório
function clearReportForm() {
    document.getElementById('report-id').value = '';
    document.getElementById('report-name').value = '';
    document.getElementById('report-email').value = '';
}

// Evento de envio do formulário de relatório
document.getElementById('report-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const reportId = document.getElementById('report-id').value;
    const reportName = document.getElementById('report-name').value;
    const reportEmail = document.getElementById('report-email').value;

    const report = {
        id: reportId === '' ? undefined : parseInt(reportId),
        name: reportName,
        email: reportEmail,
    };

    addOrEditReport(report);
    clearReportForm();
});

// Evento de saída do painel de administração
document.getElementById('logout-button').addEventListener('click', function () {
    window.location.href = 'login.html';
});

// Inicialização
populateReportTable();
