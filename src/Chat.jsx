import React, { useState, useRef, useEffect } from "react";
import "./chat.css";
import { auth, provider, db } from "./firebase-config";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import {
  addDoc,
  serverTimestamp,
  collection,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

const cookies = new Cookies();

export default function Chat() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token")); //TODO
  const [room, setRoom] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const messagesRef = collection(db, "messages");

  const roomInputRef = useRef();

  useEffect(() => {
    const queryMessages = query(messagesRef, where("room", "==", room));
    onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
  });

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessage("");
    setMessages([]);
  };

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
              {messages.map((message) => (
                <li>
                  <span>
                    {message.user}: {message.text}
                  </span>
                </li>
              ))}
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
            value={newMessage}
          />
          <button className="btn-message">+</button>
        </form>
      </div>
    </main>
  );
}
