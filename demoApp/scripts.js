/* @flow */

window.addEventListener("message", function(message) {
  document.getElementsByTagName("span")[0].innerHTML = message.data;

});
