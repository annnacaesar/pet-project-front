import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import css from './Modal.module.scss';
const rootModal = document.getElementById('modal');

function Modal(props) {
  useEffect(() => {
    const keydownHandler = (e) => {
      if (e.code !== 'Escape') return;
      props.onCloseModal();
    };

    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [props]);

  function backdropClickHandler(e) {
    if (e.currentTarget === e.target) {
      props.onCloseModal();
    }
  }

  const backdropMode = props.mode === 'dark' ? 'dark' : '';

  return createPortal(
    <div className={`${css.backdrop} ${css[backdropMode]}`} onClick={backdropClickHandler}>
      {props.children}
    </div>,
    rootModal
  );
}

export default Modal;
