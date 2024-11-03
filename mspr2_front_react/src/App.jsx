import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Map from "./pages/Map"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Programme from "./pages/Programme"
import Details from "./pages/Details"
import { Container } from "react-bootstrap"
import './App.css'
import { ConcertContext } from "./components/context"
import { useState } from "react"
import Mentions from "./pages/Mentions"
import Concert from "./pages/Concert"
import Admin from "./pages/Admin"
import AuthProvider from "./components/AuthProvider";
import PrivateRoute from "./components/PrivateRoute"
import Login from "./components/Login"


function App() {
  const [groupe,setGroupe]= useState();
  
  return (    
    <ConcertContext.Provider value={{
      updateGroupe: (newGroupe)=>setGroupe(newGroupe),
      groupe: groupe
      }}>
        <AuthProvider>
       <Container >
      <Header></Header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        {/* <Route element={<PrivateRoute />}> */}
          <Route path="/Admin" element={<Admin/>} />
        {/* </Route> */}
        <Route path="/Map" element={<Map />} />        
        <Route path="/Concert" element={<Concert />} />
        <Route path="/Programme" element={<Programme />} />
        <Route path="/Details" element={<Details />} />        
        <Route path="/Mentions" element={<Mentions />} />
        
              
      </Routes>
      <Footer></Footer>
      </Container> 
      </AuthProvider>
    </ConcertContext.Provider>
  )
}

export default App
