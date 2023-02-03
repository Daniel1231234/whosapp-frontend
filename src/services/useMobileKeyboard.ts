import { useState, useEffect } from "react";

const useDetectKeyboardOpen = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const keyboardHeight = window.innerHeight < window.outerHeight;
      setIsKeyboardOpen(keyboardHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isKeyboardOpen;
};

export default useDetectKeyboardOpen;
