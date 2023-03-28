import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CurrentPosition: React.FC = () => {
  const [position, setPosition] = useState<GeolocationPosition>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition);
  }, []);

  if (!position) {
    return <div>위치정보 받아오는중...</div>;
  }

  const { coords: { latitude, longitude } } = position;

  const sendLocation = async (latitude: number, longitude: number) => {
    try{
        const locationData = {latitude, longitude};
        await axios.post('/members', locationData)
        alert('위치기반 인증에 성공 하였습니다.')
        console.log('전송 성공');
    } catch(error) {
        console.error(error)
        alert('위치기반 인증에 실패 하였습니다.')
    }
  }

  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
    </div>
  );
};
  
export default CurrentPosition;