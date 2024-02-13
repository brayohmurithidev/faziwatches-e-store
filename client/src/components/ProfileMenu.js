import React from "react";
import { Link } from "react-router-dom";

const ProfileMenu = () => {
  const user = false;
  return (
    <div className="profileMenu-wrapper">
      {user ? (
        <>
          <Link to="#">Profile</Link>
          <Link to="#">History</Link>
          <Link to="#">Logout</Link>
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
