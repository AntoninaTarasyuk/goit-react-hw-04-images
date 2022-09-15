import React, { Component } from "react";
import { createPortal } from "react-dom";
import { Overlay, ModalWindow, CloseBtn } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component{
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onModalClose();
    }
  }

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onModalClose();
    }
  }

  render() {
    const { onModalClose, children } = this.props;
    const { handleBackdropClick } = this;
    
    return createPortal(
      <Overlay onClick={handleBackdropClick}>
        <CloseBtn type='button' onClick={onModalClose}>X</CloseBtn>
        <ModalWindow>{children}</ModalWindow>
      </Overlay>,
      modalRoot
    );
  }
}