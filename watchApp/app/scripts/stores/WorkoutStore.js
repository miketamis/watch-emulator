/*jslint browser: true */
'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SelectionList = require('../utils/SelectionList');
var workoutGenerator = require('../utils/WorkoutGenerator');

var CHANGE_EVENT = 'change';

var _workout = [];

function _getAge() {
  var age = localStorage.getItem('age');
  if(!age) {
    throw new Error('No Age');
  }
  return age;
}


function _setLevel(level) {
  localStorage.setItem('level', level);
}

function _getLevel() {
  var level = localStorage.getItem('level');
  if(!level) {
    throw new Error('No Level');
  }
  return level;
}

function _incrementLevel(i) {
  if(i !== 0) {
    var level = _getLevel() + i;
    localStorage.setItem('level', level);
  }
}


function _setAge(age) {
  localStorage.setItem('age', age);
}

function _resetWorkout() {
  _workout = workoutGenerator(_getLevel(), _getAge());
  _workout[0].selected = true;
}

function _getWorkout() {
  if(!_workout) {
    _resetWorkout();
  }
  return _workout;
}



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
    return _getWorkout()[0].selected;
  },
  onLast: function() {
    return _getWorkout()[_getWorkout().length - 1].selected;
  },
  getCurrentType: function() {
    return SelectionList.getSelected(_workout).type;
  },
  hasLevelData: function() {
    return !!localStorage.getItem('level');
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
    case 'finishWorkout':
      _incrementLevel(action.levelChange);
      _resetWorkout();
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
