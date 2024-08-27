// src/components/LogIn.js
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider  } from "../firebase";
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

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogIn = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful log-in
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
  };

  return (
    <div>
        <SignInContainer>
            <SubContainer>
                <h2>Log In</h2>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleLogIn} >
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
                            <button type="submit" className="form-control btn btn-primary">Log In</button>
                        </div>
                    </div>
                </form>
                <hr />
                <div>        
                    <button className="form-control btn btn-danger" onClick={handleGoogleSignIn}>
            Log In with Google
                    </button>
                </div>
            </SubContainer>
            <SubContainer>Don't have an account? <a href="/signup">Sign-Up</a></SubContainer>
        </SignInContainer>
    </div>
    
  );
};

export default LogIn;
