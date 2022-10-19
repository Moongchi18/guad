
import './App.css';
import FileUploadForm from './FileUploadForm';
import { Route } from 'react-router-dom';

function App() {
  console.log("test33333");
  return (
    <>
    <Route path="/upload" component={FileUploadForm} exact={true} />

    </>
  );
}

export default App;
