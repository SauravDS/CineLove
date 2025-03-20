import React, { useState, useEffect, useRef } from 'react';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import Message from './Message';
import UserList from './UserList';
import styles from './ChatBox.module.css';

function ChatBox({ socket, roomId, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    socket.emit('joinRoom', { roomId, user });

    socket.on('message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('userJoined', (userData) => {
      setMessages((prev) => [...prev, { type: 'system', text: `${userData.displayName} joined the room` }]);
    });

    socket.on('userLeft', (userData) => {
      setMessages((prev) => [...prev, { type: 'system', text: `${userData.displayName} left the room` }]);
    });

    return () => {
      socket.off('message');
      socket.off('userJoined');
      socket.off('userLeft');
    };
  }, [socket, roomId, user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = { type: 'user', text: newMessage, user };
      socket.emit('sendMessage', { roomId, message });
      setMessages((prev) => [...prev, message]);
      setNewMessage('');
      setShowEmojiPicker(false);
    }
  };

  const addEmoji = (emoji) => {
    setNewMessage((prev) => prev + emoji.native);
  };

  return (
    <div className={`${styles.chatBox} bg-pale-pink rounded-lg shadow-md p-4`}>
      <div className={`${styles.messages} h-64 overflow-y-auto mb-4`}>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} currentUser={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <UserList socket={socket} roomId={roomId} />
      <form onSubmit={handleSendMessage} className="flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className={`${styles.input} flex-grow p-2 rounded-l-md border border-rose-pink focus:outline-none`}
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 bg-rose-pink text-white"
        >
          😊
        </button>
        <button type="submit" className="p-2 bg-deep-rose text-white rounded-r-md">
          Send
        </button>
      </form>
      {showEmojiPicker && (
        <div className="absolute bottom-16 right-0">
          <Picker onSelect={addEmoji} />
        </div>
      )}
    </div>
  );
}

export default ChatBox;