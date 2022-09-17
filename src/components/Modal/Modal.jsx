import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalWindow, CloseBtn } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export default function Modal(props) {
  const { onModalClose, children } = props;

  const handleKeyDown = useCallback(event => {
    if (event.code === 'Escape') {
      props.onModalClose();
    }
  }, [props]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onModalClose();
    }
  }
  
  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <CloseBtn type='button' onClick={onModalClose}>X</CloseBtn>
      <ModalWindow>{children}</ModalWindow>
    </Overlay>,
    modalRoot
  );
}