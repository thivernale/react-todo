import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
    }
    onLogin(provider) {
        var { dispatch } = this.props;
        dispatch(actions.startLogin(provider));
    }
    render() {
        return (
            <div className="grid-container">
                <h1 className="page-title">Todo App</h1>
                {(function() {
                    var { auth } = this.props;
                    if (auth.error) {
                        return (
                            <div className="callout alert small" data-closable="">
                                <button className="close-button" aria-label="Close alert" type="button" data-close="">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <p>
                                    {auth.error}
                                </p>
                            </div>
                        );
                    }
                }).bind(this)()}
                <div className="grid-x">
                    <div className="cell small-centered small-12 medium-6 medium-offset-3 large-6 large-offset-3">
                        <div className="callout callout-auth">
                            <h3>Login</h3>
                            <p>Login with social account below</p>
                            <div className="stacked-for-large button-group align-center">
                                <button className="button hollow secondary" onClick={() => { this.onLogin('github'); }}><i className="fi-social-github"></i> Login with GitHub</button>
                                <button className="button" onClick={() => { this.onLogin('facebook'); }}><i className="fi-social-facebook"></i> Login with Facebook</button>
                                <button className="button alert" onClick={() => { this.onLogin('google'); }}><i className="fi-social-google-plus"></i> Login with Google</button>
                            </div>
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
)(Login);
