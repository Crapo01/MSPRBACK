import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";



function ActuViewer() {

    const [datas, setDatas] = useState(false);
    

    async function fetchData() {
        try {

            const response = await fetch("http://localhost:8080/api/informations/all");
            const data = await response.json();
            if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };

        } catch (error) {
            throw ("Une erreur est survenue dans l'appel API actu: ")
        }
    }

    useEffect(() => {
        fetchData();        
    }, []);


    function Event() {

        
        if (datas) {
            return (
                <>

                    <Row className={"m-3"}>

                        {datas.map((item) => (
                            <Col key={item.id} className={"p-1 m-2 border col-12 overflow-auto"} >
                                <div> {"id:" + item.id + " |        important: " + item.important}  </div>
                                <div> {"message: " + item.message}  </div>                                
                            </Col>
                        ))}
                    </Row>
                </>
            )
        } else {
            return <h3>Pas d'infos pour le moment</h3>
        }
    }
    

    return (
        <>
            <h1 className="lightningBg border rounded text-light text-center sticky z-1">INFORMATIONS</h1>
            <Event />
        </>
    );
};

export default ActuViewer;