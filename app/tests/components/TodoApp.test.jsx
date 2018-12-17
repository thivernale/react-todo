var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');
var TodoApp = require('TodoApp');

describe('TodoApp', () => {
    it('should exist', () => {
        expect(TodoApp).toExist();
    });

    it('should add todo to the todos state on handleAddTodo', () => {
        // render the component
        // add a todo
        // make sure it properly got added
        var todoText = 'test text';
        var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
        todoApp.setState({
            todos: []
        });
        // call the method we want to test
        todoApp.handleAddTodo(todoText);
        // check the state
        expect(todoApp.state.todos[0].text).toBe(todoText);
    });
});
