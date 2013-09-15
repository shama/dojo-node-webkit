// Save a backup of node's require
window.nodeRequire = window.require;
window.require = undefined;

// trick dojo out of has-node
process.versions.node = undefined;

var dojoConfig = {
	baseUrl: 'file://' + process.cwd(),
	async: true,
	//parseOnLoad: true,
	packages: [{
		name: 'dojo',
		location: 'app/dojo_modules/dojo'
	}, {
		name: 'dijit',
		location: 'app/dojo_modules/dijit'
	}, {
		name: 'dgrid',
		location: 'app/dojo_modules/dgrid'
	}, {
		name: 'put-selector',
		location: 'app/dojo_modules/put-selector'
	}, {
		name: 'xstyle',
		location: 'app/dojo_modules/xstyle'
	}]
};