import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Screens/Home/Home";
import WriteBlog from "./Screens/WriteBlog/WriteBlog";
import Profile from "./Screens/Profile/Profile";
import Blog from "./Screens/Blog/Blog";
import AuthForm from "./Components/AuthForm/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./Screens/LandingPage/LandingPage";
import { BaseURL } from "./environment";

function App() {
  const store = useSelector((state) => state);
  const [authLoader, setAuthLoader] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = () => {
    if (localStorage.getItem("logged_in") == "true") {
      if (localStorage.getItem("access_token") == null) {
        setAuthLoader(false);
        return;
      }
      axios
        .post(BaseURL + "/authenticate")
        .then((res) => {
          if (res.status == 200) {
            setAuthLoader(false);
            setAuthenticated(true);
          }
        })
        .catch((err) => {
          if (err?.response?.data?.message) {
            console.log("Error: ", err.response.data.message);
            if (err.response.status == 403)
              alert("Access Token is invalid! Please log in again.");
          } else {
            console.log("/authenticate API: Some error occured!");
          }
          setAuthLoader(false);
        });
    } else setAuthLoader(false);
  };

  axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem("access_token");
    config.headers.Authorization = "Bearer " + token;

    return config;
  });

  return (
    <div className="App">
      {/* SHOW AUTH LOADER */}
      {!!authLoader ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            fontSize: "3em",
          }}
        >
          Authenticating...
        </div>
      ) : // If user authenticated
      authenticated ? (
        <Router>
          {!!store.globalData.authFormVisible && <AuthForm />}
          <Navbar />
          <Routes>
            <Route path={"/landing-page"} exact element={<LandingPage />} />
            <Route path={"/"} exact element={<Home />} />
            <Route path={"/write-blog"} exact element={<WriteBlog />} />
            <Route path={"/blog/:blogID"} exact element={<Blog />} />
            <Route path={"/profile"} exact element={<Profile />} />
          </Routes>
        </Router>
      ) : (
        //  Else -> Show visitor routes
        <>Visitor routes</>
      )}
    </div>
  );
}

export default App;
