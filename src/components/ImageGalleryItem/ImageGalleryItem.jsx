import PropTypes from 'prop-types';
import { Item, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ url, tags, onClick, id }) => {
  return (
    <Item>
      <Image onClick={() => onClick(id)} src={url} alt={tags} />
    </Item>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.number,
}