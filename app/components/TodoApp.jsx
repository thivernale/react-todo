import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList';
import AddTodo from 'AddTodo';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.onDeleteUser = this.onDeleteUser.bind(this);
    }
    onLogout(e) {
        var { dispatch } = this.props;
        e.preventDefault();

        dispatch(actions.startLogout());
    }
    onDeleteUser(e) {
        var { dispatch } = this.props;
        e.preventDefault();

        dispatch(actions.startDeleteUser());
    }
    getDisplayName() {
        var { auth } = this.props;
        var displayName = auth.displayName || 'Anonymous';
        return (
            <span>
                {displayName}
                <img src={auth.photoURL} alt={displayName} title={displayName} className="profile-picture" />
            </span>
        );
    }
    render() {
        return (
            <div className="grid-container">
                <div className="page-actions">
                    <ul className="breadcrumbs">
                        <li><span>Logged in as {this.getDisplayName()}</span></li>
                        <li><a href="#" onClick={this.onLogout}>Logout</a></li>
                        <li><a href="#" onClick={this.onDeleteUser}>Delete account</a></li>
                    </ul>
                </div>
                <h1 className="page-title">Todo App</h1>
                <div className="grid-x">
                    <div className="cell small-12 medium-6 medium-offset-3 large-4 large-offset-4">
                        <div className="container">
                            <TodoSearch />
                            <TodoList />
                            <AddTodo />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Redux.connect(
    (state) => {
        return { auth: state.auth };
    }
)(TodoApp);
