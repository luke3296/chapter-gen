import './App.css';
import App2 from './App2';
import GetApiKey from './GetApiKey';
import WritingStyle from './WritingStyle';

import React, { useState } from 'react';
import ApiKeyContext from './ApiKeyContext';

function App() {
  const [apiKey, setApiKey] = useState('');

  const handleApiKeyChange = (key) => {
    setApiKey(key);
  };

  return (
    <div className="App">
      <ApiKeyContext.Provider value={apiKey}>
        <GetApiKey setApiKey={setApiKey}  />
        <br />
        <WritingStyle />
        <br />
        <App2 />
      </ApiKeyContext.Provider>
    </div>
  );
}

export default App;
