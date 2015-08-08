/* @flow */
var React = require('react');
var ListMenu = require('./ListMenu.react');

var MainMenu = React.createClass({
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
  }
});

module.exports = MainMenu;
