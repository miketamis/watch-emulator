'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');

var standardActions = {
  optionSelected: function(option) {
    AppDispatcher.dispatch({
      actionType: 'optionSelected',
      Option: option
    });
  }
};

module.exports = standardActions;
