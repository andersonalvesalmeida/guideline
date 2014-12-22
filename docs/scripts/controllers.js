'use strict';

angular
	.module('app.controllers',['ui.bootstrap'])
	.controller('GuidelineCtrl',['$scope','$routeParams', '$location', '$rootScope'
	, function($scope, $routeParams, $location, $rootScope){

		$scope.$on('$routeChangeSuccess', function(event, current) {

			$scope.menuView = current.params.menu;
			$scope.setSidebarSelectedByMenuView($scope.menuView);
			$scope.createSidebarMenu($scope.selectedMainMenu);

		});

		$scope.menuItens = [
      {nome: 'Inicio', descricao: 'Visão geral', view: 'home', classificacao: 'Inicio'},
      {nome: 'Datepicker', descricao: 'Datepicker', view: 'datepicker', classificacao: 'Componentes'},
      {nome: 'Datatables', descricao: 'Datatables', view: 'datatables', classificacao: 'Componentes'},
      {nome: 'Notificações', descricao: 'Notificações', view: 'notificacao', classificacao: 'Componentes'},
      {nome: 'Accordion', descricao: 'Accordion', view: 'accordion', classificacao: 'Componentes'},
      {nome: 'Autocomplete', descricao: 'Autocomplete', view: 'autocomplete', classificacao: 'Componentes'},
      {nome: 'Choosen', descricao: 'Choosen', view: 'choosen', classificacao: 'Componentes'},
      {nome: 'Close applications', descricao: 'Close applications', view: 'close-applications', classificacao: 'Componentes'},
      {nome: 'Mascaras', descricao: 'Mascaras', view: 'mascaras', classificacao: 'Componentes'},
      {nome: 'Textarea limiter', descricao: 'Textarea limiter', view: 'textarea-limiter', classificacao: 'Componentes'},
      {nome: 'Validação', descricao: 'Validação', view: 'validação', classificacao: 'Componentes'},
      {nome: 'Tabelas', descricao: 'Tabelas', view: 'tabelas', classificacao: 'Conceito'},
      {nome: 'Abas', descricao: 'Abas', view: 'abas', classificacao: 'Conceito'},
      {nome: 'Botões', descricao: 'Botões', view: 'botoes', classificacao: 'Conceito'},
      {nome: 'Campos obrigatórios', descricao: 'Campos obrigatórios', view: 'campos-obrigatorios', classificacao: 'Conceito'},
      {nome: 'Formulários', descricao: 'Formulários', view: 'formularios', classificacao: 'Conceito'},
      {nome: 'Iconografia', descricao: 'Iconografia', view: 'iconografia', classificacao: 'Conceito'},
      {nome: 'Modais', descricao: 'Modais', view: 'modais', classificacao: 'Conceito'},
      {nome: 'Navegação', descricao: 'Navegação', view: 'navegacao', classificacao: 'Conceito'},
      {nome: 'Popover', descricao: 'Popover', view: 'popover', classificacao: 'Conceito'},
      {nome: 'Textos', descricao: 'Textos', view: 'textos', classificacao: 'Conceito'},
      {nome: 'Tipografia', descricao: 'Tipografia', view: 'tipografia', classificacao: 'Conceito'},
      {nome: 'Tooltip', descricao: 'Tooltip', view: 'tooltip', classificacao: 'Conceito'},
      {nome: 'Cores', descricao: 'Cores', view: 'cores', classificacao: 'Identidade'},
      {nome: 'Logos', descricao: 'Logos', view: 'logos', classificacao: 'Identidade'},
      {nome: 'Wireframes', descricao: 'Wireframes', view: 'wireframes', classificacao: 'Identidade'},
      {nome: 'Construindo', descricao: 'Construindo', view: 'construindo', classificacao: 'Build'},
      {nome: 'Download', descricao: 'Download', view: 'download', classificacao: 'Build'},
      {nome: 'Releases', descricao: 'Releases', view: 'releases', classificacao: 'Build'},
      {nome: 'Versionamento', descricao: 'Versionamento', view: 'versionamento', classificacao: 'Build'}
    ];

    // Itera no array de menus e cria um novo array de classificação conforme a classificação de cada item do menu
		$scope.mainMenu = [];
		$scope.selectedMenu = null;
		angular.forEach($scope.menuItens, function(value, key) {
		  var newObj = value.classificacao;
		  if (this.indexOf(newObj) === -1 && newObj !== "") {
         this.push(newObj);
     	}
		}, $scope.mainMenu);
		
		//temporario
		//$scope.sidebarMenu = [];

    // Itera no array de menus e seta como selecionado o item referente ao parâmetro passado via URL.
    $scope.setSidebarSelectedByMenuView = function(menuView){
	    angular.forEach($scope.menuItens, function(value, key) {
			  if(value.view == menuView){
			  	this.selectedMainMenu = value.classificacao;
			  	this.selectedMenu = value;
			  }
			  if(!$scope.$$phase) $scope.$digest();
			}, $scope);
		};

    // Seta um menu na barra de navegação principal como selecionado
		$scope.setMainMenuSelect = function(menuIndex){
			$scope.selectedMainMenu = $scope.mainMenu[menuIndex];
			this.createSidebarMenu($scope.selectedMainMenu);
		};

    // Altera os itens da sidebar de acordo com a classificação passada
    $scope.createSidebarMenu = function(mainMenuName){
    	var log = [];
		  while(this.length > 0) {
				this.pop();
			}
     	angular.forEach($scope.menuItens, function(value, key) {
			  if (value.classificacao === mainMenuName) {
	         this.push(value);
	     	}
			}, log);
     	$scope.sidebarMenu = log;
    };

    if (typeof $scope.selectedMainMenu === 'undefined') {
    	$scope.selectedMainMenu = $scope.mainMenu[0];
    	$scope.setMainMenuSelect(0);
    };


    // Scopos para uso nas demonstrações

    //Popover
    $scope.dynamicPopover = 'Texto do Popover!';
    $scope.dynamicPopoverTitle = 'Título';

    //Tooltip
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!';


	}]);
