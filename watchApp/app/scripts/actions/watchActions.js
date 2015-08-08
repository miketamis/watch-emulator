/**
 This file listen to events from the Watch and puts them into App dispatcher
 */

 var AppDispatcher = require('../dispatcher/AppDispatcher');

/*
 var button_ids = ["back-button", "up-button", "down-button", "middle-button"];

button_ids.forEach(function(button_id) {
  window.addEventListener(button_id + ":click", function (e) {
      AppDispatcher.dispatch({
        actionType: "button_clicked",
        button: button_id
      });
  }, false);
})
*/


window.addEventListener("message", function(message) {
  AppDispatcher.dispatch({
    actionType: "WatchEvent",
    data: event.data
  });
}, false);
