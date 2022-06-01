import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Screens/Home/Home";
import WriteBlog from "./Screens/WriteBlog/WriteBlog";
import Profile from "./Screens/Profile/Profile";
import Blog from "./Screens/Blog/Blog";
import AuthForm from "./Components/AuthForm/AuthForm";
import { useDispatch, useSelector } from "react-redux";
import { authFormVisible } from "./redux/actions";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const store = useSelector((state) => state);

  axios.interceptors.request.use(function (config) {
    const token = store.globalData.authToken;
    config.headers.Authorization = token;

    return config;
  });

  return (
    <div className="App">
      {!!store.globalData.authFormVisible && <AuthForm />}
      <Router>
        <Navbar />
        <Routes>
          <Route path={"/"} exact element={<Home />} />
          <Route path={"/write-blog"} exact element={<WriteBlog />} />
          <Route path={"/blog/:blogID"} exact element={<Blog />} />
          <Route path={"/profile"} exact element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
