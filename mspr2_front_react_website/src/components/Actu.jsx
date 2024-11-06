import { useEffect, useState } from "react";
import { Col,Image,Row } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";

function Actu() {
    const [localDatas,setLocalDatas] = useLocalStorage("actu")
    const [datasNormal, setDatasNormal] = useState(false);
    const [datasPrio, setDatasPrio] = useState(false);
    
    async function fetchData() {
        try {
            
            const response = await fetch("http://localhost:8080/api/informations/all");            
            const data = await response.json();            
            if (data.code === "rest_no_route") {throw "error:rest_no_route"} else {sortDatas(data)} ;

        } catch (error) {
            throw("Une erreur est survenue dans l'appel API actu: ")                  
        }
    }
    useEffect(() => {
        //console.log(localDatas);
        if (localDatas) {//console.log("uselocalstorage");
            sortDatas(localDatas)}
        fetchData();
    }, []);

    function sortDatas(data) {
        setLocalDatas(data)
        const normalTemp=new Array;
        const prioTemp=new Array;
        data.map((item) => (
            
            item.important===true? prioTemp.unshift(item):normalTemp.push(item)
        ))
        setDatasNormal(normalTemp);
        setDatasPrio(prioTemp);
    }

    function NormalEvent() {        
        if (datasNormal) {
            return (
                <>
                
                <Row>
                
                    {datasNormal.map((item) => (                        
                        <Col key={item.id} className={"p-3 col-12 col-lg-6"} >
                            <div className={"p-3 border rounded shadow border-primary border-5 metalBg text-light"}> {item.message} </div>                                                         
                        </Col>
                    ))}
                </Row>
                </>
            )
        } else {
            return <h3><Image src="/images/loading.gif"/>Pas d'infos pour le moment</h3>
        }
    }
    function PrioEvent() {        
        if (datasPrio) {
            return (
                <>
                
                <Row >
                
                    {datasPrio.map((item) => (                        
                        <Col key={item.id} className={"p-3 col-12 col-lg-6"} >
                            <div className={"p-3 border rounded shadow border-danger border-5 metalBg text-light"}> { item.message}  </div>                                                         
                        </Col>
                    ))}
                </Row>                
                </>
            )
        } else {
            return <h3><Image src="/images/loading.gif"/>Pas d'alertes pour le moment</h3>
        }
    }

    return (
        <div className={"p-3 m-md-5 border rounded bg-secondary"}>
            <div className="lightningBg border rounded">
            <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">INFORMATIONS</h1>
            </div>
            
            <PrioEvent/>
                <NormalEvent/>
        </div>
    );
};

export default Actu;