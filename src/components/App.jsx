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
  const [totalPage, setTotalPage] = useState(0);
  const [status, setStatus] = useState("idle");
  const [showModal, setShowModal] = useState(false);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  
  const handleSubmit = query => {
    if (query.trim() === "") {
      setSearchQuery("");
      return toast.info("Please enter a search query");
    };
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };
  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  }
  const toggleModal = data => {
    setShowModal(prevState => !prevState);
    if (showModal === false) {
      const { largeImageURL, tags } = data;
      setSrc(largeImageURL);
      setAlt(tags);
    };
  };
  useEffect(() => {
    if (searchQuery === "") {return};

    async function getImages() {
      try {
        setStatus("pending");
        const dataImages = await fetchImages(searchQuery, page);
        if (dataImages.totalHits > 0) {
          setStatus("resolved");
          setTotalPage(Math.ceil(dataImages.totalHits / 12))
          setImages(prevState => [...prevState, ...dataImages.hits]);
          // return toast.success(`We found ${dataImages.totalHits} images of ${searchQuery}.`);
        }
        if (dataImages.totalHits === 0) {
          setStatus("rejected");
          return toast.error("Sorry, there are no images matching your search query. Please try again.");
        }
        if (Math.ceil(dataImages.totalHits / 12) === page) {
          setTimeout(() => {
            return toast.info("We're sorry, but you've reached the end of search results.");
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
        {(status === "resolved" && page < totalPage) && <Btn onClick={handleLoadMore}>Load more</Btn>}
      </Section>
      {showModal && <Modal onModalClose={toggleModal}><img src={src} alt={alt} /></Modal>}
      <ToastContainer autoClose={2000} theme="colored" />
      <GlobalStyles />
    </>
  );
};