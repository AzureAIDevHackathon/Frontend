'use client';  // Make sure to use client directive in Next.js 13+

import { useState, useEffect, useRef } from 'react';
import styles from './chat.module.css';
import { X } from 'lucide-react';

const KernelAssistant = ({ userId, closeWindow }) => {
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const socketRef = useRef(null);
  const chatContainerRef = useRef(null);


  // Connect to WebSocket when component mounts
  useEffect(() => {
    const connectWebSocket = () => {
      // Create WebSocket connection
      const socket = new WebSocket(`ws://localhost:8080/ws/${userId}`);
      
      socket.onopen = () => {
        console.log('WebSocket connection established');
        setConnected(true);
      };
      
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);
        setMessages(prevMessages => [...prevMessages, data]);
        setLoading(false);
      };
      
      socket.onclose = (event) => {
        console.log('WebSocket connection closed', event);
        setConnected(false);
        
        // Try to reconnect after 3 seconds
        setTimeout(() => {
          if (socketRef.current === socket) {
            connectWebSocket();
          }
        }, 3000);
      };
      
      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
      
      socketRef.current = socket;
    };
    
    connectWebSocket();
    
    // Clean up function to close WebSocket when component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [userId]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  // Send message to WebSocket
  const sendMessage = () => {
    if (!inputMessage.trim() || !connected || loading) return;
    
    const messageObj = {
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    // Add user message to chat
    setMessages(prevMessages => [...prevMessages, messageObj]);
    
    // Send to server
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ text: inputMessage }));
      setLoading(true);
      setInputMessage('');
    } else {
      // Add error message if not connected
      setMessages(prevMessages => [
        ...prevMessages, 
        { 
          text: "Not connected to server. Please try again later.", 
          sender: 'system',
          timestamp: new Date().toISOString()
        }
      ]);
    }
  };
  
  return (
    <div className="flex flex-col h-[500px] w-[100%] max-w-[400px] overflow-hidden bg-white shadow-md">
      <div className={`${styles.chatHeader} select-none`}>
        <h2>Financial Assistant</h2>
        <div className={`${styles.statusIndicator} ${connected ? "bg-[#27ae60]" : "bg-red-500"}`}>
          {connected ? 'Connected' : 'Connecting...'}
        </div>
        <div onClick={() => closeWindow()} className='select-none hover:cursor-pointer hover:text-red-400'> <X /> </div>
      </div>
      
      <div className={styles.chatMessages} ref={chatContainerRef}>
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-[100%] text-center text-[#95a5a6]">
            <p>Ask me anything about your finances!</p>
          </div>
        )}
        
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`${styles.message} ${styles[msg.sender]}`}
          >
            <div className={styles.messageContent}>{msg.text}</div>
            <div className={styles.messageTime}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className={`${styles.message} ${styles.bot}`}>
            <div className={styles.typingIndicator}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>
      
      <div className={styles.chatInput}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={!connected}
        />
        <button 
          onClick={sendMessage} 
          disabled={!connected || !inputMessage.trim() || loading}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default KernelAssistant;