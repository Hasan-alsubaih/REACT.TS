import React, { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

const ChatBubble: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { id: string; text: string; timestamp: Timestamp }[]
  >([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          timestamp: doc.data().timestamp,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (message.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        text: message,
        timestamp: Timestamp.now(),
      });
      setMessage("");
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "messages", id));
  };

  const formatDate = (timestamp: Timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year} - ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "Lime",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        }}
      >
        💬
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            right: "0",
            width: "320px",
            height: "450px",
            backgroundColor: "#f9f9f9",
            borderRadius: "15px",
            boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px",
              textAlign: "center",
              fontWeight: "bold",
              borderTopLeftRadius: "15px",
              borderTopRightRadius: "15px",
            }}
          >
            Chat Room
          </div>

          <div
            style={{
              padding: "10px",
              overflowY: "auto",
              flexGrow: 1,
              backgroundColor: "#fff",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: "12px",
                  padding: "8px",
                  background: "#e9f5ff",
                  borderRadius: "8px",
                  position: "relative",
                }}
              >
                <div style={{ marginBottom: "5px" }}>{msg.text}</div>
                <small style={{ color: "#666" }}>
                  {formatDate(msg.timestamp)}
                </small>

                <button
                  onClick={() => handleDelete(msg.id)}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    background: "transparent",
                    border: "none",
                    color: "#ff4d4d",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                outline: "none",
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
