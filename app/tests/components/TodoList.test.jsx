var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var expect = require('expect');
var $ = require('jquery');

// use import calls instead of require to load in the default from the component
import { configure } from 'configureStore';
import ConnectedTodoList, { TodoList } from 'TodoList';
import ConnectedTodo, { Todo } from 'Todo';

describe('TodoList', () => {
    it('should exist', () => {
        expect(TodoList).toExist();
    });

    it('should render one Todo component for each todo item', () => {
        var todos = [{
            id: 1,
            text: 'do something',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        }, {
            id: 2,
            text: 'do something else',
            completed: false,
            completedAt: undefined,
            createdAt: 500
        }];

        // pass initial state to store
        var store = configure({ todos });
        // create the provider
        var provider = TestUtils.renderIntoDocument(
            <Provider store={store}>
                <ConnectedTodoList />
            </Provider>
        );
        // fetch todo list from the provider
        var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
        var todosComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodo);

        expect(todosComponents.length).toBe(todos.length);
    });

    it('should render empty message if no todos', () => {
        var todos = [];
        var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
        var $el = $(ReactDOM.findDOMNode(todoList));

        expect($el.find('.container__message').length).toBe(1);
    });
});
