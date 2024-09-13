import React, { useState } from "react";
import "./popup.css";
import { signInWithGoogle, signWithEmail } from "./auth";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// Validation Schemas
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const signupSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const AuthPopup = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");

  // Login form setup
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  // Signup form setup
  const {
    register: signupRegister,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  if (!isOpen) return null;

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Handle login form submission
  const onLoginSubmit = async (data) => {
    const { email, password } = data;
    console.log("Login Data:", data);
  
    try {
      // Call sign-in function (you can use a separate auth method for signing in)
      let userCredential = await signInWithEmailAndPassword(auth, email, password);
      let user = userCredential.user;
      console.log("Logged in: ", user);
      alert("User logged in successfully");
    } catch (error) {
      // Show alert if login fails
      console.error("Login failed:", error);
      if (error.code === "auth/user-not-found") {
        alert("User not found. Please check your email.");
      } else if (error.code === "auth/wrong-password") {
        alert("Wrong password. Please try again.");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    }
  };
  

  const onSignupSubmit = async (data) => {
    const { fullName, email, password } = data;
    console.log("Signup Data:", data);
  
    try {
      // Call signWithEmail from auth.js to create the account
      await signWithEmail(email, password);
      console.log("Account created");
  
      // Immediately sign out the user after the account is created
      await auth.signOut();
      console.log("User signed out after signup");
  
      // Optionally, switch to the login tab after signing out
      setActiveTab("login");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };
  
  
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => handleTabSwitch("login")}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => handleTabSwitch("signup")}
          >
            Sign Up
          </button>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="login-form">
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              {...loginRegister("email")}
            />
            {loginErrors.email && <p className="error-msg">{loginErrors.email.message}</p>}
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              {...loginRegister("password")}
            />
            {loginErrors.password && <p className="error-msg">{loginErrors.password.message}</p>}
            <button className="btn login-btn" type="submit">
              Login
            </button>

            <div className="divider">
              <hr /> <span>OR</span> <hr />
            </div>

            <button className="btn google-btn" onClick={signInWithGoogle}>
              Register with Google
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit(onSignupSubmit)} className="signup-form">
            <input
              type="text"
              placeholder="Full Name"
              className="form-input"
              {...signupRegister("fullName")}
            />
            {signupErrors.fullName && <p className="error-msg">{signupErrors.fullName.message}</p>}
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              {...signupRegister("email")}
            />
            {signupErrors.email && <p className="error-msg">{signupErrors.email.message}</p>}
            <input
              type="password"
              placeholder="Password"
              className="form-input"
              {...signupRegister("password")}
            />
            {signupErrors.password && <p className="error-msg">{signupErrors.password.message}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-input"
              {...signupRegister("confirmPassword")}
            />
            {signupErrors.confirmPassword && (
              <p className="error-msg">{signupErrors.confirmPassword.message}</p>
            )}
            <button className="btn signup-btn" type="submit">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
