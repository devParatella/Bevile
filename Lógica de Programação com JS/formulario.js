// Obtendo referências aos elementos do formulário
const formulario = document.querySelector('form');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const senha = document.getElementById('senha');

// Função para lidar com o envio do formulário
function handleFormSubmit(event) {
	// Impede que a página seja recarregada ao enviar o formulário
	event.preventDefault();

	// Obtendo os valores dos campos do formulário
	const nomeValor = nome.value;
	const emailValor = email.value;
	const senhaValor = senha.value;

	// Verificando se os campos estão preenchidos
	if (nomeValor === '' || emailValor === '' || senhaValor === '') {
		// Se algum campo estiver vazio, exibe uma mensagem de alerta
		alert('Por favor, preencha todos os campos.');
	} else {
		// Se todos os campos estiverem preenchidos, exibe uma mensagem de sucesso
		alert('O formulário foi enviado com sucesso!');
	}
}

// Adicionando um listener de evento ao formulário
form.addEventListener('submit', handleFormSubmit);