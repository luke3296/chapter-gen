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
  const [maxTokens, setMaxTokens] = useState(700);
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
  const condenceBGinfo = () => {
      var in_text = document.getElementById("in_txt_1").value
      const payload = JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'Summarise the following text including lots of detail' },
              { role: 'user', content: in_text }
          ],
          "temperature": temperature,
          "max_tokens": maxTokens,
          "top_p": topP,
          "frequency_penalty": frequencyPenalty,
          "presence_penalty": presencePenalty
      });

      fetch('https://api.openai.com/v1/chat/completions', {
          body: payload,
          headers: {
              Authorization: 'Bearer '+apiKey,
              'Content-Type': 'application/json'
          },
          method: 'POST'
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              document.getElementById('out_txt_1').value = data.choices[0].message.content;
          })
          .catch((err) => {
              console.log(err);
          });
  };

  const condenceChacterinfo = () => {
      var in_text = document.getElementById("in_txt_2").value
      const payload = JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
              { role: 'system', content: 'Summarise the following text including lots of detail' },
              { role: 'user', content: in_text }
          ],
          "temperature": temperature,
          "max_tokens": maxTokens,
          "top_p": topP,
          "frequency_penalty": frequencyPenalty,
          "presence_penalty": presencePenalty
      });

      fetch('https://api.openai.com/v1/chat/completions', {
          body: payload,
          headers: {
              Authorization: 'Bearer '+apiKey,
              'Content-Type': 'application/json'
          },
          method: 'POST'
      })
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              document.getElementById('out_txt_2').value = data.choices[0].message.content;
          })
          .catch((err) => {
              console.log(err);
          });
  };


  return (
    <div className="ExtraInfo">
      <p>Enter some background info</p>
      <textarea value={inputValue1} onChange={handleInputChange1} id="in_txt_1" />
      <br></br>
      <button onClick={condenceBGinfo}>Condence</button>
      <br></br>
      <textarea id="out_txt_1" />
      <br></br>
      <p>Enter some Chacter profiles </p>
      <textarea value={inputValue2} onChange={handleInputChange2} id="in_txt_2" />
      <br></br>
      <button onClick={condenceChacterinfo}>Condence</button>
      <br></br>
      <textarea  id="out_txt_2" />
      <br></br>
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
