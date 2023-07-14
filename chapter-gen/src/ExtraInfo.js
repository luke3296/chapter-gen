import React, { useContext, useState } from "react";
import ApiKeyContext from './ApiKeyContext';
import './ExtraInfo.css';

function ExtraInfo() {
  const  apiKey  = useContext(ApiKeyContext);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const handleInputChange1 = (event) => {
    setInputValue1(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setInputValue2(event.target.value);
  };

  const [modalOpen, setModalOpen] = useState(false);

  const [temperature, setTemperature] = useState(0);
  const [maxTokens, setMaxTokens] = useState(100);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.2);
  const [presencePenalty, setPresencePenalty] = useState(0);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  // Replace this function with the actual functionality
  const doSomething = () => {
    console.log('Doing something with the inputs and parameters');
  };

  return (
    <div className="ExtraInfo">
      <textarea value={inputValue1} onChange={handleInputChange1} id="in_txt_1" />
      <br></br>
      <button onClick={doSomething}>Do Something</button>
      <br></br>
      <textarea value={inputValue2} onChange={handleInputChange2} id="in_txt_2" />
      <br></br>
      <button onClick={doSomething}>Do Something Else</button>
      <button style={{position: 'relative', top: 0, left: 0}} onClick={handleModalOpen}>Open Settings</button>
      {modalOpen && (
        <div className="modal">
          <button onClick={handleModalClose}>Close</button>
          <br></br>
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

export default ExtraInfo;
