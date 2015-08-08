/* @flow */
'use strict';
var React = require('react');
var MainMenu = require('./MainMenu.react');
var PageStore = require('../stores/PageStore');

function getPageState() {
  return {
    page: PageStore.getPage()
  };
}

var SitupApp = React.createClass({
  getInitialState: function() {
    return getPageState();
  },
  componentDidMount: function() {
    PageStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
   PageStore.addChangeListener(this._onChange);
  },
  /**
   * @return {object}
   */
  render: function() {
    var Child = this._getComponent();
    return (
      <div>
        <Child />
      </div>
    );
  },
  _onChange: function() {
    this.setState(getPageState());
  },
  _getComponent() {
    switch(this.state.page) {
      case "MainMenu": return MainMenu;
    }
    throw new Error("No page called: " + this.state.page);
  }

});


module.exports = SitupApp;
