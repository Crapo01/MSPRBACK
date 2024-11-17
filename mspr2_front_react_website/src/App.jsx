import { Routes, Route, Link } from "react-router-dom"
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


import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Login from "./components/login.component"
import { StompSessionProvider, useStompClient, useSubscription } from "react-stomp-hooks"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [groupe, setGroupe] = useState();



  const PushNotification = () => {
    const [message, setMessage] = useState("");

    const CustomToastWithLink = () => (
      <div>
        <p>{message.msg}</p>
        {/* <Link to="/Concert">+ D'infos ici</Link> */}
        {message.lnk&&<a href={message.lnk}>+ D'infos ici</a>}
      </div>
    );

    // Subscribe to the topic that we have opened in our spring boot app
    useSubscription('/topic/reply', (notif) => { setMessage(JSON.parse(notif.body)) });
    if (message){
      console.log(message)
    
    }
    
    message ? toast.error
      (CustomToastWithLink, {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: 0,
        theme: "colored",
      }) : null;
  }







  return (
    <ConcertContext.Provider value={{
      updateGroupe: (newGroupe) => setGroupe(newGroupe),
      groupe: groupe
    }}>

      <Container >
        <ToastContainer
          position="bottom-right"
          autoClose={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          theme="colored"
        />
        <Header></Header>
        <StompSessionProvider
          url={'http://localhost:8080/ws-endpoint'}>
          <PushNotification />
        </StompSessionProvider>
        <div className="maxheight">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Map" element={<Map />} />
            <Route path="/Concert" element={<Concert />} />
            <Route path="/Programme" element={<Programme />} />
            <Route path="/Details" element={<Details />} />
            <Route path="/Mentions" element={<Mentions />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer></Footer>
      </Container>

    </ConcertContext.Provider>
  )
}

export default App
