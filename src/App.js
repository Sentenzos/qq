import React, {useEffect} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect, Provider} from "react-redux";
import store from './redux/store';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import News from "./components/News/News";
import {initializator, setError, unsetError} from "./redux/reducers/appReducer";
import {compose} from "redux/es/redux";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import AppError from "./common/components/AppError";


function App(props) {

  useEffect(() => {
    props.initializator();
  }, []);


  useEffect(() => {
    if (props.appError.state) {
      setTimeout(() => {
        props.unsetError(false);
      }, 4000)
    }
  }, [props.appError.state]);

  // if(!props.myId) return <div/>;

  return (
    <>
      <AppError/>

      <HeaderContainer/>

      <div className="page">
        <Navbar/>
        <div className="content">
          <Switch>
            <Route exact path="/" render={() => <Redirect to={"login"}/>}/>
            <Route path={"/dialogs"} render={() => <DialogsContainer/>}/>
            <Route path={"/news"} render={() => <News/>}/>
            <Route path={"/profile/:userId"} render={() => <ProfileContainer/>}/>
            <Route path={"/users/:mode/:pageNumber?/:wantedUser?"} render={() => <UsersContainer/>}/>
            <Route path={"/login"} render={() => <LoginContainer/>}/>
            <Route path={"*"} render={() => <div>ERROR 404 - PAGE NOT FOUND</div>}/>
          </Switch>
        </div>
      </div>
    </>
  );
}


const mapSTP = (state) => ({
  isInitialized: state.mainApp.isInitialized,
  appError: state.mainApp.appError
});

const AppWrapper = compose(
  connect(mapSTP, {
    initializator,
    setError,
    unsetError
  })
)(App);


const MainApp = (props) => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppWrapper {...props} />
      </Provider>
    </HashRouter>
  )
};


export default MainApp;
