import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, { firebaseRef } from 'app/firebase/';
var actions = require('actions');

// mock store generator, pass thunk as middleware function
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

    it('should generate update todo action', () => {
        var action = {
            type: 'UPDATE_TODO',
            id: 3,
            updates: { completed: false }
        };
        var res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });

    describe('Tests with Firebase todos', () => {
        var testTodoRef;

        // lifecycle method in mocha 
        // define code to run before every single test
        // use this code to set up test suite by adding data to Firebase
        beforeEach((done) => {
            var todosRef = firebaseRef.child('todos');

            todosRef.remove().then(() => {
                // generate reference to a new item
                testTodoRef = firebaseRef.child('todos').push();
                // store data
                return testTodoRef.set({
                    text: 'Something to do',
                    completed: false,
                    completedAt: 5566
                });
            })
                .then(() => done())
                .catch(done);

        });
        // define code to run after every single test
        // use this code to delete added data
        afterEach((done) => {
            // remove todo item created above
            testTodoRef.remove().then(() => done());
        });

        // asynchronous test
        it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
            const store = createMockStore({});
            const action = actions.startToggleTodo(testTodoRef.key, true);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key
                });
                expect(mockActions[0].updates).toInclude({
                    completed: true
                });
                expect(mockActions[0].updates.completedAt).toExist();

                done();
            }, done);
        });

        it('should populate todos and dispatch ADD_TODOS action', (done) => {
            const store = createMockStore({});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'ADD_TODOS'
                });
                expect(mockActions[0].todos).toExist();
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual('Something to do');

                done();
            }, done);
        });
    });
});
