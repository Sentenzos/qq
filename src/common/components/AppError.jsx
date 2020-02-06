import {CSSTransition} from "react-transition-group";
import React from "react";
import {connect} from "react-redux";


const AppError = (props) => {
  return (
    <CSSTransition in={props.appError.state}
                   timeout={{
                     enter: 1000,
                     exit: 500
                   }}
                   classNames="app-error"
                   unmountOnExit
    >
      <div className={"app-error"}>
        <div className="app-error__text">{props.appError.message}</div>
      </div>
    </CSSTransition>
  )
};

const mapSTP = (state) => ({
  appError: state.mainApp.appError
});


export default connect(mapSTP, null)(AppError);
