/* @flow */
var React = require('react');
var classNames = require('classnames');
var standardActions = require('../actions/standardActions');

var ListMenu = React.createClass({
  getInitialState: function() {
    var self = this;
    this._getSelected(this.props.items, function(err) {
      if(err) {
        if(err.message == "No items selected") {
          self.props.items[0].selected = true;
          return;
        }
        throw err;
      }
    });

    return {items: this.props.items};
  },
  watchListener: function(message) {
    switch(message.data) {
      case "up-button:click":
        this._moveUp();
        break;
      case "down-button:click":
        this._moveDown();
        break;
      case "middle-button:click":
        this._select();
        break;
      }
  },
  componentDidMount: function() {
    window.addEventListener("message", this.watchListener);
 },
 componentWillUnmount: function() {
    window.removeEventListener("message", this.watchListener);
 },
 _select: function() {
   this._getSelected(function(err, item) {
     if(err) {
       throw err;
     }
     standardActions.optionSelected(item.text);
   });
 },
 _getSelected: function(items, cb) {
   if (typeof items === "function") {
    cb = items;
    items = this.state.items;
   }
   if(items.length == 0) {
      cb(new Error('No items'));
   }
   var index = -1;
   for (var i = 0, len = items.length; i < len; i++) {
     if(items[i].selected) {
       if(index == -1) {
         index = i;
       } else {
         cb(new Error('Multiple items selected'));
         return;
       }
     }
   }
   if(index == -1) {
     cb(new Error('No items selected'));
   }
   cb(null, items[index], index);
 },
 _move: function(up) {
   var items = this.state.items;

   this._getSelected(items, function(err, item, index) {
     if(err) {
       throw err;
     }
     if((up && index == 0) || (!up && index == items.length - 1)) {
       return;
     }
     item.selected = false;
     items[index + (up ? -1 : 1)].selected = true;
   })

  this.setState({items: items})
 },
 _moveUp: function() {
   this._move(true);
 },
 _moveDown: function() {
   this._move(false);
 },
  /**
   * @return {object}
   */
  render: function() {
    var createItem = function(item, index) {
      var classes = classNames({ 'selected': item.selected });
      return <li key={index} className={classes}>{ item.text }</li>;
    };
    return <ul>{this.state.items.map(createItem)}</ul>;
  },

});


module.exports = ListMenu;
