/**
 This file listen to events from the Watch and puts them into App dispatcher
 */
 'use strict';

 var AppDispatcher = require('../dispatcher/AppDispatcher');
/*
window.addEventListener('message', function(message) {
  if(message.data === 'back-button:click') {
    AppDispatcher.dispatch({
      actionType: 'goBack'
    });
  }
});

*/
