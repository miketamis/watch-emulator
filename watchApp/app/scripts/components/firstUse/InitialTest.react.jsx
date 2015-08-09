/* @flow */
'use strict';

var React = require('react');
var setupActions = require('../../actions/setupActions');
var Hint = require('../Hint.react.jsx');
var CircleNumber = require('../CircleNumber.react.jsx');


var _numberOfSitups = 20;

var InitialTest = React.createClass({
    getInitialState: function() {
        return {number: _numberOfSitups};
    },
    watchListener: function(message) {
        switch(message.data) {
        case 'up-button:click':
            this.setState({number: _numberOfSitups++});
            break;
        case 'middle-button:click':
            setupActions.calculateLevel(this.state.number);
            break;
        case 'down-button:click':
            this.setState({number: _numberOfSitups--});
            break;
        case 'back-button:click':
            setupActions.resetAge();
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
                <div>
                <Hint position="top" value=" + "/>
                <Hint position="middle" value="&#10003;"/>
                <Hint position="bottom" value=" &#8722; "/>
                <div className="doSitups">
                <span> I Can Do: </span>
                <CircleNumber value={this.state.number} />
                <span> In A Row </span>
                </div>
                </div>
            </div>
        );
    }
});

module.exports = InitialTest;
