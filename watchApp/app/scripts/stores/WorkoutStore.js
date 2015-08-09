'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SelectionList = require('../utils/SelectionList');

var CHANGE_EVENT = 'change';

var _workout = [{type: 'situps', amount: 10, selected: true},
            {type: 'rest', amount: 30},
            {type: 'situps', amount: 20},
            {type: 'rest', amount: 60},
            {type: 'situps', amount: 30}];

function _getCurrent(type) {
  var selected = SelectionList.getSelected(_workout);
  if(selected.type === type) {
      return selected;
  }
  throw Error('current step isn\'t ' + type);
}

function _goBack() {
  SelectionList.moveUp(_workout);
}

var PageStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getCurrentSitup: function() {
    return _getCurrent('situps').amount;
  },
  getCurrentRest: function() {
    return _getCurrent('rest').amount;
  },
  getWorkout: function() {
    return _workout;
  }
});


AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'goBack':
      _goBack();
      PageStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = PageStore;
