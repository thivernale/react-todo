var React = require('react');
var TodoList = require('TodoList');
var TodoSearch = require('TodoSearch');
var AddTodo = require('AddTodo');

var TodoApp = React.createClass({
    getInitialState: function() {
        // static data
        return {
            showCompleted: false,
            searchText: '',
            todos: [
                {
                    id: 1,
                    text: 'Walk the dog'
                },
                {
                    id: 2,
                    text: 'Walk the dog 2'
                },
                {
                    id: 3,
                    text: 'Finish the tutorial'
                }
            ]
        };
    },
    handleSearch: function(showCompleted, searchText) {
        // set data into component state
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    },
    handleAddTodo: function(text) {
        //...
        alert('new todo: ' + text);
    },
    render: function() {
        var { todos } = this.state;
        return (
            <div>
                <TodoSearch onSearch={this.handleSearch} />
                <TodoList todos={todos} />
                <AddTodo onAddTodo={this.handleAddTodo} />
            </div>
        );
    }
});

module.exports = TodoApp;
