import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import ForgotPassword from "./pages/Auth/ForgetPassword";
import Profile from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
import UserProfile from "./pages/UserProfile/Profile";
import Following from "./pages/FollwerPage";
import LikePage from "./pages/LikePage";
import TrendingPosts from "./pages/TrendingPosts";
import PostsApproval from "./pages/Admin/Posts";
import AllUsers from "./pages/Admin/Users";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <div
      className="App"
      // style={{
      //   height:
      //     window.location.href === "http://localhost:3000/chat"
      //       ? "calc(100vh - 2rem)"
      //       : "auto",
      // }}
    >
      {/* <div className="blur" style={{ top: "-18%", right: "0" }}></div> */}
      {/* <div className="blur" style={{ top: "36%", left: "-8rem" }}></div> */}
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
        <Route
          path="/following"
          element={user ? <Following /> : <Navigate to="../auth" />}
        />
        <Route
          path="/like"
          element={user ? <LikePage /> : <Navigate to="../auth" />}
        />
        <Route
          path="/postsApproval"
          element={user ? <PostsApproval /> : <Navigate to="../auth" />}
        />
        <Route
          path="/trendingPost"
          element={user ? <TrendingPosts /> : <Navigate to="../auth" />}
        />
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route
          path="/forgetPassword"
          element={user ? <Navigate to="../home" /> : <ForgotPassword />}
        />
        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route
          path="/admin"
          element={user ? <PostsApproval /> : <Navigate to="../auth" />}
        />
        <Route
          path="/users"
          element={user ? <AllUsers /> : <Navigate to="../auth" />}
        />
        <Route
          path="/following/:id"
          element={user ? <Following /> : <Navigate to="../auth" />}
        />
        <Route
          path="/userProfile/:id"
          element={user ? <UserProfile /> : <Navigate to="../auth" />}
        />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
      </Routes>
    </div>
  );
}
export default App;
