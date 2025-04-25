import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Chat = ({ userEmail, recipientEmail }) => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    // Connect to Socket.IO server
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const newSocket = io("http://localhost:5000", {
      auth: { token },
    });

    setSocket(newSocket);

    // Fetch initial message history
    axiosSecure(`http://localhost:5000/messages/${recipientEmail}`).then(
      (data) => {
        console.log(data.data);
      }
    );

    // Listen for incoming messages
    newSocket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => newSocket.disconnect();
  }, [recipientEmail]);

  const sendMessage = () => {
    if (input.trim() && socket) {
      socket.emit("sendMessage", {
        recipientEmail,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <div>
      <h2>Chat with {recipientEmail}</h2>
      <div>
        {messages.map((msg, idx) => (
          <p key={idx}>
            <strong>{msg.sender}:</strong> {msg.message}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;





