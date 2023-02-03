import { Box } from "@chakra-ui/react";

export const TypingIndicator = ({ currentTypingUser }: { currentTypingUser: string }) => {

  return currentTypingUser ? (
    <Box mb="10px" className="typing-indicator">{currentTypingUser} is typing...</Box>
  ) : null;
};
