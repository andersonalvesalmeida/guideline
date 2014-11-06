    function pad(str, max) {
		  return str.length < max ? pad("0" + str, max) : str;
		}
		
		function formatCurrency(content){
			content=content.replace(/\D/g,""); //Remove tudo o que não é dígito
      content=content.replace(/^([0-9]{3}\.?){3}-[0-9]{2}$/,"$1.$2");
      content=content.replace(/(\d)(\d{2})$/,"$1,$2"); //Coloca ponto antes dos 2 últimos digitos
      return content;
    };

    function formatCpfCnpj(content){
			if(content.length > 11){
				return formatCnpj(content);
			}else{
				return formatCPf(content);
			}
    };

    function formatCPf(content){
    	content = pad(content, 11);
			content=content.replace(/\D/g,"");
      content=content.replace(/(\d{3})(\d)/,"$1.$2");
      content=content.replace(/(\d{3})(\d)/,"$1.$2");
      content=content.replace(/(\d{3})(\d{1,2})$/,"$1-$2");
      return content;
    };

    function formatCnpj(content){
    	content = pad(content, 14);
      content=content.replace(/\D/g,"");                              
      content=content.replace(/^(\d{2})(\d)/,"$1.$2");    
      content=content.replace(/^(\d{2})\.(\d{3})(\d)/,"$1.$2.$3");
      content=content.replace(/\.(\d{3})(\d)/,".$1/$2");              
      content=content.replace(/(\d{4})(\d)/,"$1-$2");
      return content;
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