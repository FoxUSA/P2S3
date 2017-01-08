module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({
			connect: {
				server: {
					options: {
						port: 8080,
						base: ".",
						keepalive:true
					}
				}
			},
			shell: {
				dependencies: {
	                command:  [	"npm install",
								"bower install"].join("&&")
	            }
	        },
		});

	//Plugin loading
		grunt.loadNpmTasks("grunt-contrib-watch");
	    grunt.loadNpmTasks("grunt-shell");
		grunt.loadNpmTasks("grunt-contrib-connect");

	//Task definition
		//deployment;
			grunt.registerTask("default",["shell:dependencies","connect:server"]);

};
