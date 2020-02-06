import {dialogsAPI} from "../../API/API";
import {dialogMessageSent} from "./reduxFormReducer";
import {getUserData} from "./profileReducer";
import {setError} from "./appReducer";


const SET_DIALOGS = "dialogsReducer/SET_DIALOGS";
const SET_MESSAGES_LIST = "dialogsReducer/SET_MESSAGES_LIST";
const SET_CONTACT = "dialogsReducer/SET_CONTACT";
const RESET_UNREAD_MESSAGE_COUNT = "dialogsReducer/RESET_UNREAD_MESSAGE_COUNT";
const DELETE_MESSAGE = "dialogsReducer/DELETE_MESSAGE";
const DELETING_MESSAGES = "dialogsReducer/DELETING_MESSAGES";


const initialState = {
  dialogs: [],
  messages: [],
  deletingMessages: [],
  contactIs: null
};

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DIALOGS:
      return {
        ...state,
        dialogs: action.dialogs
      };
    case SET_MESSAGES_LIST:
      return {
        ...state,
        messages: [...action.messages]
      };
    case SET_CONTACT:
      return {
        ...state,
        contactIs: action.contactId
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(m => {
          return m.id !== action.messageId
        })
      };
    case DELETING_MESSAGES:
      return {
        ...state,
        deletingMessages: action.toggle ? [...state.deletingMessages, action.messageId] :
         state.deletingMessages.filter(m => m !== action.messageId)
      };
    default:
      return state
  }
};


export const setDialogs = (dialogs) => ({type: SET_DIALOGS, dialogs});
export const setMessagesList = (messages) => ({type: SET_MESSAGES_LIST, messages});
export const setContact = (contactId) => ({type: SET_CONTACT, contactId});
export const setMessagesAfterDelete = (messageId) => ({type: DELETE_MESSAGE, messageId});
export const deletingMessages = (messageId, toggle) => ({type: DELETING_MESSAGES, messageId, toggle});


export const getDialogs = () => async (dispatch) => {
  try {
    const res = await dialogsAPI.getAllDialogs();
    dispatch(setDialogs(res.data));
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const getMessagesList = (contactId) => async (dispatch, getState) => {
  try {
    const res = await dialogsAPI.getMessagesList(contactId);
    if (!res.data.error) {
      dispatch(setMessagesList(res.data));
      dispatch(setContact(contactId));
    } else {
      dispatch(setError(true, "При получении списка сообщений возникла ошибка."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const sendMessage = (message) => async (dispatch, getState) => {
  try {
    const contactId = getState().dialogsPage.contactIs;
    const res = await dialogsAPI.sendMessage(contactId, message);
    if (res.data.resultCode === 0) {
      await dispatch(getDialogs());
      await dispatch(getMessagesList(contactId));
      dispatch(dialogMessageSent()); //очистка поля ввода
    } else {
      dispatch(setError(true, "При отправке сообщения возникла ошибка."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const startChatting = (userId) => async (dispatch, getState) => {
  try {
    const res = await dialogsAPI.startChatting(userId);
    if (res.data.resultCode === 0) {
      await dispatch(getMessagesList(userId));
    } else {
      dispatch(setError(true, "Не удалось начать чат."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const deleteMessage = (messageId) => async (dispatch) => {
  try {
    dispatch(deletingMessages(messageId, true));
    const res = await dialogsAPI.deleteMessage(messageId);
    if (res.status === 200) {
      dispatch(setMessagesAfterDelete(messageId));
      dispatch(deletingMessages(messageId, false));
    } else {
      dispatch(setError(true, "Не удалось удалить сообщение."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};




