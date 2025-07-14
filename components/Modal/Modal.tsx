'use client'

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

type ModalProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose(); 
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); 
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose} 
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
