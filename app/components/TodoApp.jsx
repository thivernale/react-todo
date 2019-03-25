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
    }
    onLogout(e) {
        var { dispatch } = this.props;
        e.preventDefault();

        dispatch(actions.startLogout());
    }
    render() {
        return (
            <div className="grid-container">
                <div className="page-actions">
                    <a href="#" onClick={this.onLogout}>Logout</a>
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

export default Redux.connect()(TodoApp);
