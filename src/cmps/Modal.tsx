import { useEffect, useRef, ReactNode } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal") as HTMLElement;
const overlayRoot = document.querySelector("#overlay") as HTMLElement;

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps)  => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null)

  if (!elRef.current) elRef.current = document.createElement("div");
  if (!overlayRef.current) overlayRef.current = document.createElement("div");

  useEffect(() => {
    const el = elRef.current!; 
    const overlayEl = overlayRef.current!
    overlayRoot.classList.add('backdrop')
    
    modalRoot.appendChild(el);
    overlayRoot.appendChild(overlayEl)
    return () => {
      modalRoot.removeChild(el);
      overlayRoot.classList.remove('backdrop')
    };
  }, []);

  return createPortal(children, elRef.current);
}


