import React, { useEffect } from 'react';
import Filter from '../pages/home/Filter';
import { ScreenSize } from './style/const';
import { MiddleLayout } from './ui/Layout';

declare global {
  interface Window {
    kakao: any;
  }
}
const MapContainer = () => {
  useEffect(() => {
    const staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
      staticMapOption = {
        center: new window.kakao.maps.LatLng(35.55616248935553, 127.84340254284501), // 이미지 지도의 중심좌표
        level: 13, // 이미지 지도의 확대 레벨
      };

    // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
    const staticMap = new window.kakao.maps.StaticMap(staticMapContainer, staticMapOption);
  }, []);

  return (
    <MiddleLayout>
      <div
        id="staticMap"
        style={{
          width: ScreenSize.max_width,
          height: ScreenSize.middle_height,
          margin: 'auto',
          transform: 'scale(1.1)',
        }}
      />
      <Filter />
    </MiddleLayout>
  );
};

export default MapContainer;
