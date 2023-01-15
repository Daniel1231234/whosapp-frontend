import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

export const useTypingIndicator = (socket: Socket) => {
  const [currentTypingUser, setCurrentTypingUser] = useState('');
  let typingInterval: any;
  const TYPING_INTERVAL_DURATION = 3000;
  
const handleStartTyping = (username: string) => {
    clearInterval(typingInterval);
    socket.emit('start_typing', username);
    typingInterval = setInterval(() => handleStopTyping(), TYPING_INTERVAL_DURATION);
};

  const handleStopTyping = () => {
    clearInterval(typingInterval);
    setCurrentTypingUser("")
    socket.emit('stop_typing');
  };

  useEffect(() => {
    socket.on('user_typing', (data: string) => {
      setCurrentTypingUser(data);
    });

    socket.on('stop_typing', () => {
      setCurrentTypingUser('');
    });

    return () => {
      socket.off('user_typing');
      socket.off('stop_typing');
    };
  }, [socket]);

  return { currentTypingUser, handleStartTyping, handleStopTyping };
}
