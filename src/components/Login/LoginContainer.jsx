import React, {useCallback} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import {login} from "../../redux/reducers/authReducer";
import Login from "./Login";


const LoginContainer = (props) => {

  const sendUserData = useCallback(
    (data) => {
      props.login(data);
    }, []
  );

  if (props.isAuth) return <Redirect to={`/profile/${props.userId}`}/>;

  return <Login sendUserData={sendUserData} captchaUrl={props.captchaUrl}/>;
};


const mapSTP = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
  userId: state.auth.id
});

export default connect(mapSTP, {
  login
})(LoginContainer);