import firebase, { firebaseRef } from 'app/firebase/';
import moment from 'moment';

export var setSearchText = (searchText) => {
    return {
        type: 'SET_SEARCH_TEXT',
        searchText
    };
};

export var toggleShowCompleted = () => {
    return {
        type: 'TOGGLE_SHOW_COMPLETED'
    };
};

export var addTodo = (todo) => {
    return {
        type: 'ADD_TODO',
        todo
    };
};

// asynchronous action that returns a function
// return a function, using thunk
export var startAddTodo = (text) => {
    return (dispatch, getState) => {
        var todo = {
            text,
            completed: false,
            createdAt: moment().unix(),
            completedAt: null
        };
        // push the data to firebase
        var todoRef = firebaseRef.child('todos').push(todo);
        // store the data to the redux store
        // synchronize with firebase
        return todoRef.then(() => {
            dispatch(addTodo({
                ...todo,
                id: todoRef.key
            }));
        });
    };
};

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export var updateTodo = (id, updates) => {
    return {
        type: 'UPDATE_TODO',
        id,
        updates
    };
};

export var startToggleTodo = (id, completed) => {
    return (dispatch, getState) => {
        // get reference to the todo specifying path
        var todoRef = firebaseRef.child(`todos/${id}`);
        var updates = {
            completed,
            completedAt: completed ? moment().unix() : null
        };
        // update data on firebase
        return todoRef.update(updates).then(() => {
            // dispatch the synchronous action in the success handler
            dispatch(updateTodo(id, updates));
        });
    };
};
