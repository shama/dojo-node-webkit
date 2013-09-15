module.exports = function(grunt) {
	var path = require('path');
	var DOJO_MODULES = path.join(__dirname, 'app/dojo_modules');
	var NODE_WEBKIT = '/Applications/node-webkit.app/Contents/MacOS/node-webkit';
	
	grunt.initConfig({
		shell: {
			options: { stdout: true },
			install: {
				command: (function installDojo () {
					return Array.prototype.slice.call(arguments, 0).map(function(pkg) {
						return 'cpm --packages-path=' + DOJO_MODULES + ' install ' + pkg;
					}).join(' && ');
				}('dgrid', 'dijit'))
			},
			start: {
				command: 'open -n -a ' + NODE_WEBKIT + ' .'
			}
		},
		clean: {
			build: 'build'
		},
		compress: {
			build: {
				options: {
					archive: 'build/app.nw',
					mode: 'zip'
				},
				files: [{
					expand: true,
					src: ['index.html', 'package.json', 'app/**/*']
				}]
			}
		}
	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('install', ['shell:install']);
	grunt.registerTask('build', ['clean:build', 'compress:build']);
	grunt.registerTask('start', ['shell:start']);
};