import ActuAdmin from "../components/ActuAdmin";


function AdminActuPage() {

    
   
    return (
        <div className={"p-3 m-md-5 border rounded bg-light"}>
            <div className="bg-secondary border rounded">
                <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">ADMINISTRATION PANEL</h1>
            </div>
            <ActuAdmin />            
        </div>
    );
};

export default AdminActuPage;