export function currentLocation() {
  // HTML5의 geolocation으로 사용할 수 있는지 확인합니다
  if (navigator.geolocation) {
    // GeoLocation을 이용해서 접속 위치를 얻어옵니다
    navigator.geolocation.getCurrentPosition(function (position) {
      const lat = position.coords.latitude, // 위도
        lon = position.coords.longitude; // 경도

      const locPosition = new window.kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
      const message = '<div style="padding:5px;">현위치</div>'; // 인포윈도우에 표시될 내용입니다

      // 마커와 인포윈도우를 표시합니다
      displayMarker(locPosition, message);
    });
  } else {
    // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다

    const locPosition = new window.kakao.maps.LatLng(33.450701, 126.570667),
      message = 'geolocation을 사용할수 없어요..';

    displayMarker(locPosition, message);
  }
  return;
}
function displayMarker(locPosition: any, message: string) {
  const container = document.getElementById('map'), // 이미지 지도를 표시할 div
    options = {
      center: new window.kakao.maps.LatLng(37.49140197082119, 127.01760603543958), // 이미지 지도의 중심좌표
      level: 5, // 이미지 지도의 확대 레벨
    };

  // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
  const map = new window.kakao.maps.Map(container, options);
  // 마커를 생성합니다
  const marker = new window.kakao.maps.Marker({
    map: map,
    position: locPosition,
  });

  const iwContent = message, // 인포윈도우에 표시할 내용
    iwRemoveable = true;

  // 인포윈도우를 생성합니다
  const infowindow = new window.kakao.maps.InfoWindow({
    content: iwContent,
    removable: iwRemoveable,
  });

  // 인포윈도우를 마커위에 표시합니다
  infowindow.open(map, marker);

  // 지도 중심좌표를 접속위치로 변경합니다
  map.setCenter(locPosition);
}
// 마커이미지의 주소와, 크기, 옵션으로 마커 이미지를 생성하여 리턴하는 함수입니다
interface MarkerImage {
  src: string;
  size: number;
  options: any;
}
export function createMarkerImage({ src, size, options }: MarkerImage): any {
  const markerImage = new window.kakao.maps.MarkerImage(src, size, options);
  return markerImage;
}
interface AddMarker {
  position: string;
  image: string;
}
// 좌표와 마커이미지를 받아 마커를 생성하여 리턴하는 함수입니다
export function createMarker({ position, image }: AddMarker): any {
  const marker = new window.kakao.maps.Marker({
    position: position,
    image: image,
  });

  return marker;
}
export const coffeePositions = [
  new window.kakao.maps.LatLng(37.499590490909185, 127.0263723554437),
  new window.kakao.maps.LatLng(37.499427948430814, 127.02794423197847),
  new window.kakao.maps.LatLng(37.498553760499505, 127.02882598822454),
  new window.kakao.maps.LatLng(37.497625593121384, 127.02935713582038),
  new window.kakao.maps.LatLng(37.49646391248451, 127.02675574250912),
  new window.kakao.maps.LatLng(37.49629291770947, 127.02587362608637),
  new window.kakao.maps.LatLng(37.49754540521486, 127.02546694890695),
];
export const coffeeMarkers = [];
