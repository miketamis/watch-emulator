/*jslint browser: true */
'use strict';

var React = require('react');
var SitupApp = require('./components/SitupApp.react.jsx');
var mountNode = document.getElementById('app');

var standardActions = require('./actions/standardActions');
var WorkoutStore = require('./stores/WorkoutStore');

if(!WorkoutStore.hasLevelData()) {
  standardActions.setPage('Welcome');
}

React.render(<SitupApp />, mountNode);
