import React from 'react';
import { connect } from 'react-redux';
import Todo from 'Todo';
import * as TodoAPI from 'TodoAPI';

export class TodoList extends React.Component {
    render() {
        var { todos, showCompleted, searchText } = this.props;
        // define a custom renderer function for a rendering Todos
        var renderTodos = () => {
            var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
            if (filteredTodos.length === 0) {
                return (
                    <p className="container__message">Nothing To Do</p>
                );
            }
            // iterate over the array and return an array of JSX
            return filteredTodos.map((todo) => {
                // add key prop when returning an array of components so React
                // keeps track internally of individual components
                return (
                    <Todo key={todo.id} {...todo} />
                );
            });
        };

        return (
            <div>
                {renderTodos()}
            </div>
        );
    }
};

// make a connection and connect the component to the provider
export default connect(
    // specify which parts of the state we need for this component
    // they will be set to its props property
    // now we want all three props => the whole state
    (state) => {
        return state;
    }
)(TodoList);
