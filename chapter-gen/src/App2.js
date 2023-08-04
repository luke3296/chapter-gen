import './App2.css';
import React, { useContext, useEffect, useState } from 'react';
import ApiKeyContext from './ApiKeyContext';

function App2({ text }) {
  const apiKey = useContext(ApiKeyContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.1);
  const [maxTokens, setMaxTokens] = useState(100);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.5);
  const [presencePenalty, setPresencePenalty] = useState(0.5);
  let mode = false

  function generateChapter(){

    console.log("called");
    if(mode == true){
      console.log("generate completion mode")
    }else{
      console.log("generate from beats only")
    }
  }

  useEffect(() => {
    document.getElementsByClassName("in_txt_beats")[0].value = text;
  }, [text]);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const setMode = () => {
    if (mode == false) {
    mode = true
    }else{
    mode = false
    }
    console.log(mode)
  };


  return (
    <div className="App2">
      <p>Edit the beats</p>
      <textarea defaultValue={text} className="in_txt_beats" />
      <button onClick={generateChapter}>Generate Chapter</button>
      <div>
      <input onChange={setMode} type="checkbox"/>
      Completions mode
      </div>
      <textarea className="chap_txt"/>
      <button style={{ position: 'relative', top: 0, left: 0 }} onClick={handleModalOpen}>Open Settings</button>

      {modalOpen && (
        <div className="modal">
          <button onClick={handleModalClose}>Close</button>
          <br />
          <label>
            Temperature:
            <input type="number" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
          </label>
          <br />
          <label>
            Max Tokens:
            <input type="number" value={maxTokens} onChange={(e) => setMaxTokens(Number(e.target.value))} />
          </label>
          <br />
          <label>
            Top P:
            <input type="number" value={topP} onChange={(e) => setTopP(Number(e.target.value))} />
          </label>
          <br />
          <label>
            Frequency Penalty:
            <input type="number" value={frequencyPenalty} onChange={(e) => setFrequencyPenalty(Number(e.target.value))} />
          </label>
          <br />
          <label>
            Presence Penalty:
            <input type="number" value={presencePenalty} onChange={(e) => setPresencePenalty(Number(e.target.value))} />
          </label>
        </div>
      )}
    </div>
  );
}

export default App2;