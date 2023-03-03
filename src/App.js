import './App.css';
import { useState } from 'react';

const shaRegex = "^([0-9A-Fa-f]{2}[:]){19}([0-9A-Fa-f]{2})$";

function App() {

  const [sha, setSha] = useState('');
  
  function onClick() {
    console.log(sha)
  }

  return (
    <div className="App">
      <div >
		   <div>Please input your sha below.</div>
		   <input onChange={(e) => setSha(e.target.value)}></input>
		   <button onClick={onClick}>Submit</button>
      </div>
    </div>
  );
}

export default App;
