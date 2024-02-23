import React from 'react';
import {useSelector} from "react-redux";

const Profile = () => {
    const {userInfo} = useSelector(state => state.auth)
    return (
        <div>
            <h1>{userInfo.name}</h1>
        </div>
    );
};

export default Profile;
