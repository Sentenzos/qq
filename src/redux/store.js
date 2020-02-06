import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer as formReducer} from "redux-form";
import thunk from "redux-thunk"; //thunk middleware
import {profileReducer} from "../redux/reducers/profileReducer";
import {authReducer} from "./reducers/authReducer";
import {usersReducer} from "./reducers/usersReducer";
import {appReducer} from "./reducers/appReducer";
import {dialogsReducer} from "./reducers/dialogsReducer";
import {reduxFormReducer} from "./reducers/reduxFormReducer";


const reducers = combineReducers({
  auth: authReducer,
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  mainApp: appReducer,
  form: formReducer.plugin(reduxFormReducer)
});

//store с поддержкой работы расширения для хрома
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

//создание обычного стора
// const store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;