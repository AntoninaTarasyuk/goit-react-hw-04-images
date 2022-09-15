import React, { Component } from "react";
import Searchbar from "components/Searchbar/SearchBar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./GlobalStyles";

export default class App extends Component {
  state = {
    showModal: false,
    searchQuery: "",
  };

  handleSubmit = (searchQuery) => {
    this.setState({
      searchQuery: searchQuery,
    })
  }

  toggleModal = (data) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }))

    if (this.state.showModal === false) {
      const { largeImageURL, tags } = data;
      this.setState(() => ({
        src: largeImageURL,
        alt: tags
      }));
    }
  }

  render() {
    const { searchQuery, showModal, src, alt } = this.state;
    const { toggleModal, handleSubmit } = this;

    return (
      <>
        <Searchbar onSubmit={handleSubmit} />

        <ImageGallery searchQuery={searchQuery} onModalOpen={toggleModal}/>
        
        {showModal && <Modal onModalClose={toggleModal}><img src={src} alt={alt} /></Modal>}

        <ToastContainer autoClose={4000} theme="colored" />
        <GlobalStyles />
      </>
    )
  }
}