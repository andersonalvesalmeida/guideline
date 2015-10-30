 // add the rule here
 $.validator.addMethod("valueNotEquals", function(value, element, arg){
  return arg != value;
 }, "Value must not equal arg.");
 
 //validar cnpj
 jQuery.validator.addMethod("cnpj", function (cnpj, element) {
    cnpj = jQuery.trim(cnpj);
 
    // DEIXA APENAS OS NÚMEROS
    cnpj = cnpj.replace('/', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('.', '');
    cnpj = cnpj.replace('-', '');
 
    var numeros, digitos, soma, i, resultado, pos, tamanho, digitos_iguais;
    digitos_iguais = 1;
 
    if (cnpj.length < 14 && cnpj.length < 15) {
        return this.optional(element) || false;
    }
    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) != cnpj.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    }
 
    if (!digitos_iguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
 
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) {
            return this.optional(element) || false;
        }
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1)) {
            return this.optional(element) || false;
        }
        return this.optional(element) || true;
    } else {
        return this.optional(element) || false;
    }
}, "Informe um CNPJ válido.");


//Validar cpf  
jQuery.validator.addMethod("cpf", function (value, element) {
    value = jQuery.trim(value);
 
    value = value.replace('.', '');
    value = value.replace('.', '');
    var cpf = value.replace('-', '');
    while (cpf.length < 11) cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11 - x }
    b = 0;
    c = 11;
    for (y = 0; y < 10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11 - x; }
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) return this.optional(element) || false;
    return this.optional(element) || true;
}, "Informe um CPF válido."); // Mensagem padrão 


//Data BR
jQuery.validator.addMethod("dateBR", function (value, element) {
    //contando chars    
    if (value.length != 10) return (this.optional(element) || false);
    // verificando data
    var data = value;
    var dia = data.substr(0, 2);
    var barra1 = data.substr(2, 1);
    var mes = data.substr(3, 2);
    var barra2 = data.substr(5, 1);
    var ano = data.substr(6, 4);
    if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return (this.optional(element) || false);
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return (this.optional(element) || false);
    if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return (this.optional(element) || false);
    if (ano < 1900) return (this.optional(element) || false);
    return (this.optional(element) || true);
}, "Informe uma data válida");  // Mensagem padrão 


//Data e hora BR
jQuery.validator.addMethod("datetimeBR", function (value, element) {
    //contando chars
    if (value.length != 16) return (this.optional(element) || false);
    // dividindo data e hora
    if (value.substr(10, 1) != ' ') return (this.optional(element) || false); // verificando se há espaço
    var arrOpcoes = value.split(' ');
    if (arrOpcoes.length != 2) return (this.optional(element) || false); // verificando a divisão de data e hora
    // verificando data
    var data = arrOpcoes[0];
    var dia = data.substr(0, 2);
    var barra1 = data.substr(2, 1);
    var mes = data.substr(3, 2);
    var barra2 = data.substr(5, 1);
    var ano = data.substr(6, 4);
    if (data.length != 10 || barra1 != "/" || barra2 != "/" || isNaN(dia) || isNaN(mes) || isNaN(ano) || dia > 31 || mes > 12) return (this.optional(element) || false);
    if ((mes == 4 || mes == 6 || mes == 9 || mes == 11) && dia == 31) return (this.optional(element) || false);
    if (mes == 2 && (dia > 29 || (dia == 29 && ano % 4 != 0))) return (this.optional(element) || false);
    // verificando hora
    var horario = arrOpcoes[1];
    var hora = horario.substr(0, 2);
    var doispontos = horario.substr(2, 1);
    var minuto = horario.substr(3, 2);
    if (horario.length != 5 || isNaN(hora) || isNaN(minuto) || hora > 23 || minuto > 59 || doispontos != ":") return (this.optional(element) || false);
    return this.optional(element) || true;
}, "Informe uma data e uma hora válida");


