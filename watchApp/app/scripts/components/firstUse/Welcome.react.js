/* @flow */
'use strict';

var React = require('react');

var WelcomeScreen = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
      return (
        <div id='welcome-screen'> <h2> Welcome to: </h2> <h1> Situp App </h1></div>
    );
  }
});

module.exports = WelcomeScreen;
