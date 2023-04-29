import { currentLocation } from 'api/kakaoApi';
import { constants } from 'buffer';
import React, { useEffect } from 'react';
import Filter from './home/Filter';
import { ScreenSize } from './style/variables';
import { MiddleLayout } from './ui/Layout';

declare global {
  interface Window {
    kakao: any;
  }
}
interface MapContent {
  intro?: boolean;
  longitude: number; //경도
  latitude: number; //위도
  className?: string;
  width?: number;
  height?: number;
}
const MapContainer = ({ intro, latitude, longitude, className, width, height }: MapContent) => {
  useEffect(() => {
    const container = document.getElementById('map'), // 이미지 지도를 표시할 div
      options = {
        center: new window.kakao.maps.LatLng(latitude, longitude), // 이미지 지도의 중심좌표
        level: 5, // 이미지 지도의 확대 레벨
      };

    // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
    const map = new window.kakao.maps.Map(container, options);
    const marker = new window.kakao.maps.Marker({
      position: map.getCenter(),
    });
    intro && marker.setMap(map);
    // currentLocation();
    const iwContent = '<div style="padding-bottom:1.1rem;">현지인의 꿀 정보를 얻어보세요!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    const infowindow = new window.kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    new window.kakao.maps.event.addListener(marker, 'click', function () {
      // 마커 위에 인포윈도우를 표시합니다

      infowindow.open(map, marker);
      // // 주소-좌표 변환 객체를 생성합니다
      // const geocoder = new window.kakao.maps.services.Geocoder();

      // // 주소로 좌표를 검색합니다
      // geocoder.addressSearch(
      //   '제주특별자치도 제주시 첨단로 242',
      //   function (result: any, status: any) {
      //     // 정상적으로 검색이 완료됐으면
      //     if (status === window.kakao.maps.services.Status.OK) {
      //       const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

      //       // 결과값으로 받은 위치를 마커로 표시합니다
      //       const marker = new window.kakao.maps.Marker({
      //         map: map,
      //         position: coords,
      //       });

      //       // 인포윈도우로 장소에 대한 설명을 표시합니다
      //       const infowindow = new window.kakao.maps.InfoWindow({
      //         content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>',
      //       });
      //       infowindow.open(map, marker);

      //       // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
      //       map.setCenter(coords);
    });
  }, []);

  return (
    <MiddleLayout>
      <div
        id="map"
        style={{
          width,

          height,
          margin: 'auto',
        }}
        className={className}
      />
    </MiddleLayout>
  );
};

export default MapContainer;
