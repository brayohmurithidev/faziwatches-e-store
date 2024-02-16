import React from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button} from "@mui/material";
import {logout} from "../features/user/userSlice";

const ProfileMenu = () => {
    const dispatch = useDispatch()
    const {userInfo} = useSelector(state => state.auth);

    const {token} = useSelector(state => state.auth)
    return (
        <div className="profileMenu-wrapper">
            {token ? (
                <>
                    <Link to={`/profile`}>Profile</Link>
                    <Link to="#">History</Link>
                    <Button onClick={() => dispatch(logout())}>Logout</Button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign up</Link>
                </>
            )}
        </div>
    );
};

export default ProfileMenu;
