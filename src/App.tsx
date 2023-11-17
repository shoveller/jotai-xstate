import "./App.css";
import {useState} from "react";

function App() {
  const [fill, setFill] = useState('blue');

  return (
    <svg>
      <circle onClick={() => setFill('red')} cx="50" cy="50" r="40" fill={fill} />
    </svg>
  );
}

export default App;
