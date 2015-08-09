/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.js');
var CircleNumber = require('./CircleNumber.react.js');
var WorkoutStore = require('../stores/WorkoutStore');
var ProgressBar = require('./ProgressBar.react.js');
var SitupsScreen = require('./SitupsScreen.react.js');
var RestScreen = require('./RestScreen.react');
var standardActions = require('../actions/standardActions');

function getState() {
  return {currentType: WorkoutStore.getCurrentType() };
}

var WorkoutScreen = React.createClass({
  watchListener: function(message) {
    switch(message.data) {
      case 'middle-button:click':
        if(WorkoutStore.onLast()) {

        } else {
          standardActions.nextRep();
        }
        break;
      case 'back-button:click':
        if(WorkoutStore.onFirst()) {
          standardActions.cancelWorkout();
        } else {
          standardActions.previousRep();
        }
        break;
    }
  },
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function() {
    window.addEventListener('message', this.watchListener);
    WorkoutStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    window.removeEventListener('message', this.watchListener);
    WorkoutStore.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState(getState());
  },

  /**
   * @return {object}
   */
  render: function() {
    var Child;
    if(this.state.currentType === 'situps') {
      Child = SitupsScreen;
    } else {
      Child = RestScreen;
    }
    return (
      <div>
        <ProgressBar />
        <Child />
      </div>
  );
  }
});

module.exports = WorkoutScreen;
