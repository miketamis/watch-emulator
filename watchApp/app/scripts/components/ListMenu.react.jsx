/* @flow */
'use strict';
var React = require('react');
var classNames = require('classnames');
var standardActions = require('../actions/standardActions');
var SelectionList = require('../utils/SelectionList');

var ListMenu = React.createClass({
    getInitialState: function() {
        var self = this;
        this._getSelected(this.props.items, function(err) {
            if(err) {
                if(err.message === 'No items selected') {
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
        case 'up-button:click':
            this._moveUp();
            break;
        case 'down-button:click':
            this._moveDown();
            break;
        case 'middle-button:click':
            this._select();
            break;
        }
    },
    componentDidMount: function() {
        window.addEventListener('message', this.watchListener);
    },
    componentWillUnmount: function() {
        window.removeEventListener('message', this.watchListener);
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
        if (typeof items === 'function') {
            cb = items;
            items = this.state.items;
        }
        try {
            cb(null, SelectionList.getSelected(items));
        } catch(err) {
            cb(err);
        }
    },
    _moveUp: function() {
        this.setState({items: SelectionList.moveUp(this.state.items)});
    },
    _moveDown: function() {
        this.setState({items: SelectionList.moveDown(this.state.items)});
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
    }
});


module.exports = ListMenu;
