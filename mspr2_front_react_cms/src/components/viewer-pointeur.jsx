import { useEffect, useState } from "react";
import CarteMini from "./cartemini";
import authService from "../services/auth.service";

function PointeurViewer() {

   
 const [showPanel, setShowPanel] = useState(false);
    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            setShowPanel(user.roles.includes("ROLE_VIEWER"));            
        }  
    }, []);


    

    



    return (
        <>
            <h1 className="lightningBg border rounded text-light text-center sticky z-1">POINTEURS</h1>
            {showPanel && <CarteMini/>}            
        </>
    );
};

export default PointeurViewer;