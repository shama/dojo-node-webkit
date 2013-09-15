var grunt = nodeRequire('grunt');
var path = nodeRequire('path');
var fs = nodeRequire('fs');

require(['dojo', 'dgrid/Grid', 'dojo/domReady!'], function(dojo, Grid) {
  var element = dojo.create('div', {id: 'grid'});
  dojo.place(element, dojo.body());

  var data = grunt.file.expand(['**/*', '!app/dojo_modules/**/*', '!node_modules/**/*']).map(function(file) {
    var stat = fs.lstatSync(path.resolve(file));
    var type = (stat.isFile()) ? (stat.isSymbolicLink()) ? 'link' : 'file' : 'folder';
    return { file: file, type: type, created: stat.ctime };
  });

  var grid = new Grid({
    columns: {
      file: 'Filename',
      type: 'Type',
      created: 'Created'
    }
  }, 'grid');

  grid.renderArray(data);
});