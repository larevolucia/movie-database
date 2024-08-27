import React, { useEffect } from "react";
import { ui, uiConfig } from "../firebase";
import "../styles/Auth.css";

function Auth() {
  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase
    ui.start("#firebaseui-auth-container", uiConfig);
  }, []);

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default Auth;
