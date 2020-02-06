import {usersAPI} from "../../API/API";
import updateObjValuesInArr from "../../utils/updateObjValuesInArr";
import {searchIsEnded} from "./reduxFormReducer";
import {setError} from "./appReducer";

const SET_USERS = "usersReducer/SET_USERS";
const SET_PAGE_NUMBER = "usersReducer/SET_PAGE_NUMBER";
const IS_FETCHING = "usersReducer/IS_FETCHING";
const SUBSCRIBE = "usersReducer/SUBSCRIBE";
const UNSUBSCRIBE = "usersReducer/UNSUBSCRIBE";
const TOGGLE_IS_SUBSCRIBING = "usersReducer/TOGGLE_IS_SUBSCRIBING";
const PORTION_CONTROL = "usersReducer/PORTION_CONTROL";
const USER_WAS_NOT_FOUND = "usersReducer/USER_WAS_NOT_FOUND";
const RESET_PAGINATOR_PORTION = "usersReducer/RESET_PAGINATOR_PORTION";
const SET_MODE = "usersReducer/SET_MODE";


const initialState = {
  users: [],
  totalUsersCount: null,
  usersOnPage: 25,
  portionSize: 20,
  isFetching: false,
  isSubscribing: [],
  paginatorPortion: 1,
  pageNumber: 1,
  //если true, то отрисуется элемент заглушка
  userWasNotFound: false,
  //Режим отображения пользователей. Переменная находится в redux для ее использования другими компонентами
  displayMode: null,
  // wantedUserName: null
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case SET_USERS:
      return {
        ...state,
        ...action.usersData
      };
    case SUBSCRIBE:
      return {
        ...state,
        users: updateObjValuesInArr(state.users, "id", action.userId,
          [{"followed": true}])
      };
    case UNSUBSCRIBE:
      return {
        ...state,
        users: updateObjValuesInArr(state.users, "id", action.userId,
          [{"followed": false}])
      };
    case TOGGLE_IS_SUBSCRIBING:
      return {
        ...state,
        isSubscribing: action.toggle ? [...state.isSubscribing, action.userId] :
          state.isSubscribing.filter(id => id !== action.userId)
      };
    case PORTION_CONTROL:
      return {
        ...state,
        paginatorPortion: action.control ? state.paginatorPortion + 1 : state.paginatorPortion - 1
      };
    case RESET_PAGINATOR_PORTION:
      return {
        ...state,
        paginatorPortion: 1
      };
    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber
      };
    case USER_WAS_NOT_FOUND:
      return {
        ...state,
        userWasNotFound: action.state
      };
    case SET_MODE:
      return {
        ...state,
        displayMode: action.mode
      };
    default:
      return state
  }
};


export const setUsers = (usersData) => ({type: SET_USERS, usersData});
export const toggleIsFetching = (isFetching) => ({type: IS_FETCHING, isFetching});
export const subscribe = (userId) => ({type: SUBSCRIBE, userId});
export const unsubscribe = (userId) => ({type: UNSUBSCRIBE, userId});
export const setPageNumber = (pageNumber) => ({type: SET_PAGE_NUMBER, pageNumber});
export const toggleIsSubscribing = (userId, toggle) => ({type: TOGGLE_IS_SUBSCRIBING, userId, toggle});
export const portionControl = (control) => ({type: PORTION_CONTROL, control});
export const resetPaginatorPortion = () => ({type: RESET_PAGINATOR_PORTION});
export const userWasNotFoundToggle = (state) => ({type: USER_WAS_NOT_FOUND, state});
export const setMode = (mode) => ({type: SET_MODE, mode});


export const getUsers = (pageData) => async (dispatch) => {
  await getUsers_searchUser_united(pageData, pageData.pageNumber, usersAPI.getUsers, dispatch);
  dispatch(userWasNotFoundToggle(false));
};

export const searchUser = (data) => async (dispatch) => {
  const {items} = await getUsers_searchUser_united(data, data.pageNumber, usersAPI.searchUser, dispatch);
  dispatch(searchIsEnded());
  if (items.length === 0) {
    dispatch(userWasNotFoundToggle(true));
  }
};

async function getUsers_searchUser_united (data, pageNumber, apiMethod, dispatch) {
  dispatch(toggleIsFetching(true));
  try {
    const response = await apiMethod(data);
    //установка pageNumber в state для возвращения к последней странице при повторном переходе на /users
    dispatch(setPageNumber(pageNumber));
    if (response.data.error) {
      dispatch(setError(true, "Ошибка при получении пользователей."));
    } else {
      const {items, totalCount} = response.data;
      dispatch(setUsers({users: items, totalUsersCount: totalCount}));
      return response.data;
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
  dispatch(toggleIsFetching(false));
}



export const requestSubscribe = (userId) => (dispatch) => {
  subscribe_unsubscribe_united(userId, usersAPI.subscribe, dispatch, subscribe);
};

export const requestUnsubscribe = (userId) => (dispatch) => {
  subscribe_unsubscribe_united(userId, usersAPI.unsubscribe, dispatch, unsubscribe);
};

async function subscribe_unsubscribe_united(userId, apiMethod, dispatch, actionCreator) {
  dispatch(toggleIsSubscribing(userId, true));
  try {
    const response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userId));
    } else {
      dispatch(setError(true, "При попытке подписки произошла ошибка."));
    }
  } catch (e) {
    dispatch(setError(true, e.message));
    throw e
  }
  dispatch(toggleIsSubscribing(userId, false));
}