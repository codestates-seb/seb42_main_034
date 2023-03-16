import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/">
      <img src={'./image/travel.png'} alt="travel" />
      여기 가봤니?
    </Link>
  );
}
