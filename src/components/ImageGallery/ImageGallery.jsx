import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import { Gallery } from "./ImageGallery.styled";

export default function ImageGallery({ images, onModalOpen }) {
  return <Gallery>
      <ImageGalleryItem data={images} openModal={onModalOpen} />
    </Gallery>
};