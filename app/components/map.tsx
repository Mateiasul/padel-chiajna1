/* 
Since the map was loaded on client side, 
we need to make this component client rendered as well else error occurs
*/
"use client";

//Map component Component from library
import { GoogleMap, Marker } from "@react-google-maps/api";

//Map's styling
export const defaultMapContainerStyle = {
  width: "80%",
  height: "60vh",
  borderRadius: "15px 0px 0px 15px",
};

const defaultMapCenter = {
  lat: 44.451754,
  lng: 25.973648,
};

const defaultMapZoom = 18;
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
};

const MapComponent = () => {
  return (
    <div className="w-full">
      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        <Marker position={{ lat: 44.451754, lng: 25.973648 }} />
      </GoogleMap>
    </div>
  );
};

export { MapComponent };
