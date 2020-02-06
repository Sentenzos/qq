import {authAPI, profileAPI} from "../../API/API";
import {stopSubmit} from "redux-form";
import {initializator, setError} from "./appReducer";
import {isInitialized} from "./appReducer";


const SET_ME = "authReducer/SET_ME";
const SET_CAPTCHA = "authReducer/SET_CAPTCHA";
const SET_MY_AVATAR = "authReducer/SET_MY_AVATAR";


const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
  myAvatars: {}
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ME:
      return {
        ...state,
        ...action.userData
      };
    case SET_CAPTCHA:
      return {
        ...state,
        captchaUrl: action.captchaUrl
      };
    case SET_MY_AVATAR:
      return {
        ...state,
        myAvatars: {...action.avatars}
      };
    default:
      return state
  }
};


export const setMe = (userData) => ({type: SET_ME, userData});
export const setCaptcha = (captchaUrl) => ({type: SET_CAPTCHA, captchaUrl});
export const setMyAvatars = (avatars) => ({type: SET_MY_AVATAR, avatars});


export const getMe = () => async (dispatch) => {
  try {
    const userData = await authAPI.getMe();
    if (userData.data.resultCode === 0) {
      const {id, email, login} = userData.data.data;
      dispatch(setMe({id, email, login, isAuth: true}));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const login = (userData) => async (dispatch, getState) => {
  try {
    const response = await authAPI.login(userData);
    if (response.data.resultCode === 0) {
      await dispatch(initializator());
      //убрать старую каптчу
      if (getState().auth.captchaUrl) dispatch(setCaptcha(null));
    } else {
      if (response.data.resultCode === 10) {
        dispatch(getCaptcha());
      }
      const message = response.data.messages.length > 0 ?
        response.data.messages[0] : "Some error";

      const action = stopSubmit("login", {_error: message});
      dispatch(action);
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const logout = () => async (dispatch) => {
  try {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
      dispatch(setMe({id: null, email: null, login: null, isAuth: false}));
      dispatch(isInitialized(false));
    } else {
      dispatch(setError(true, "При попытке выхода возникла ошибка."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

export const getCaptcha = () => async (dispatch) => {
  try {
    const response = await authAPI.getCaptcha();
    const captchaUrl = response.data.url;
    dispatch(setCaptcha(captchaUrl));
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};

//так как серверный API кривой, приходится делать дополнительный запрос за аватаром
export const getMyAvatar = () => async (dispatch, getState) => {
  try {
    const myId = getState().auth.id;
    const res = await profileAPI.getUserData(myId);
    const myAvatars = res.data.photos;
    dispatch(setMyAvatars(myAvatars));
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};