import React, { useState, useRef } from "react";
import "./chat.css";
import { auth, provider } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Chat() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  const roomInputRef = useRef();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  function handleSumbit(e) {
    e.preventDefault();
    console.log(newMessage);
  }

  return (
    <main>
      <div className="container">
        <h1>Chat</h1>
        <span className="data">Signed in a</span>
        <button className="btn-sign" onClick={signInWithGoogle}>
          Sign Out
        </button>
        <div>
          {room ? (
            <ul>
              <li>
                <span>m1rox</span>
              </li>
            </ul>
          ) : (
            <div>
              <input type="text" ref={roomInputRef} />
              <button onClick={() => setRoom(roomInputRef.current.value)}>
                enter
              </button>
            </div>
          )}
        </div>

        <form onSubmit={handleSumbit}>
          <input
            type="text"
            placeholder="Message"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="btn-message">+</button>
        </form>
      </div>
    </main>
  );
}
