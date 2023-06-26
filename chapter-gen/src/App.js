import './App.css';
//import './App2.css';
import App2 from './App2';
import GetApiKey from './GetApiKey';
import React, { useState } from "react";

function App() {
  return (
    <div className="App">
     <GetApiKey />
      <br></br>
      <App2 />
      <br></br>
      <App2 />
    </div>
   
  );
}

export default App;
