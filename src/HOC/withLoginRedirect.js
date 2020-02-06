import React from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

export const withLoginRedirect = (Component) => {

  const ComponentWrapper = (props) => {

    //еще не пришли данные
    if (props.isInitialized === null) return  <div/>;
    //пользователь не залогинен
    if (props.isInitialized === false) return <Redirect to={"/login"}/>;

    return (
      <Component {...props} />
    )
  };

  const mapSTP = (state) => ({
    isInitialized: state.mainApp.isInitialized
  });
  return connect(mapSTP, null)(ComponentWrapper);
};

