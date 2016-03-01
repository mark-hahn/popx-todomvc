/*{ name: 'taskmvc',
  description: 'A popx taskmvc example for taskmvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-taskmvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-29 17:17:45' }*/
var Popx = require('popx');
var $dom = null;
(_=>{
  'use strict';
  $dom = class extends Popx {
    constructor (module) {
      super(module);
this.react('$init', _=> {
  if (this.changeListener) {
    this.ele.removeEventListener('change', this.changeListener);
    delete this.changeListener;
  }
  let selector = this.get('selector');
  if (selector) {
    this.ele = document.querySelector(selector);
    this.changeListener = e => this.emit('change', e.target.value);
    this.ele.addEventListener('change', this.changeListener);
  }
});
    }
  };
})();
var $new = null;
(_=>{
  'use strict';
  $new = class extends Popx {
    constructor (module) {
      super(module);
this.react('$init', _=> {
  if (this.changeListener) {
    this.ele.removeEventListener('change', this.changeListener);
    delete this.changeListener;
  }
  let selector = this.get('selector');
  if (selector) {
    this.ele = document.querySelector(selector);
    this.changeListener = e => this.emit('change', e.target.value);
    this.ele.addEventListener('change', this.changeListener);
  }
});
    }
  };
})();
var $arrayOps = null;
(_=>{
  'use strict';
  $arrayOps = class extends Popx {
    constructor (module) {
      super(module);
this.react('$init', _=> {
  if (this.changeListener) {
    this.ele.removeEventListener('change', this.changeListener);
    delete this.changeListener;
  }
  let selector = this.get('selector');
  if (selector) {
    this.ele = document.querySelector(selector);
    this.changeListener = e => this.emit('change', e.target.value);
    this.ele.addEventListener('change', this.changeListener);
  }
});
    }
  };
})();
var $log = null;
(_=>{
  'use strict';
  $log = class extends Popx {
    constructor (module) {
      super(module);
let fs     = require('fs');
let util   = require('util');
let moment = require('moment');
this.react( '*', (pinName, val, oldVal, sentFrom) => {
  let line = `${moment().format().slice(0,-6).replace('T',' ')} 
              ${sentFrom.pinName}(${sentFrom.module}) 
              ${sentFrom.event ? 'event' : ''}
              ->
              ${sentFrom.wireName}: ${util.inspect(val)}`
              .replace(/\s+/g, ' ');
  if (this.get('console') !== false) {
    console.log(line.slice(0,100));
  }
  let path = this.get('path');
  if (path) {
    if (typeof fs.appendFileSync !== 'function') {
      console.log('popx: no file sys to write log:', path);
    } else fs.appendFileSync(path, line + '\n');
  }
});
    }
  };
})();
mods.push(new($dom)({"name":"newTaskTextInput","type":"$dom","wireByPin":{"$value":"newTaskText","changeEvt":"newTaskText"},"constByPin":{"$sel":"#new-task-inp"}}));
mods.push(new($new)({"name":"newTaskInst","type":"$new","wireByPin":{"$instance":"taskInst","text":"newTaskText"},"constByPin":{"done":false}}));
mods.push(new($dom)({"name":"newTaskEle","type":"$dom","wireByPin":{"$model":"taskInst","$ele":"newTaskEle"},"constByPin":{"$template":"file"}}));
mods.push(new($arrayOps)({"name":"addItemToList","type":"$arrayOps","wireByPin":{"$item":"newTaskEle","$array":"taskEleList"},"constByPin":{"$op":"unshift"}}));
mods.push(new($dom)({"name":"doneChkboxes","type":"$dom","wireByPin":{"$ancestEle":"itemCheckedEle","$value":"itemChecked","changeEvt":"itemChecked"},"constByPin":{"$sel":".done-chkbox","$ancestSel":".task"}}));
mods.push(new($dom)({"name":"showItemDone","type":"$dom","wireByPin":{"$ele":"itemCheckedEle"},"constByPin":{"$classSet":"checked"}}));
mods.push(new($dom)({"name":"deleteBtns","type":"$dom","wireByPin":{"$ancestEle":"taskDeleteEle","clickEvt":"taskDeleteEle"},"constByPin":{"$sel":".del-btn","$ancestSel":".task"}}));
mods.push(new($arrayOps)({"name":"removeItem","type":"$arrayOps","wireByPin":{"$item":"taskDeleteEle","$array":"taskEleList"},"constByPin":{"$op":"delete"}}));
mods.push(new($dom)({"name":"showList","type":"$dom","wireByPin":{"$children":"taskEleList"},"constByPin":{"$ele":"#task-list"}}));
mods.push(new($log)({"name":"log","type":"$log","wireByPin":{"newTaskText":"newTaskText","taskInst":"taskInst","newTaskEle":"newTaskEle","taskDeleteEle":"taskDeleteEle","taskEleList":"taskEleList","itemCheckedEle":"itemCheckedEle","itemChecked":"itemChecked"},"constByPin":{}}));
