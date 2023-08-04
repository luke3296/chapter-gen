import React, { useContext, useState, useRef, useEffect, useCallback } from "react";
import ApiKeyContext from './ApiKeyContext';
import './ChapterBeats.css';

function ChapterBeats({addApp2Instance}) {
  const apiKey = useContext(ApiKeyContext);
  const [inputValue, setInputValue] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.1);
  const [maxTokens, setMaxTokens] = useState(100);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.5);
  const [presencePenalty, setPresencePenalty] = useState(0.5);
  const [outTxtBeats, setOutTxtBeats] = useState("");
  //const [app2Instances, setApp2Instances] = useState([]);
  const outTxtBeatsRef = useRef(null);

  // const addApp2Instance = useCallback((text) => {
  //   setApp2Instances((prevInstances) => [...prevInstances, text]);
  // }, []);

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
    const newText = outTxtBeatsRef.current.value || outTxtBeats;
    addApp2Instance(newText);
  };

  useEffect(() => {
    setOutTxtBeats(document.getElementById("out_txt_beats").value);
  }, []);

  // useEffect(() => {
  //   if (app2Instances.length > 0) {
  //     const newText = outTxtBeats || "";
  //     const updatedApp2Instances = [...app2Instances];
  //     updatedApp2Instances[app2Instances.length - 1] = newText;
  //     setApp2Instances(updatedApp2Instances);
  //   }
  // }, [outTxtBeats, addApp2Instance]);

  const handleWriteBeats = () => {
    let inTxtChap = document.getElementById('in_txt_chap').value;
    let bgInfo = document.getElementById('out_txt_1').value;
    let charInfo = document.getElementById('out_txt_2').value;
    let systemPrompt=''
    if(bgInfo.trim() == '' && charInfo.trim() != '' ){
      systemPrompt ='Write a numbered list of detailed chapter beats for the given chapter description. The character info is' + charInfo + '. Only respond with a numberd list:'
    }else if(bgInfo.trim() != '' && charInfo.trim() == ''){
      systemPrompt ='Write a numbered list of detailed chapter beats for the given chapter description. The background info is '+ bgInfo + 'Only respond with a numberd list :'
    }else if(bgInfo.trim() != '' && charInfo.trim() != ''){
      systemPrompt ='Write a numbered list of detailed chapter beats for the given chapter description. The background info is '+ bgInfo + 'the character info is' + charInfo + ' Only respond with a numberd list:'
    }else{
      systemPrompt ='Write a numbered list of detailed chapter beats for the given chapter description, Only respond with a numberd list :'
    }
    console.log(systemPrompt)
    const payload = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: inTxtChap }
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
          console.log(data)
          const outTxtBeats = data.choices[0].message.content.trim();
          setOutTxtBeats(outTxtBeats);
          document.getElementById('out_txt_beats').value = outTxtBeats
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="ChapterBeats">
      <p>Enter a description of a chapter e.g. setup, beginning, middle, and end</p>
      <textarea value={inputValue} onChange={handleInputChange} id="in_txt_chap" />
      <br />
      <button onClick={handleWriteBeats}>Write Beats</button>
      <br />
      <textarea id="out_txt_beats" value={outTxtBeats} onChange={(e) => setOutTxtBeats(e.target.value)} ref={outTxtBeatsRef} />
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
