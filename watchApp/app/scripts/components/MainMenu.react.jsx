/* @flow */
'use strict';

var React = require('react');
var ListMenu = require('./ListMenu.react.jsx');

var MainMenu = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
    var menuList = [{text: 'Start'}, {text: 'Setting'}];
    return (
      <div>
        <ListMenu items={menuList} />
      </div>
    );
  }
});

module.exports = MainMenu;
