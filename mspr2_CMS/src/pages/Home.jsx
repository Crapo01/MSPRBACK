
import { Nav } from "react-bootstrap";
import ActuAdmin from "../components/ActuAdmin";
import ConcertAdmin from "../components/ConcertAdmin";
import PointeurAdmin from "../components/PointeurAdmin";
import { Link } from "react-router-dom";


function Home() {
    return (
        <div className={"p-3 m-md-5 border rounded bg-light"}>
            <div className="border rounded bg-secondary">
                <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">ADMINISTRATION PANEL</h1>
            </div>
            <div>
              <Nav.Link><Link to={"/AdminActuPage"} className='font-weight-bolder text-dark text-decoration-none'><ActuAdmin /></Link></Nav.Link>
            </div>
            
            <ConcertAdmin/>
            <PointeurAdmin/>
        </div>
    );
};

export default Home;