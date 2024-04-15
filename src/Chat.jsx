import React from "react";
import "./chat.css";

export default function Chat() {
  return (
    <main>
      <div className="container">
        <h1>Chat</h1>
        <span className="data">Signed in a</span>
        <button className="btn-sign">Sign Out</button>
        <ul>
          <li>
            <span>m1rox</span>
          </li>
        </ul>
        <form>
          <input type="text" placeholder="Message" />
          <button className="btn-message">+</button>
        </form>
      </div>
    </main>
  );
}
