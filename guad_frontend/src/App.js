
import './App.css';
<<<<<<< HEAD
import ChatRoom from './component/ChatRoom';
import Auction from './component/Auction';
=======
import fileUploadForm from './fileUploadForm';
import { Route } from 'react-router-dom';
>>>>>>> branch 'main' of https://github.com/Moongchi18/guad.git

function App() {
<<<<<<< HEAD

=======
  console.log("test33333");
>>>>>>> branch 'main' of https://github.com/Moongchi18/guad.git
  return (
    <>
<<<<<<< HEAD
      {/* <ChatRoom /> */}
      <Auction />
=======
    <Route path="/upload" component={fileUploadForm} exact={true} />

>>>>>>> branch 'main' of https://github.com/Moongchi18/guad.git
    </>
  );
}

export default App;
