import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";
import { adminDataContext } from "../context/AdminContext";
import { useLocation } from "react-router-dom";

const adminGreetings = [
  "Hello, I am ekart Admin AI. I can help with products, orders, and dashboard questions.",
  "Hi, welcome to ekart Admin AI. Ask me about add product, lists, or orders.",
  "Hey, I can help you manage ekart admin panel tasks.",
];

const getRandomGreeting = () => {
  const randomIndex = Math.floor(Math.random() * adminGreetings.length);
  return adminGreetings[randomIndex];
};

const AiAssistantButton = () => {
  const { serverUrl } = useContext(authDataContext);
  const { admindata } = useContext(adminDataContext);
  const location = useLocation();
  const messagesEndRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showClearChat, setShowClearChat] = useState(false);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    setMessages((prev) => [...prev, { role: "user", text: trimmedMessage }]);
    setShowClearChat(true);
    setMessage("");

    if (!admindata) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            location.pathname.toLowerCase() === "/login"
              ? "Please login first to continue with ekart Admin AI."
              : "Please login first to access the admin panel AI.",
        },
      ]);
      return;
    }

    setLoading(true);

    try {
      const result = await axios.post(`${serverUrl}/api/ai/assistant`, {
        message: trimmedMessage,
        mode: "admin",
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: result.data?.reply || "I can help only with ekart admin panel questions.",
        },
      ]);
    } catch (error) {
      console.log("admin ai chat error", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Admin AI is not available right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTextareaKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const openChat = () => {
    if (!messages.length) {
      setMessages([{ role: "assistant", text: getRandomGreeting() }]);
    }
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", text: getRandomGreeting() }]);
    setShowClearChat(false);
    setMessage("");
    setLoading(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-[112px] right-3 z-20 flex h-[420px] w-[calc(100vw-24px)] max-w-[320px] flex-col overflow-hidden rounded-[18px] border border-sky-100 bg-[#f8fcff] shadow-xl shadow-sky-100/60 md:bottom-[120px] md:right-[4%]">
          <div className="flex items-start justify-between rounded-t-[18px] bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-3 text-white">
            <div>
              <p className="text-[15px] font-semibold">Admin AI</p>
              <p className="text-[12px] text-sky-50">Ask only about admin panel</p>
            </div>
            <div className="flex items-center gap-2">
              {showClearChat && (
                <button
                  type="button"
                  onClick={clearChat}
                  className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-medium text-white"
                >
                  Clear Chat
                </button>
              )}
              <button type="button" onClick={closeChat} className="text-[16px] font-bold leading-none">
                x
              </button>
            </div>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto bg-[#f0f9ff] px-3 py-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-col gap-3">
              {messages.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`max-w-[85%] rounded-[12px] px-3 py-2 text-[13px] ${
                    item.role === "user"
                      ? "ml-auto bg-gradient-to-r from-sky-500 to-cyan-500 text-white"
                      : "border border-sky-100 bg-white text-gray-800"
                  }`}
                >
                  {item.text}
                </div>
              ))}

              {loading && (
                <div className="max-w-[85%] rounded-[12px] border border-sky-100 bg-white px-3 py-2 text-[13px] text-gray-600">
                  Typing...
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="flex shrink-0 flex-col gap-2 border-t border-sky-100 bg-white p-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Ask about products, orders, dashboard..."
              className="h-[70px] resize-none rounded-[10px] border border-sky-200 bg-sky-50/40 px-3 py-2 text-[13px] outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-[10px] bg-gradient-to-r from-sky-500 to-cyan-500 py-2 text-[14px] font-medium text-white disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => (isOpen ? closeChat() : openChat())}
        aria-label="Open admin AI assistant"
        className="fixed bottom-[20px] right-3 z-20 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-200 transition-transform hover:scale-105 md:right-[4%]"
      >
        <FaRobot className="h-[24px] w-[24px]" />
      </button>
    </>
  );
};

export default AiAssistantButton;
