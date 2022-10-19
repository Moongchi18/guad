import { useEffect, useState } from 'react'
import jwt_decode from "jwt-decode";

function GoogleLoginForm() {
  const [user, setUser] = useState({});


  function handlerCallbackResponse(response) {
    console.log("Encoded JWT ID token " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);

    //로그인 하면 로그인 버튼 가리기
    document.getElementById("signInDiv").hidden = true;
  }

  function handleSignOut(e) {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }


  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "1068908873530-hp1930ja7o5k3qcree5o0v9tt21h055h.apps.googleusercontent.com",
      callback: handlerCallbackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);


  return (
    <>
      <div className="App">
        <div id="signInDiv"></div>
        { }
        <button onClick={(e) => handleSignOut(e)}>로그아웃</button>
        {user && <div><img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>}
      </div>

    </>
  );
}

export default GoogleLoginForm;
