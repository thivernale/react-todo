import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

import TodoApp from 'TodoApp';
import Login from 'Login';
import firebase from 'app/firebase/';

// define middleware functions to pass to the individual routes, specifying whether they are private or public
// pass function to onEnter property of route
// routes that require user to be logged in in order to visit the page
var requireLogin = (nextState, replace, next) => {
    if (!firebase.auth().currentUser) {
        replace('/');
    }
    next();
};
var redirectIfLoggedIn = (nextState, replace, next) => {
    if (firebase.auth().currentUser) {
        replace('/todos');
    }
    next();
};

export default (
    <Router history={hashHistory}>
        <Route path="/">
            <IndexRoute component={Login} onEnter={redirectIfLoggedIn} />
            <Route path="todos" component={TodoApp} onEnter={requireLogin} />
        </Route>
    </Router>
);
