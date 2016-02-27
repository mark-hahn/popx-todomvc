/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-26 20:25:35' }*/

var Popx = require('popx');

var fs     = require('fs');
var util   = require('util');
var moment = require('moment');

var $log = null;
(_=>{
  'use strict';
  $log = class extends Popx {
    constructor (module) {
      super(module);
      this.react( '*', (val, pinName, ext) => {
        let line = `${moment().format().slice(0,-6).replace('T',' ')} 
                    ${ext.event ? 'event' : 'value'}
                    wire:${ext.wireName}, value:${util.inspect(val)}`
                   .replace(/\s+/g, ' ').slice(0,100);
        if (this.get('console').val !== false) console.log(line);
        let path = this.get('path').val;
        if (path) fs.appendFileSync(path, line);
      });
    }
  };
})();

var $textInput = null;
(_=>{
  'use strict';
  $textInput = class extends Popx {
    constructor (module) {
      super(module);
      
      this.react('selector', selector => {
        if (this.changedListener) {
          this.ele.removeEventListener('change', this.changedListener);
          delete this.changedListener;
        }
        if (selector) {
          this.ele = document.querySelector(selector);
          this.changedListener = e => this.emit('change', e);
          this.ele.addEventListener('change', this.changedListener);
        }
      });
      
    }
  };
})();

var $constant = null;
(_=>{
  'use strict';
  $constant = class extends Popx {
    constructor (module) {
      super(module);
      setTimeout((_=> this.set('out', module.state)), 0);
    }
  };
})();

new($log)({"name":"log","type":"$log","pins":{"addTodo":"addTodo"}});
new($textInput)({"name":"newTodoInp","type":"$textInput","pins":{"selector":"$const0","change":"addTodo"}});
new($constant)({"name":"$const0","type":"$constant","state":".new-todo","pins":{"out":"$const0"}});