//Hora BR
jQuery.validator.addMethod("timerbr", function (value, element) {
    if (value.length != 8) return false;
      var data = value;
		  var hor = data.substr(0, 2);
		  var se1 = data.substr(2, 1);
		  var min = data.substr(3, 2);
		  var se2 = data.substr(5, 1);
		  var seg = data.substr(6, 2);
      if (data.length != 8 || se1 != ':' || se2 != ':' || isNaN(hor) || isNaN(min) || isNaN(seg)){
        return false;
      }
      if (!((hor>=0 && hor<=23) && (min>=0 && min<=59) && (seg>=0 && seg<=59))){
        return false;
      }
      return true;
}, "Por favor, um telefone válido");


//não igual
jQuery.validator.addMethod("notequal", function (value, element, param) {
    return this.optional(element) || (value == $(param).val() ? false : true);
}, "Este valor não pode ser igual"); // Mensagem padrão 

//Telefone BR
jQuery.validator.addMethod("telefone", function (value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    for (var i = 0; i < 10; i++) {
        var test10 = ''+i+i+i+i+i+i+i+i+i+i;
        var test11 = ''+i+i+i+i+i+i+i+i+i+i+i;
        
        if(value === test10 || value === test11){
            return false;
        }
    }
    return this.optional(element) || /[0-9]{10}/.test(value);
}, "Por favor, um telefone válido");
 
//Celular (com 8 ou 9 dígitos)
jQuery.validator.addMethod("celular", function (value, element) {
    value = value.replace("(", "");
    value = value.replace(")", "");
    value = value.replace("-", "");
    value = value.replace("_", "");
    value = value.replace(" ", "");
    for (var i = 0; i < 10; i++) {
        var test10 = ''+i+i+i+i+i+i+i+i+i+i;
        var test11 = ''+i+i+i+i+i+i+i+i+i+i+i;
        
        if(value === test10 || value === test11){
            return false;
        }
    }
    return this.optional(element) || /[0-9]{10}/.test(value) || /[0-9]{11}/.test(value);
}, "Informe um telefone válido.");

// CEP (Formato: 00000-000)
jQuery.validator.addMethod("cep",function(e,t){
    return this.optional(t)||/^\d{5}-\d{3}?$/.test(e);
},"Informe um CEP válido.");

//Placa (com 3 ou 4 letras)
jQuery.validator.addMethod("placa", function (value, element) {
    value = value.replace("-", "");
    value = value.replace(" ", "");
    return this.optional(element) || /^[A-Z]{3}\d{4}$/.test(value) || /^[A-Z]{4}\d{4}$/.test(value);
}, "Informe uma placa válido.");


//validar Nome + Sobrenome			
jQuery.validator.addMethod("nomeCompleto",function(e,t){
    return this.optional(t)||/[a-z]*\s[a-z]*/gi.test(e);
},"Informe nome e sobrenome.");

// override jquery validate plugin defaults
$.validator.setDefaults({
    highlight: function(element) {
        $(element).closest('.form-group').addClass('has-error');
    },
    unhighlight: function(element) {
        $(element).closest('.form-group').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function(error, element) {
        if(element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});

$.extend(jQuery.validator.messages, {
    required: "Este campo é obrigatório.",
    remote: "Please fix this field.",
    email: "Informe um email válido.",
    url: "Informe uma URL válida.",
    date: "Informe uma data válida.",
    dateISO: "Informe uma data (ISO) válida .",
    number: "Informe um número válido.",
    digits: "Utilize apenas numeros.",
    creditcard: "Informe um Cartão de crédito válido.",
    equalTo: "Informe um valor igual.",
    accept: "Please enter a value with a valid extension.",
    maxlength: jQuery.validator.format("Deve conter mais que {0} caracteres."),
    minlength: jQuery.validator.format("Deve conter pelo menos {0} caracteres."),
    rangelength: jQuery.validator.format("Informe um valor entre {0} e {1} digitos."),
    range: jQuery.validator.format("Informe um valor entre {0} e {1}."),
    max: jQuery.validator.format("Informe um valor menor ou igual a {0}."),
    min: jQuery.validator.format("Informe um valor maior ou igual a {0}."),
    valueNotEquals: jQuery.validator.format("Informe um valor diferente de {0}.")
});