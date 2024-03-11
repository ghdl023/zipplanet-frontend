import { atom } from 'recoil';

export const reviewDetailState = atom({
    key: 'reviewDetailState',
    default: {
        reviewId: null,
        userId: null,
        creator: null,
        totalRate: null,
        transRate: null,
        manageRate: null,
        infraRate: null,
        lifeRate: null,
        title: null,
        description: null,
        jibun: null,
        floorsCount: null,
        pyungCount: null,
        roomInfo: null,
        roomOption: null,
        contractTypeId: null,
        startDate: null,
        endDate: null,
        images: [],
    }
})