import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import axios from "axios";
import { authDataContext } from "../context/AuthContext";

const assistantGreetings = [
  "Hello, I am ekart AI. How can I help you with products, cart, or orders today?",
  "Hi, welcome to ekart AI. Ask me about products, login, signup, cart, or orders.",
  "Hey, I am here to help with ekart shopping questions. What would you like to know?",
  "Welcome to ekart AI. I can help with product details, collections, cart, and orders.",
  "Hi there, ask me anything about this ekart project and I will help you.",
];

const getRandomGreeting = () => {
  const randomIndex = Math.floor(Math.random() * assistantGreetings.length);
  return assistantGreetings[randomIndex];
};

const AiAssistantButton = () => {
  const { serverUrl } = useContext(authDataContext);
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

    const userMessage = { role: "user", text: trimmedMessage };
    setMessages((prev) => [...prev, userMessage]);
    setShowClearChat(true);
    setMessage("");
    setLoading(true);

    try {
      const result = await axios.post(`${serverUrl}/api/ai/assistant`, {
        message: trimmedMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text:
            result.data?.reply ||
            "I can help only with ekart website and product-related questions.",
        },
      ]);
    } catch (error) {
      console.log("ai chat error", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "AI assistant is not available right now. Please try again.",
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
      setMessages([
        {
          role: "assistant",
          text: getRandomGreeting(),
        },
      ]);
    }
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        text: getRandomGreeting(),
      },
    ]);
    setShowClearChat(false);
    setMessage("");
    setLoading(false);
  };

  const toggleChat = () => {
    if (isOpen) {
      closeChat();
      return;
    }

    openChat();
  };
  return (
    <>
      {isOpen && (
        <div className="fixed bottom-[124px] right-3 z-20 flex h-[420px] w-[calc(100vw-24px)] max-w-[320px] flex-col overflow-hidden rounded-[18px] border border-orange-100 bg-[#fffaf5] shadow-xl shadow-orange-100/60 md:bottom-[120px] md:right-[4%]">
          <div className="flex items-start justify-between rounded-t-[18px] bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-white">
            <div>
              <p className="text-[15px] font-semibold">ekart AI</p>
              <p className="text-[12px] text-orange-50">Ask only about this project</p>
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
              <button
                type="button"
                onClick={closeChat}
                className="text-[16px] font-bold leading-none"
              >
                x
              </button>
            </div>
          </div>

          <div
            className="min-h-0 flex-1 overflow-y-auto bg-[#fff7ed] px-3 py-3"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex flex-col gap-3">
              {messages.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`max-w-[85%] rounded-[12px] px-3 py-2 text-[13px] ${
                    item.role === "user"
                      ? "ml-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "border border-orange-100 bg-white text-gray-800"
                  }`}
                >
                  {item.text}
                </div>
              ))}

              {loading && (
                <div className="max-w-[85%] rounded-[12px] border border-orange-100 bg-white px-3 py-2 text-[13px] text-gray-600">
                  Typing...
                </div>
              )}
              <div ref={messagesEndRef}></div>
            </div>
          </div>

          <form
            onSubmit={handleSendMessage}
            className="flex shrink-0 flex-col gap-2 border-t border-orange-100 bg-white p-3"
          >
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Ask about products, cart, orders..."
              className="h-[70px] resize-none rounded-[10px] border border-orange-200 bg-orange-50/40 px-3 py-2 text-[13px] outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-[10px] bg-gradient-to-r from-orange-500 to-amber-500 py-2 text-[14px] font-medium text-white disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={toggleChat}
        aria-label="Open AI assistant"
        className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[104px] right-[16px] z-20 flex h-[58px] w-[58px] items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-200 transition-transform hover:scale-105 md:bottom-[40px] md:right-[4%]"
      >
        <FaRobot className="h-[24px] w-[24px]" />
      </button>
    </>
  );
};

export default AiAssistantButton;
