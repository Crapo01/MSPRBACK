import Actu from "../components/Actu";
import Concerts from "../components/Concerts";
import Shop from "../components/Shop";
import CarteMini from "../components/CarteMini";
import Login from "../components/Login";


function Home() {
    return (
        <>                    
            <Actu />            
            <Concerts />
            <Shop/>            
            <CarteMini/>            
        </>  
    );
};

export default Home;