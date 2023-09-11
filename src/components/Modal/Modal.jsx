import {useEffect} from 'react';
import { Overlay, ModalContainer } from './Modal.styled';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default function Modal ({toggleModal, image }) {
useEffect(() => {
  const onKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  document.addEventListener('keydown', onKeyDown);
  return (() => {
    document.removeEventListener('keydown', onKeyDown);
  })
  
}, [toggleModal])







const onBackDropClick = e => {
  const target = e.target;
  const currentTarget = e.currentTarget;

  if (target === currentTarget) {
    toggleModal();
  }
};

  return(createPortal(
    <Overlay onClick={onBackDropClick}>
      <ModalContainer>
        <img src={image} alt="" />
      </ModalContainer>
    </Overlay>,
    modalRoot
  ));
}

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
};
