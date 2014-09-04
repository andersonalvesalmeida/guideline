(function(){
	
	//Personalizar inputs type file
	$(':file').filestyle({buttonName: 'btn-default'});

	//Criar datapickers
	$('.datepicker').datepicker({
	    format: 'dd/mm/yyyy',
	    todayBtn: true,
	    language: 'pt-BR',
	    autoclose: true,
	    todayHighlight: true
	});

	//gerenciar notificações
	/*
	* Generate a new nitification, types: alert, information, error, warning, notification, success
	*/
	function generate(type, text) {
        var timeout = 5000;
        var modal = false
        if(type === 'error'){
        	timeout = false;
        	modal = true;
        }
        var n = noty({
            text        : text,
            type        : type,
            dismissQueue: false,
            layout      : 'topCenter',
            theme       : 'bootstrapTheme',
            timeout 	: timeout,
            closeWith	: ['button'],
            modal		: modal,
            animation: {
		        open: {height: 'toggle'},
		        close: {height: 'toggle'},
		        easing: 'swing',
		        speed: 0 // opening & closing animation speed
		    },
        });
        return n;
    }

   	//var error = generate('error', 'Um erro ocorreu');

   	$('.notify').each(function(e){
   		var type = $(this).data('type');
   		var text = $(this).html();
   		generate(type, text);
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
            "sSwfPath": "guideline/swf/copy_csv_xls_pdf.swf"
        });
    
        $( tt.fnContainer() ).insertBefore('div.dataTables_wrapper');
        
    });
    
    
    

    

})();