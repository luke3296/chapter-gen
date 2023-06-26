import logo from './logo.svg';
import './App2.css';
import React, { useContext } from 'react';
import ApiKeyContext from './ApiKeyContext';

function App2() {
  const apiKey = useContext(ApiKeyContext);

  return (
    <div className="App2">
      <header className="App2-header">
        <img src={logo} className="App2-logo" alt="logo" />
        <p>
          Edit <code>src/App2.js</code> and save to reload.
        </p>
        {apiKey && <p>API Key: {apiKey}</p>}
        <a
          className="App2-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App2;
