import React, { useState, useEffect, useRef } from 'react';
import { Layout } from 'antd';
import {
  Map,
  MapMarker,
  MarkerClusterer,
  useKakaoLoader,
} from 'react-kakao-maps-sdk';
import { useRecoilState, useRecoilValue } from 'recoil';
import { searchState } from '../../recoil/searchState';
import { selectAllPos } from '../../apis/api/review';
import { useEventListeners } from '../../hooks/useEventListeners';
import './Main.scss';

const { Content } = Layout;

function Main() {
  const [center, setCenter] = useState({
    lat: '37.49843289280568',
    lng: '127.0254842133858',
  });
  const [level, setLevel] = useState(5);
  const [loading, error] = useKakaoLoader({
    appkey: import.meta.env.VITE_KAKAO_MAP_API_KEY, // 발급 받은 APPKEY
    libraries: ['clusterer', 'services'],
    // ...options, // 추가 옵션
  });

  const [search, setSearch] = useRecoilState(searchState);
  const searchValue = useRecoilValue(searchState);
  const mapRef = useRef(null);
  const [positions, setPositions] = useState([]);
  const [clusterer, setClusterer] = useState(null);

  const loadPositions = async () => {
    const res = await selectAllPos();
    // console.log(res);
    if (res.status.toLowerCase() == 'ok') {
      setPositions(res.data);
    }
  };

  const onClickClusterHandler = function (cluster) {
    let markers = cluster.getMarkers();
    if (markers.length > 0) {
      const position = markers[0].getPosition();
      const lat = position.getLat();
      const lng = position.getLng();
      onClickCluster(lat, lng);
    }
  };

  const onClickCluster = async (lat, lng) => {
    console.log(`${lat},${lng}`);
    setSearch({
      ...searchValue,
      searchType: 'pos',
      pos: `${lat},${lng}`,
    });
    // console.log(search);
  };

  const onCliickMarker = (pos) => {
    console.log(`${pos.lat},${pos.lng}`);
    setSearch({
      ...searchValue,
      searchType: 'pos',
      pos: `${pos.lat},${pos.lng}`,
    });
  };

  useEffect(() => {
    loadPositions();
    setTimeout(() => {
      relayout();
    }, 100);
  }, []);

  useEffect(() => {
    if (clusterer !== null) {
      kakao.maps.event.addListener(
        clusterer,
        'clusterclick',
        onClickClusterHandler,
      );
    }
  }, [clusterer]);

  // 리뷰 생성시 재조회
  useEventListeners('callSelectAllPos', (event) => {
    // console.log('callSelectAllPos called!');
    const { detail } = event;
    loadPositions();

    if (detail) {
      changeMapCenter(detail);
    }
  });

  // 리뷰 상세 화면 진입시 맵 센터 변경
  useEventListeners('callChangeMapCenter', (event) => {
    //
    // console.log('callChangeMapCenter called!');
    const { detail } = event;

    if (detail) {
      changeMapCenter(detail);
    }
  });

  const changeMapCenter = (pos) => {
    if (pos) {
      const latlng = pos.split(',');
      if (latlng.length == 2) {
        setCenter({
          lat: latlng[0],
          lng: latlng[1],
        });
        setLevel(2);
      }
    }
  };

  const relayout = () => {
    if (mapRef.current) {
      mapRef.current.relayout();
    }
  };

  const getTexts = (size) => {
    // 한 클러스터 객체가 포함하는 마커의 개수에 따라 다른 텍스트 값을 표시합니다
    return `${size}개`;
  };

  return (
    <>
      <Content>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: center.lat,
            lng: center.lng,
          }}
          isPanto={true}
          style={{
            // 지도의 크기
            width: '100%',
            height: '100%',
          }}
          level={level} // 지도의 확대 레벨
          maxLevel={1}
          minLevel={6}
          ref={mapRef}
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={1} // 클러스터 할 최소 지도 레벨
            disableClickZoom={true}
            onCreate={(clusterer) => {
              setClusterer(clusterer);
            }}
            calculator={[10, 30, 50]} // 클러스터의 크기 구분 값, 각 사이값마다 설정된 text나 style이 적용된다
            texts={getTexts} // texts는 ['삐약', '꼬꼬', '꼬끼오', '치멘'] 이렇게 배열로도 설정할 수 있다
            styles={[
              {
                width: '40px',
                height: '40px',
                background: 'rgba(255, 153, 0, 0.8)',
                borderRadius: '20px',
                color: '#000',
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: '41px',
              },
              {
                width: '50px',
                height: '50px',
                background: 'rgba(255, 153, 0, 0.9)',
                borderRadius: '25px',
                color: '#000',
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: '51px',
              },
              {
                width: '60px',
                height: '60px',
                background: 'rgba(255, 153, 0, .8)',
                borderRadius: '30px',
                color: '#000',
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: '61px',
              },
              {
                width: '70px',
                height: '70px',
                background: 'rgba(255, 153, 0, .8)',
                borderRadius: '35px',
                color: '#000',
                textAlign: 'center',
                fontWeight: 'bold',
                lineHeight: '71px',
              },
            ]}
          >
            {positions &&
              positions.length > 0 &&
              positions.map((pos, index) => (
                <MapMarker
                  key={`${pos.lat},${pos.lng}` + index}
                  position={{
                    lat: pos.lat,
                    lng: pos.lng,
                  }}
                  onClick={() => onCliickMarker(pos)}
                ></MapMarker>
              ))}
          </MarkerClusterer>
        </Map>
      </Content>
    </>
  );
}

export default Main;
