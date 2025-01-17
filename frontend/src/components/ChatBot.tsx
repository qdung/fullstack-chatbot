import { useState, useRef, useEffect } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ConversationMessage {
  role: "user" | "bot";
  parts: { text: string }[];
}

interface ConversationHistory {
  conversationHistory: ConversationMessage[];
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const API_URL = "http://localhost:3000/api";

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get<ConversationHistory>(
          `${API_URL}/session`,
          {
            withCredentials: true,
          }
        );
        if (response.data.conversationHistory) {
          setMessages(
            response.data.conversationHistory.map((msg) => ({
              text: DOMPurify.sanitize(msg.parts[0].text),
              sender: msg.role,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    };

    fetchSessionData();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (userInput.trim() === "") return;

    const userMessage: Message = { text: userInput, sender: "user" };
    setMessages([...messages, userMessage]);
    setUserInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/chat`,
        { message: userInput },
        { withCredentials: true }
      );
      const botMessage: Message = {
        text: response.data.response,
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error: unknown) {
      console.error("Error sending message:", error);

      let errorMessage = "An error occurred. Please try again later.";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.error || errorMessage;
      } else if (axios.isAxiosError(error) && error.request) {
        errorMessage = "No response from the server.";
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: errorMessage, sender: "bot" },
      ]);
    } finally {
      setIsLoading(false); // Set loading to false after response or error
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-transform duration-300 ease-in-out`}
    >
      <div className="relative h-full w-[400px]">
        {!isOpen ? (
          <button
            data-testid="open-chat"
            className="bg-[#6366F1] text-white h-16 w-16 flex items-center justify-center rounded-full hover:bg-[#5558DD] transition-colors right-0 absolute -top-20"
            onClick={toggleChat}
          >
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
            >
              <path
                d="M8 10.5H16"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M8 14H13.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : (
          <div
            className={`fixed bottom-16 right-5 w-96 max-w-full bg-white rounded-md shadow-lg overflow-hidden flex flex-col transition-all duration-300 ${
              isOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            }`}
            style={{ maxHeight: "calc(100vh - 10rem)" }}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              {/* Header with close button */}
              <p className="text-lg font-medium">AI Assistant Chatbot</p>
              {/* Title */}
              <button
                data-testid="close-chat"
                onClick={toggleChat}
                className="text-gray-500 hover:text-gray-700"
              >
                {/* Close button */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="message-area p-4 overflow-y-auto flex-grow">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message p-3 mb-2 rounded-lg max-w-[80%] clear-both break-words transition-transform duration-300 ${
                    message.sender === "user"
                      ? "bg-blue-100 self-end"
                      : "bg-gray-100 self-start"
                  }`}
                >
                  <div dangerouslySetInnerHTML={{ __html: message.text }} />
                </div>
              ))}
              {isLoading && (
                <div className="text-center text-gray-500">Thinking...</div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area p-4 border-t border-gray-200 flex">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
                placeholder="Type your message..."
                className="flex-grow border border-gray-300 rounded-md px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                role="button"
                name="send"
                onClick={handleSendMessage}
                disabled={isLoading}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
