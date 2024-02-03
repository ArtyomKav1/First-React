
import { applyMiddleware, combineReducers, legacy_createStore as createStore, compose } from "redux";
import dialogsReducer from './dialogs-reducer.tsx';
import sidebarReducer from './sidebar-reducer.tsx';
import profileReducer from './profile-reducer.tsx';
import usersReducer from './users-reducer.tsx';
import authReducer from './auth-reducer.tsx';
import appReducer from './app-reducer.tsx';
import { reducer as formReducer } from 'redux-form';
import { thunk as thunkMidleware } from "redux-thunk"

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMidleware)));





window.store = store

export default store;