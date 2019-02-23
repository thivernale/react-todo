var React = require('react');
var { connect } = require('react-redux');
var actions = require('actions');

export var AddTodo = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault();
        var { dispatch } = this.props;
        var todoText = this.refs.todoText.value;
        if (todoText !== '') {
            this.refs.todoText.value = '';

            // prop no longer gets passed, instead we want to call dispatch dispatching an action
            //this.props.onAddTodo(todoText);
            dispatch(actions.addTodo(todoText));
        } else {
            this.refs.todoText.focus();
        }
    },
    render: function() {
        return (
            <div className="container__footer">
                <form ref="add_form" onSubmit={this.handleSubmit}>
                    <input type="text" ref="todoText" placeholder="What do you need to do?" />
                    <button className="button expanded">Add Todo</button>
                </form>
            </div>
        );
    }
});

export default connect()(AddTodo);

//module.exports = AddTodo;
