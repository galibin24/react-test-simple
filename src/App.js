import './App.css';
import { useState } from 'react';

const shaRegex = "^([0-9A-Fa-f]{2}[:]){19}([0-9A-Fa-f]{2})$";

function App() {

  const [sha, setSha] = useState('');
  const [result, setResult] = useState('');
  
  async function onClick() {
    if (!shaRegex.match(sha)) {
      throw new Error('BOOM')
    }

    const res = await fetch('http://example.com/movies.json')
    setResult(res);
  }
 
  return (
    <div className="App">
      <div >
		   <div>Please input your sha below.</div>
        <input onChange={(e) => setSha(e.target.value)}></input>
        <button onClick={onClick}>Submit</button>
      </div>
      <div>{result}</div>
    </div>
  );
}

export default App;
