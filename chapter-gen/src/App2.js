import './App2.css';
import React, { useContext, useEffect, useState } from 'react';
import ApiKeyContext from './ApiKeyContext';

function App2({ text }) {
  const apiKey = useContext(ApiKeyContext);

  function generateChapter(){
    console.log("called");
  }


  return (
    <div className="App2">
      <p>Edit the beats</p>
      <textarea defaultValue={text} id="in_txt_beats" />
      {apiKey && <p>API Key: {apiKey}</p>}
      <button onClick={generateChapter}>Generate Chapter</button>
      <textarea id="chap_txt"/>
    </div>
  );
}

export default App2;