/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.js');
var CircleNumber = require('./CircleNumber.react.js');
var WorkoutStore = require('../stores/WorkoutStore');


var SitupScreen = React.createClass({
    getInitialState: function() {
      return {situps: WorkoutStore.getCurrentSitup()};
    },

  /**
   * @return {object}
   */
  render: function() {
      return (
        <div>
          <Hint position="middle" value="&#10003;"/>
          <div className="doSitups">
            <span> Do </span>
            <CircleNumber value={this.state.situps } />
            <span> Situps </span>
          </div>
        </div>
    );
  }
});

module.exports = SitupScreen;
