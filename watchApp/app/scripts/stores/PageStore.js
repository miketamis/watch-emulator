'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _pageHistory = ['MainMenu'];

function _setPage(page) {
  _pageHistory.push(page);
}

function _goBack() {
  if(_pageHistory.length <= 1) {
    alert('Quit');
  } else {
    _pageHistory.pop();
  }
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

  getPage: function() {
    return _pageHistory[_pageHistory.length - 1];
  }
});


AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'optionSelected':
      _setPage(action.Option);
      PageStore.emitChange();
      break;
    case 'cancelWorkout':
      _goBack();
      PageStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = PageStore;
