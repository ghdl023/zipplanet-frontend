import { useRef } from 'react';
import './LightModal.scss';

function LightModal({ params, children }) {
  const modalBackground = useRef();
  const { handleClose } = params;

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
      <div className="modal__content">{children}</div>
    </div>
  );
}

export default LightModal;
