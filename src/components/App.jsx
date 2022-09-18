import { useState, useEffect } from "react";
import fetchImages from "servises/imagesApiServis";
import Searchbar from "components/Searchbar/SearchBar";
import ImageGallery from "components/ImageGallery/ImageGallery";
import { Loader } from "components/Loader/Loader";
import { Btn } from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Section } from "./App.styled";
import { GlobalStyles } from "./GlobalStyles";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  
  const handleSubmit = query => {
    if (query.trim() === "") {
      setSearchQuery("");
      return toast.info("Please enter a search query");
    };
    if (query === searchQuery) {
      return toast.info(`You just searched for ${query}. Try searching for something else`);
    };
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  }
  const toggleModal = ({ largeImageURL, tags }) => {
    setShowModal(prevState => !prevState);
    if (showModal === false) {
      setSrc(largeImageURL);
      setAlt(tags);
    };
    if (showModal === true) {
      setSrc("");
      setAlt("");
    };
  };
  
  useEffect(() => {
    if (searchQuery === "") {return};

    async function getImages() {
      try {
        setStatus("pending");
        const dataImages = await fetchImages(searchQuery, page);
        const dataPages = Math.ceil(dataImages.totalHits / 12);
        if (dataImages.totalHits > 0) {
          setStatus("resolved");
          setTotalPages(dataPages);
          setImages(prevState => [...prevState, ...dataImages.hits]);
        }
        if (dataImages.totalHits === 0) {
          setStatus("rejected");
          setTotalPages(0);
          return toast.error("Sorry, there are no images matching your search query. Please try again.");
        }
        if (dataPages === page) {
          setTimeout(() => {
            return toast.info("That's all, you've reached the end of search results.");
          }, 2000);
        }
      } catch (error) {
        setStatus('rejected');
        return toast.error(`${error.message}`);
      };
    }
    getImages();
  }, [searchQuery, page]);

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <Section>
        <ImageGallery images={images} onModalOpen={toggleModal} />
        {status === "pending" && <Loader />}
        {(status === "resolved" && page < totalPages) && <Btn onClick={handleLoadMore}>Load more</Btn>}
      </Section>
      {showModal && <Modal onModalClose={toggleModal}><img src={src} alt={alt} /></Modal>}
      <ToastContainer autoClose={2000} theme="colored" />
      <GlobalStyles />
    </>
  );
};