import { MapContainer, Marker, TileLayer, Tooltip, useMap} from "react-leaflet";
import { Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import {BASE_URL} from '../config/config.js';



function CarteMini({ sendDataToParent }) {


    const [datas, setDatas] = useState([]);
    async function fetchWordPressData() {
        try {
            const response = await fetch(`${BASE_URL}/api/pointeurs/all`);
            const data = await response.json();
            if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };

        } catch (error) {
            console.log("Une erreur est survenue dans l'appel API: ",error)            
        }
    }
    useEffect(() => {
        fetchWordPressData();
    }, []);

    function Getlatlon() {
        const map = useMap();
        map.on('click', function(ev) {            
            let lat= ev.latlng.lat;
            lat = lat.toFixed(6);
            let lng= ev.latlng.lng;
            lng = lng.toFixed(6);
            sendDataToParent({lon: lng,lat: lat}) // ev is an event object (MouseEvent in this case)
        });
    }

    return (
        <>
            <div className={"p-3 m-md-5 border rounded bg-secondary"}>
                <div className="lightningBg border rounded">
                    <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">CARTE</h1>
                </div>
                <Row className="justify-content-center my-5 mx-md-5 p-5 border rounded metalBg">
                    <MapContainer style={{ height: '400px', width: '70%' }} center={[48.8382, 2.4427]} zoom={15} scrollWheelZoom={false} locate={{ setView: true, maxZoom: 16 } } >
                        <TileLayer className="z-100"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        <Getlatlon/>                        
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
                </Row>
            </div>
        </>
    );
};

export default CarteMini;