var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', () => {
    // use a test lifecycle method to clean up localStorage before each test
    beforeEach(() => {
        localStorage.removeItem('todos');
    });

    it('should exist', () => {
        expect(TodoAPI).toExist();
    });

    describe('setTodos', () => {
        it('should set valid todos array', () => {
            var todos = [{
                id: 23,
                text: 'Go for a run',
                completed: false
            }];
            TodoAPI.setTodos(todos);

            var actualTodos = JSON.parse(localStorage.getItem('todos'));
            // compare object/arrays using toEqual which compares their 
            // values but they are different object is memory
            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', () => {
            var badTodos = {
                dummy: 'Data'
            };
            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem('todos')).toBe(null);
        });
    });

    describe('getTodos', () => {
        it('should return empty array for bad localStorage data', () => {
            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual([]);
        });

        it('should return todos if valid array in localStorage', () => {
            // set up data for the test
            var todos = [{
                id: 23,
                text: 'Go for a run',
                completed: false
            }];
            localStorage.setItem('todos', JSON.stringify(todos));

            var actualTodos = TodoAPI.getTodos();
            expect(actualTodos).toEqual(todos);
        });
    });

    describe('filterTodos', () => {
        // set up data to use for all tests of method
        var todos = [{
            id: 1,
            text: 'Some text here',
            completed: true
        },
        {
            id: 2,
            text: 'Other text here',
            completed: false
        },
        {
            id: 3,
            text: 'Some text here',
            completed: true
        }];

        it('should return all items if showCompleted is true', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should only return non-completed items if showCompleted is false', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toBe(1);
        });

        it('should sort by completed status', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it('should filter todos by searchText', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'some');
            expect(filteredTodos.length).toBe(2);
        });

        it('should return all todos when searchText is empty', () => {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });
    });
});