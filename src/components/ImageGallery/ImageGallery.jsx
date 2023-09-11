import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import API from 'service';

import {
  GalleryPendingView,
  GalleryResolvedView,
  GalleryRejectedView,
} from 'components/StateView';

const service = new API();

const STATE_MACHINE = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

export default function ImageGallery({ query }) {

  const [page, setPage] = useState(1);
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [modalCardUrl, setModalCardUrl] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(STATE_MACHINE.IDLE);

  useEffect(() => {
    if (!query) {
      return
    }
    setStatus(STATE_MACHINE.PENDING);
    service
      .getQueryImages(query)
      .then(({ data }) => {
        setGallery(data.hits);
        setStatus(STATE_MACHINE.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(STATE_MACHINE.REJECTED);
      });
  }, [query]);

  useEffect(() => {
    if (!query) {
      return
    }
    setStatus(STATE_MACHINE.PENDING);
    service
      .getPageImage(page)
      .then(({ data }) => {
        setGallery(p => [...p, ...data.hits]);
        setStatus(STATE_MACHINE.RESOLVED);
      })
      .catch(error => {
        setError(error);
        setStatus(STATE_MACHINE.REJECTED);
      });
  }, [page]);

  const onLoadMoreClick = () => {
    setPage(p => p + 1);
  };

  const onImageClick = imageId => {
    toggleModal();
    setModalCardUrl(gallery.find(({ id }) => id === imageId).largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(p => !p);
  };


  if (status === STATE_MACHINE.PENDING) {
    return <GalleryPendingView cards={gallery} />;
  }

  if (status === STATE_MACHINE.REJECTED) {
    return <GalleryRejectedView errorMessage={error} />;
  }

  if (status === STATE_MACHINE.RESOLVED) {
    return (
      <GalleryResolvedView
        toggleModal={toggleModal}
        onImageClick={onImageClick}
        onBtnClick={onLoadMoreClick}
        cards={gallery}
        isModalShown={showModal}
        modalCard={modalCardUrl}
      />
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
