import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import { Container } from "react-bootstrap"
import './App.css'
import Mentions from "./pages/Mentions"
import AdminActuPage from "./pages/AdminActuPage"
import Login from "./components/Login"


function App() {
  
  
  return (    
    
        
       <Container >
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login_page" element={<Login />} />
       
          <Route path="/AdminActuPage" element={<AdminActuPage/>} />
                       
        <Route path="/Mentions" element={<Mentions />} />
        
              
      </Routes>
      <Footer></Footer>
      </Container> 
      
    
  )
}

export default App
