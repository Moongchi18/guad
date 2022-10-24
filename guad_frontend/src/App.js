import "./App.css";
import FileUploadForm from "./FileUploadForm";
import { Route } from "react-router-dom";
import GoogleLoginForm from "./GoogleLoginForm";
import Header from "./component/Header";
import Login from "./component/Login";
import AuctionTest from "./auction/AuctionTest";
import Auction from "./component/Auction";
import Footer from "./component/Footer";
import Main from "./component/Main";
import Join from "./component/Join";
import Join_g from "./component/Join_g";

function App() {
  return (
    <>
      <Header />
      <Route path="/g_login" component={GoogleLoginForm} exact={true} />
      <Route path="/login" component={Login} exact={true} />
      <Route path="/upload" component={FileUploadForm} exact={true} />
      <Route path="/header" component={Header} exact={true} />
      <Route
        path="/auction/test/:itemNum"
        component={AuctionTest}
        exact={true}
      />
      <Route path="/auction" component={Auction} exact={true} />
      <Route path="/footer" component={Footer} exact={true} />
      <Route path="/" component={Main} exact={true} />
      <Route path="/join" component={Join} exact={true} />
      <Route path="/join_g" component={Join_g} exact={true} />
      <Footer />
    </>
  );
}

export default App;
