import {getUserData, getUserStatus} from "./profileReducer";
import {getMe} from "./authReducer";
import {setMyAvatars} from "./authReducer";
import {getDialogs} from "./dialogsReducer";
import {profileAPI} from "../../API/API";



const IS_INITIALIZED = "authReducer/IS_INITIALIZED";
const SET_ERROR = "authReducer/SET_ERROR";
const UNSET_ERROR = "authReducer/UNSET_ERROR";


const initialState = {
  isInitialized: null,
  appError: {
    state: false,
    message: null
  }
};


export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_INITIALIZED:
      return {
        ...state,
        isInitialized: action.state
      };
    case SET_ERROR:
      return {
        ...state,
        appError: {
          state: action.state,
          message: action.message
        }
      };
    case UNSET_ERROR:
      return {
        ...state,
        appError: {
          ...state.appError,
          state: false
        }
      };
    default:
      return state
  }
};


export const isInitialized = (state) => ({type: IS_INITIALIZED, state});
export const setError = (state, message) => ({type: SET_ERROR, state, message});
export const unsetError = () => ({type: UNSET_ERROR});


export const initializator = () => async (dispatch, getState) => {
  try {
    await dispatch(getMe());
    const myId = getState().auth.id;
    if (myId) {
      const res = await profileAPI.getUserData(myId);
      const myAvatars = res.data.photos;
      dispatch(setMyAvatars(myAvatars));
      await dispatch(getDialogs());
      dispatch(isInitialized(true));
    } else {
      dispatch(isInitialized(false));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
};


