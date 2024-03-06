import { useRef } from 'react';
import { XLg } from 'react-bootstrap-icons';

import './Modal.scss';

/*
  @params 
    title,
    width,
    height,
    handleClose,
*/
function Modal({ params, children }) {
  const modalBackground = useRef();
  const { title, width, height, handleClose } = params;

  let backdrop = true;
  if (params.backdrop != undefined && params.backdrop != null) {
    backdrop = params.backdrop;
  }

  const onClickBackground = (e) => {
    if (backdrop && e.target === modalBackground.current) {
      handleClose();
    }
  };

  return (
    <div
      className="modal__container"
      ref={modalBackground}
      onClick={(e) => onClickBackground(e)}
    >
      <div className="modal__content" style={{ width, height }}>
        <div className="modal__content__header">
          <h2>{title}</h2>
          <div className="modal__close__btn" onClick={() => handleClose()}>
            <XLg />
          </div>
        </div>
        <div className="modal__content__body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
