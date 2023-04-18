import { Props } from 'component/header/Logo';
import useGeolocation from 'hooks/useGeoLocation';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import Geocode from 'react-geocode';

interface ModalDefaultType {
  onClickToggleModal: () => void;
}

function Modal({
  onClickToggleModal,
  children,
} : PropsWithChildren<ModalDefaultType>) {

  const location = useGeolocation();
  const dispatch = useDispatch();

  const { latitue, longitude }: any = location.coordinates;
  const [ad, setAd] = useState('');

  // useEffect(() => {
  //   if(location.loaded === true) getAddressFromLatLng();
  // }, [location])

  // const GEOCODER_KEY: any = process.env.REACT_APP_GEOCODER_KEY;
  // Geocode.setLanguage('ko');
  // Geocode.setApiKey(GEOCODER_KEY);
  // Geocode.enableDebug();

  // const getAddressFromLatLng = () => {
  //   Geocode.fromLatLng(latitue, longitude).then(
  //     response => {
  //       const address = response.results[4].formatted_address;
  //       setAd(address.slice(5))
  //     },
  //     error => {
  //       console.log(error)
  //     }
  //   )
  // }



}


export default Modal;