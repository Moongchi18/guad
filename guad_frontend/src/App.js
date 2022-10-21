import "./App.css";
import FileUploadForm from "./FileUploadForm";
import { Route } from "react-router-dom";
import GoogleLoginForm from "./GoogleLoginForm";
import Header from "./component/Header";
import Login from "./component/Login";
import AuctionTest from "./auction/AuctionTest";
import Auction from "./component/Auction";

function App() {
  return (
    <>
      <Route path="/g_login" component={GoogleLoginForm} exact={true} />
      <Route path="/login" component={Login} exact={true} />
      <Route path="/upload" component={FileUploadForm} exact={true} />
      <Route path="/header" component={Header} exact={true} />
      <Route path="/auction/test/:itemNum" component={AuctionTest} exact={true} />
      <Route path="/auction" component={Auction} exact={true} />
    </>
  );
}

export default App;
