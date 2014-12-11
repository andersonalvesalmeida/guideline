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
   	
    
    Chart.defaults.global = {
      // Boolean - Whether to animate the chart
      animation: true,
      // Number - Number of animation steps
      animationSteps: 60,
      // String - Animation easing effect
      animationEasing: "easeOutQuart",
      // Boolean - If we should show the scale at all
      showScale: true,
      // Boolean - If we want to override with a hard coded scale
      scaleOverride: false,
      // ** Required if scaleOverride is true **
      // Number - The number of steps in a hard coded scale
      scaleSteps: null,
      // Number - The value jump in the hard coded scale
      scaleStepWidth: null,
      // Number - The scale starting value
      scaleStartValue: null,
      // String - Colour of the scale line
      scaleLineColor: "rgba(0,0,0,.1)",
      // Number - Pixel width of the scale line
      scaleLineWidth: 1,
      // Boolean - Whether to show labels on the scale
      scaleShowLabels: true,
      // Interpolated JS string - can access value
      scaleLabel: "<%=value%>",
      // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
      scaleIntegersOnly: true,
      // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
      scaleBeginAtZero: false,
      // String - Scale label font declaration for the scale label
      scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      // Number - Scale label font size in pixels
      scaleFontSize: 12,
      // String - Scale label font weight style
      scaleFontStyle: "normal",
      // String - Scale label font colour
      scaleFontColor: "#666",
      // Boolean - whether or not the chart should be responsive and resize when the browser does.
      responsive: false,
      // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
      maintainAspectRatio: true,
      // Boolean - Determines whether to draw tooltips on the canvas or not
      showTooltips: true,
      // Array - Array of string names to attach tooltip events
      tooltipEvents: ["mousemove", "touchstart", "touchmove"],
      // String - Tooltip background colour
      tooltipFillColor: "rgba(0,0,0,0.8)",
      // String - Tooltip label font declaration for the scale label
      tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      // Number - Tooltip label font size in pixels
      tooltipFontSize: 14,
      // String - Tooltip font weight style
      tooltipFontStyle: "normal",
      // String - Tooltip label font colour
      tooltipFontColor: "#fff",
      // String - Tooltip title font declaration for the scale label
      tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      // Number - Tooltip title font size in pixels
      tooltipTitleFontSize: 14,
      // String - Tooltip title font weight style
      tooltipTitleFontStyle: "bold",
      // String - Tooltip title font colour
      tooltipTitleFontColor: "#fff",
      // Number - pixel width of padding around tooltip text
      tooltipYPadding: 6,
      // Number - pixel width of padding around tooltip text
      tooltipXPadding: 6,
      // Number - Size of the caret on the tooltip
      tooltipCaretSize: 8,
      // Number - Pixel radius of the tooltip border
      tooltipCornerRadius: 6,
      // Number - Pixel offset from point x to tooltip edge
      tooltipXOffset: 10,
      // String - Template string for single tooltips
      tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
      // String - Template string for single tooltips
      multiTooltipTemplate: "<%= value %>",
      // Function - Will fire on animation progression.
      onAnimationProgress: function(){},
      // Function - Will fire on animation completion.
      onAnimationComplete: function(){}
  }
    
    
    

    

})();