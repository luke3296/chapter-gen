import React, { useContext, useState } from "react";
import ApiKeyContext from './ApiKeyContext';
import App2 from './App2';
import './ChapterBeats.css';

function ChapterBeats({ addApp2Instance }) {
const apiKey = useContext(ApiKeyContext);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [showApp2, setShowApp2] = useState(false);
  const [temperature, setTemperature] = useState(0.1);
  const [maxTokens, setMaxTokens] = useState(100);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.5);
  const [presencePenalty, setPresencePenalty] = useState(0.5);
  const [app2Text, setApp2Text] = useState("");
  const [app2Instances, setApp2Instances] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleShowApp2 = () => {
    const newText = document.getElementById('out_txt_beats').value;
    addApp2Instance(newText); // Invoke the prop function from the parent component
  };

  const AnalyseStyle = () => {
    let in_txt_chap = document.getElementById('in_txt_chap').value;
  
    console.log(
      `Analyse Style: temp ${temperature}, maxTokens ${maxTokens}, top_p ${topP}, freq_penalty ${frequencyPenalty}, pres_penalty ${presencePenalty} `
    );
  
    fetch('https://api.openai.com/v1/completions', {
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: 'Write a numbered list of detailed chapter beats from this chapter description: ' + in_txt_chap,
        temperature: temperature,
        max_tokens: maxTokens,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
      }),
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const out_txt_beats = data['choices'][0].text;
        document.getElementById('out_txt_beats').value = out_txt_beats;
  
        // Create App2 instance with the updated text
        const app2Instance = <App2 text={out_txt_beats} />;
  
        // Add the App2 instance to the array of instances
        setApp2Instances((prevInstances) => [...prevInstances, app2Instance]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  const handleApp2InstanceAdded = (text) => {
    setApp2Instances((prevInstances) => [...prevInstances, text]);
  };

  return (
    <div className="ChapterBeats">
      <p>Enter a description of a chapter e.g. setup, beginning, middle, and end</p>
      <textarea value={inputValue} onChange={handleInputChange} id="in_txt_chap" />
      <br />
      <button onClick={AnalyseStyle}>Write Beats</button>
      <br />
      <textarea id="out_txt_beats" />
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
      <button onClick={handleShowApp2}>Beats to chapter</button>

     
    </div>
  );
}

export default ChapterBeats;