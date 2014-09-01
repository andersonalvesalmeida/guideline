// Basic Grunt configuration
module.exports = function(grunt) {
 
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        // Task settings here

        // Compile and compress Sass
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    './public/css/main.css': './assets/css/main.scss'
                }
            }
        },

        concat: {
			options: {
			  	separator: ';',
			},
			javascript: {
				src: [
				  './bower_components/jquery/dist/jquery.js',
                  './bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js',
                  './bower_components/bootstrap-datepicker/js/bootstrap-datepicker.js',
                  './bower_components/bootstrap-datepicker/js/locales/bootstrap-datepicker.pt-BR.js',
                  './bower_components/noty/js/noty/packaged/jquery.noty.packaged.js',
                  './bower_components/noty/js/noty/themes/bootstrap.js',
                  './bower_components/bootstrap-filestyle/src/bootstrap-filestyle.min.js',
				  './assets/js/script.js'
				],
				dest: './public/js/script.js',
			}
	    },

        // Minify JS
        uglify: {
            options: {
                mangle: false  // não muda os nomes das funções e variáveis
            },
            dist: {
				files: {
					'./public/js/script.min.js': './public/js/script.js'
				}
	        }
        },

        // Optimize images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: './assets/image/',
                    src: ['**/*.{png,jpg,gif,jpeg}'],
                    dest: './public/image/'
                }]
            }
        },

        // Watch files and trigger tasks
        watch: {
            sass: {
                files: ['./assets/css/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true                        //atualiza o navegador
                }
            },
            js: {
			    files: ['./assets/js/*.*'],		//arquivos monitorados
			    tasks: ['concat:javascript','uglify'],  //tarefas executadas
			    options: {
			    	livereload: true                    //atualiza o navegador
			    }
			},
            imagemin:{
                files: ['./assets/image/*.{png,jpg,gif}'],
                tasks: ['imagemin']
            },
            /*
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    '../../app/views/*.php', 'public/assets/css/*.css'
                ]
            },
            */
        },
 
    });
 
    // 2. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);
 
};