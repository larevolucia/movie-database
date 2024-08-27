import React, { useEffect } from "react";
import { ui, uiConfig } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize the FirebaseUI Widget using Firebase
    ui.start("#firebaseui-auth-container", {
      ...uiConfig,
      callbacks: {
        ...uiConfig.callbacks,
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          console.log("Sign-in successful!", authResult);
          console.log("Redirect URL:", redirectUrl);

          // Handle the sign-in flow manually if needed
          if (authResult.user) {
            console.log("User information:", authResult.user);
            navigate("/dashboard");
          } else {
            console.error("No user found after sign-in.");
          }
          // Returning false prevents automatic redirect
          return false;
        },
      },
    });
  }, [navigate]);

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <div id="firebaseui-auth-container"></div>
    </div>
  );
}

export default Auth;
