/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-26 15:38:33' }*/

var env = JSON.parse(`
  {"modules":[{"name":"log","type":"$log","pins":{"addTodo":"$const0"}},{"name":"$const0",
  "type":"$constant","state":"asdf","pins":{"out":"$const0"}}]}`);
var stdlibPath = require("popx-stdlib");
for (var mod of env.modules) {
  path = (mod.type[0] === '$' ? stdlibPath + mod.type : mode.type);
  new(require(path))(mod);
}
