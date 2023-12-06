$(document).ready(function() {
	$("#buscar").click(function() {
		var cep = $("#cep").val();
		$.getJSON("https://viacep.com.br/ws/"+cep+"/json/", function(data) {
			if (!("erro" in data)) {
				$("#logradouro").val(data.logradouro);
				$("#bairro").val(data.bairro);
				$("#cidade").val(data.localidade);
				$("#estado").val(data.uf);
			}
			else {
				alert("CEP não encontrado.");
			}
		});
	});
});
$(document).ready(function() {
    $('#cpf').on('blur', function() {
      var cpf = $(this).val().replace(/[^\d]+/g,'');
      if(cpf.length != 11) {
        alert('CPF inválido!');
        $(this).val('').focus();
        return false;
      }
      $.getJSON('http://api.postmon.com.br/v1/cep/'+cpf, function(data) {
        $('#nome').val(data.nome);
        $('#endereco').val(data.endereco);
        $('#cidade').val(data.cidade);
        $('#estado').val(data.estado);
        $('#cep').val(data.cep);
      });
    });
  });
  