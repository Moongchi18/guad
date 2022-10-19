function GoogleLoginForm({}) {
    const onClickGoogleLogin = (e) => {
    	//구글 인증 서버로 인증코드 발급 요청
 		window.location.replace("https://accounts.google.com/o/oauth2/v2/auth?
        client_id=yourClientID
        &redirect_uri=http://localhost:8080/login/google/auth
        &response_type=code
        &scope=email%20profile%20openid
        &access_type=offline")
 	}

	const googleLoginBtn = document.getElementById("googleLoginBtn");
	googleLoginBtn.addEventListener("click", onClickGoogleLogin);

    return (
    <>
      <body>
        <fieldset>
          <label>로그인</label> <br />
          <div id="googleLoginBtn" style="cursor: pointer">
            <img
              id="googleLoginImg"
              src="./images/btn_google_signin_light_pressed_web.png"
            />
          </div>
        </fieldset>
      </body>

      <script></script>
    </>
  );
}
