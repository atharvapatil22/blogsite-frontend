import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Screens/Home/Home";
import WriteBlog from "./Screens/WriteBlog/WriteBlog";
import Profile from "./Screens/Profile/Profile";
import Blog from "./Screens/Blog/Blog";
import AuthForm from "./Components/AuthForm/AuthForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import LandingPage from "./Screens/LandingPage/LandingPage";
import { BaseURL } from "./environment";
import { authUserSet } from "./redux/actions";

function App() {
  const store = useSelector((state) => state);
  const [authLoader, setAuthLoader] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const [authFormVisible, setAuthFormVisible] = useState(false);
  const [authFormMessage, setAuthFormMessage] = useState("");

  const dispatch = useDispatch();

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
            // console.log("authenticated", res.data.user);
            dispatch(authUserSet(res.data.user));
            setAuthenticated(true);
            setAuthLoader(false);
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

  if (authLoader) {
    return (
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
    );
  }

  return (
    <div className="App">
      <Router>
        {!!authFormVisible && (
          <AuthForm
            type={"login"}
            message={authFormMessage}
            hideForm={() => {
              setAuthFormVisible(false);
            }}
          />
        )}
        <Navbar />
        <Routes>
          <Route
            path={"/"}
            exact
            element={
              authenticated ? (
                <Navigate to="/home" replace={true} />
              ) : (
                <Navigate to="/landing-page" replace={true} />
              )
            }
          />
          {/* PUBLIC ROUTES */}
          <Route path={"/landing-page"} exact element={<LandingPage />} />
          <Route path={"/home"} exact element={<Home />} />
          <Route path={"/blog/:blogID"} exact element={<Blog />} />
          <Route
            path="*"
            element={<div className="invalid-route">Invalid Route !!</div>}
          />

          {/* PROTECTED ROUTES */}
          <Route
            element={
              <ProtectedRoute
                userAuthenticated={authenticated}
                formMessage="Login to start writing blogs"
                setAuthFormVisible={setAuthFormVisible}
                setAuthFormMessage={setAuthFormMessage}
              />
            }
          >
            <Route path={"/write-blog"} exact element={<WriteBlog />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                userAuthenticated={authenticated}
                formMessage="Login to view Profile"
                setAuthFormVisible={setAuthFormVisible}
                setAuthFormMessage={setAuthFormMessage}
              />
            }
          >
            <Route path={"/profile"} exact element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
