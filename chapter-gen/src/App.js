import './App.css';
import App2 from './App2';
import GetApiKey from './GetApiKey';
import WritingStyle from './WritingStyle';
import ChapterBeats from './ChapterBeats';

import React, { useState } from 'react';
import ApiKeyContext from './ApiKeyContext';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [app2Instances, setApp2Instances] = useState([]);

  const addApp2Instance = (text) => {
    setApp2Instances((prevInstances) => [...prevInstances, text]);
  };

  return (
    <div className="App">
      <ApiKeyContext.Provider value={apiKey}>
        <div className="gridContainer">
          <div className="gridItem">
            <GetApiKey setApiKey={setApiKey} />
            <WritingStyle />
          </div>
          <div className="gridItem">
            <ChapterBeats addApp2Instance={addApp2Instance} /> {/* Pass the addApp2Instance prop */}
          </div>
          {app2Instances.map((text, index) => (
            <div className="gridItem" key={index}>
              <App2 text={text} />
            </div>
          ))}
        </div>
      </ApiKeyContext.Provider>
    </div>
  );
}
export default App;