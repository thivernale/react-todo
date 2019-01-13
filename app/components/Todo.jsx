var React = require('react');
var moment = require('moment');

var Todo = React.createClass({
    render: function() {
        var { text, id, completed, createdAt, completedAt } = this.props;
        var renderDate = () => {
            var message = completed ? 'Completed at ' : 'Created at ';
            var timestamp = completed ? completedAt : createdAt;

            return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
        };
        return (
            <div onClick={() => {
                // the handler is on the div so it gets called by clicking both
                // the checkbox and the text

                // function is passed directly using and anonymous function
                // instead of defining a new method on the class
                this.props.onToggle(id);
            }}>
                <input type="checkbox" ref="completed" checked={completed} />
                <p>{text}</p>
                <p>{renderDate()}</p>
            </div>
        );
    }
});

module.exports = Todo;