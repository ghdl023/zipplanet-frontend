import { useContext } from 'react';
import _ from 'lodash';
import './GuDongListPopup.scss';
import { SidebarContext } from '../../contexts/SidebarContext';

const list = [
  { label: '전체', value: '' },
  {
    label: '강남구',
    value: '강남구',
    dongList: [
      { label: '전체', value: '' },
      { label: '개포동', value: '개포동' },
      { label: '논현동', value: '논현동' },
      { label: '대치동', value: '대치동' },
      { label: '도곡동', value: '도곡동' },
      { label: '삼성동', value: '삼성동' },
      { label: '세곡동', value: '세곡동' },
      { label: '수서동', value: '수서동' },
      { label: '신사동', value: '신사동' },
      { label: '압구정', value: '압구정' },
      { label: '역삼동', value: '역삼동' },
      { label: '울현동', value: '울현동' },
      { label: '일원동', value: '일원동' },
      { label: '자곡동', value: '자곡동' },
      { label: '청담동', value: '청담동' },
    ],
  },
  {
    label: '강동구',
    value: '강동구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '강북구',
    value: '강북구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '강서구',
    value: '강서구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '관악구',
    value: '관악구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '광진구',
    value: '광진구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '구로구',
    value: '구로구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '금천구',
    value: '금천구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '노원구',
    value: '노원구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '도봉구',
    value: '도봉구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '동대문구',
    value: '동대문구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '동작구',
    value: '동작구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '마포구',
    value: '마포구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '서대문구',
    value: '서대문구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '서초구',
    value: '서초구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '성동구',
    value: '성동구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '성북구',
    value: '성북구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '송파구',
    value: '송파구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '양천구',
    value: '양천구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '영등포구',
    value: '영등포구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '용산구',
    value: '용산구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '은평구',
    value: '은평구',
    dongList: [{ label: '전체', value: '' }],
  },
  {
    label: '종로구',
    value: '종로구',
    dongList: [{ label: '전체', value: '' }],
  },
  { label: '중구', value: '중구', dongList: [{ label: '전체', value: '' }] },
  {
    label: '중랑구',
    value: '중랑구',
    dongList: [{ label: '전체', value: '' }],
  },
];

function GuDongListPopup() {
  const { searchFilterObj, setSearchFilterObj } = useContext(SidebarContext);
  const { gu, dong, guDongListPopupType } = searchFilterObj;

  // console.log(guDongListPopupType);
  // console.log(gu);
  // console.log(_.find(list['gu'], { label: gu }));

  const items =
    guDongListPopupType === 'gu'
      ? list
      : gu
        ? _.find(list, { label: gu }).dongList
        : list;
  // console.log(items);
  // console.log(guDongListPopupType);

  const handleClickItem = (item) => {
    if (guDongListPopupType == 'gu') {
      setSearchFilterObj({
        ...searchFilterObj,
        gu: item.value,
        dong: gu === item.label ? dong : '',
        guDongListPopupType: '',
      });
    } else if (guDongListPopupType == 'dong') {
      setSearchFilterObj({
        ...searchFilterObj,
        dong: item.value,
        guDongListPopupType: '',
      });
    }
  };

  return (
    <div className="gudong__list__popup__container">
      {items.map((item, index) => {
        return (
          <div
            className="gudong__list__popup__item"
            key={index}
            onClick={() => handleClickItem(item)}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
}

export default GuDongListPopup;
