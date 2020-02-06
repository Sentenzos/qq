import React from 'react';
import './Login.css';
import LoginForm from "./LoginForm";


const Login = React.memo((props) => {
  return (
    <div className="login-page">
      <LoginForm onSubmit={props.sendUserData} captchaUrl={props.captchaUrl}/>
    </div>
  )
});


export default Login;