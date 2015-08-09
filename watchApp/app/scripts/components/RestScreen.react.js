/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.js');
var CircleNumber = require('./CircleNumber.react.js');
var WorkoutStore = require('../stores/WorkoutStore');

var RestScreen = React.createClass({
    getInitialState: function() {
      return {rest: WorkoutStore.getCurrentRest()};
    },

  /**
   * @return {object}
   */
  render: function() {
      return (
        <div>
          <Hint position="middle" value="&#9193;"/>
          <div className="doSitups">
            <span> Rest For </span>
            <CircleNumber value={this.state.rest } />
            <span> Seconds </span>
          </div>
        </div>
    );
  }
});

module.exports = RestScreen;
