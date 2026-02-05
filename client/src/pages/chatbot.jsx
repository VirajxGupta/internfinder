import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { toast } from "react-hot-toast";
import { X, Send, Bot } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Ask me for internship recommendations." },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const chatEndRef = useRef(null);

  // Bounce controls for the header icon
  const bounceControls = useAnimation();

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last && last.from === "bot") {
      bounceControls.start({
        y: [0, -5, 0],
        transition: { duration: 0.4, ease: "easeOut" },
      });
    }
  }, [messages]);

  const toggleChat = async () => {
    // 1. Optimize: Close immediately (UI first)
    const wasOpen = isOpen;
    setIsOpen(!isOpen);

    if (wasOpen) {
      // 2. Cleanup in background
      try {
        if (sessionId) {
          // We don't await this to block UI, but we catch errors if needed
          axios.delete(`https://pulastya0-sih-ml-backend.hf.space/chat/${sessionId}/delete`, {
            session_id: sessionId,
          }).catch(err => console.error("Background cleanup error:", err));
        }

        // Clear local state after a slight delay or immediately - 
        // effectively resetting for next open
        setTimeout(() => {
          setMessages([
            { from: "bot", text: "Hello! Ask me for internship recommendations." },
          ]);
          setSessionId(null);
        }, 500);

      } catch (err) {
        console.error("Error clearing chat history:", err);
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === "" || isLoading) return;

    const userMessage = { from: "user", text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://pulastya0-sih-ml-backend.hf.space/chat",
        {
          query: currentInput,
          session_id: sessionId,
        }
      );

      console.log("API response:", response.data);

      if (!sessionId && response.data.session_id) {
        setSessionId(response.data.session_id);
      }

      const botResponse = {
        from: "bot",
        text:
          response.data.answer ||
          response.data.recommendation ||
          response.data.response ||
          "I couldn't find a recommendation.",
      };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      const errorMessage = {
        from: "bot",
        text: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      toast.error("Failed to connect to chatbot service.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-[400px] h-[550px] glass border border-white/20 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 bg-[#1a103c]/90 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary to-purple-600 flex items-center justify-between text-white shadow-lg shrink-0">
              <div className="flex items-center gap-3">
                <motion.div animate={bounceControls} className="bg-white/20 p-1.5 rounded-full backdrop-blur-md">
                  <DotLottieReact
                    src="https://lottie.host/e3d50330-e364-4006-ac37-5fe2bc1fbda5/OXV0LKA4ft.lottie"
                    loop
                    autoplay
                    style={{ width: 32, height: 32 }}
                  />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">InternHelper</h3>
                  <p className="text-xs opacity-70">AI-Powered Assistant</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.from === "user"
                      ? "bg-primary text-white rounded-tr-sm shadow-lg shadow-primary/20"
                      : "bg-white/10 text-white border border-white/10 rounded-tl-sm backdrop-blur-md"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-tl-sm backdrop-blur-md flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md shrink-0">
              <div className="relative flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  placeholder="Ask for an internship..."
                  className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputText.trim()}
                  className="absolute right-2 p-2 bg-primary text-white rounded-lg hover:bg-primary/80 disabled:opacity-50 disabled:hover:bg-primary transition-all shadow-lg shadow-primary/20"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleChat}
            className="group relative focus:outline-none"
          >
            <div className="relative w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-primary to-purple-600 rounded-full shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300">
              <Bot size={32} className="text-white" />

              {/* Pulse Ring */}
              <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-ping opacity-20"></div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}