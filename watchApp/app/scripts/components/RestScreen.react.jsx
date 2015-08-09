/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.jsx');
var CircleNumber = require('./CircleNumber.react.jsx');
var WorkoutStore = require('../stores/WorkoutStore');
var standardActions = require('../actions/standardActions');


var RestScreen = React.createClass({
    getInitialState: function() {
      return {rest: WorkoutStore.getCurrentRest()};
    },
    tick: function() {
      var newRest = this.state.rest - 1;
      if(newRest <= 0) {
        standardActions.nextRep();
      } else {
        this.setState({rest: this.state.rest - 1});
      }
    },
    componentDidMount: function() {
      this.interval = setInterval(this.tick, 1000);
    },
    componentWillUnmount: function() {
      clearInterval(this.interval);
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
