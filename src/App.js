import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Screens/Home/Home";
import WriteBlog from "./Screens/WriteBlog/WriteBlog";
import Profile from "./Screens/Profile/Profile";
import Blog from "./Screens/Blog/Blog";

function App() {
  return (
    <div className="App">
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
