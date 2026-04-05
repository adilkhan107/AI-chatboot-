import { useState } from "react";

export default function Chatbot() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false)
  // 🔹 Send message to backend
  const sendMessage = async () => {
    if (!message) return;
    setLoading(true)
    try {
      const res = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      console.log("Server response:", response)
      setResponse(data.response);
      setMessage(""); // clear input

    } catch (error) {
      console.error(error);
      setResponse("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#010101] text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-4">

        {/* Output Box */}
        <div className="bg-[#1a1a1a] h-64 rounded-lg p-4 mb-4 overflow-y-auto">
          <p className="text-gray-400">
            {response || "Output will appear here..."}
            {loading && <span className="text-blue-500">Loading...</span>}
          </p>
        </div>

        {/* Input + Button */}
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 rounded-lg bg-[#1a1a1a] text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
          disabled = {loading}
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>

      </div>
    </div>
  );
}