var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _page = "MainMenu";

function _setPage(page) {
  _page = page;
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
    return _page;
  }
});


AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case "optionSelected":
      _setPage(action.Option);
      PageStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = PageStore;
