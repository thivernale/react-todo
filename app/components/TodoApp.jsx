var React = require('react');
var uuid = require('node-uuid');
var moment = require('moment');

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';

var TodoApp = React.createClass({
    render: function() {
        return (
            <div className="grid-container">
                <h1 className="page-title">Todo App</h1>
                <div className="grid-x">
                    <div className="cell small-12 medium-6 medium-offset-3 large-4 large-offset-4">
                        <div className="container">
                            <TodoSearch />
                            <TodoList />
                            <AddTodo />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = TodoApp;
