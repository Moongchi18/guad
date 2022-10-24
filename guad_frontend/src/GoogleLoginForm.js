import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

function GoogleLoginForm() {
  const [user, setUser] = useState({});

  //토큰 >> decoding
  function handlerCallbackResponse(response) {
    console.log("Encoded JWT ID token " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    //로그인 하면 로그인 버튼 가리기
    document.getElementById("signInDiv").hidden = true;

    //구글로 부터 받은 데이터를 POST로 컨트롤러에 전달
    axios
      .post("http://localhost:8080/api/google/auth", {
        email: user.email,
      })
      .then((response) => {
        console.log(response);
        console.log(user.email);
        alert("오르내림에 오신걸 환영합니다.");
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패했습니다.");
      });
  }

  function handleSignOut(e) {
    setUser({});
    //로그아웃 하면 로그인 버튼 생성
    document.getElementById("signInDiv").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "1068908873530-hp1930ja7o5k3qcree5o0v9tt21h055h.apps.googleusercontent.com",
      callback: handlerCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });

    google.accounts.id.prompt();
  }, []);

  return (
    <>
      <div className="App">
        <div id="signInDiv"></div>

        {Object.keys(user).length != 0 && (
          <button id="logOutBt" onClick={(e) => handleSignOut(e)}>
            로그아웃
          </button>
        )}

        {user && (
          <div>
            <img src={user.picture}></img>
            <h3>{user.name}</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default GoogleLoginForm;
