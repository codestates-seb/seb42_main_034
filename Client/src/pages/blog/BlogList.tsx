import { Button } from 'component/ui/Button';
import React from 'react';
import { useLocation } from 'react-router-dom';
export default function BlogList() {
  const data = useLocation();
  console.log(data);

  return <Button children="Blog" />;
}
