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
    setSearch({
      ...searchValue,
      searchType: 'pos',
      pos: `${lat},${lng}`,
    });
    // console.log(search);
  };

  useEffect(() => {
    loadPositions();
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

  useEventListeners('callSelectAllPos', (event) => {
    // console.log('callSelectAllPos called!');
    loadPositions();
  });

  return (
    <>
      <Content>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 37.49843289280568,
            lng: 127.0254842133858,
          }}
          style={{
            // 지도의 크기
            width: '100%',
            height: '100%',
          }}
          level={5} // 지도의 확대 레벨
          maxLevel={1}
          minLevel={6}
          ref={mapRef}
          onClick={(_, mouseEvent) => {
            // const latlng = mouseEvent.latLng;
            // console.log(
            //   `클릭한 위치의 위도는 ${latlng.getLat()} 이고, 경도는 ${latlng.getLng()} 입니다`,
            // );
          }}
        >
          <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={1} // 클러스터 할 최소 지도 레벨
            disableClickZoom={true}
            onCreate={(clusterer) => {
              setClusterer(clusterer);
            }}
          >
            {positions.map((pos, index) => (
              <MapMarker
                key={`${pos.lat},${pos.lng}` + index}
                position={{
                  lat: pos.lat,
                  lng: pos.lng,
                }}
                // onClick={() => onCliickMarker(pos)}
              ></MapMarker>
            ))}
          </MarkerClusterer>
        </Map>
      </Content>
    </>
  );
}

export default Main;
