/* @flow */

dispatchEvent = function(event_name) {
  document.getElementById("watch-app").contentWindow.postMessage(event_name, "*");
}

var button_ids = ["back-button", "up-button", "down-button", "middle-button"];

button_ids.forEach(function(button_id) {
  document.getElementById(button_id).onclick = function() {
    dispatchEvent(button_id + ":click");
  }
});
