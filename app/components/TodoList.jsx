var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
    render: function() {
        var { todos } = this.props;
        // define a custom renderer function for a rendering Todos
        var renderTodos = () => {
            // iterate over the array and return an array of JSX
            return todos.map((todo) => {
                // add key prop when returning an array of components so React
                // keeps track internally of individual components
                return (
                    <Todo key={todo.id} {...todo} onToggle={this.props.onToggle} />
                );
            });
        };

        return (
            <div>
                {renderTodos()}
            </div>
        );
    }
});

module.exports = TodoList;