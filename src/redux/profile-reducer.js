import { userAPI, profileAPI } from "../api/api"


const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';
const ADD_NEW_POST = 'ADD_NEW_POST';
let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Its my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: ''
}


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NEW_POST: {
            let newPost = {
                id: 5,
                message: action.textPost,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }

        }
        case SET_USER_STATUS: {

            return { ...state, status: action.status }

        }
        default:
            return state;
    }
}

export const addNewPost = (textPost) => ({ type: ADD_NEW_POST, textPost })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })
export const getUserProfileThunkCreator = (userId) => async (dispatch) => {
    let response = await userAPI.getProfileAPI(userId)
    dispatch(setUserProfile(response.data));
}
export const getUserStatusThunkCreator = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatusAPI(userId)
    dispatch(setUserStatus(response.data));
}
export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatusAPI(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}


export default profileReducer;






// const ADD_POST = 'ADD-POST';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// export const addPostActionCreator = () => ({ type: ADD_POST })
// export const updateNewPostTextActionCreator = (text) =>
//     ({ type: UPDATE_NEW_POST_TEXT, newText: text })

// case ADD_POST: {
//     let newPost = {
//         id: 5,
//         message: state.newPostText,
//         likesCount: 0
//     };
//     return {
//         ...state,
//         posts: [...state.posts, newPost],
//         newPostText: '',
//     }
// let stateCopy = { ...state }
// stateCopy.posts = [...state.posts]
// stateCopy.posts.push(newPost);
// stateCopy.newPostText = '';
// return stateCopy;
// }
// case UPDATE_NEW_POST_TEXT: {
//     return {
//         ...state,
//         newPostText: action.newText,
//     }
// let stateCopy = { ...state }
// stateCopy.newPostText = action.newText;
// return stateCopy;
// }
