import MapContainer from 'component/Kakao.maps';
import React from 'react';

export default function MiddleCard() {
  return (
    <div>
      <div className="topBtn">다양한 지역에 있는 현지인들과 소통하세요!</div>
      <div>한번에 다양한 맛집 정보등을 확인 할 수 있습니다</div>
      <MapContainer intro={true} latitude={37.49140197082119} longitude={127.01760603543958} />
    </div>
  );
}
