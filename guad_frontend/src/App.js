
import './App.css';
import fileUploadForm from './fileUploadForm';
import { Route } from 'react-router-dom';

function App() {
  console.log("test33333");
  return (
    <>
    <Route path="/upload" component={fileUploadForm} exact={true} />

    </>
  );
}

export default App;
