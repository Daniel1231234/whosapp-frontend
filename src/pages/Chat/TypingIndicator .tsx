import { useEffect, useState } from "react";

export const TypingIndicator = ({ currentTypingUser }: { currentTypingUser: string }) => {

    
  return currentTypingUser ? (
    <div className="typing-indicator">{currentTypingUser} is typing...</div>
  ) : null;
};
