import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
interface Props {
  link: string;
}

export function CopyLink({ link }: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true)
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <Button size="sm" variant="link" colorScheme="teal" onClick={handleClick}>
      {isCopied ? 'Copied!' : 'Copy invitation link'}
    </Button>
  );
}
