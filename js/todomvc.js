/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-26 12:58:31' }*/

var env = JSON.parse(`
    {"modules":[{"name":"log","type":"log","pins":{"addTodo":"_const0"}},{"name":"_const0",
    "type":"constant","state":"asdf","pins":{"out":"_const0"}}]}`);
var stdlibPath = require("popx-stdlib");
for (var mod of env.modules) {
  var path = (mod.type.indexOf('/') >= 0 ? mod.type : stdlibPath + mod.type);
  new(require(path))(mod);
}
