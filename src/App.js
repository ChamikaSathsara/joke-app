// App.js
import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainApp from './mainApp';
import { Button } from 'react-bootstrap';

function App() {
  const [showMainApp, setShowMainApp] = useState(false);

  const toggleMainApp = () => {
    setShowMainApp(prevState => !prevState);
  };

  return (
    <div className='App '>
    <div className="container d-flex flex-column align-items-center">
    <h1 className="text-center mb-4"> හරකා කාගෙද බලමු </h1>
    <Button variant={showMainApp ? "outline-danger" : "primary"} onClick={toggleMainApp} className="mb-3">
      {showMainApp ?'දැන් ඇති':'හොයමු'}
    </Button>
    {showMainApp && <MainApp />}
  </div>
  </div>
  );
}

export default App;
