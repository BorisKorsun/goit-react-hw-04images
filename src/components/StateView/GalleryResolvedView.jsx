import PropTypes from 'prop-types';
import { Gallery } from 'components/ImageGallery/ImageGallery.styled';

import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';

export const GalleryResolvedView = ({
  cards,
  onBtnClick,
  onImageClick,
  isModalShown,
  modalCard,
  toggleModal,
}) => {
  return (
    <>
      {isModalShown && <Modal toggleModal={toggleModal} image={modalCard} />}
      <Gallery>
        {cards.map(({ webformatURL, id, tags }) => {
          return (
            <ImageGalleryItem
              id={id}
              onClick={onImageClick}
              tags={tags}
              key={id}
              url={webformatURL}
            />
          );
        })}
      </Gallery>
      <Button onClick={onBtnClick}>Load more</Button>;
    </>
  );
};

GalleryResolvedView.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  toggleModal: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  isModalShown: PropTypes.bool.isRequired,
  modalCard: PropTypes.string.isRequired,

};
