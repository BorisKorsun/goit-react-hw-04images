import PropTypes from 'prop-types';

export const GalleryRejectedView = ({ errorMessage }) => {
  return <p>{errorMessage}</p>;
};

GalleryRejectedView.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};
