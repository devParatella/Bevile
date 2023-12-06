$(document).ready(function () {
  // Exemplo de interação com o calendário de check-in e check-out
  const checkinField = $("#checkin");
  const checkoutField = $("#checkout");
  const calendar = $("#calendar");

  // Obtém a data atual no formato "DD-MM-AAAA"
  var dataAtual = new Date().toISOString().slice(0, 10);
  //var dataAmanha = new Date().toISOString().slice(0, 10);

  // Define o valor mínimo para o campo de entrada de data como a data atual
  document.getElementById("checkin").min = dataAtual;
  var checkoutElement = document.getElementById("checkout");

  // Obter a data de amanhã
  var dataAmanha = new Date();
  dataAmanha.setDate(dataAmanha.getDate() + 1);

  // Definir a data mínima como amanhã
  checkoutElement.min = dataAmanha.toISOString().slice(0, 10);

  // Validação de formulário de verificação
  $("#reservation-form").submit(function (event) {
    event.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const adults = $("#adults").val();
    const children = $("#children").val();

    if (!name || !email || !adults || adults < 1) {
      alert(
        "Preencha todos os campos obrigatórios e indique pelo menos 1 adulto."
      );
    } else {
      alert("Reserva realizada com sucesso!");
      $("#reservation-form")[0].reset();
    }
  });

  // Integre a lógica da primeira seção de JavaScript (solicitação de quartos) aqui
  $("#reservation-form").on("submit", function (event) {
    event.preventDefault();

    const checkin = document.getElementById("checkin").value;
    const checkout = document.getElementById("checkout").value;
    const adults = parseInt(document.getElementById("adults").value);
    const children = parseInt(document.getElementById("children").value);

    // Realize uma solicitação para obter dados dos quartos compatíveis com as opções selecionadas.
    // Você pode usar uma fonte de dados, como um arquivo JSON ou uma API.
    // Por exemplo, aqui, estamos apenas usando um array de exemplo.
    const data = [
      { foto: "url_da_foto_1", descricao: "Descrição do quarto 1" },
      { foto: "url_da_foto_2", descricao: "Descrição do quarto 2" },
      // Adicione mais quartos aqui conforme necessário.
    ];

    const roomList = $("#room-list");

    // Limpe a tabela de resultados existente.
    roomList.html("");

    // Filtre os quartos compatíveis com as opções selecionadas.
    const quartosCompatíveis = data.filter((quarto) => {
      // Coloque aqui a lógica para verificar a compatibilidade com as datas e o número de hóspedes.
      return true; // Substitua isso pela lógica real.
    });

    // Preencha a tabela com os quartos compatíveis.
    quartosCompatíveis.forEach((quarto) => {
      roomList.append(`
                <tr>
                    <td><img src="${quarto.foto}" alt="Foto do quarto"></td>
                    <td>${quarto.descricao}</td>
                </tr>
            `);
    });
  });

  // Galeria de imagens interativa
  $(".image-gallery-item").on("click", function () {
    const imageURL = $(this).data("image-url");
    $("#image-modal img").attr("src", imageURL);
    $("#image-modal").show();
  });

  $("#image-modal .close-button").on("click", function () {
    $("#image-modal").hide();
  });
});
