import { useState } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What's your retainer fee?",
  "Do you handle Fulton County cases?",
  "How long does a divorce take in Georgia?",
  "Can I get a free consultation?",
  "Do you offer payment plans?",
];

const LEGAL_CONTEXT_RESPONSES = {
  fultonCounty: "Yes, we handle cases in Fulton County Superior Court, State Court, and Magistrate Court. We're familiar with all local court procedures and have established relationships with court staff. Most hearings are at the Fulton County Courthouse (136 Pryor Street). ⚖️",
  retainer: "Our retainer fees vary by practice area. Immigration cases typically start at $2,500, Family Law at $3,500, and Business Law at $5,000. We offer transparent flat-rate pricing for many services and payment plans for qualified clients. Schedule a free consultation to discuss your specific needs. 📋",
  divorce: "In Georgia, uncontested divorces can be finalized in 31 days (mandatory waiting period). Contested divorces typically take 6-12 months. Fulton County cases may move faster than other counties. We'll provide a realistic timeline during your consultation based on your specific circumstances. ⏱️",
  consultation: "Yes! We offer FREE 30-minute consultations for new clients. You can schedule online or call our office. We're located in Buckhead for in-person meetings or can meet virtually via Zoom. 🤝",
  paymentPlans: "We understand legal fees can be a burden. We offer flexible payment plans for qualified clients, typically requiring 30% down with monthly installments over 6-12 months. We also work with legal financing partners for larger cases. Let's discuss options during your consultation. 💳",
};

export function ConciergeChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm Leeha Haywood's AI assistant. I can answer questions about our legal services, fees, and the legal process in Georgia. How can I help you today? 👨‍⚖️",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `${messages.length + 1}`,
      role: 'user',
      content: text,
      timestamp: new Date()
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response (in production, call OpenAI API)
    setTimeout(() => {
      const response = generateResponse(text);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();

    // Atlanta-specific legal responses
    if (lowerInput.includes('fulton') || lowerInput.includes('atlanta') || lowerInput.includes('county')) {
      return LEGAL_CONTEXT_RESPONSES.fultonCounty;
    }
    if (lowerInput.includes('retainer') || lowerInput.includes('fee') || lowerInput.includes('cost') || lowerInput.includes('price')) {
      return LEGAL_CONTEXT_RESPONSES.retainer;
    }
    if (lowerInput.includes('divorce') || lowerInput.includes('how long') || lowerInput.includes('timeline')) {
      return LEGAL_CONTEXT_RESPONSES.divorce;
    }
    if (lowerInput.includes('consultation') || lowerInput.includes('free') || lowerInput.includes('meet')) {
      return LEGAL_CONTEXT_RESPONSES.consultation;
    }
    if (lowerInput.includes('payment plan') || lowerInput.includes('financing') || lowerInput.includes('afford')) {
      return LEGAL_CONTEXT_RESPONSES.paymentPlans;
    }

    // Default response
    return "That's a great question! For detailed legal advice specific to your situation, I recommend scheduling a free consultation with Attorney Leeha Haywood. You can contact us through the website or call our office. 📞";
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 shadow-lg transition-all hover:scale-110"
        aria-label="Open legal assistant chat"
      >
        <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex h-[600px] w-[400px] flex-col rounded-lg border border-gray-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-blue-600 p-4 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-xl">⚖️</span>
          </div>
          <div>
            <h3 className="font-serif text-lg text-white tracking-tight">
              Legal Assistant
            </h3>
            <p className="font-sans text-xs text-white/90">
              Online now
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="rounded-full bg-white/20 p-2 transition-all hover:bg-white/30"
          aria-label="Close chat"
        >
          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              <p className="font-sans text-sm leading-relaxed">
                {message.content}
              </p>
              <p className="mt-1 font-sans text-xs opacity-60">
                {message.timestamp.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl bg-white border border-gray-200 px-4 py-3">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }} />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <div className="border-t border-gray-200 bg-white p-4">
          <p className="mb-3 font-sans text-xs text-gray-500 uppercase tracking-wide">
            Popular Questions
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                className="rounded-full border border-gray-300 px-3 py-1 font-sans text-xs text-gray-700 transition-all hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 bg-white p-4 rounded-b-lg">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage(inputValue);
              }
            }}
            placeholder="Ask a legal question..."
            className="flex-1 rounded-full border border-gray-300 bg-white px-4 py-2 font-sans text-sm text-gray-800 placeholder:text-gray-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
            aria-label="Message input"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className={`rounded-full p-3 transition-all ${
              inputValue.trim()
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="Send message"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
