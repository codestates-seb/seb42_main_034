import MapContainer from 'component/Kakao.maps';
import TopCard from 'component/landingpage/TopCard';

import React, { useState } from 'react';

export default function LandingPage() {
  const [text, setText] = useState('');
  return (
    <>
      <TopCard />
      <MapContainer intro={true} latitude={37.49140197082119} longitude={127.01760603543958} />
    </>
  );
}
