/* @flow */

var button_ids = ["back-button", "up-button", "down-button", "middle-button"];

button_ids.forEach(function(button_id) {
  window.addEventListener(button_id + ":click", function (e) {
    document.getElementsByTagName("span")[0].innerHTML = button_id + " was last clicked";
  }, false);
})
