/* @flow */

dispatchEvent = function(event_name) {
  var event = document.createEvent('Event');
  event.initEvent(event_name, true, true);
  document.getElementById("watch-app").contentWindow.dispatchEvent(event);
}

var button_ids = ["back-button", "up-button", "down-button", "middle-button"];

button_ids.forEach(function(button_id) {
  document.getElementById(button_id).onclick = function() {
    dispatchEvent(button_id + ":click");
  }
});
