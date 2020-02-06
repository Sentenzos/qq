import React, {useEffect} from 'react';
import Users from "./Users.jsx";
import {connect} from "react-redux";
import {
  getUsers,
  portionControl,
  requestSubscribe,
  requestUnsubscribe,
  resetPaginatorPortion,
  searchUser,
  setMode,
  setPageNumber
} from "../../redux/reducers/usersReducer";
import {compose} from "redux/es/redux";
import {withRouter} from 'react-router-dom';


//В этом компоненте и его детях "источником истины" преимущественно является строка URL
const UsersContainer = (props) => {

  const pageNumber = props.match.params.pageNumber || props.pageNumber;
  const mode = props.match.params.mode;
  const wantedUser =
    mode === "search" && (props.match.params.wantedUser === undefined ? "" :
    props.match.params.wantedUser);

  useEffect(() => {
    if (mode === "all") {
      props.getUsers({pageNumber, usersOnPage: props.usersOnPage})
    } else if (mode === "search") {
      props.searchUser({usersOnPage: props.usersOnPage, pageNumber, wantedUser});
    }
  }, [props.usersOnPage, pageNumber, wantedUser, mode]);

  useEffect(() => {
    props.setMode(mode);
  }, [mode]);

  //сбросится информации о страницих
  useEffect(() => {
    return () => {
      if (mode === "search") {
        props.resetPaginatorPortion();
        props.setPageNumber(1);
      }
    }
  }, [mode]);

  return <Users portionSize={props.portionSize}
                totalUsersCount={props.totalUsersCount}
                usersOnPage={props.usersOnPage}
                users={props.users}
                url={`/users/${mode}/$pageNumber$` +
                (mode === "search" ? `/${wantedUser}` : "")}
                requestSubscribe={props.requestSubscribe}
                requestUnsubscribe={props.requestUnsubscribe}
                isSubscribing={props.isSubscribing}
                pageNumber={pageNumber}
                portionControl={props.portionControl}
                portionNumber={props.portionNumber}
                searchUser={props.searchUser}
                userWasNotFound={props.userWasNotFound}
                history={props.history}
                resetPaginatorPortion={props.resetPaginatorPortion}
                mode={mode}
                myId={props.myId}
  />
};


const mapSTP = (state) => ({
  myId: state.auth.id,
  users: state.usersPage.users,
  totalUsersCount: state.usersPage.totalUsersCount,
  pageNumber: state.usersPage.pageNumber,
  usersOnPage: state.usersPage.usersOnPage,
  portionSize: state.usersPage.portionSize,
  isSubscribing: state.usersPage.isSubscribing,
  isFetching: state.usersPage.isFetching,
  portionNumber: state.usersPage.paginatorPortion,
  userWasNotFound: state.usersPage.userWasNotFound
});


export default compose(
  withRouter,
  connect(mapSTP, {
      getUsers,
      requestSubscribe,
      requestUnsubscribe,
      portionControl,
      searchUser,
      resetPaginatorPortion,
      setPageNumber,
      setMode
    }
  ))
(UsersContainer);
