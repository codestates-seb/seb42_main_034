import useGeolocation from 'hooks/useGeoLocation';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import Geocode from 'react-geocode';
import styled from 'styled-components';
import { useAppDispatch } from 'redux/hooks';
import { updateUserInfo } from 'redux/userInfoSlice';
import useAPI from 'hooks/uesAPI';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}


function Modal({
  onClickToggleModal,
  children,
} : PropsWithChildren<ModalDefaultType>) {

  const location = useGeolocation();
  const dispatch = useAppDispatch();
  const api = useAPI();

  const { latitude, longitude }: any = location.coordinates;
  const [ad, setAd] = useState('');

  useEffect(() => {
    if(location.loaded === true) getAddressFromLatLng() ;
  }, [location])

  const GEOCODER_KEY: any = process.env.REACT_APP_GEOCODER_KEY;
  Geocode.setLanguage('ko');
  Geocode.setApiKey(GEOCODER_KEY);
  Geocode.enableDebug();

  const getAddressFromLatLng = () => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[4].formatted_address;
        const location = { latitude, longitude };
        setAd(address.slice(5));
        api.post(`/location?latitude=${latitude}&longitude=${longitude}`);
 
      },
      (error) => {
        console.log(error);
        alert('위치 정보를 불러올 수 없습니다.');
      },
    );
  };




  return (
    <Layout>
      <Dialog>
        {children}
        <h1>현재 계신 위치로 도시가 설정 됩니다. 동의 하시겠습니까?</h1>
        <div className='currentplace'>
      {location.loaded ? ad : '현재 위치를 확인 중입니다.'}
        </div>
    <div className='btn'>
      <Button
      className='btn1'
      onClick={() => {
        dispatch(updateUserInfo({  key: 'address', value: ad}));
        onClickToggleModal();
      }}
      >
        Y
      </Button>

      <Button
      className='btn2'
      onClick={() => {
        if(onClickToggleModal) {
          onClickToggleModal();
        }
      }}
      >
        N
      </Button>
      </div>
      </Dialog>
    
    </Layout>
  )


}

const Layout = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 10%;
  
`

const Dialog = styled.dialog`
  width: 25rem;
  height: 12.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 4px;
  background-color: skyblue;
  z-index: 9999;
  
  h1{
    font-size: 1.5rem;
    padding-bottom: 15px;
  }
  .btn{
    justify-content: space-between;
    padding-top: 20px;
  }
  .btn1{
    margin-right: 2.5rem;
    margin-top: 0px;
    margin-bottom: 6px;
  }
  .btn2{
    background-color: #a4a4a4;
    margin-top: 0px;
    margin-bottom: 6px;
  }
  .currentplace {
    padding-bottom: 5px;
    width: 20rem;
    height: 2.5rem;
    background-color: rgb(100, 185, 255);
    border-radius: 3px;
    color: white;
    align-items: center;
    text-align: center;
    padding-top: 12px;
  }
`

const Button = styled.button`
  width: 80px;
  height: 2.5rem;
  position: relative;
  display: inline-block;
  height: 2.5rem;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  overflow: hidden;
  margin-top: 20px;
  cursor: pointer;
  transition: 0.5s;
  border-radius: 10px;
  padding: 12px 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  &:hover {
    background: #0583c6;
    color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px #0583c6, 0 0 25px #0583c6, 0 0 50px #0583c6, 0 0 100px #0583c6;
  }
`






export default Modal;