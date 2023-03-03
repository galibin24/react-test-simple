import './App.css';
import { useState } from 'react';

//const shaRegex = /^([0-9A-Fa-f]{2}[:]){19}([0-9A-Fa-f]{2})$/;

function App() {

  const [sha, setSha] = useState('');
  const [result, setResult] = useState('');
  
  async function onClick() {
    // note: this won't be required if we hash it for them
    // if (!shaRegex.match(sha)) {
    //   throw new Error('BOOM')
    // }
	// generating hash
	const encoder = new TextEncoder();
  	const data = await encoder.encode(sha);
    const hash = await crypto.subtle.digest('SHA-1', data);
	const hashString = Array.from(new Uint8Array(hash)).map( x => x.toString(16).padStart(2,'0') ).join('');
	console.log(hashString)
	// fetch('https://example.com')
    const res = await fetch(`https://europe-west2-linen-mapper-379416.cloudfunctions.net/FetchRelatedHashes?hash=${hashString}`)
    setResult(res);
	console.log(res)
  }
 
  return (
    <div className="App">
      <div >
		   <div>Please input your password below.</div>
        <input onChange={(e) => setSha(e.target.value)}></input>
        <button onClick={onClick}>Submit</button>
      </div>
      <div>{result}</div>
    </div>
  );
}

export default App;
