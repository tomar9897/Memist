import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../actions/AuthActions.js";
import Logo from "../../img/logo2.png";
import * as AuthApi from "../../api/AuthRequests";
import "./Auth.css";
const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);
  const [error, setError] = useState(""); // State to store the single error message

  console.log(error);

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(true);
    setError("");
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    setConfirmPass(true);
    e.preventDefault();
    setError(""); // Clear any previous error message before each new submission

    if (isSignUp) {
      if (data.password === data.confirmpass) {
        // If the password and confirm password match, proceed with sign-up
        dispatch(signUp(data, navigate));
      } else {
        setConfirmPass(false);
      }
    } else {
      try {
        let formData = data;
        dispatch({ type: "AUTH_START" });
        try {
          const { data } = await AuthApi.logIn(formData);
          console.log(data, "sda");
          dispatch({ type: "AUTH_SUCCESS", data: data });
          navigate("../home", { replace: true });
        } catch (error) {
          if (error.response) {
            console.log("sssssss", error);
            // Error response from the server (e.g., 400 Bad Request)
            if (error.response.status === 400) {
              if (error.response.data.message === "wrong_username") {
                setError("Incorrect username. Please try again.");
              } else if (error.response.data.message === "wrong password") {
                setError("Incorrect password. Please try again.");
              } else if (
                error.response.data.message === "wrong_password_username"
              ) {
                setError("Incorrect username or password. Please try again.");
              } else {
                setError("An error occurred. Please try again later.");
              }
            } else {
              setError("An error occurred. Please try again later.");
            }
          } else {
            setError("An error occurred. Please try again later.");
          }
          dispatch({ type: "AUTH_FAIL", error });
        }
        // const log = await dispatch(logIn(data, navigate));
        // console.log("log", log);
      } catch (error) {
        // console.log(error);
      }
    }
  };
  console.log("error", error);
  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname"></div>
      </div>

      {/* right form side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div className="mb-3">
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="mb-3">
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          {/* Conditionally render the "Email" input field only on the registration page */}
          {isSignUp && (
            <div className="mb-3">
              <input
                required
                type="email"
                placeholder="Email"
                className="infoInput"
                name="email"
                value={data.email}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not the same
          </span>
          {error && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
              {error}
            </div>
          )}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "Sign Up" : "Login"}
            </button>
          </div>
        </form>
      </div>
      {!isSignUp && <a href="/forgetPassword">Forget Password </a>}
    </div>
  );
};

export default Auth;
