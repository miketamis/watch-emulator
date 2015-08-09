/* @flow */
'use strict';

var React = require('react');
var Hint = require('./Hint.react.js');
var CircleNumber = require('./CircleNumber.react.js');

var SitupScreen = React.createClass({
  /**
   * @return {object}
   */
  render: function() {
      return (
        <div>
          <Hint position="middle" value="&#10003;"/>
          <div className="doSitups">
            <span> Do </span>
            <CircleNumber />
            <span> Situps </span>
          </div>
        </div>
    );
  }
});

module.exports = SitupScreen;
