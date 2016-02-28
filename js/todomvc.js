/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-27 20:55:40' }*/

var Popx = require('popx');

var $textInput = null;
(_=>{
  'use strict';
  $textInput = class extends Popx {
    constructor (module) {
      super(module);
      
      this.react('selector', (_, selector) => {
        if (this.changeListener) {
          this.ele.removeEventListener('change', this.changeListener);
          delete this.changeListener;
        }
        if (selector) {
          this.ele = document.querySelector(selector);
          this.changeListener = e => this.emit('change', e.target.value);
          this.ele.addEventListener('change', this.changeListener);
        }
      });
      
    }
  };
})();

var fs     = require('fs');
var util   = require('util');
var moment = require('moment');

var $log = null;
(_=>{
  'use strict';
  
  $log = class extends Popx {
    constructor (module) {
      super(module);
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
mods.push(new($textInput)({"name":"newTodoInp","type":"$textInput","constants":{"selector":".new-todo"},"pins":{}}));
mods.push(new($log)({"name":"log","type":"$log","constants":{"console":false},"pins":{}}));
Popx.runLoop(mods);
