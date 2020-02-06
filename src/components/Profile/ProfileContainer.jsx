import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {
  deleteMessage,
  getUserData,
  getUserStatus,
  likesControl,
  sendNewMessage,
  sendNewUserStatus,
  stopAnimation,
  toggleProfileIsUpdating,
  updateUserData,
  updateUserPhoto
} from "../../redux/reducers/profileReducer";
import {compose} from "redux/es/redux";
import Profile from "./Profile";
import {withRouter} from "react-router-dom";
import {startChatting} from "../../redux/reducers/dialogsReducer";


const ProfileContainer = (props) => {

  const urlUserId = props.match.params.userId;

  useEffect(() => {
    props.getUserStatus(urlUserId);
    props.getUserData(urlUserId);
  }, [urlUserId]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  //Если id в стейт отличается от id в url (пользователь перешел с одной страницы профиля на другую),
  // то сначала отправить пустышку чтобы не было мерцания чужого аватара и другой информации
  const idIsEqual = +urlUserId === props.stateUserId;
  //является ли человек хозяином страницы
  const isOwner = +urlUserId === props.ownerId;

  if (!idIsEqual) return null;

  return (
    <Profile userStatus={props.userStatus}
             sendNewUserStatus={props.sendNewUserStatus}
             userData={props.userData}
             updateUserData={props.updateUserData}
             profileIsUpdating={props.profileIsUpdating}
             isOwner={isOwner}
             userId={urlUserId}
             updateUserPhoto={props.updateUserPhoto}
             urlUserId={urlUserId}
             startChatting={props.startChatting}
             history={props.history}
             ownerId={props.ownerId}
             wallMessages={props.wallMessages}
             sendNewMessage={props.sendNewMessage}
             likesControl={props.likesControl}
             toggleProfileIsUpdating={props.toggleProfileIsUpdating}
             stopAnimation={props.stopAnimation}
             deleteMessage={props.deleteMessage}
    />
  )
};


const mapStateToProps = (state) => {
  return {
    userStatus: state.profilePage.status,
    ownerId: state.auth.id,
    userData: state.profilePage.userData,
    profileIsUpdating: state.profilePage.profileIsUpdating,
    stateUserId: state.profilePage.userData.userId,
    wallMessages: state.profilePage.wallMessages
  }
};

export default compose(
  withRouter,
  connect(mapStateToProps, {
    getUserStatus,
    sendNewUserStatus,
    getUserData,
    updateUserData,
    updateUserPhoto,
    startChatting,
    sendNewMessage,
    likesControl,
    toggleProfileIsUpdating,
    stopAnimation,
    deleteMessage
  })
)(ProfileContainer);


// dialogsAPI.deleteMessage("9237f694-6e7d-488f-8dbe-49eb461ee0ce").then(res=>{
//   console.log(res);
// });


// dialogsAPI.startChatting(5433).then((res)=>{
//   debugger
// });

// dialogsAPI.getAllDialogs().then((res)=>{
//   debugger
// });
// dialogsAPI.getMessagesList(5433).then((res)=>{
//   debugger
// });

// dialogsAPI.sendMessage(5433, `Проверка кириллицы.`).then((res)=>{
//   console.log(res);
//   let response = res;
//     debugger
//   },
//   (rej)=>{
//     console.log(rej);
//   }
// );

//

// let socket = new WebSocket("wss://social-network.samuraijs.com/api/1.0/dialogs/5433");
// socket.onopen = function(e) {
//   console.log("[open] Соединение установлено");
//   console.log("Отправляем данные на сервер");
//   socket.send("Меня зовут Джон");
// };

// let eventSource = new EventSource("https://social-network.samuraijs.com/api/1.0/dialogs/5433");