// src/components/SignUp.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup  } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignInContainer = styled.div`
    max-width: 400px;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`
const SubContainer = styled.div` 
    max-width: 400px;
    margin: 1rem auto;
    text-align: center;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful sign-up
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <SignInContainer>
        <SubContainer>
          <h2>Sign Up</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSignUp} >
  <div className="row mb-2">
      <div className="col-sm-10 offset-sm-1">
          <input
          type="email"
          placeholder="E-mail address"
          className="form-control "
          value={email}
          id="login-email"
          onChange={(event) => setEmail(event.target.value)}
          required
          />
      </div>
  </div>
  <div className="row mb-2">
      <div className="col-sm-10 offset-sm-1">
          <input
          type="password"
          placeholder="Password"
          className="form-control"
          value={password}
          id="login-password"
          onChange={(event) => setPassword(event.target.value)}
          required
          />
      </div>
  </div>
  <div className="row mb-2">
      <div className="col-sm-10 offset-sm-1"> 
          <button type="submit" className="form-control btn btn-primary">Sign Up</button>
      </div>
  </div>
</form>
        </SubContainer>
        <SubContainer><button className="form-control btn btn-danger" onClick={handleGoogleSignIn}>Sign Up with Google</button> </SubContainer>
      </SignInContainer>
    </div>
  );
};

export default SignUp;
