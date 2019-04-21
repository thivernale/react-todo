import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as actions from 'actions';
import EditTodo from 'EditTodo';

export class Todo extends React.Component {
    componentDidMount() {
        // initialize foundation for the element
        $('#todo' + this.props.id).foundation();
    }
    componentDidUpdate() {
        // initialize foundation for the element
        $('#todo' + this.props.id).foundation();
    }
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
                        <div className="float-right position-absolute">
                            <button type="button" data-open____={'deleteModal' + id} title="Delete" onClick={() => {
                                if (window.confirm('Are you sure you want to delete this?')) {
                                    var { id, dispatch } = this.props;
                                    dispatch(actions.startDeleteTodo(id));
                                }
                            }}>
                                <i className="fi-x"></i>
                            </button>
                        </div>
                        <p ref="viewText" onClick={() => {
                            var { id, dispatch } = this.props;
                            dispatch(actions.toggleEdit(id, true));
                        }}>{text}</p>
                        <p className="todo__subtext">{renderDate()}</p>
                    </div>
                );
                /*
                <div className="reveal tiny text-center" id={'deleteModal' + id} data-reveal="">
                    <h4>
                        Are you sure? {this.props.text}
                    </h4>
                    <button type="button" ref="btnConfirmDelete" className="button hollow confirm-delete">
                        OK
                    </button>
                    <button className="close-button" data-close="" aria-label="Close modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                */
            } else {
                return (
                    <div className="cell small-10">
                        <EditTodo key={'edit' + this.props.id} id={this.props.id} text={this.props.text} />
                    </div>
                );
            }
        }
        return (
            <div className={todoClassName + ' grid-x'} id={'todo' + id}>
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
