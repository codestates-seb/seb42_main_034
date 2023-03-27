import { Button } from 'component/ui/Button';
import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
export default function BlogList() {
  const data = useLocation();
  const navigate = useNavigate();
  console.log(data);
  const handleClick = () => {
    navigate('/boa');
  };
  return <Button children="Blog" />;
}
