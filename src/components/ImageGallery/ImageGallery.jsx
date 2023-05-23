import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/';

export default function ImageGallery({ images, onImageClick, newImageRef }) {
  return (
    <Gallery>
      {images.map((image, index, array) => {
        return (
          <ImageGalleryItem
            key={image.id + index}
            webformatURL={image.webformatURL}
            largeImageURL={image.largeImageURL}
            tags={image.tags}
            onImageClick={onImageClick}
            newImageRef={array.length - 12 === index ? newImageRef : null}
          />
        );
      })}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
