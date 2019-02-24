var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set search text', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'dog'
            };
            var res = reducers.searchTextReducer(df(''), df(action));

            expect(res).toEqual(action.searchText);
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle showCompleted', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };
            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toEqual(true);
        });
    });

    describe('todosReducer', () => {
        it('should add new Todo', () => {
            var action = {
                type: 'ADD_TODO',
                text: 'Walk the dog'
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);

            expect(res[0].text).toEqual(action.text);
        });

        it('should toggle todo', () => {
            var action = {
                type: 'TOGGLE_TODO',
                id: 2
            };
            var todos = [
                {
                    id: 2,
                    text: 'Go',
                    completed: false,
                    createdAt: '',
                    completedAt: undefined
                }
            ];

            var res = reducers.todosReducer(df(todos), df(action));

            expect(res[0].completed).toBe(true);
            expect(res[0].completedAt).toNotEqual(undefined);
        });

        it('should add existing todos', () => {
            var todos = [{
                id: 111,
                text: 'any',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];
            var action = {
                type: 'ADD_TODOS',
                todos
            };

            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        });
    });
});
