import { userAPI } from "../api/api"

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
let initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 2,
    isFetching: true,
    followingInProgress: [],
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        }
        default:
            return state;
    }
}
export const follow = (userId) => ({ type: FOLLOW, userId })
export const unfollow = (userId) => ({ type: UNFOLLOW, userId })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));
    let response = await userAPI.getUsersAPI(currentPage, pageSize)
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setUsersTotalCount(response.data.totalCount));

}

export const onPageChangedThunkCreator = (pageNumber, pageSize) => async (dispatch) => {

    dispatch(setCurrentPage(pageNumber));
    dispatch(toggleIsFetching(true))
    let response = await userAPI.retGetUsersAPI(pageNumber, pageSize);
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items));

}

export const followThunkCreator = (userId) => async (dispatch) => {

    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await userAPI.followAPI(userId)
    if (response.data.resultCode === 0) {
        dispatch(follow(userId));
    }
    dispatch(toggleIsFollowingProgress(false, userId));

}

export const unfollowThunkCreator = (userId) => async (dispatch) => {

    dispatch(toggleIsFollowingProgress(true, userId));

    let response = await userAPI.unfollowAPI(userId);
            if (response.data.resultCode === 0) {
                dispatch(unfollow(userId));
            }

            dispatch(toggleIsFollowingProgress(false, userId));
}

export default usersReducer;