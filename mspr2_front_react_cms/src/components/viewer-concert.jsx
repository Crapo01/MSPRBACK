import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import userService from "../services/user.service";
import eventBus from "../common/EventBus";
import authService from "../services/auth.service";



function ConcertViewer() {

    const [datas, setDatas] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    async function fetchData() {
        userService.getConcert().then(
            response => {
                console.log(response)
                const data = response.data;
                if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
            },
            error => {
              alert(
                  error.message                  
             );
      
              if (error.response && error.response.status === 401) {
                eventBus.dispatch("logout");
              }
            }
          );
    }

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            if (user.roles.includes("ROLE_VIEWER")){
                setShowPanel(true);
                 fetchData(); 
             } 
        }         
    }, []);


    function Event() {

        

        if (datas) {
            return (
                <>

                    <Row className={"m-3"}>

                        {datas.map((item) => (
                            <Col key={item.id} className={"p-1 m-2 border d-flex flex-column flex-md-row col-12 overflow-auto"} >
                                <div>
                                    <img src={item.image} alt="" className="img100px" />      
                                </div>
                                                         
                                <div >
                                <div> {"nom: " + item.nom + " | origine: " + item.origine}  </div>
                                <div> {"date: " + item.date + " | heure: " + item.heure + " | scene: " + item.scene}  </div>
                                <div> {"description: " + item.description}  </div>
                                <div> {"lien: " + item.lien}  </div>
                                </div>
                                
                            </Col>
                        ))}
                    </Row>
                </>
            )
        } else {
            return <h3>Pas de concert pour le moment</h3>
        }
    }

    



    return (
        <>
            <h1 className="lightningBg border rounded text-light text-center sticky z-1">CONCERTS</h1>
            {showPanel&&<Event />}
        </>
    );
};

export default ConcertViewer;