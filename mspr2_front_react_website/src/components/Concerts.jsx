import { useContext, useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ConcertContext } from "../components/context"
import useLocalStorage from "../hooks/useLocalStorage";
import {BASE_URL} from '../config/config.js';



function Concerts() {
    const groupe = useContext(ConcertContext);
    const [localDatas,setLocalDatas] = useLocalStorage("concerts")
    const [datas, setDatas] = useState(false);
    async function fetchWordPressData() {
        try {
            
            const response = await fetch(`${BASE_URL}/api/concerts/all`);            
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

    function Groupes() {

        if (datas) {
            return (
                <Row>
                    {datas.map((item) => (

                        <Col key={item.id} className="col-12 col-md-6 col-lg-4 p-3 bg-secondary">
                            <div  className={"p-3 border rounded metalBg shadow h-100 relative"}>
                                <h2> {item.nom}</h2>
                                <img src={item.image} alt="" style={{ width: 100 + '%' }} />
                                <p className="text-light h4">le {item.date} à {item.heure}</p>
                                        <p className="text-light ">Scène: {item.scene}</p>                                                               
                                <Link to={"/Details"} style={{ textDecoration: 'none' }} >
                                    <Button className='btn-dark botomRight border'
                                        onClick={() => (groupe.updateGroupe({ 
                                            nom: item.nom,
                                            image: item.image,
                                            description: item.description,
                                            origine: item.origine,
                                            programmation: {date: item.date,heure: item.heure},
                                            scene: item.scene,
                                            lien: item.lien
                                            }))}>
                                        details
                                    </Button>
                                </Link>

                            </div>
                        </Col>
                    ))}
                </Row>
            )
        } else {
            return <h2><Image src="/images/loading.gif" />Pas de concerts pour le moment</h2>
        }
    }
    return (

        <div className={"p-3 m-md-5 border rounded bg-secondary"}>
            <div className="lightningBg border rounded">
            <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">CONCERTS</h1>
            </div>
            
            <Groupes />
        </div>

    );
};

export default Concerts;