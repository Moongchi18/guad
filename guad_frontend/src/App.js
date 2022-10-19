
import './App.css';
import ChatRoom from './component/ChatRoom';
import Auction from './component/Auction';
import fileUploadForm from './fileUploadForm';
import { Route } from 'react-router-dom';

function App() {

  console.log("test33333");
  return (
    <>
      {/* <ChatRoom /> */}
      <Auction />
    <Route path="/upload" component={fileUploadForm} exact={true} />

    </>
  );
}

export default App;
