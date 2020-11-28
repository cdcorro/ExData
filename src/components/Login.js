import React, { useState } from "react";
import { connect } from "react-redux";
import { signup, signin, resetPassword } from "../store/actions/auth";
import useForm from "../utils/useForm";
import validate from "../utils/validateLoginForm";
import Spinner from "./Spinner";
import logo from '../statics/img/logo.png'
import {Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Modal,
  Input,} from "semantic-ui-react";
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
     <Grid textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
        >
      <Grid.Column style={{ maxWidth: 450 }}>
      <Image src={logo} size='small' centered />
      <Header as='h2' color="blue" textAlign='center'>
        {reset ? "Reset password" : newUser ? "Create an account" : "Sign in"}
      </Header>
      {authMsg && <p className="auth-message">{authMsg}</p>}
      <form onSubmit={handleSubmit} noValidate>
        {/* Email */}
          <Form size="large">
          <Segment stacked>
          <Form.Input
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
        

        {/* PASSWORD */}
        {!reset && (
          <div>
            <Form.Input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              placeholder="Your password"
              onChange={handleChange}
              className={
                (errors.passIsEmpty) && "input-error"
              }
            />
            {errors.passIsEmpty && <small>{errors.passIsEmpty}</small>}
            </div>
        )}
        
        
        
        {/* BUTTONS */}
        
          <br/>
          <Button size = "large" type="submit">
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
          </Segment>
        </Form>
          <div>
          <br/>
          
          {!newUser && !reset && (
            <Button color="blue" size="large" onClick={() => SetReset(true)} >
              Forgot password?
            </Button>
          )}
          {reset && (
            <Button color="blue" size="large" onClick={() => SetReset(false)}>
              Back to sign in
            </Button>
          )}
        </div>
      </form>
      {}
      </Grid.Column>
      </Grid>
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