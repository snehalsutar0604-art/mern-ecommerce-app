import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId="578595592914-fdg1ltekcb8u3bjrb1r5p13slh1plquj.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
