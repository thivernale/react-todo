var React = require('react');
var ReactDOM = require('react-dom');
var { Provider } = require('react-redux');
var { hashHistory } = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
var TodoAPI = require('TodoAPI');
import firebase from 'app/firebase/';
import router from 'app/router/';

firebase.auth().onAuthStateChanged((user) => {
    // redirect after login or logout
    if (user) {
        hashHistory.push('/todos');
    } else {
        hashHistory.push('/');
    }
});


//import './../playground/firebase/index';

// listen to changes on the store
/*store.subscribe(() => {
    var state = store.getState();
    console.log('New state', state);
    // set state from store into local storage
    TodoAPI.setTodos(state.todos);
});

var initialTodos = TodoAPI.getTodos();
// initialize app with any todos from local storage
store.dispatch(actions.addTodos(initialTodos));*/

/*
//dispatch actions to set sample defaults
store.dispatch(actions.addTodo('Clean the yard'));
store.dispatch(actions.setSearchText('yard'));
store.dispatch(actions.toggleShowCompleted());
*/

// fetch all the data available on firebase and pass it to the store
store.dispatch(actions.startAddTodos());

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
