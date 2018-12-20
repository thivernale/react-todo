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

    it('should toggle completed value when handleToggle called', () => {
        // simulate adding a todo to list and then toggle its status
        var todoData = {
            id: 11,
            text: 'Test features',
            completed: false
        };
        // render application
        var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
        todoApp.setState({
            todos: [todoData]
        });

        // check thas todos first item has completed value of false
        expect(todoApp.state.todos[0].completed).toBe(false);

        // call handle toggle with the id
        todoApp.handleToggle(todoData.id);

        // verify that value changed
        expect(todoApp.state.todos[0].completed).toBe(true);
    });
});
