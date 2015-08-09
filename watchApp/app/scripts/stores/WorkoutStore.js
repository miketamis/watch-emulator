'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SelectionList = require('../utils/SelectionList');

var CHANGE_EVENT = 'change';

var _workout = [];

function _resetWorkout() {
  _workout = [{type: 'situps', amount: 10, selected: true},
              {type: 'rest', amount: 30},
              {type: 'situps', amount: 20},
              {type: 'rest', amount: 60},
              {type: 'situps', amount: 30}];
}
_resetWorkout();

function _getCurrent(type) {
  var selected = SelectionList.getSelected(_workout);
  if(selected.type === type) {
      return selected;
  }
  throw Error('current step isn\'t ' + type);
}

function _goBack() {
  _workout = SelectionList.moveUp(_workout);
}

function _nextRep() {
  _workout = SelectionList.moveDown(_workout);
}


var WorkoutStore = assign({}, EventEmitter.prototype, {
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
  },
  onFirst: function() {
    return _workout[0].selected;
  },
  onLast: function() {
    return _workout[_workout.length - 1].selected;
  },
  getCurrentType: function() {
    return SelectionList.getSelected(_workout).type;
  }
});


AppDispatcher.register(function(action) {

  switch(action.actionType) {
    case 'previousRep':
      _goBack();
      WorkoutStore.emitChange();
      break;
    case 'nextRep':
      _nextRep();
      WorkoutStore.emitChange();
      break;
    case 'cancelWorkout':
      _resetWorkout();
      WorkoutStore.emitChange();
      break;
    default:
      // no op
  }
});

module.exports = WorkoutStore;
