import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import GoogleButton from "../formatters/GoogleButton";
import { auth, googleProvider  } from "../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignInContainer = styled.div`
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    margin-bottom: 1.5rem;
    font-size: 24px;
    color: #333;
    text-align: center;
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px 15px;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    color: #333;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #1a73e8;
        outline: none;
    }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 45px;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 24px;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  transition: background-color 0.3s, box-shadow 0.3s;
  text-align: center;
  outline: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #1765c1;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #144a97;
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #a0a0a0;
    cursor: not-allowed;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #ddd;
  margin: 1.5rem 0;
`;

const FooterText = styled.div`
  text-align: center;
  margin-top: 1rem;
  font-size: 14px;
  color: #666;

  a {
    color: #1a73e8;
    text-decoration: none;
  }
`;

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
    <SignInContainer>
      <Title>Log In</Title>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <form onSubmit={handleLogIn}>
        <StyledInput
          type="email"
          placeholder="E-mail address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <StyledInput
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <StyledButton type="submit">Log In</StyledButton>
      </form>
      <Divider />
      <GoogleButton buttonText="Continue with Google" onClickHandler={handleGoogleSignIn} />
      <FooterText>
        Don't have an account? <a href="/signup">Sign Up</a>
      </FooterText>
    </SignInContainer>
  );
};

export default LogIn;
