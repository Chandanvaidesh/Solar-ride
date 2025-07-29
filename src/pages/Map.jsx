import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";  // ← import map components
import{useState,useEffect} from "react";
import {useMap} from "react-leaflet";
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";

function SetViewToUserLocation({ location }){
  const map = useMap();
   
  useEffect(()=>{ 
    if (location){
      map.flyTo([location.lat,location.lng],13);
    }
  },[location,map]);
  return null;
}

export default function Map() {
  const [userlocation, setUserlocation] = useState(null);
  const [geofence, setGeofence] = useState(null);
 
  useEffect(()=>{
    if(!navigator.geolocation){
      console.log("geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserlocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        console.log(position.coords.latitude,position.coords.longitude);
      },
      (error)=>{
        console.log("error getting location:",error);
      }
    );
  },[]);
  

 
    

  return (
    // full-screen map container
    
    <MapContainer
      center={[12.9716, 77.5946]}  // latitude, longitude
      zoom={13}      
      scrollWheelZoom={true}              // zoom level
      className="h-screen w-full"  // Tailwind for full viewport
    >
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {userlocation && <SetViewToUserLocation location={userlocation}/>}

      {userlocation && (
        <Marker position={[userlocation.lat,userlocation.lng]}>
          <Popup>you are here</Popup>
        </Marker>
      )}
       
    </MapContainer>
   
  );
}
