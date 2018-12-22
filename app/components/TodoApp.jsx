var React = require('react');
var uuid = require('node-uuid');

var TodoList = require('TodoList');
var AddTodo = require('AddTodo');
var TodoSearch = require('TodoSearch');
var TodoAPI = require('TodoAPI');

var TodoApp = React.createClass({
    getInitialState: function() {
        // static data
        return {
            showCompleted: false,
            searchText: '',
            todos: TodoAPI.getTodos()
            /*todos: [
                {
                    id: uuid(),
                    text: 'Walk the dog',
                    completed: false
                },
                {
                    id: uuid(),
                    text: 'Walk the dog 2',
                    completed: true
                },
                {
                    id: uuid(),
                    text: 'Finish the tutorial',
                    completed: false
                }
            ]*/
        };
    },
    // lifecycle method that gets fired after the state or the props of the component change
    componentDidUpdate: function() {
        TodoAPI.setTodos(this.state.todos);
    },
    handleSearch: function(showCompleted, searchText) {
        // set data into component state
        this.setState({
            showCompleted: showCompleted,
            searchText: searchText.toLowerCase()
        });
    },
    handleToggle: function(id) {
        var updatedTodos = this.state.todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });

        this.setState({ todos: updatedTodos });
    },
    handleAddTodo: function(text) {
        //alert('new todo: ' + text);

        // all old todos (using the spread operator) and the new element
        this.setState({
            todos: [
                ...this.state.todos,
                {
                    id: uuid(), // generate a UUID using a node package (node-uuid)
                    text: text,
                    completed: false
                }
            ]
        });
    },
    render: function() {
        var { todos, showCompleted, searchText } = this.state;
        var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

        return (
            <div>
                <TodoSearch onSearch={this.handleSearch} />
                <TodoList todos={filteredTodos} onToggle={this.handleToggle} />
                <AddTodo onAddTodo={this.handleAddTodo} />
            </div>
        );
    }
});

module.exports = TodoApp;
