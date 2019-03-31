import React from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

export class EditTodo extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        var { id, dispatch } = this.props;
        var todoText = this.refs.todoText.value;
        if (todoText !== '') {
            this.refs.todoText.value = '';

            dispatch(actions.startEditTodo(id, todoText));
        } else {
            this.refs.todoText.focus();
        }
    }
    render() {
        return (
            <div>
                <form ref="edit_form" onSubmit={this.handleSubmit.bind(this)}>
                    <input type="text" ref="todoText" placeholder="What do you need to do?" value={this.props.text} onChange={() => {
                        var editText = this.refs.todoText.value;
                        this.props.dispatch(actions.setEditText(this.props.id, editText));
                    }} />
                    <button className="button expanded">Edit Todo</button>
                </form>
            </div>
        );
    }
};

export default connect()(EditTodo);
