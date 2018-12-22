/**
 * File to set and fetch Todo items in local storage.
 * Make it a separate file so switching data source does not affect the app.
 */

var $ = require('jquery');

module.exports = {
    setTodos: function(todos) {
        if ($.isArray(todos)) {
            // store array as string
            localStorage.setItem('todos', JSON.stringify(todos));
            return todos;
        }
    },
    getTodos: function() {
        var stringTodos = localStorage.getItem('todos');
        var todos = [];
        try {
            todos = JSON.parse(stringTodos);
        } catch (e) {

        }

        return $.isArray(todos) ? todos : [];
    },
    filterTodos: function(todos, showCompleted, searchText) {
        var filteredTodos = todos;

        // filter by show completed
        filteredTodos = filteredTodos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        // filter by search text
        filteredTodos = filteredTodos.filter((todo) => {
            return searchText.length === 0 || todo.text.toLowerCase().indexOf(searchText) !== -1;
        });

        // sort todos with non-completed first
        filteredTodos.sort((a, b) => {
            if (!a.completed && b.completed) {
                return -1;
            } else if (a.completed && !b.completed) {
                return 1;
            } else {
                return 0;
            }
        });

        return filteredTodos;
    }
};
