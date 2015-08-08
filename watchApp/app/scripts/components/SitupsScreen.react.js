/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.js');

var SitupScreen = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
      return (
        <Hint position="middle" value="next"/>
    );
  }
});

module.exports = SitupScreen;
