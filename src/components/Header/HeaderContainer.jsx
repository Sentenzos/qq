import React from 'react'
import {withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {compose} from "redux";
import {logout} from "../../redux/reducers/authReducer";
import Header from "./Header";

const HeaderContainer = (props) => {

  return <Header logout={props.logout} isAuth={props.isAuth} history={props.history}/>
};

const mapSTP = (state) => ({
  isAuth: state.auth.isAuth
});

export default compose(
  withRouter,
  connect(mapSTP, {
    logout
  })
)(HeaderContainer)

