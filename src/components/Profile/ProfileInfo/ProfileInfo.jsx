import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../Preloader/Preloader';
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"





const ProfileInfo = (props) => {

    if (!props.profile) {

        return <Preloader />
    }

    return (
        <div>



            <div className={s.descriptionBlock}>
                {
                    props.profile.photos.large
                        ? <img src={props.profile.photos.large} />
                        : <img src='https://sun9-72.userapi.com/impf/c840238/v840238583/52b6/kzTRJ0aSLtE.jpg?size=284x177&quality=96&sign=df6abc68d176ea2ef5a2c837df5a6e8d&c_uniq_tag=oPJlq0TKhhtcLx8kvT4-3yTePaM8iNwZKJMPONPUYcY&type=album' />
                }





                {/* <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus} /> */}
                <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;