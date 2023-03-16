import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Board() {
  return (
    <div>
      <p>board</p>
      <Outlet />
    </div>
  );
}
