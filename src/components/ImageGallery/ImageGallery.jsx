import React, { Component } from 'react';
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

class ImageGallery extends Component {
  state = {
    gallery: [],
    page: 1,
    showModal: false,
    imageId: null,
    modalCardUrl: '',
    error: null,
    status: STATE_MACHINE.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const oldPage = prevState.page;
    const { query } = this.props;
    const oldQuery = prevProps.query;

    if (query !== oldQuery) {
      this.setState({ status: STATE_MACHINE.PENDING });
      service
        .getQueryImages(query)
        .then(({ data }) =>
          this.setState({ gallery: data.hits, status: STATE_MACHINE.RESOLVED })
        )
        .catch(error =>
          this.setState({ error, status: STATE_MACHINE.REJECTED })
        );
    }

    if (page !== oldPage) {
      this.setState({ status: STATE_MACHINE.PENDING });
      service
        .getPageImage(page)
        .then(({ data }) =>
          this.setState(prev => {
            return {
              gallery: [...prev.gallery, ...data.hits],
              status: STATE_MACHINE.RESOLVED,
            };
          })
        )
        .catch(error =>
          this.setState({ error, status: STATE_MACHINE.REJECTED })
        );
    }
  }

  onLoadMoreClick = () => {
    this.setState(prev => {
      return { page: prev.page + 1 };
    });
  };

  onImageClick = imageId => {
    const { gallery } = this.state;

    this.toggleModal();
    this.setState({modalCardUrl: gallery.find(({ id }) => id === imageId).largeImageURL});
  };

  toggleModal = () => {
    this.setState(prev => {
      return { showModal: !prev.showModal };
    });
  };

  render() {
    const { status, gallery, error, showModal, modalCardUrl } = this.state;

    if (status === STATE_MACHINE.PENDING) {
      return <GalleryPendingView cards={gallery} />;
    }

    if (status === STATE_MACHINE.REJECTED) {
      return <GalleryRejectedView errorMessage={error} />;
    }

    if (status === STATE_MACHINE.RESOLVED) {
      return (
        <GalleryResolvedView
          toggleModal={this.toggleModal}
          onImageClick={this.onImageClick}
          onBtnClick={this.onLoadMoreClick}
          cards={gallery}
          isModalShown={showModal}
          modalCard={modalCardUrl}
        />
      );
    }
  }
}

export default ImageGallery;

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
