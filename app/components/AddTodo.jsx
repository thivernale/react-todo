import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

export class AddTodo extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        var { dispatch } = this.props;
        var todoText = this.refs.todoText.value;
        if (todoText !== '') {
            this.refs.todoText.value = '';

            dispatch(actions.startAddTodo(todoText));
        } else {
            this.refs.todoText.focus();
        }
    }
    render() {
        return (
            <div className="container__footer">
                <form ref="add_form" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="todoText" placeholder="What do you need to do?" />
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        );
    }
};

export default connect()(AddTodo);
