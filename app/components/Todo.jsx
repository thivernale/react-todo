var React = require('react');

var Todo = React.createClass({
    render: function() {
        var { text, id, completed } = this.props;
        return (
            <div onClick={() => {
                // the handler is on the div so it gets called by clicking both
                // the checkbox and the text

                // function is passed directly using and anonymous function
                // instead of defining a new method on the class
                this.props.onToggle(id);
            }}>
                <input type="checkbox" ref="completed" checked={completed} />
                {text}
            </div>
        );
    }
});

module.exports = Todo;