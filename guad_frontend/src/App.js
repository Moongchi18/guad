
import './App.css';
import FileUploadForm from './FileUploadForm';
import Auction from './component/Auction';
import { Route } from 'react-router-dom';
import GoogleLoginForm from './GoogleLoginForm';

function App() {

  console.log("test33333");
  return (
    <>
      {/* <ChatRoom /> */}
      <Auction />
    <Route path="/login" component={GoogleLoginForm} exact={true} />
    <Route path="/upload" component={FileUploadForm} exact={true} />

    </>
  );
}

export default App;
