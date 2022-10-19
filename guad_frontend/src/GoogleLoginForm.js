
import {useEffect} from 'react'

function GoogleLoginForm() {

  function handlerCallbackResponse(response) {

  }

    useEffect(() => {
      /* global google */
      google.accounts.id.initialize({
       client_id: "1068908873530-hp1930ja7o5k3qcree5o0v9tt21h055h.apps.googleusercontent.com",
       callback: handlerCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large"}
      );
    }, []);

  return (
    <>
    <div className="App">
      <div id="signInDiv"></div>
    </div>

    </>
  );
}

export default GoogleLoginForm;
