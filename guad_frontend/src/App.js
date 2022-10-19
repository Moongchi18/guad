
import './App.css';
<<<<<<< HEAD
import FileUploadForm from './FileUploadForm';
=======
import ChatRoom from './component/ChatRoom';
import Auction from './component/Auction';
import fileUploadForm from './fileUploadForm';
>>>>>>> 420da82f8f5441ff8d38e03fbf22862f9f87a253
import { Route } from 'react-router-dom';

function App() {

  console.log("test33333");
  return (
    <>
<<<<<<< HEAD
    <Route path="/upload" component={FileUploadForm} exact={true} />
=======
      {/* <ChatRoom /> */}
      <Auction />
    <Route path="/login" component={GoogleLoginForm} exact={true} />
    <Route path="/upload" component={FileUploadForm} exact={true} />
>>>>>>> 420da82f8f5441ff8d38e03fbf22862f9f87a253

    </>
  );
}

export default App;
