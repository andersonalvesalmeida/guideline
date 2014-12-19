    function pad(str, max) {
		  return str.length < max ? pad("0" + str, max) : str;
		}
		
    /*Função que permite apenas numeros*/
    function Integer(content){
      return content.replace(/\D/g,"")
    }

    /*Função que padroniza telefone (11) 4184-1241*/
    function Telefone(content){
      content=content.replace(/\D/g,"")                            
      content=content.replace(/^(\d\d)(\d)/g,"($1) $2") 
      content=content.replace(/(\d{4})(\d)/,"$1-$2")      
      return content
    }

    /*Função que padroniza telefone (11) 41841241*/
    function TelefoneCall(content){
      content=content.replace(/\D/g,"")                            
      content=content.replace(/^(\d\d)(\d)/g,"($1) $2")   
      return content
    }

    /*Função que padroniza CEP*/
    function Cep(content){
      content=content.replace(/D/g,"")                            
      content=content.replace(/^(\d{5})(\d)/,"$1-$2") 
      return content
    }

    /*Função que permite apenas numeros Romanos*/
    function Romanos(content){
      content=content.toUpperCase()                        
      content=content.replace(/[^VXLCDM]/g,"") 
      
      while(content.replace(/^M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|V|V?I{0,3})$/,"")!="")
        content=content.replace(/.$/,"")
      return content
    }

    /*Função que padroniza o Site*/
    function Site(content){
      content=content.replace(/^http:\/\/?/,"")
      dominio=content
      caminho=""
      if(content.indexOf("/")>-1)
        dominio=content.split("/")[0]
        caminho=content.replace(/[^\/]*/,"")
        dominio=dominio.replace(/[^\w\.\+-:@]/g,"")
        caminho=caminho.replace(/[^\w\d\+-@:\?&=%\(\)\.]/g,"")
        caminho=caminho.replace(/([\?&])=/,"$1")
      if(caminho!="")dominio=dominio.replace(/\.+$/,"")
        content="http://"+dominio+caminho
      return content
    }

    /*Função que padroniza DATA*/
    function Data(content){
      content=content.replace(/\D/g,"") 
      content=content.replace(/(\d{2})(\d)/,"$1/$2") 
      content=content.replace(/(\d{2})(\d)/,"$1/$2") 
      return content
    }

    /*Função que padroniza HORA*/
    function Hora(content){
      content=content.replace(/\D/g,"") 
      content=content.replace(/(\d{2})(\d)/,"$1:$2")  
      return content
    }

    //Função que padroniza valor monétario - Utiliza a lib numeral.js
		function formatCurrency(content, mask){
			numeral.language('pt-br');
			if(typeof mask === 'undefined'){
				return numeral(content).format('0,0.00');
			}else{
				return numeral(content).format(mask);
			}
		};

    /*Função que padroniza Area*/
    function Area(content){
      content=content.replace(/\D/g,"") 
      content=content.replace(/(\d)(\d{2})$/,"$1.$2") 
      return content
      
    }

    /*Função que padroniza CPF*/
    function formatCPf(content){
      content = pad(content, 11);
      content=content.replace(/\D/g,"");
      content=content.replace(/(\d{3})(\d)/,"$1.$2");
      content=content.replace(/(\d{3})(\d)/,"$1.$2");
      content=content.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
      return content;
    };

    /*Função que padroniza CNPJ*/
    function formatCnpj(content){
      content = pad(content, 14);
      content=content.replace(/\D/g,"");                              
      content=content.replace(/^(\d{2})(\d)/,"$1.$2");    
      content=content.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
      content=content.replace(/\.(\d{3})(\d)/,".$1/$2");              
      content=content.replace(/(\d{4})(\d)/,"$1-$2");
      return content;
    };

    /*Função que verifica se é CNPJ ou CPF e padroniza*/
    function formatCpfCnpj(content){
			if(content.length > 11){
				return formatCnpj(content);
			}else{
				return formatCPf(content);
			}
    };
    
    function monthAsString(mes){
      switch (Number(mes)) {
        case 1:
          return 'Janeiro';
        case 2:
          return 'Fevereiro';
        case 3:
          return 'Março';
        case 4:
          return 'Abril';
        case 5:
          return 'Maio';
        case 6:
          return 'Junho';
        case 7:
          return 'Julho';
        case 8:
          return 'Agosto';  
        case 9:
          return 'Setembro';
        case 10:
          return 'Outubro';
        case 11:
          return 'Novembro';
        case 12:
          return 'Dezembro';
        default:
          return '';
      }
    }

    //gerenciar notificações
	/*
	* Generate a new notification, types: alert, information, error, warning, notification, success
	*/
	function notificar(type, text) {
      var timeout = 5000;
      var modal = false;
      var closeWith = false;
      if(type === 'error'){
      	timeout = false;
      	modal = true;
      	closeWith = ['button'];
      }
      if(type === 'information'){
      	timeout = false;
      	modal = true;
      	closeWith = false;
      }
      var n = noty({
        text        : text,
        type        : type,
        dismissQueue: false,
        layout      : 'topCenter',
        theme       : 'bootstrapTheme',
        timeout 	: timeout,
        modal		: modal,
        closeWith 	: closeWith,
        animation: {
        open: {height: 'toggle'},
        close: {height: 'toggle'},
        easing: 'swing',
        speed: 0 // opening & closing animation speed
	    },
    });
    return n;
  }
  
  function getChartColor(index){
    switch (index) {
      case 1:
        return '#F7464A'; //vermelho
      case 2:
        return '#46BFBD'; //verde
      case 3:
        return '#FDB45C'; //laranja
      case 4:
        return '#11305D'; //azul
      case 5:
        return '#FFEB3B'; //amarelo
      case 6:
        return '#673AB7'; //roxo
      case 7:
        return '#E91E63'; //rosa
      case 8:
        return '#6D4C41'; //marrom
      case 9:
        return '#607D8B'; //cinza
      case 10:
        return '#CDDC39'; //limão
      default:
        return '#5b90bf'; //azul
    }
  }
  
  function getChartColorAlpha(index){
    switch (index) {
      case '1':
        return '#FF5A5E'; //vermelho
      case 2:
        return '#5AD3D1'; //verde
      case 3:
        return '#FFC870'; //laranja
      case 4:
        return '#325784'; //azul
      case 5:
        return '#FFEE58'; //amarelo
      case 6:
        return '#7E57C2'; //roxo
      case 7:
        return '#EC407A'; //rosa
      case 8:
        return '#795548'; //marrom
      case 9:
        return '#78909C'; //cinza
      case 10:
        return '#D4E157'; //limão
      default:
        return '#5b90bf'; //azul
    }
  }
  
  //Usada para criar legenda dos graficos gerados pelo chart.js
  function legend(parent, data) {
    parent.className = 'legend';
    var datas = data.hasOwnProperty('datasets') ? data.datasets : data;

    // remove possible children of the parent
    while(parent.hasChildNodes()) {
        parent.removeChild(parent.lastChild);
    }

    datas.forEach(function(d) {
        var title = document.createElement('span');
        title.className = 'title';
        var color = d.hasOwnProperty('strokeColor') ? d.strokeColor : d.color;
        title.setAttribute("style", "margin-right: 10px; padding-left: 5px; border-left: 15px solid " + color);
        parent.appendChild(title);

        var text = document.createTextNode(d.label);
        title.appendChild(text);
    });
  }
  
  
  
  
  
  
  
  
  
  

(function(){
	
	 //Datatables
   	
   	$.extend( $.fn.dataTable.defaults, {
      "language": {
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ Resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
          "sNext": "Próximo",
          "sPrevious": "Anterior",
          "sFirst": "Primeiro",
          "sLast": "Último"
        },
        "oAria": {
          "sSortAscending": ": Ordenar colunas de forma ascendente",
          "sSortDescending": ": Ordenar colunas de forma descendente"
        }
      }
    });
	
	//Personalizar inputs type file que não permitem uploads multiplos.
	$(':file').each(function(){
	    if(typeof($(this).attr('multiple')) === 'undefined' ){
        $(this).filestyle({buttonName: 'btn-default'});
	    }
	});

	//Criar datapickers
	$('.datepicker').datepicker({
    format: 'dd/mm/yyyy',
    todayBtn: true,
    language: 'pt-BR',
    autoclose: true,
    todayHighlight: true
	});

   	//var error = notificar('error', 'Um erro ocorreu');

   	$('.notify').each(function(e){
   		var type = $(this).data('type');
   		var text = $(this).html();
   		notificar(type, text);
   	});
   	
    

})();