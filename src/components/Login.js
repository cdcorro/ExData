import React, { useState } from "react";
import { connect } from "react-redux";
import { signup, signin, resetPassword } from "../store/actions/auth";
import useForm from "../utils/useForm";
import validate from "../utils/validateLoginForm";
import Spinner from "./Spinner";
import {Button, Grid} from "semantic-ui-react";
const Login = ({
  signup,
  signin,
  resetPassword,
  authMsg,
  history,
  loading
}) => {
  const [newUser, setNewUser] = useState(false);
  const [reset, SetReset] = useState(false);
  const [credentials, handleChange, handleSubmit, errors] = useForm(
    login,
    validate,
    reset
  );

  function login() {
    if (newUser) {
      // signup
      signup(credentials.email, credentials.password);
    } else {
      if (reset) {
        // reset password
        resetPassword(credentials.email);
      } else {
        // signin
        signin(credentials.email, credentials.password, () =>
          history.push("/")
        );
      }
    }
  }

  return (
    <div>
     
      <h2>
        {reset ? "Reset password" : newUser ? "Create an account" : "Sign in"}
      </h2>
      {authMsg && <p className="auth-message">{authMsg}</p>}
      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div class="ui input focus">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="Your e-mail"
            onChange={handleChange}
            className={
              (errors.emailIsEmpty || errors.emailFormatInvalid) &&
              "input-error"
            }
          />
          {errors.emailIsEmpty && <small>{errors.emailIsEmpty}</small>}
          {errors.emailFormatInvalid && (
            <small>{errors.emailFormatInvalid}</small>
          )}
        </div>

        {/* PASSWORD */}
        {!reset && (
          <div class="ui input focus">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              placeholder="Your password"
              onChange={handleChange}
              className={
                (errors.passIsStrong || errors.passIsEmpty) && "input-error"
              }
            />
            {errors.passIsStrong && <small>{errors.passIsStrong}</small>}
            {errors.passIsEmpty && <small>{errors.passIsEmpty}</small>}
          </div>
        )}

        {/* BUTTONS */}
        <div>
          <Button type="submit">
            {loading ? (
              <Spinner />
            ) : reset ? (
              "Reset password"
            ) : newUser ? (
              "Create account"
            ) : (
              "Sign in"
            )}
          </Button>
          {!newUser && !reset && (
            <Button onClick={() => SetReset(true)} >
              Forgot password?
            </Button>
          )}
          {reset && (
            <Button onClick={() => SetReset(false)}>
              Back to sign in
            </Button>
          )}
        </div>
      </form>
      <footer>
        <p>
          {newUser ? "Already have an account?" : "Don't have an account yet?"}
        </p>
        <Button
          onClick={() => {
            setNewUser(!newUser);
            if (reset) SetReset(false);
          }}
        >
          {newUser ? "Sign in" : "Create an account"}
        </Button>
      </footer>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    authMsg: state.authReducer.authMsg,
    loading: state.apiStatusReducer.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signup: (email, password) => dispatch(signup(email, password)),
    signin: (email, password, callback) =>
      dispatch(signin(email, password, callback)),
    resetPassword: email => dispatch(resetPassword(email))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);