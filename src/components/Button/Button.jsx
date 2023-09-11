import PropTypes from 'prop-types';
import { GalleryButton } from './Button.styled';

const Button = ({ children, onClick }) => {
  return (
    <GalleryButton onClick={onClick} type="button">
      {children}
    </GalleryButton>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
}