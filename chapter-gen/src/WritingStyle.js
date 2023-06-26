import React, { useContext, useState } from "react";
import ApiKeyContext from './ApiKeyContext';
import './WritingStyle.css';


function WritingStyle() {
    const  apiKey  = useContext(ApiKeyContext);
    const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    //setInputValue(event.target.value);
  };


  const AnalyseStyle = () => {
    console.log(apiKey)
    console.log("key")
    let in_txt=document.getElementById("in_txt").value
    fetch("https://api.openai.com/v1/completions", {
  body: JSON.stringify({
    model: "text-davinci-003",
    prompt:
      "Write a detailed description of the writing style, tense, and POV for the following passage. Do not attempt to continue the text. Include lots of detail: " + in_txt,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0.2,
    presence_penalty: 0,
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

};

  return (
    <div className="WritingStyle">
      <p>enter some text to analyze</p>
      <textarea   onChange={handleInputChange} id="in_txt" />
      <br></br>
      <button onClick={AnalyseStyle}>Analyze writing style</button>
      <br></br>
      <textarea  id="out_txt" />
    </div>
  );
}

export default WritingStyle;
