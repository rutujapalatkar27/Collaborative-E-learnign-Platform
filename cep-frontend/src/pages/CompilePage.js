import { useState } from 'react';
import './CompilePage.css';
import Editor from "@monaco-editor/react";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { backendURL } from '../utils/config';

function App() {
const [userCode, setUserCode] = useState(``);
const [userInput, setUserInput] = useState("");
const [userOutput, setUserOutput] = useState("");
const [loading, setLoading] = useState(false);
const navigate = useNavigate();


function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}

	axios.post(`${backendURL}/code/run`, {
	code: userCode,
	language: "python",
	input: userInput 
    })
    .then((res) => {
    console.log(res.data)
	setUserOutput(res.data);
	})
    .then(() => {
	setLoading(false);
	})
}


function clearOutput() {
	setUserOutput("");
}

function returnCollab() {
	navigate('/home')
}

return (
	<div className="CompilePage">
	<div className="main">
		<div className="left-container">
		<Editor
			height="calc(100vh - 50px)"
			width="100%"
			theme="vs-dark"
			language="python"
			defaultLanguage="python"
			defaultValue="# Start Coding!"
			onChange={(value) => { setUserCode(value) }}
		/>
		<button className="run-btn" onClick={() => compile()}>
			Run
		</button>
		</div>
		<div className="right-container">
		<h4>Input:</h4>
		<div className="input-box">
			<textarea id="code-inp" onChange=
			{(e) => setUserInput(e.target.value)}>
			</textarea>
		</div>
		<h4>Output:</h4>
		{loading ? (
			// <div className="spinner-box">
			// <img src={spinner} alt="Loading..." />
			// </div>
            <h3>Loading...</h3>
		) : (
			<div className="output-box">
			<pre>{userOutput}</pre>
			<button onClick={() => { clearOutput() }}
				className="clear-btn">
				Clear
			</button>
            <button onClick={() => { returnCollab() }}
				className="return-btn">
				Return to collab
			</button>
			</div>
		)}
		</div>
	</div>
	</div>
);
}

export default App;
