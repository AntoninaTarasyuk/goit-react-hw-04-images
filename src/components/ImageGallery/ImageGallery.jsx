import React, { Component } from "react";
import fetchImages from "servises/imagesApiServis";
import { toast } from "react-toastify";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "components/Loader/Loader";
import { Btn } from "components/Button/Button";
import { GalleryContainer, Gallery } from "./ImageGallery.styled";

export default class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    totalHits: 1,
    imagesPerPage: 12,
    status: "idle"
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery } = this.props;
    const { page, imagesPerPage, totalHits } = this.state;

    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({
        totalHits: 1,
        page: 1,
        images: [],
        status: "pending"
      });
      try {
        const images = await fetchImages(searchQuery, 1);
        if (images.totalHits > 0) {
          toast.success(`Hooray! We found ${images.totalHits} images of ${searchQuery}.`);
          this.setState(({
            totalHits: images.totalHits,
            images: images.hits,
            status: "resolved"
          }));
        }
        else {
          this.setState({ status: "rejected" });
          return toast.error("Sorry, there are no images matching your search query. Please try again.");
        }
      } catch (error) { this.setState({ error }); }
    }

    else if (prevState.page < page) {
      this.setState({ status: "pending" });
      try {
        const images = await fetchImages(searchQuery, page);
        if (images.totalHits > 0) {
            this.setState(prevState => ({
              images: [...prevState.images, ...images.hits],
              status: "resolved"
            }));
            if ((totalHits - this.state.images.length) < imagesPerPage) {
              return toast.info("We're sorry, but you've reached the end of search results.");
            }
        }
        else {
          this.setState({ status: "rejected" });
          return toast.error("Sorry, there are no images matching your search query. Please try again.");
        }
      } catch (error) { this.setState({ error }); }
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  }

  render() {
    const { images, status, totalHits } = this.state;
    const { handleLoadMore } = this;
    const { onModalOpen } = this.props;

    if (status === "pending") {
      return <GalleryContainer>
        <Gallery>
          <ImageGalleryItem data={images} openModal={onModalOpen} />
        </Gallery>
        <Loader/>
      </GalleryContainer>
    }

    if (images.length === totalHits) {
      return <GalleryContainer>
        <Gallery>
          <ImageGalleryItem data={images} openModal={onModalOpen} />
        </Gallery>
      </GalleryContainer>
    }

    if (status === "resolved") {
      return <GalleryContainer>
        <Gallery>
          <ImageGalleryItem data={images} openModal={onModalOpen} />
        </Gallery>
        <Btn onClick={handleLoadMore}>Load more</Btn>
      </GalleryContainer>
    }
  };
};