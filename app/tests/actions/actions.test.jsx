import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

var actions = require('actions');

// mock store generator
var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate search text action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'some search text'
        };
        var res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it('should generate toggle show completed action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED',
        };
        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });

    it('should generate add todo action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: 'abc123',
                text: 'Walk the dog',
                completed: false,
                createdAt: 333
            }
        };
        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    // provide done argument to specify that test is asynchronous
    // and mocha should not stop listening for errors and assertions until done gets called
    it('should create todo and dispatch ADD_TODO', (done) => {
        // create an instance of the mock store
        const store = createMockStore({});
        const todoText = 'New todo item';

        store.dispatch(actions.startAddTodo(todoText)).then(() => {
            // get all the actions that were fired on the mock store
            const actions = store.getActions();

            // assertion for an object - test for a property match
            expect(actions[0]).toInclude({
                type: 'ADD_TODO'
            });
            expect(actions[0].todo).toInclude({
                text: todoText
            });
            // call done to end test successfully
            done();
        }).catch(done);
    });

    it('should generate add todos action object', () => {
        var action = {
            type: 'ADD_TODOS',
            todos: [{
                id: 111,
                text: 'any',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }]
        }
        var res = actions.addTodos(action.todos);

        expect(res).toEqual(action);
    });

    it('should generate toggle todo action', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: 3
        };
        var res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    });
});
