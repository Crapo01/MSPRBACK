import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import * as L from "leaflet";
import { Button, Col, Image, Row } from "react-bootstrap";
import RoutingMachine from "./RoutingMachine";
import { Link } from "react-router-dom";
import { ConcertContext } from "./context";
import useLocalStorage from "../hooks/useLocalStorage";



function Carte(props) {
  //  Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {}
  });

  const blueIcon = new LeafIcon({
    iconUrl:
      "./sound.png",
    iconAnchor: [20, 60],
    popupAnchor: [0, -60]
  }),
    greenIcon = new LeafIcon({
      iconUrl:
        "./food.png",
      iconAnchor: [20, 60]
    }),
    orangeIcon = new LeafIcon({
      iconUrl:
        "./toilet.png",
      iconAnchor: [20, 60]
    }),
    redIcon = new LeafIcon({
      iconUrl:
        "./info.png",
      iconAnchor: [20, 60]
    }),
    posIcon = new LeafIcon({
      iconUrl:
        "./pos.png",
      iconAnchor: [42, 38]
    });


    const groupe = useContext(ConcertContext)
    const [localDatas,setLocalDatas] = useLocalStorage("pointeurs")
    const [localConcerts,setLocalConcerts] = useLocalStorage("concerts")
  const [datas, setDatas] = useState([]);
  const [prog, setProg] = useState([]);
  const [filteredScenes, setFilteredScenes] = useState([]);
  const [position, setPosition] = useState(null);
  const [arrivee, setArrivee] = useState(null);
  const [locator, setLocator] = useState(false);
  const [virtualPosition, setVirtualposition] = useState(true);
  const [filter, setFilter] = useState("tout");

  const filteredMarkers = datas.filter
    ((event) =>
    (
      (event.type === filter || filter === "tout")
    )
    )



  useEffect(() => {
    //console.log(localDatas);
    if (localDatas) {//console.log("uselocalstorage");
      setDatas(localDatas)}
    fetchWordPressData();
  }, []);
  


  async function fetchWordPressData() {
    //console.log("fetch datas")
    //console.log(datas,filteredScenes)
    try {
      let response = await fetch("http://localhost:8080/api/pointeurs/all");
      // let response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/pointeur");
      let data = await response.json();
      //console.log("data1:"+data)
      if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data);setLocalDatas(data) };
      response = await fetch("http://localhost:8080/api/concerts/all");
      // response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/concerts");
      data = await response.json();
      //console.log("data2")
      //console.log(data)
      if (data.code === "rest_no_route") { throw "error:rest_no_route" } else {
        
        setProg(data);
setLocalConcerts(data)
         
      };

    } catch (error) {
      //console.log("Une erreur est survenue dans l'appel API: ")
      //console.log(error)
    }
  }

  function onStageSorting() {
    
    
    let filteredProg = prog.filter((e) =>
        (
         parseInt(new Date().toLocaleTimeString().substr(0,2))<= parseInt(e.heure.substr(0,2)+2)  &&
         parseInt(new Date().toLocaleTimeString().substr(0,2))>= parseInt(e.heure.substr(0,2)) &&
          parseInt(e.acf.date) === parseInt(new Date().toLocaleDateString())
          
        )
        )
    //console.log(filteredProg)
        let temp=new Array;
        //console.log("filteredProg")
        //console.log(datas)
        filteredProg.map((e)=>(datas.map((ee)=> {
          const str= ee.nom;
          //console.log(e.acf.scene+":"+str.substr(6));
          //console.log(parseInt(e.acf.heure.substr(0,2))+2)
          //console.log(parseInt(new Date().toLocaleTimeString().substr(0,2)))
          
          if(e.scene === str.substr(6)) temp.push({prog:e,mark:ee})
          }
        )))
        //console.log(temp)
        setFilteredScenes(temp)
  }

  function selectColor(type) {
    switch (type) {
      case "scene":
        return (blueIcon)

      case "informations":
        return (redIcon)

      case "toilettes":
        return (orangeIcon)

      case "alimentation":
        return (greenIcon)

    }

  }

  
  function LocationMarker() {
    //console.log("vpos" + virtualPosition+"locator"+locator+"position"+position)

    if (locator && !position) {
      //console.log("locating position")
      const map = useMap()
      map.locate({ setView: false, maxZoom: 14 });
      function onLocationFound(e) {

        virtualPosition ? setPosition({ lat: 48.837078, lng: 2.442521 }) : setPosition(e.latlng)
        //console.log("located at:"+position)

      }

      map.on('locationfound', onLocationFound);
      setArrivee(position);
    }
    return position === null ? null : (
      <>
        <Marker position={position} icon={posIcon}>
          <Popup>Vous etes ici</Popup>
        </Marker>
        <RoutingMachine start={position} end={arrivee} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </>
    )
  }

  return (
    <>
    
            
      <Row className="  m-md-5 p-2 border rounded bg-secondary">
        <div className="lightningBg border rounded">
            <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">CARTE</h1>
            </div>
        <Col className="d-flex justify-content-center">
          <div className="p-2">
            <p className="text-style4">Type de marqueur</p>
            <select onChange={(e) => {setFilter(e.target.value);e.target.value==="onStage"?onStageSorting():null}} value={filter} >
              <option value={"tout"}>tout</option>
              <option value={"scene"}>scenes</option>
              <option value={"informations"}>informations</option>
              <option value={"toilettes"}>toilettes</option>
              <option value={"alimentation"}>alimentation</option>
              <option value={"onStage"}>en cours</option>
            </select>
          </div>
        </Col>
        <Col className="d-flex justify-content-center">
          {!locator ?
            <button onClick={(e) => {alert("Activer la geolocalisation pour utiliser cette option"); setLocator(true) }}>Activer la geolocalisation</button> :
            <button onClick={(e) => { setLocator(false);setPosition(null) }}>Désactiver la geolocalisation</button>}
        </Col>
        <Col className="d-flex justify-content-center">
          <div className="p-2">
            <label htmlFor="Vpos">Utiliser la position GPS réelle</label>
            <input type="checkbox" id="Vpos" onChange={(e) => { setVirtualposition(!e.target.checked) }} />
          </div>
        </Col>

        

        <MapContainer style={{ height: props.h, width: props.w }} center={[48.8375, 2.4432]} maxZoom={16} zoom={17} scrollWheelZoom={false} locate={{ setView: true, maxZoom: 16 }}>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          if ({filteredMarkers.lenght > 0}) {

            <ul>
              {filteredMarkers.map((item) => (

                <li key={item.id}>

                  {<Marker position={[item.lat, item.lon]} icon={selectColor(item.type)}>
                    <Tooltip>{item.nom} </Tooltip>
                    <Popup>
                      <h2>{item.nom}</h2>
                      <p>{item.description}</p>
                      <a href={item.lien} target="_blank">{item.lien}</a>
                      <br></br>
                      {locator ?
                        <button onClick={() => setArrivee([item.lat, item.lon])}>Y aller ...</button> : null}
                    </Popup>
                  </Marker>}
                </li>
              ))}
            </ul>
          }

          if ({filteredScenes.lenght > 0}) {
            
              
              <ul>
                {filteredScenes.map((item) => (

                  <li key={item.mark.id}>

                    {<Marker position={[item.mark.lat, item.mark.lon]} icon={selectColor(item.mark.type)}>
                      <Popup>
                        <h2>{item.mark.nom}</h2>
                        <h6>En cours: {item.prog.nom}</h6>
                        <Link to={"/Details"} style={{ textDecoration: 'none' }} >
                                    <Button className='btn-dark my-2'
                                        onClick={() => (groupe.updateGroupe({ 
                                            nom: item.prog.nom,
                                            image: item.prog.image,
                                            description: item.prog.description,
                                            origine: item.prog.origine,
                                            programmation: {date: item.prog.date,heure: item.prog.heure},
                                            scene: item.prog.scene
                                            }))}>
                                        plus de details...
                                    </Button>
                                </Link>
                                <br />
                        {locator ?
                          <Button className='btn-dark my-2' onClick={() => setArrivee([item.mark.lat, item.mark.lon])}>Y aller ...</Button> : null}
                      </Popup>
                    </Marker>}
                  </li>
                ))}
              </ul>
            
          }

          <LocationMarker />




        </MapContainer>
      </Row>
    </>

  );
};

export default Carte;