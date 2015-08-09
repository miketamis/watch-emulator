/* @flow */
'use strict';

var SelectionList = {
  getSelected: function(items, cb) {
    if(items.length === 0) {
       cb(new Error('No items'));
    }
    var index = -1;
    for (var i = 0, len = items.length; i < len; i++) {
      if(items[i].selected) {
        if(index === -1) {
          index = i;
        } else {
          cb(new Error('Multiple items selected'));
          return;
        }
      }
    }
    if(index === -1) {
      cb(new Error('No items selected'));
    }
    cb(null, items[index], index);
  },
  move: function(items, up) {
    this.getSelected(items, function(err, item, index) {
      if(err) {
        throw err;
      }
      if((up && index === 0) || (!up && index === items.length - 1)) {
        return;
      }
      item.selected = false;
      items[index + (up ? -1 : 1)].selected = true;
    });
    return items;
  },
  moveUp: function(items) {
    return this.move(items, true);
  },
  moveDown: function(items) {
    return this.move(items, false);
  }
};

module.exports = SelectionList;
