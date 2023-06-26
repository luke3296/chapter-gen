import React, { useContext, useState } from "react";
import ApiKeyContext from './ApiKeyContext';
import './WritingStyle.css';

function WritingStyle() {
  const  apiKey  = useContext(ApiKeyContext);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


    // Modal open/close state
    const [modalOpen, setModalOpen] = useState(false);

    // States for each variable
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

    // Update AnalyseStyle to use state variables
    const AnalyseStyle = () => {
        // Existing code...
        let in_txt=document.getElementById("in_txt").value
        const wordCount = in_txt.split(' ').length;
    
        if (wordCount > 1000) {
          alert("Maximum word count exceeded. Please limit your input to 1000 words.");
          return;
        }
        // Replace hardcoded values with state variables
        console.log(`Analyse Style: temp ${temperature}, maxTokens ${maxTokens}, top_p ${topP}, freq_penalty ${frequencyPenalty}, pres_penalty ${presencePenalty} `) 
        fetch("https://api.openai.com/v1/completions", {
            // Existing code...
            
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: "Write a detailed description of the wriritng stlyle, tense and POV for the following passage. do not attempt to continue the text. do include lots of detail about the writing style: "+document.getElementById("in_txt").value,
                temperature: temperature,
                max_tokens: maxTokens,
                top_p: topP,
                frequency_penalty: frequencyPenalty,
                presence_penalty: presencePenalty,
            }),
            headers: {
              Authorization: "Bearer " + apiKey,
              "Content-Type": "application/json",
            },
            method: "POST",
            }).then((response) => response.json())
            .then((data) => {
            console.log(data);
            document.getElementById("out_txt").value=data['choices'][0].text
            
            })
            .catch((err) => {
            console.log(err);
            });
        }
    

    return (
      
      <div className="WritingStyle">

      <p>enter some text to analyze (max 1000 words)</p>
      <textarea value={inputValue} onChange={handleInputChange} id="in_txt" />
      <br></br>
      <button onClick={AnalyseStyle}>Analyze writing style</button>
      <br></br>
      <textarea  id="out_txt" />
      <button style={{position: 'relative', top: 0, left: 0}} onClick={handleModalOpen}>Open Settings</button>
      {modalOpen && (
                <div className="modal">
                    <button onClick={handleModalClose}>Close</button>
                    <br></br>
                    <label>
                        Temperature:
                        <input type="number" value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} />
                    </label>
                    <br></br>
                    <label>
                        Max Tokens:
                        <input type="number" value={maxTokens} onChange={(e) => setMaxTokens(Number(e.target.value))} />
                    </label>
                    <br></br>
                    <label>
                        Top P:
                        <input type="number" value={topP} onChange={(e) => setTopP(Number(e.target.value))} />
                    </label>
                    <br></br>
                    <label>
                        Frequency Penalty:
                        <input type="number" value={frequencyPenalty} onChange={(e) => setFrequencyPenalty(Number(e.target.value))} />
                    </label>
                    <br></br>
                    <label>
                        Presence Penalty:
                        <input type="number" value={presencePenalty} onChange={(e) => setPresencePenalty(Number(e.target.value))} />
                    </label>
                </div>
            )}
        </div>
    );
}

export default WritingStyle;