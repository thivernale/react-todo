import firebase, { firebaseRef, githubProvider } from 'app/firebase/';
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
        var uid = getState().auth.uid;
        // push the data to firebase
        var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);
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

export var toggleEdit = (id, edit) => {
    return {
        type: 'TOGGLE_EDIT',
        id,
        edit
    };
};

export var startEditTodo = (id, text) => {
    return (dispatch, getState) => {
        // get reference to the todo specifying path
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
        var updates = {
            text
        };
        // update data on firebase
        return todoRef.update(updates).then(() => {
            // dispatch the synchronous action in the success handler
            dispatch(updateTodo(id, updates));
            // toggle edit mode off
            dispatch(toggleEdit(id, false));
        });
    };
};

export var setEditText = (id, text) => {
    return {
        type: 'SET_EDIT_TEXT',
        id,
        text
    };
};

export var addTodos = (todos) => {
    return {
        type: 'ADD_TODOS',
        todos
    };
};

export var startAddTodos = () => {
    return (dispatch, getState) => {
        var uid = getState().auth.uid;
        var todosRef = firebaseRef.child(`users/${uid}/todos`);
        return todosRef.once('value').then((snapshot) => {
            var todos = snapshot.val() || {};
            var todosArray = [];
            Object.keys(todos).forEach((k) => {
                todosArray.push({
                    id: k,
                    ...todos[k]
                });
            });
            dispatch(addTodos(todosArray));
        }, (e) => {
            console.log('Unable to fetch value', e);
        });
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
        var uid = getState().auth.uid;
        var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
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

export var login = (uid) => {
    return {
        type: 'LOGIN',
        uid
    }
};

export var startLogin = () => {
    return (dispatch, getState) => {
        // auth is a function which returns multiple authentication-related functions
        return firebase.auth().signInWithPopup(githubProvider).then((result) => {
            console.log('Auth worked!', result);
        }, (error) => {
            console.log('Unable to authenticate', error);
        });
    };
};

export var logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export var startLogout = () => {
    return (dispatch, getState) => {
        return firebase.auth().signOut().then(() => {
            console.log('Logged out!');
        }, () => {
            //
        });
    };
};
