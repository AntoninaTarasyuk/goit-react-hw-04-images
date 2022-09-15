import React, {Component} from "react";
import PropTypes from "prop-types";
import { GalleryItem, GalleryImage } from "./ImageGalleryItem.styled";

export default class ImageGalleryItem extends Component{
  render() {
    const { data, openModal } = this.props;

    return data.map(({ id, webformatURL, largeImageURL, tags }) => (
      <GalleryItem key={id} onClick={() => openModal(({ largeImageURL, tags }))}>
        <GalleryImage src={webformatURL} alt={tags} loading="lazy" />
      </GalleryItem>
    ));
  }
}

ImageGalleryItem.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
};