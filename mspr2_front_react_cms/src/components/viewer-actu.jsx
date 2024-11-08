import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import userService from "../services/user.service";
import eventBus from "../common/EventBus";
import authService from "../services/auth.service";



function ActuViewer() {

    const [datas, setDatas] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    
    async function fetchData() {
        // try {

        //     const response = await fetch("http://localhost:8080/api/informations/all");
        //     const data = await response.json();
        //     if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };

        // } catch (error) {
        //     throw ("Une erreur est survenue dans l'appel API actu: ")
        // }
        userService.getInfo().then(
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
                            <Col key={item.id} className={"p-1 m-2 col-12 overflow-auto"} >
                               {item.important&& <div className="border border-danger border-3"> {"message: " + item.message}  </div> } 
                               {!item.important&& <div className="border border-success border-3"> {"message: " + item.message}  </div> }                               
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
            {showPanel&&<Event />}
        </>
    );
};

export default ActuViewer;