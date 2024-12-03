
import { MapContainer, Marker, TileLayer, Tooltip } from "react-leaflet";
import { Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import {BASE_URL} from '../config/config.js';


function CarteMini() {
  
  const [localDatas,setLocalDatas] = useLocalStorage("pointeurs")
  const [datas, setDatas] = useState([]);
  async function fetchWordPressData() {
    try {
      const response = await fetch(`${BASE_URL}/api/pointeurs/all`);        
        const data = await response.json();
        //console.log(data)
        if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data);setLocalDatas(data) };

    } catch (error) {
        console.log("Une erreur est survenue dans l'appel API: ",error)        
    }
}
useEffect(() => {
    //console.log(localDatas);
    if (localDatas) {//console.log("uselocalstorage");
      setDatas(localDatas)}
    fetchWordPressData();
}, []);
  
  return (
    <>
<div className={"p-3 m-md-5 border rounded bg-secondary"}>
            <div className="lightningBg border rounded">
            <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">CARTE</h1>
            </div>
            
            

    <Row className="justify-content-center my-5 mx-md-5 p-5 border rounded metalBg">
    
    <Link to={"/Map"}> 
    <MapContainer  style={{ height: '300px', width: '100%'}} center={[48.8382 ,2.4427]} zoom={15} scrollWheelZoom={false} locate={{setView: true, maxZoom: 16}}>
    
      <TileLayer 
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      
      if ({datas.lenght > 0}) {
        
<ul>
  {datas.map((item) => (
    
    <li key={item.id}>

      {<Marker position={[item.lat, item.lon]} >
        <Tooltip>{item.nom} </Tooltip>        
      </Marker>}
    </li>
  ))}
</ul>
}  
         
    </MapContainer>
    </Link>
    </Row>
  </div>
    </>

  );
};

export default CarteMini;