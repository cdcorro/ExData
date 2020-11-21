import React from "react";
import { connect } from "react-redux";
import Home from "./Home";
import Login from "./Login";
import Loader from "./Loader";
import Header from './Header'
import Footer from './Footer'

const Main = ({ auth }) => {
  return (
    <div>
    <Header />
      {!auth.isLoaded ? <Loader /> : !auth.isEmpty ? <Home /> : <Login />}
      <Footer />
    </div>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.firebaseReducer.auth
  };
}
export default connect(mapStateToProps)(Main);