import "./App.css";
import { useState } from "react";

function App() {
  const [sha, setSha] = useState("");
  const [result, setResult] = useState("");

  async function onClick() {
    // generating hash
    const encoder = new TextEncoder();
    const data = await encoder.encode(sha);
    const hash = await crypto.subtle.digest("SHA-1", data);
    const hashString = Array.from(new Uint8Array(hash))
      .map((x) => x.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();

    const res = await fetch(
      `https://europe-west2-linen-mapper-379416.cloudfunctions.net/FetchRelatedHashes?hash=${hashString.slice(
        0,
        5
      )}`,
      {
        method: "GET",
      }
    );

    const parsedResponse = await res.json();

    const foundHash = parsedResponse.find((el) => {
      console.log(el);
      return el.hash === hashString;
    });

    setResult(foundHash);
  }

  return (
    <div className="App">
      <div>
        <div>Please input your password below.</div>
        <input onChange={(e) => setSha(e.target.value)}></input>
        <button onClick={onClick}>Submit</button>
      </div>
      {result && <div>We found your hashed password {result.count} times</div>}
    </div>
  );
}

export default App;
