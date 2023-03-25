import MapContainer from 'component/Kakao.maps';
// import TopCard from 'component/landingpage/TopCard';


import React, { useState } from 'react';

export default function LandingPage() {
  const [text, setText] = useState('');
  return (
    <>
      <MapContainer />
      {/* <TopCard /> */}
    </>
  );
}
