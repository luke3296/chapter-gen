import './App2.css';
import React, { useContext, useEffect, useState } from 'react';
import ApiKeyContext from './ApiKeyContext';

function App2({ text }) {
  const apiKey = useContext(ApiKeyContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.1);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [topP, setTopP] = useState(1);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.5);
  const [presencePenalty, setPresencePenalty] = useState(0.5);
  let mode = false;
  const [chapTxtValue, setChapTxtValue] = useState('');
    function convertToPairedList(input) {
        const entries = input.match(/\d+\.\s+[^\n]+/g);

        if (!entries) {
            return [];
        }

        const pairedEntries = [];
        for (let i = 0; i < entries.length; i += 2) {
            if (i + 1 < entries.length) {
                pairedEntries.push(entries[i] + '\n' + entries[i + 1]);
            } else {
                pairedEntries.push(entries[i]);
            }
        }

        return pairedEntries;
    }

   async function beats2text(beat_string, current_text){


        let bgInfo = document.getElementById('out_txt_1').value;
        let charInfo = document.getElementById('out_txt_2').value;
        let style = document.getElementById('out_txt').value;
        let systemPrompt=''
        let userPrompt = ''
        let responce = ''
        if(current_text == '') {
            if (bgInfo.trim() == '' && charInfo.trim() != '' && style.trim() != '') {
                systemPrompt = 'This is some character info :' + charInfo + '. The style is '+style+'. Write story chapter prose for the given chapter beats : '
                userPrompt = beat_string
            } else if (bgInfo.trim() != '' && charInfo.trim() == '' && style.trim() != '') {
                systemPrompt = 'This is some background info :' + bgInfo + '. The style is '+style+'. Write story chapter prose for the given chapter beats : '
                userPrompt = beat_string
            } else if (bgInfo.trim() != '' && charInfo.trim() != '' && style.trim() != '') {
                systemPrompt = 'This is some character info :' + charInfo + 'and this is some background info : ' + bgInfo + '. The style is '+style+ '. Write story chapter prose for the given chapter beats : '
                userPrompt = beat_string
            } else if (bgInfo.trim() == '' && charInfo.trim() != '' && style.trim() == '') {
                systemPrompt = 'This is some character info :' + charInfo + '. Write story chapter prose for the given chapter beats : '
                userPrompt = beat_string
            } else if (bgInfo.trim() != '' && charInfo.trim() == '' && style.trim() == '') {
                systemPrompt = 'This is some background info :' + bgInfo + '. Write story chapter prose for the given chapter beats : '
                userPrompt = beat_string
            } else if (bgInfo.trim() != '' && charInfo.trim() != '' && style.trim() == '') {
                systemPrompt = 'This is some character info :' + charInfo + 'and this is some background info : ' + bgInfo + '. Write story chapter prose for the given chapter beats : '
                userPrompt = beat_string
            } else {
                console.log("error collating info")
            }
        }else if(current_text != ''){
            if (bgInfo.trim() == '' && charInfo.trim() != '' && style.trim() != '') {
                systemPrompt = 'This is some character info :' + charInfo + '. Write story chapter prose for these chapter beats : '+ beat_string + '. Write the story chapter prose as a continuation of the the given text : '
                userPrompt = current_text
            } else if (bgInfo.trim() != '' && charInfo.trim() == '' && style.trim() != '') {
                systemPrompt = 'This is some background info :' + bgInfo + '. Write story chapter prose for the given chapter beats : '
                userPrompt = current_text
            } else if (bgInfo.trim() != '' && charInfo.trim() != '' && style.trim() != '') {
                systemPrompt = 'This is some character info :' + charInfo + 'and this is some background info : ' + bgInfo + '. Write story chapter prose for the given chapter beats : '
                userPrompt = current_text
            } else if (bgInfo.trim() == '' && charInfo.trim() != '' && style.trim() == '') {
                systemPrompt = 'This is some character info :' + charInfo + '. Write story chapter prose for the given chapter beats : '
                userPrompt = current_text
            } else if (bgInfo.trim() != '' && charInfo.trim() == '' && style.trim() == '') {
                systemPrompt = 'This is some background info :' + bgInfo + '. Write story chapter prose for the given chapter beats: '
                userPrompt = current_text
            } else if (bgInfo.trim() != '' && charInfo.trim() != '' && style.trim() == '') {
                systemPrompt = 'This is some character info :' + charInfo + 'and this is some background info : ' + bgInfo + '. Write story chapter prose for the given chapter beats : '
                userPrompt = current_text
            } else {
                console.log("error collating info")
            }
        }

        //note using the more expensive 16K tokens model because of longer context requirments
        const payload = JSON.stringify({
            model: 'gpt-3.5-turbo-16k',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            "temperature": temperature,
            "max_tokens": maxTokens,
            "top_p": topP,
            "frequency_penalty": frequencyPenalty,
            "presence_penalty": presencePenalty
        });

        console.log("fetching")

        await fetch('https://api.openai.com/v1/chat/completions', {
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
                //document.getElementById('out_txt').value = data.choices[0].message.content;
                responce = data.choices[0].message.content;
            })
            .catch((err) => {
                console.log(err);
            });
    return responce
    }

  async function generateChapter(){

    console.log("called");
    let curr= chapTxtValue
      if(curr == undefined){
          curr=''
      }
     let generated_text=''
    if(mode == true){
      console.log("generate completion mode")
        let beats = convertToPairedList(text)
            for( let i =0; i<beats.length; i++){
            console.log(generated_text)
            generated_text= generated_text+ ' ' + await beats2text(beats[i],curr)

        }
    }else{
      console.log("generate from beats only")
        let beats = convertToPairedList(text)
          for( let i =0; i<beats.length; i++){
            console.log(generated_text)
            generated_text= generated_text+ ' ' + await beats2text(beats[i],curr)

        }
    }
    //document.getElementsByClassName("chap_txt")[0].value = generated_text
    setChapTxtValue(generated_text);
    //return generated_text
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
        <textarea className="chap_txt" value={chapTxtValue} onChange={(e) => setChapTxtValue(e.target.value)} />
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