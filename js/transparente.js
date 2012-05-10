$(document).ready(function(){

  $("#resultado").hide();

  $('#showXml').modal('toggle')

  $('#tabs a:first').tab('show');

  //Exibi o token no Form
  $("#token").val($("#MoipWidget").attr("data-token"));

  $("#sendToMoip").click(function(){
    sendToCreditCard();
  });

  $("#sendToCofre").click(function(){
    sendToCofre();
  });

  $("#boleto").click(function(){
    sendToBoleto();
  });

  $("#debit").click(function() {
    sendToDebit();
  });

  $("#calcular-btn").click(function(){
    calcular();
  });

  $("#trocar-token").click(function(){
    $("#MoipWidget").attr("data-token", $("#token").val());
  });

});

calcular = function() {
  var settings = {
    cofre: '',
    instituicao: $("#instituicao-calc-parcela").val(),
    callback: "retornoCalculoParcelamento"
  };

  var parcelas = MoipUtil.calcularParcela(settings);
};

retornoCalculoParcelamento = function(data) {
  alert(JSON.stringify(data));
};

sendToCreditCard = function() {
    var settings = {
        "Forma": "CartaoCredito",
        "Instituicao": "Visa",
        "Parcelas": $("input[name=Parcelas]").val(),
        "Recebimento": "AVista",
        "CartaoCredito": {
            "Numero": $("input[name=Numero]").val(),
            "Expiracao": $("input[name=Expiracao]").val(),
            "CodigoSeguranca": $("input[name=CodigoSeguranca]").val(),
            "Portador": {
                "Nome": $("input[name=Portador]").val(),
                "DataNascimento": $("input[name=DataNascimento]").val(),
                "Telefone": $("input[name=Telefone]").val(),
                "Identidade": $("input[name=CPF]").val()
            }
        }
    }

    $("#sendToMoip").attr("disabled", "disabled");
    MoipWidget(settings);
 };


sendToCofre = function() {
  var settings = {
      "Forma": "CartaoCredito",
      "Instituicao": "Visa",
      "Parcelas": $("input[name=Parcelas]").val(),
      "Recebimento": "AVista",
      "CartaoCredito": {
          "Cofre": $("input[name=Cofre]").val(),
          "CodigoSeguranca": $("input[name=CodigoSeguranca]").val()
      }
  }

    $("#sendToCofre").attr("disabled", "disabled");
    MoipWidget(settings);
 }


sendToDebit = function() {
  var settings = {
    "Forma": "DebitoBancario",
    "Instituicao": "BancoDoBrasil"
  };

  MoipWidget(settings);
}


sendToBoleto = function() {
  var settings = {
    "Forma": "BoletoBancario"
  };

  MoipWidget(settings);
};

var sucesso = function(data){
    alert(data.Mensagem +
        '\n\n Status: ' + data.Status +
        '\n ID Moip: ' + data.CodigoMoIP +
        '\n Valor Pago: ' + data.TotalPago +
        '\n Taxa Moip: ' + data.TaxaMoIP +
        '\n Cod. Operadora: ' + data.CodigoRetorno);

    $("#sendToMoip").removeAttr("disabled");
    $("#sendToCofre").removeAttr("disabled");

};

var erro = function(data) {
    alert("Erro !\n\n" + data);

    $("#sendToMoip").removeAttr("disabled");
    $("#sendToCofre").removeAttr("disabled");
};
