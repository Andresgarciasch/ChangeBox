import React from "react";

export const Chat = () => {
  return (
    <div className="container">
      <div
        id="messages"
        style={{ margin: "0 auto", width: "60%", textAlign: "left" }}
      ></div>
      <input type="text" id="username" placeholder="Username" required />
      <input type="text" id="message" placeholder="Message" required />
      <button id="sendBtn">Send</button>
    </div>
  );
};
