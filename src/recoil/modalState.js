import { atom } from 'recoil';

export const modalState = atom({
    key: 'modalState',
    default: {
        reviewCreateModalOpen: false,
        reviewReportModalOpen: false,
    }
});