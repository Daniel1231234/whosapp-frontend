import React, { useState } from 'react';
import './UI.css'
interface Props {
  link: string;
}

export function CopyLink({link}: Props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLHeadingElement>) => {
    try {
      await navigator.clipboard.writeText(link);
        setIsCopied(true)
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <h3 onClick={handleClick} className="copy-link">
      {isCopied ? 'Copied!' : 'Copy invitation link'}
    </h3>
  );
}
