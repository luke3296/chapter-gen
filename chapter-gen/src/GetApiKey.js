import './GetApiKey.css';

function GetApiKey() {
  function check_key() {
    let key = document.getElementById("apikey").value.trim();
    fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': 'Bearer ' + key
      }
    }).then((response) => {
      return response.json().then((data) => {
        console.log(data);
        if (!data.hasOwnProperty('error')){
            document.getElementById("key_loaded").innerText="Key Loaded"
            document.getElementsByClassName("GetApiKey")[0].style.backgroundColor = 'green';
            document.getElementById("apikey").value=""
        }
        return data;
      }).catch((err) => {
        console.log(err);
      });
    });
  }

  return (
    <div className="GetApiKey">
      <p>Enter your OpenAI API key</p>
      <input id="apikey" type='text'></input>
      <button onClick={check_key}>Check</button>
      <p id="key_loaded">No Key Loaded</p>
    </div>
  );
}

export default GetApiKey;

