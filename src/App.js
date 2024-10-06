import "./App.css";
import gptlogo from "./assets/chatgpt.svg";
import addbtn from "./assets/add-30.png";
import msg from "./assets/message.svg";
import home from "./assets/home.svg";
import rocket from "./assets/rocket.svg";
import saved from "./assets/bookmark.svg";
import send from "./assets/send.svg";
import usericon from "./assets/user-icon.png";
import gptimglogo from "./assets/chatgptLogo.svg";
import runChat from "./config/gemini.js";
import { useEffect, useRef, useState } from "react";

function App() {
  const msgEnd = useRef(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi I am ChatGPT and i am here to help",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current.scrollIntoView();
  }, [messages]);

  const handleSend = async () => {
    const text = input;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    
    let res = await runChat(text);
  
    // Convert **text** to <b>text</b>
    let formattedResponse = res.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: formattedResponse, isBot: true },
    ]);
  };
  
  const handleEnter = async (e) => {
    if (e.key === "Enter") handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages([...messages, { text, isBot: false }]);
    const res = await runChat(text);
    setMessages([
      ...messages,
      { text, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersidetop">
            <img src={gptlogo} alt="logo" className="logo" />
            <span className="brand">Chat GPT</span>
          </div>
          <button
            className="midbtn"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={addbtn} alt="new chat" className="addbtn" />
            New Chat
          </button>
          <div className="uppersidebtn">
            <button
              className="query"
              onClick={handleQuery}
              value={"What is Programming ?"}
            >
              <img src={msg} alt="query" />
              What is Programming ?
            </button>
            <button
              className="query"
              onClick={handleQuery}
              value={"How to use an API ?"}
            >
              <img src={msg} alt="query" />
              How to use an API ?
            </button>
          </div>
        </div>
        <div className="lowerside">
          <div className="listitems">
            <img src={home} alt="" className="listitemsimg" />
            Home
          </div>
          <div className="listitems">
            <img src={saved} alt="" className="listitemsimg" />
            Saved
          </div>
          <div className="listitems">
            <img src={rocket} alt="" className="listitemsimg" />
            Upgrade to Premium
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((messages, i) => (
            <div key={i} className={messages.isBot ? "chat bot" : "chat"}>
              <img
                className="chatimg"
                src={messages.isBot ? gptimglogo : usericon}
                alt=""
              />
              <p className="txt">{messages.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder="send a message."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <button className="send">
              <img src={send} alt="send" />
            </button>
          </div>
          <p>
            ChatGPT may produce incorrect result about prople, places, or facts.
            ChatGPT August 20 Version
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
