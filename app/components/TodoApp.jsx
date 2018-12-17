var React = require('react');
var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var uuid = require('node-uuid');

var TodoApp = React.createClass({
    getInitialState: function() {
        // static data
        return {
            showCompleted: false,
            searchText: '',
            todos: [
                {
                    id: uuid(),
                    text: 'Walk the dog'
                },
                {
                    id: uuid(),
                    text: 'Walk the dog 2'
                },
                {
                    id: uuid(),
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
        //alert('new todo: ' + text);

        // all old todos (using the spread operator) and the new element
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(), // generate a UUID using a node package (node-uuid)
                    text: text
                }
            ]
        });
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
