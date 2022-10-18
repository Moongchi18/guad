import logo from './logo.svg';
import './App.css';
import fileUploadForm from './fileUploadForm';
import fileUploadResult from './fileUploadResult';
import { Route } from 'react-router-dom';

function App() {
  console.log("test33333");
  return (
    <>
    <Route path="/upload" component={fileUploadForm} exact={true} />
    <Route path="/uploadResult" component={fileUploadResult} exact={true} />
    </>
  );
}

export default App;
