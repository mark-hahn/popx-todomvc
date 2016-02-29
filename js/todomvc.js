/*{ name: 'taskmvc',
  description: 'A popx taskmvc example for taskmvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-taskmvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-28 16:14:00' }*/
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
var mods = [];
mods.push(new($dom)({"name":"newTextInp","type":"$dom","constants":{"$sel":"#new-task-inp"},"pins":{"changeEvt":"newTaskLbl","$value":"newTaskLbl"}}));
mods.push(new($new)({"name":"newTaskInst","type":"$new","constants":{"$class":"Object","done":false},"pins":{"label":"newTaskLbl","$instance":"taskItem"}}));
mods.push(new($dom)({"name":"newItemEle","type":"$dom","constants":{"$op":"createElement","$template":"file"},"pins":{"$model":"taskItem","$ele":"taskEle"}}));
mods.push(new($arrayOps)({"name":"addItemToList","type":"$arrayOps","constants":{"$op":"unshift"},"pins":{"$item":"taskEle","$array":"taskEles"}}));
mods.push(new($dom)({"name":"doneChkboxes","type":"$dom","constants":{"$sel":".done-chkbox"},"pins":{"$value":"itemChecked","changeEvt":"itemChecked"}}));
mods.push(new($dom)({"name":"showItemDone","type":"$dom","constants":{"$sel":".task-item","$class":"checked"},"pins":{}}));
mods.push(new($dom)({"name":"deleteBtns","type":"$dom","constants":{"$sel":".del-btn","clickEvt":"deleteEle"},"pins":{"$evtTarget":"deleteEle"}}));
mods.push(new($arrayOps)({"name":"removeItem","type":"$arrayOps","constants":{"$op":"delete"},"pins":{"$trigger":"deleteEle","$item":"taskEle","$array":"taskEles"}}));
mods.push(new($dom)({"name":"showList","type":"$dom","constants":{"$sel":"#task-list","$op":"updateChildren"},"pins":{"$value":"taskEles"}}));
mods.push(new($log)({"name":"log","type":"$log","pins":{"newTaskLbl":"newTaskLbl","taskItem":"taskItem","taskEle":"taskEle","itemChecked":"itemChecked","deleteEle":"deleteEle","taskEles":"taskEles"}}));
Popx.runLoop(mods);
