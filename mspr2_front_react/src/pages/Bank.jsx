import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";

function Bank() {
    const [datas, setDatas] = useState([]);
    const [localDatas,setLocalDatas] = useLocalStorage("bank")

    
    async function fetchApiData() {
        try {
console.log("async fnct");
            const response = await fetch("http://localhost:8080/api/accounts/all");
            //const response = await fetch("https://nationsoundluc.rf.gd/wpdb/wp-json/acf/v3/questions");
            // const response = await fetch("http://localhost/ns_hl_wp/wp-json/acf/v3/questions");
            
console.log(response);
            const data = await response.json();
console.log(data);
            if (data.code === "rest_no_route") { throw "error:rest_no_route" }
            else {
                setDatas(data);
                setLocalDatas(data)
            };

        } catch (error) {
            //("Une erreur est survenue dans l'appel API: ")
            //(error)
        }
    }
    useEffect(() => {
        //(localDatas);
        if (localDatas) {//("uselocalstorage");
            setDatas(localDatas)}
        fetchApiData();
    }, []);
    

    

    function Bank() {
        if (datas.length > 0) {
            return (
                <>
                    <Row className={"m-3 border rounded bg-secondary justify-content-around"}>
                        <h1 className="colorRed"><Image src="/images/title4.png" />Bank</h1>
                        {datas.map((item) => (

                            <Col className="col-11 p-3 m-2 bg-light border rounded shadow d-flex flex-column" key={item.id }>

                                <h2 className="text-center"> {item.accountHolderName}</h2>
                                <p className="text-center"> ACCOUNT ID : {item.id}</p>
                                <p className="text-center"> BALANCE : {item.balance}</p>
                                

                            </Col>
                        ))}
                    </Row>
                </>
            )
        } else return (
            <>
                <Row className={"m-3 border rounded bg-light "}>
                    <h1 className="colorRed"><Image src="/images/title4.png" />Bank<Image src="/images/loading.gif" width={300 + 'px'} className="p-5 m-5" /></h1>

                </Row>
            </>
        )

    }





    return (
        <div>

            <Bank/>
        </div>
    );
};

export default Bank;