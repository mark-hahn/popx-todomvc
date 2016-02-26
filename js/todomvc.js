
/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-25 20:54:52' }*/

(_=>{  
  "use strict";
  let env = JSON.parse(`
    {"modules":{"newTodoInp":{"module":"stdlib/textInput","pins":{"selector":"_const0",
    "changed":"addTodo"}},"log":{"module":"stdlib/log","pins":{"addTodo":"addTodo"}},
    "_const0":{"module":"stdlib/constant","state":".new-todo","pins":{"out":"_const0"}}}}`);
  let stdlibPath = require("popx-stdlib");
  new(require(stdlibPath + "textInput"))(env, "newTodoInp", env.modules.newTodoInp);
  new(require(stdlibPath + "log"))(env, "log", env.modules.log);
  new(require(stdlibPath + "constant"))(env, "_const0", env.modules._const0);
})();
