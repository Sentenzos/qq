import {profileAPI} from "../../API/API";
import {stopSubmit} from "redux-form";
import updateObjValuesInArr from "../../utils/updateObjValuesInArr"
import demoAva1 from "../../assets/img/demoAva1.jfif";
import demoAva2 from "../../assets/img/demoAva2.jfif";
import demoAva3 from "../../assets/img/demoAva3.png";
import {setError} from "./appReducer";


const SET_USER_STATUS = "profileReducer/SET_USER_STATUS";
const SET_USER_DATA = "profileReducer/SET_USER_DATA";
const TOGGLE_PROFILE_IS_UPDATING = "profileReducer/TOGGLE_PROFILE_IS_UPDATING";
const SET_USER_PHOTO = "profileReducer/SET_USER_PHOTO_URL";
const ADD_NEW_MESSAGE = "profileReducer/ADD_NEW_MESSAGE";
const SET_MY_LIKE = "profileReducer/SET_MY_LIKE";
const LIKES_COUNT_CONTROL = "profileReducer/LIKES_COUNT_CONTROL";
const STOP_ANIMATION = "profileReducer/STOP_ANIMATION";
const DELETE_MESSAGE = "profileReducer/DELETE_MESSAGE";


const initialState = {
  status: "",
  userData: {
    userId: null,
    fullName: "",
    aboutMe: "",
    contacts: {},
    lookingForAJob: null,
    lookingForAJobDescription: "",
    photos: {},
  },
  profileIsUpdating: false,
  //захардкоденные сообщения, так как на сервере нет такого API

  wallMessages: [
    {
      id: 3,
      name: "Anna",
      date: new Date(2019, 1, 30, 16, 15),
      likes: 2,
      myLike: false,
      message: `Когда-нибудь и я буду так играть <a href="https://www.youtube.com/watch?v=GwXeB5oVO2Y">https://www.youtube.com/watch?v=GwXeB5oVO2Y</a>`,
      avatar: demoAva3
    },
    {
      id: 2,
      name: "Alex",
      date: new Date(2019, 1, 19, 12, 30),
      likes: 5,
      myLike: true,
      message: "Идейные соображения высшего порядка, а также рамки и место обучения кадров позволяет оценить значение новых предложений. " +
        "Разнообразный и богатый опыт рамки и место обучения кадров представляет собой интересный эксперимент проверки соответствующий условий активизации.",
      avatar: demoAva1
    },
    {
      id: 1,
      name: "Denis",
      date: new Date(2019, 10, 19, 11, 40),
      likes: 2,
      myLike: false,
      message: "Задача организации, в особенности же консультация с широким активом требуют определения и уточнения систем массового участия. " +
        "Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки модели развития. " +
        "Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности позволяет оценить значение форм развития. " +
        "Значимость этих проблем настолько очевидна, что постоянный количественный рост и сфера нашей активности требуют определения и уточнения модели развития.",
      avatar: demoAva2
    }
  ]
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_STATUS:
      return {
        ...state,
        status: action.userStatus
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: {...action.userData}
      };
    case TOGGLE_PROFILE_IS_UPDATING:
      return {
        ...state,
        profileIsUpdating: action.status
      };
    case SET_USER_PHOTO:
      return {
        ...state,
        userData: {
          ...state.userData,
          photos: action.photos
        }
      };
    case ADD_NEW_MESSAGE:
      return {
        ...state,
        wallMessages: [{
          id: Math.random(),
          name: action.userName,
          date: new Date(),
          likes: 0,
          myLike: false,
          message: action.message,
          avatar: action.avatar,
          animationState: true
        }, ...state.wallMessages]
      };
    case SET_MY_LIKE:
      return {
        ...state,
        wallMessages: updateObjValuesInArr(state.wallMessages, "id", action.id, [{"myLike": action.state}, {"likes": action.likes}])
      };
    case STOP_ANIMATION:
      return {
        ...state,
        wallMessages: updateObjValuesInArr(state.wallMessages, "id", action.id, [{"animationState": false}])
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        wallMessages: state.wallMessages.filter(m => {
          return m.id !== action.messageId
        })
      };
    default:
      return state
  }
};

export const setUserStatus = (userStatus) => ({type: SET_USER_STATUS, userStatus});
export const setUserData = (userData) => ({type: SET_USER_DATA, userData});
export const toggleProfileIsUpdating = (status) => ({type: TOGGLE_PROFILE_IS_UPDATING, status});
export const setUserPhoto = (photos) => ({type: SET_USER_PHOTO, photos});
export const addNewMessage = (message, userName, avatar) => ({type: ADD_NEW_MESSAGE, message, userName, avatar});
export const setMyLike = (state, id, likes) => ({type: SET_MY_LIKE, state, id, likes});
export const stopAnimation = (id) => ({type: STOP_ANIMATION, id});
export const setMessagesAfterDelete = (messageId) => ({type: DELETE_MESSAGE, messageId});


export const getUserStatus = (userId) => async (dispatch) => {
  const userStatus = await profileAPI.getStatus(userId);
  dispatch(setUserStatus(userStatus.data));
};

export const sendNewUserStatus = (status) => async (dispatch) => {
  try {
    const response = await profileAPI.sendNewStatus(status);
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status));
    } else {
      dispatch(setError(true, "Не удалось обновить статус."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const getUserData = (userId) => async (dispatch) => {
  try {
    const response = await profileAPI.getUserData(userId);
    dispatch(setUserData(response.data));
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const updateUserData = (userData) => async (dispatch, getState) => {
  dispatch(toggleProfileIsUpdating(true));
  try {
    const response = await profileAPI.saveUserData(userData);
    if (response.data.resultCode === 0) {
      const userId = getState().profilePage.userData.userId;
      await dispatch(getUserData(userId));
      dispatch(toggleProfileIsUpdating(false));
    } else {
      const message = response.data.messages.length > 0 ?
        response.data.messages[0] : "Some error";
      const action = stopSubmit("profileData", {_error: message});
      dispatch(action);
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    dispatch(toggleProfileIsUpdating(false));
    throw e
  }
};

export const updateUserPhoto = (photo) => async (dispatch) => {
  try {
    const response = await profileAPI.updatePhoto(photo);
    if (response.data.resultCode === 0) {
      dispatch(setUserPhoto(response.data.data.photos));
    } else {
      dispatch(setError(true, "Не удалось обновить фото."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const sendNewMessage = (message) => (dispatch, getState) => {
  //тут асинхронный запрос на сервер и подтверждение того, что он завершился успешно
  const userName = getState().profilePage.userData.fullName;
  const avatar = getState().auth.myAvatars.small;
  dispatch(addNewMessage(message, userName, avatar));
};

export const likesControl = (id) => (dispatch, getState) => {
  //тут тоже должен быть запрос на сервер, но увы
  const message = getState().profilePage.wallMessages.find((message) => {
    return message.id === id
  });

  if (message.myLike) {
    dispatch(setMyLike(false, id, message.likes - 1));
  } else {
    dispatch(setMyLike(true, id, message.likes + 1));
  }
};

export const deleteMessage = (messageId) => (dispatch, getState) => {
  //тут асинхронный запрос на сервер и подтверждение того, что он завершился успешно
  dispatch(setMessagesAfterDelete(messageId));
};