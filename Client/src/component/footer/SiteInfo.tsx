import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteInfo() {
  return (
    <div>
      <div>2023 SEB_42_MAIN_PROJECT</div>
      <Link to="/">기업광고문의</Link>
      <Link to="/">이용약관</Link>
      <Link to="/">개인정보처리방침</Link>
    </div>
  );
}
