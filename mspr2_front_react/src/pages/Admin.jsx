import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import { Field, Form, Formik } from "formik";
import ActuAdmin from "../components/ActuAdmin";
import PointeurAdmin from "../components/PointeurAdmin";
import ConcertAdmin from "../components/ConcertAdmin";

function Admin() {

    
   
    return (
        <div className={"p-3 m-md-5 border rounded bg-secondary"}>
            <div className="lightningBg border rounded">
                <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">ADMINISTRATION PANEL</h1>
            </div>
            <ActuAdmin />
            <ConcertAdmin/>
            <PointeurAdmin/>
        </div>
    );
};

export default Admin;