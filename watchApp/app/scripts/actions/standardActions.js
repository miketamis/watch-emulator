'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var standardActions = {
  optionSelected: function(option) {
    AppDispatcher.dispatch({
      actionType: 'optionSelected',
      Option: option
    });
  },

  nextRep: function() {
    AppDispatcher.dispatch({
      actionType: 'nextRep'
    });
  },

  previousRep: function() {
    AppDispatcher.dispatch({
      actionType: 'previousRep'
    });
  },

  cancelWorkout: function() {
    AppDispatcher.dispatch({
      actionType: 'cancelWorkout'
    });
  }
};

module.exports = standardActions;
