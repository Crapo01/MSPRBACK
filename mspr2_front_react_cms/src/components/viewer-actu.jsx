import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import userService from "../services/user.service";
import authService from "../services/auth.service";

function ActuViewer() {
    const [datas, setDatas] = useState([]);
    const [showPanel, setShowPanel] = useState(false);

    async function fetchData() {        
        userService.getInfo().then(
            response => {
                 console.log(response)
                const data = response.data;
                if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
            },
            error => {
                console.error(
                    error.message
                )
            }
        );
    }

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            if (user.roles.includes("ROLE_VIEWER")) {
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
                                {item.important && <div className="border border-danger border-3"> {"message: " + item.message}  </div>}
                                {!item.important && <div className="border border-success border-3"> {"message: " + item.message}  </div>}
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
            {showPanel &&
                <>
                    <h1 className="lightningBg border rounded text-light text-center sticky z-1">INFORMATIONS</h1>
                    <Event />
                </>
            }
        </>
    );
};

export default ActuViewer;