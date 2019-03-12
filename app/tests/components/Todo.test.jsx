var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

import * as actions from 'actions';
// pull the raw react component
import { Todo } from 'Todo';

describe('Todo', () => {
    it('should exist', () => {
        expect(Todo).toExist();
    });

    // 'should call onToggle prop with id on click'
    it('should dispatch TOGGLE_TODO action on click', () => {
        // simulate adding a todo to list and then toggle its status
        var todoData = {
            id: 199,
            text: 'write Todo.test.jsx test',
            completed: true
        };
        var action = actions.startToggleTodo(todoData.id, !todoData.completed);

        // create spy to check that method gets called
        var spy = expect.createSpy();
        //var todo = TestUtils.renderIntoDocument(<Todo {...todoData} onToggle={spy} />);
        var todo = TestUtils.renderIntoDocument(<Todo {...todoData} dispatch={spy} />);

        // pull the element from the DOM
        var $el = $(ReactDOM.findDOMNode(todo));
        // simulate click event (pass the root div)
        TestUtils.Simulate.click($el[0]);

        //expect(spy).toHaveBeenCalledWith(todoData.id);
        expect(spy).toHaveBeenCalledWith(action);
    });
});