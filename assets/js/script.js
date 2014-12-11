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

(function(){
	
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
   	
   	
   	//Datatables
   	
   	$.extend( $.fn.dataTable.defaults, {
      "language": {
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
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
    /*
    $.fn.dataTable.TableTools.defaults.aButtons = [ "pdf", "csv", "xls", {"sExtends":"print", "sButtonText": "Imprimir"} ];
    $.fn.dataTable.TableTools.defaults.sSwfPath = "guideline/swf/copy_csv_xls_pdf.swf";
    
    $('.datatables').dataTable({
        "dom": '<"wrapper"flipt>',
        "ajax": {
                    "url": 'data.txt',
                    "deferRender": true,
                    "dataSrc": "data"
                }
    });
    */
    
    $('.datatables').each(function(){
      var ajax = $(this).data('ajax');
      
      if (typeof ajax !== 'undefined'){
        var table = $(this).DataTable({
          "ajax": {
            "url": ajax,
            "deferRender": true,
            "dataSrc": "data"
          }
        });    
      }else{
          var table = $(this).DataTable();
      }
      var tt = new $.fn.dataTable.TableTools( table, {
        "aButtons": [
          "csv",
          "xls",
          "pdf",
          {"sExtends":"print", "sButtonText": "Imprimir"}
        ],
        "sSwfPath": "http://guide-eicon-com-br.s3-website-sa-east-1.amazonaws.com/1.0.0/files/swf/copy_csv_xls_pdf.swf"
    });

    $( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
        
    });
    
    
    

    

})();