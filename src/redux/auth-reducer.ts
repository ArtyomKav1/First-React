<<<<<<< HEAD:src/redux/auth-reducer.ts
import { authAPI, securityAPI } from "../api/api.ts"
=======
import { authAPI } from "../api/api"
>>>>>>> parent of a04492d (commit message):src/redux/auth-reducer.js
import { stopSubmit } from "redux-form"


const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: 2,
    email: null,
    login: null,
    isAuth: false,

}


const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload,
                isAuth: action.payload.isAuth

            }

        }

        default:
            return state;
    }


}


export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })
export const meThunkCreator = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data
        dispatch(setAuthUserData(id, email, login, true));
    }

}
export const loginThunkCreator = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(meThunkCreator());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
        dispatch(stopSubmit("login", { _error: message }));
    }

    ;

}
export const logoutThunkCreator = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}


export default authReducer;