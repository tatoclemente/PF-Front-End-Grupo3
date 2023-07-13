import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import style from './Maps.module.css'

export default function Maps() {
 const { isLoaded } = useLoadScript({
   googleMapsApiKey: 'AIzaSyCnWVbD2hCaBHzzW8gRn-WwuoKbfx_2ni8',
 });
 if (!isLoaded) return <div>Loading...</div>;
 return (
    <Location />
 );
}

function Location() {
 const center = useMemo(() => ({ lat: -34.63515829816285,  lng: -58.43224900256536 }), []);
 const containerStyle = {
  width: '100vw',
  maxWidth: '500px',
  borderStyle: 'solid',
  borderColor: '#313045',
  height: '300px',
  margin: '30px',
  borderRadius:'15px',
  boxShadow:'-1px 2px 6px 2px rgba(0, 0, 0, 0.2)',
};


 return (
    <div className={style.containerMaps}>
      <div className={style.containerM}>
  <GoogleMap 
    mapContainerStyle={ containerStyle }
    
    zoom={18} 
    center={center} 
  >
    <MarkerF
      position={center}
    />
  </GoogleMap>
  </div>
  <h2 className={style.containerUb}>Nuestra ubicacion</h2>
  </div>
 );

}



