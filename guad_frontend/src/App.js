
import './App.css';
import FileUploadForm from './FileUploadForm';
import Auction from './component/Auction';
import { Route } from 'react-router-dom';
import GoogleLoginForm from './GoogleLoginForm';
import Header from './component/Header';

function App() {

  console.log("test33333");
  return (
    <>
      {/* <ChatRoom /> */}
      {/* <Auction /> */}
    <Route path="/login" component={GoogleLoginForm} exact={true} />
    <Route path="/upload" component={FileUploadForm} exact={true} />
    <Route path="/header" component={Header} exact={true} />

    </>
  );
}

export default App;
