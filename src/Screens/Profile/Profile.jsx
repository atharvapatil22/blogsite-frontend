import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { authUserSet } from "../../redux/actions";
import "./Profile.css";

function Profile() {
  const store = useSelector((state) => state);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (store.globalData.authUser != null) setUserLoggedIn(true);
  }, []);

  const handleLogout = () => {
    // Set redux store to null
    dispatch(authUserSet(null));

    // Set local Storage to null
    localStorage.removeItem("logged_in");
    localStorage.removeItem("access_token");

    // Navigate to landing-page
    navigate("/landing-page");
  };

  return (
    <div className="profile-container">
      <div className="profile-body">
        Profile Screen{" "}
        {!!userLoggedIn && (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <Sidebar />
    </div>
  );
}

export default Profile;
