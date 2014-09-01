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

    

})();