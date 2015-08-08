/* @flow */
var React = require('react');
var ListMenu = require('./ListMenu.react');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var SitupApp = React.createClass({
  componentDidMount: function() {
    var self = this;
    this.dispatchToken = AppDispatcher.register(function(action) {
      if(action.actionType == "optionSelected") {
        switch(action.Option) {
          case "Start":
            alert("Start");
            break;
          case "Settings":
            alert("Settings");
            break;
        }
      }
      return true;
    });
 },
 componentWillUnmount: function() {
   AppDispatcher.unregister(this.dispatchToken);
 },
  /**
   * @return {object}
   */
  render: function() {
    var menu_list = [{text: "Start"}, {text: "Settings"}];
    return (
      <div>
        <ListMenu items={menu_list} />
      </div>
    );
  },

});


module.exports = SitupApp;
