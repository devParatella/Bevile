function buscarDados() {
    var cpf = document.getElementById("cpf").value.replace(/[^\d]+/g, '');
    if (cpf.length != 11) {
        alert('CPF inválido!');
        document.getElementById("cpf").value = "";
        document.getElementById("cpf").focus();
        return false;
    }
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            var resultado = document.getElementById("resultado");
            resultado.innerHTML = "";
            resultado.innerHTML += "<p>Nome: " + data.nome + "</p>";
            resultado.innerHTML += "<p>Endereço: " + data.endereco + "</p>";
            resultado.innerHTML += "<p>Cidade: " + data.cidade + "</p>";
            resultado.innerHTML += "<p>Estado: " + data.estado + "</p>";
            resultado.innerHTML += "<p>CEP: " + data.cep + "</p>";
        }
    };
    xhr.open("GET", "http://api.postmon.com.br/v1/cep/" + cpf, true);
    xhr.send();
}
