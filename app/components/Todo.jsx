var React = require('react');
var { connect } = require('react-redux');
var moment = require('moment');

var actions = require('actions');

export var Todo = React.createClass({
    render: function() {
        var { text, id, completed, createdAt, completedAt, dispatch } = this.props;
        var todoClassName = completed ? 'todo todo-completed' : 'todo';
        var renderDate = () => {
            var message = completed ? 'Completed at ' : 'Created at ';
            var timestamp = completed ? completedAt : createdAt;

            return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
        };
        return (
            <div className={todoClassName} onClick={() => {
                // the handler is on the div so it gets called by clicking both
                // the checkbox and the text

                // function is passed directly using and anonymous function
                // instead of defining a new method on the class
                //this.props.onToggle(id);

                //dispatch(actions.toggleTodo(id));
                dispatch(actions.startToggleTodo(id, !completed));
            }}>
                <div>
                    <input type="checkbox" ref="completed" checked={completed} onchange={() => { }} />
                </div>
                <div>
                    <p>{text}</p>
                    <p className="todo__subtext">{renderDate()}</p>
                </div>
            </div>
        );
    }
});

// connect to the store to get access to dispatch (in props), we don't need the data here
export default connect()(Todo);

//module.exports = Todo;
