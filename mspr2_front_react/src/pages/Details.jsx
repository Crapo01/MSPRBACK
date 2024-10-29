import { useContext, useEffect, useState } from "react";
import { ConcertContext } from "../components/context";
import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";






function Details() {
    const concert = useContext(ConcertContext);
    
    
    if (concert.groupe!==undefined)  
    return (
        <Row className={"p-3 border rounded shadow bg-light mb-5 mx-1"}>
            
            <Col className="col-12 p-3 border rounded bg-secondary">

                <h2> {concert.groupe.nom}</h2>
            </Col>
            <Col className="col-12 col-md-6 p-3 ">
                <img src={concert.groupe.image} alt="" style={{ width: 100 + '%' }} />
            </Col>
            <Col className="col-12 col-md-6 p-3 ">
                <p> {concert.groupe.description}</p>
            </Col>
            <Col className="col-12 col-md-6 col-lg-4">
                <h3>Origines:</h3>            
                <p>{concert.groupe.origine}</p>
            </Col>
            <Col className="col-12 col-md-6 col-lg-4">
                <h3>Programmation:</h3>
                <p>le {concert.groupe.programmation.date} à {concert.groupe.programmation.heure}</p>
            </Col>
            <Col className="col-12 col-md-6 col-lg-4">
                <h3>Scène:</h3> <p>{concert.groupe.scene}</p>
            </Col>
            <Col className="col-12 col-md-6 col-lg-4">
                <a href={concert.groupe.lien}>Voir site du groupe</a>
            </Col>
        </Row>
    );
    else
    {
        return(            
            <Link to={"/Concert"} className='text-decoration-none min-vh-100 text-center'>
                <h1>BACK TO CONCERTS</h1>
                <div className={" m-5 p-5 border rounded shadow bg-secondary mb-5 mx-1 min-vh-100"}>
                    
                    <Image src="/images/logo_festival.png" alt="logo nation sound" width={"150px"} rounded />
                </div>
            </Link>            
        )              
    }    
}; 

export default Details;