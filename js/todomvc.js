
/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-25 17:25:10' }*/

(_=>{  
  "use strict";
  let env = JSON.parse(`
    {"modules":{"newTodoInp":{"module":"stdlib/textInput","pins":{"selector":{"name":"_const0"},
    "changed":{"name":"addTodo"}}},"log":{"module":"stdlib/log","pins":{"addTodo":{"name":"addTodo"}}},
    "_const0":{"module":"stdlib/constant","state":".new-todo","pins":{"out":"_const0"}}},
    "wires":{"_const0":{"val":null},"addTodo":{"val":null}}}`);
  let stdlibPath = require("popx-stdlib");
  new(require(stdlibPath + "textInput"))(env, env.modules.newTodoInp);
  new(require(stdlibPath + "log"))(env, env.modules.log);
  new(require(stdlibPath + "constant"))(env, env.modules._const0);
})();
