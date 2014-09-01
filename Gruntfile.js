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
                    './public/css/guideline.css': './assets/css/main.scss'
                }
            }
        },
        
        
        //used to replace the bootstrap fonts location to the 'fonts' directory
        replace: {
            another_example: {
                src: ['./public/css/guideline.css'],
                overwrite: true,                        // overwrite matched source files
                replacements: [{
                    from: 'bootstrap/',
                    to: 'fonts/'
                }]
            }
        },
        
        copy: {
            main: {
                src: 'bower_components/bootstrap-sass/vendor/assets/fonts/bootstrap/*',
                dest: './public/fonts/',
                flatten: true,
                filter: 'isFile',
            },
        },

        concat: {
			options: {
			  	separator: ';',
			},
			javascript: {
				src: [
				  './bower_components/jquery/dist/jquery.js',
                  './bower_components/bootstrap-sass/vendor/assets/javascripts/bootstrap.js',
                  './bower_components/bootstrap-sass-datepicker/js/bootstrap-sass-datepicker.js',
                  './bower_components/bootstrap-sass-datepicker/js/locales/bootstrap-datepicker.pt-BR.js',
                  './bower_components/noty/js/noty/packaged/jquery.noty.packaged.js',
                  './bower_components/noty/js/noty/themes/bootstrap.js',
                  './bower_components/bootstrap-filestyle/src/bootstrap-filestyle.js',
				  './assets/js/script.js'
				],
				dest: './public/js/guideline.js',
			}
	    },

        // Minify JS
        uglify: {
            options: {
                mangle: false  // não muda os nomes das funções e variáveis
            },
            dist: {
				files: {
					'./public/js/guideline.min.js': './public/js/guideline.js'
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
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);
};