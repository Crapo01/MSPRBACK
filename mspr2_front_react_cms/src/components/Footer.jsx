import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
    return (        
            <Row className="bg-dark justify-content-around align-items-center border rounded m-1" style={{height: 150+'px'}}>
            <Col className="col-12 d-flex justify-content-center"> <Link to={"/mentions"} style={{ textDecoration: 'none' }}>Mentions légales</Link></Col>            
            </Row>
    );
};

export default Footer;