import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { compose } from "redux"
<<<<<<< HEAD
import { getUserProfileThunkCreator, updateUserStatusThunkCreator, saveProfileThunkCreator, getUserStatusThunkCreator, setEditMode, savePhotoThunkCreator } from '../../redux/profile-reducer.ts';
=======
import { getUserProfileThunkCreator, updateUserStatusThunkCreator, getUserStatusThunkCreator } from '../../redux/profile-reducer';
>>>>>>> parent of a04492d (commit message)
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect.ts';

// костыль
export function withRouter(Children) {
    return (props) => {
        const match = { params: useParams() };
        return <Children {...props} match={match} />
    }
}
class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizerUserId;
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId)
        
    }

    render() {
        // if (!this.props.isAuth) return <Navigate to='/login' />
        return (
            <Profile {...this.props} />

        )
    }

}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizerUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})

export default
    compose(
        connect(mapStateToProps, {

            getUserProfile: getUserProfileThunkCreator,
            updateUserStatus: updateUserStatusThunkCreator,
            getUserStatus: getUserStatusThunkCreator

        }),
        withRouter,
        withAuthRedirect
    )(ProfileContainer)







// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)
// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);
// export default connect(mapStateToProps, { getUserProfile: getUserProfileThunkCreator })(WithUrlDataContainerComponent);