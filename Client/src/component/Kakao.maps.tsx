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
    const container = document.getElementById('map'), // 이미지 지도를 표시할 div
      options = {
        center: new window.kakao.maps.LatLng(35.55616248935553, 127.84340254284501), // 이미지 지도의 중심좌표
        level: 13, // 이미지 지도의 확대 레벨
      };

    // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <MiddleLayout>
      <div
        id="map"
        style={{
          width: ScreenSize.max_width,
          height: ScreenSize.middle_height,
          margin: 'auto',
        }}
      />
      <Filter />
    </MiddleLayout>
  );
};

export default MapContainer;
