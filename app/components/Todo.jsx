import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';
import EditTodo from 'EditTodo';

export class Todo extends React.Component {
    render() {
        var { text, id, completed, createdAt, completedAt, dispatch } = this.props;
        var todoClassName = completed ? 'todo todo-completed' : 'todo';
        var renderDate = () => {
            var message = completed ? 'Completed at ' : 'Created at ';
            var timestamp = completed ? completedAt : createdAt;

            return message + moment.unix(timestamp).format('MMM Do YYYY @ h:mm a');
        };
        var renderText = () => {
            if (!this.props.edit) {
                return (
                    <div className="cell small-10">
                        <p ref="viewText" onClick={() => {
                            var { id, dispatch } = this.props;
                            dispatch(actions.toggleEdit(id, true));
                        }}>{text}</p>
                        <p className="todo__subtext">{renderDate()}</p>
                    </div>
                );
            } else {
                return (
                    <div className="cell small-10">
                        <EditTodo key={'edit' + this.props.id} id={this.props.id} text={this.props.text} />
                    </div>
                );
            }
        }
        return (
            <div className={todoClassName + ' grid-x'}>
                <div className="cell small-1">
                    <input type="checkbox" ref="completed" checked={completed} onChange={() => {
                        dispatch(actions.startToggleTodo(id, !completed));
                    }} />
                </div>
                {renderText()}
            </div >
        );
    }
};

export default connect()(Todo);
