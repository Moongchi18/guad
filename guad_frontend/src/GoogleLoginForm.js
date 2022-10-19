import axios from "axios";
import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginForm() {
  return (
    <>
      <GoogleOAuthProvider clientId="1068908873530-v0oqqriuhdbbk25d85vtau5hf39tebfo.apps.googleusercontent.com">
        <GoogleLogin
          buttonText="구글 로그인"        
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
}

export default GoogleLoginForm;
