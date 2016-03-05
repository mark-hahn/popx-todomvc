/*{ name: 'todomvc',
  description: 'A popx todomvc example for todomvc.com',
  author: 'Mark Hahn <mark@hahnca.com>',
  repository: 'mark-hahn/popx-todomvc',
  file: 'src/todomvc.popx',
  compiled: '2016-03-03 20:47:08' }*/
var Popx = require('popx');
var $dom = null;
(_=>{
  'use strict';
  $dom = class extends Popx {
    constructor (module) {
      super(module);
let mustache = require('mustache');
let matches = Element.matches || Element.mozMatchesSelector || Element.msMatchesSelector || 
              Element.oMatchesSelector || Element.webkitMatchesSelector;
let closest = (ele, sel) => {
  if (Element.prototype.closest) return ele.closest(sel);
  while (ele) if (ele.matches(sel)) return ele;
  throw {
    fatal: true, 
    message: `unable to find ancestor for element ${sel}`
  };
};
let getEles = (sel) => {
  if (sel instanceof Element) return {eles:[sel]};
  let containerSel;
  if (Array.isArray(sel)) {
    if (sel[0] instanceof Element) return {eles:sel};
    containerSel = sel[1];
    sel = sel[0];
  }
  let container = (containerSel ? document.querySelector(containerSel) : null);
  let eles = (container ? container : document).querySelectorAll(sel);
  return {container, eles};
};
switch(this.get('$op')) {
  case 'input':
    let contEles = getEles(this.get('$sel'));
    let container = contEles.container;
    let eles = contEles.eles;
    let evtValueSel = this.get('$evtValSel');
    let haveChangeEvt = false;
    let haveValueOut  = !!this.get('$value');
    let addEvent = ((pinName) => {
      let isEvent = (pinName.slice(-3) === 'Evt');
      let evtType = (isEvent ? pinName.slice(0, -3) : 'change');
      if (evtType === 'change') haveChangeEvt = true;
      let eleIdx = 0;
      [].forEach.call(eles, ele => {
        (container ? container : ele).addEventListener(evtType,  
          ((ele, pinName) => {
            return (event => {
              if (event.target === ele) {
                let eleVal = ele.value;
                if (haveValueOut) {
                  let data;
                  if (eles.length > 1) {
                    let wireVal = this.get(pinName) || {data: [], meta};
                    data = Popx.setFrozenAttr(wireVal.data, [eleIdx], eleVal);
                    meta = wireVal.meta;
                    meta.isArray = true;
                  } else {
                    data = eleVal;
                    meta = {};
                  }
                  meta.ele = ele;
                  meta.event = event;
                  this.set('$value', data, meta);
                }
                if (isEvent) {
                  let data = (evtValueSel ? closest(ele, evtValueSel) : eleVal);
                  this.emit(pinName, data, {ele, event});
                }
              }
            });
          })(ele, pinName)
        );
        eleIdx++;
      });
    });
    for (let pinName of this.getInstancePins()) addEvent(pinName);
    if (!haveChangeEvt) addEvent('');
    break;
  case 'createEle':
    let tag = this.get('$tag');
    let template = this.get('$template');
    this.react('$model', 'event', (_, model) => {
      let ele = document.createElement(tag ? tag : 'div');
      let html = '';
      if (template) {
        if (model) html = mustache.render(template, model);
        else html = template;
      }
      if (html) ele.innerHTML = html;
      this.emit('$eleEvt', ele, {model});
    });
    break;
  case 'setClass':
    let klass = this.get('$class');
    this.react('$sel $if', 'value', (_, model) => {
      let eles = getEles(this.get('$sel')).eles;
      let ifs = this.get('$if');
      if (!Array.isArray(ifs)) ifs = [ifs];
      for (i = 0; i < eles.length; i++) {
        if (ifs[Math.min(i, ifs.length-1)]) 
             eles[i].classList.add(klass); 
        else eles[i].classList.remove(klass);
      }
    });
    break;
  case 'setChildren':
    let parents = getEles(this.get('$parent')).eles;
    let parent = parents[0];
    this.react('$children', 'value', (_, children) => {
      while (parent.firstChild) parent.removeChild(parent.firstChild);
      if(!Array.isArray(children)) children = [children];
      for (let child of children) parent.appendChild(child);
    });
    break;
  default: 
    utils.fatal(`invalid $op "${this.get('$op')}" for $dom module ${this.module.name}`);
}
    }
  };
})();
var $newObject = null;
(_=>{
  'use strict';
  $newObject = class extends Popx {
    constructor (module) {
      super(module);
this.react('*', 'event', (pinName, data, meta) => {
  let instance = {};
  for (let instancePinName of this.getInstancePins())
      instance[instancePinName] = 
          (instancePinName === pinName ? data : this.get(instancePinName));
  this.emit('$newObjEvt', instance);
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
this.react('$item', 'event', (pinName, data, meta) => {
  let arrayValue = this.get('$array') || {data:[],meta:{}};
  switch (this.get('$op')) {
    case 'unshift': 
      arrayValue.data = this.setFrozenAttr(arrayValue.data, 'unshift', data); 
      break;
    case 'remove': 
      let index = array.indexOf(arrayValue.data);
      if (index === -1) return;
      arrayValue.data = this.setFrozenAttr(arrayValue.data, [index]); 
      break;
  }
  this.set('$array', arrayValue.data, arrayValue.meta);
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
let pinNames = (this.get('$allWires') ? '***' : '**');
this.react(pinNames, null, (pinName, data, meta) => {
  let line = `${moment().format().slice(0,-6).replace('T',' ')} 
              ${meta.sentFrom.pinName}(${meta.sentFrom.module}) 
              ${meta.isEvent ? 'event' : ''}
              ->
              ${meta.sentFrom.wireName}: ${util.inspect(data)}`
              .replace(/\s+/g, ' ');
  if (this.get('$console') !== false) {
    console.log(line.slice(0,100));
  }
  let path = this.get('$path');
  if (path && Popx.inNode()) fs.appendFileSync(path, line + '\n');
});
    }
  };
})();
new($dom)({"name":"newTaskTextInput","type":"$dom","wireByPin":{"changeEvt":"newTaskText"},"constByPin":{"$op":"input","$sel":".new-todo"}});
new($newObject)({"name":"newTaskInst","type":"$newObject","wireByPin":{"text":"newTaskText","$newObjEvt":"taskObj"},"constByPin":{"done":false}});
new($dom)({"name":"newTaskEle","type":"$dom","wireByPin":{"$model":"taskObj","$eleEvt":"newTaskEle"},"constByPin":{"$op":"createEle","$template":"\nhello world\n"}});
new($arrayOps)({"name":"addItemToList","type":"$arrayOps","wireByPin":{"$item":"newTaskEle","$array":"taskEleList"},"constByPin":{"$op":"unshift"}});
new($dom)({"name":"doneChkboxes","type":"$dom","wireByPin":{"$value":"taskCheckVals"},"constByPin":{"$op":"input","$sel":[".done-chkbox","#task-list"]}});
new($dom)({"name":"showItemDone","type":"$dom","wireByPin":{"$sel":"taskEleList","$if":"taskCheckVals"},"constByPin":{"$op":"setClass","$class":"done"}});
new($dom)({"name":"deleteBtns","type":"$dom","wireByPin":{"clickEvt":"taskDeleteEvt"},"constByPin":{"$op":"input","$sel":[".del-btn","#task-list"],"$evtValSel":".task"}});
new($arrayOps)({"name":"removeItem","type":"$arrayOps","wireByPin":{"$item":"taskDeleteEvt","$array":"taskEleList"},"constByPin":{"$op":"remove"}});
new($dom)({"name":"showList","type":"$dom","wireByPin":{"$children":"taskEleList"},"constByPin":{"$op":"setChildren","$parent":"body"}});
new($log)({"name":"log","type":"$log","wireByPin":{},"constByPin":{"$allWires":true}});
