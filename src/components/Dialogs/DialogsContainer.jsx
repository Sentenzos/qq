import React, {useEffect} from 'react'
import {compose} from "redux/es/redux";
import {withLoginRedirect} from "../../HOC/withLoginRedirect";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {getDialogs, getMessagesList, sendMessage, setContact, deleteMessage} from "../../redux/reducers/dialogsReducer";


const DialogsContainer = React.memo ((props) => {

  useEffect(() => {
    props.getDialogs();
  },[props.getDialogs]);

  return <Dialogs {...props} />
});


const mapSTP = (state) => ({
  dialogs: state.dialogsPage.dialogs,
  messages: state.dialogsPage.messages,
  myAvatar: state.auth.myAvatars.small,
  contactIs: state.dialogsPage.contactIs,
  myId: state.auth.id,
  deletingMessages: state.dialogsPage.deletingMessages
});


export default compose(
  withLoginRedirect,
  connect(mapSTP, {
    getDialogs,
    getMessagesList,
    sendMessage,
    setContact,
    deleteMessage
  }),

)(DialogsContainer);
