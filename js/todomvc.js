/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-02-27 17:05:16' }*/

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
      this.react( '*', (pinName, val, oldVal, sentFrom) => {
        let line = valstr => `${moment().format().slice(0,-6).replace('T',' ')} 
                              ${sentFrom.event ? 'event' : 'value'}
                              wire:${sentFrom.wireName}, value:${valStr}
                              -> module: ${this.module.name}, pin: ${pinName}`
                              .replace(/\s+/g, ' ');
        let valStr = util.inspect(val);
        if (this.get('console').val !== false) {
          console.log(line(valStr.replace(/\s+/g, ' ').slice(0,40)));
        }
        let path = this.get('path').val;
        if (path) fs.appendFileSync(path, line(valStr)+'\n');
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

var mods = [];
mods.push(new($log)({"name":"log","type":"$log","pins":{"addTodo":"$const0"}}));
mods.push(new($constant)({"name":"$const0","type":"$constant","state":23,"pins":{"out":"$const0"}}));
Popx.runLoop(mods);
