import { useState, useRef, useContext } from 'react';
import { SidebarContext } from '@contexts/SidebarContext';
import './CreateReviewPopup.scss';

function CreateReviewPopup() {
    const modalBackground = useRef();

    const { createReviewObj, setCreateReviewObj } = useContext(SidebarContext);
    const { modalOpen } = createReviewObj;


    const handleClickDimmed = (e) => {
        if (e.target === modalBackground.current) {
            setCreateReviewObj({
              ...createReviewObj,
              modalOpen: false
            })
          }
    }

    return (
        <>
        {/* <div className={'btn-wrapper'}>
          <button className={'modal-open-btn'} onClick={() => setModalOpen(true)}>
            모달 열기
          </button>
        </div> */}
        {
          modalOpen &&
          <div className={'modal-container'} ref={modalBackground} onClick={(e)=> handleClickDimmed(e)}>
            <div className={'modal-content'}>
              <p>리액트로 모달 구현하기</p>
              <button className={'modal-close-btn'} onClick={() => setCreateReviewObj({
                ...createReviewObj,
                modalOpen: false
              })}>
                모달 닫기
              </button>
            </div>
          </div>
        }
      </>

    )
}


export default CreateReviewPopup;