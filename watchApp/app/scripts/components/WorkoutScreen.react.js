/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.js');
var CircleNumber = require('./CircleNumber.react.js');
var WorkoutStore = require('../stores/WorkoutStore');
var ProgressBar = require('./ProgressBar.react.js');
var SitupsScreen = require('./SitupsScreen.react.js');
var standardActions = require('../actions/standardActions');

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
   componentDidMount: function() {
      window.addEventListener('message', this.watchListener);
   },
   componentWillUnmount: function() {
      window.removeEventListener('message', this.watchListener);
   },

  /**
   * @return {object}
   */
  render: function() {
      return (
        <div>
          <ProgressBar />
        </div>
    );
  }
});

module.exports = WorkoutScreen;
