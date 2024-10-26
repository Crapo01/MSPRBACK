import { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";

function Admin() {

    function Forms() {
        return (
            <div className={"p-3 border rounded bg-light shadow h-100"}>
                

                <section>
                    <h1 className="lightningBg border rounded text-light sticky">INFORMATIONS</h1>

                    <div className="m-3 p-3 border rounded bg-secondary">
                        <h2>ADD ITEM</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formTextInfo">
                                <Form.Label>Texte</Form.Label>
                                <Form.Control type="text" placeholder="Entrer le texte ici" />
                            </Form.Group>

                            <Form.Check className="mb-3"
                                type="switch"
                                id="formUrgentInfo"
                                label="Important"
                            />
                            <Button variant="danger" type="submit">
                                Add item to database
                            </Button>
                        </Form>
                    </div>


                    <div className="m-3 p-3 border rounded bg-secondary">
                        <h2>DELETE ITEM</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formDeleteInfo">
                                <Form.Label>Info item ID</Form.Label>
                                <Form.Control type="number" placeholder="Enter ID here" />
                            </Form.Group>

                            <Button variant="danger" type="submit">
                                Delete item from database
                            </Button>
                        </Form>
                    </div>
                </section>

                <section>
                    <h1 className="lightningBg border rounded text-light sticky">CONCERTS</h1>

                    <div className="m-3 p-3 border rounded bg-secondary">
                        <h2>ADD ITEM</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formTextConcertName">
                                <Form.Label>Nom du groupe</Form.Label>
                                <Form.Control type="text" placeholder="Entrer le texte ici" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTextConcertImage">
                                <Form.Label>Photo du groupe</Form.Label>
                                <Form.Control type="text" placeholder="Entrer l'url ici" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formTextConcertDescription">
                                <Form.Label>Description du groupe</Form.Label>
                                <Form.Control type="text" placeholder="Entrer le texte ici" />
                            </Form.Group>                            
                            <Form.Select aria-label="Default select example" id="formTextConcertOrigine">
                                <option>Origine du groupe</option>
                                <option value="Europe">Europe</option>
                                <option value="Asie">Asie</option>
                                <option value="Australie">Australie</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" id="formTextConcertDate">
                                <option>Date du concert</option>
                                <option value="14 Juin">14 Juin</option>
                                <option value="15 Juin">15 Juin</option>
                                <option value="16 Juin">16 Juin</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" id="formTextConcertHeure">
                                <option>Heure du concert</option>
                                <option value="18:00">18:00</option>
                                <option value="19:00">19:00</option>
                                <option value="20:00">20:00</option>
                                <option value="21:00">21:00</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" id="formTextConcertScene">
                                <option>Scene du concert</option>
                                <option value="principale">principale</option>
                                <option value="nord">nord</option>
                                <option value="est">est</option>
                                <option value="sud">sud</option>
                                <option value="ouest">ouest</option>
                            </Form.Select>
                            

                            <Button variant="danger" type="submit">
                                Add item to database
                            </Button>
                        </Form>
                    </div>


                    <div className="m-3 p-3 border rounded bg-secondary">
                        <h2>DELETE ITEM</h2>
                        <Form>
                            <Form.Group className="mb-3" controlId="formDeleteInfo">
                                <Form.Label>Info item ID</Form.Label>
                                <Form.Control type="number" placeholder="Enter ID here" />
                            </Form.Group>

                            <Button variant="danger" type="submit">
                                Delete item from database
                            </Button>
                        </Form>
                    </div>
                </section>


            </div>
        )

    }





    return (
        <div className={"p-3 m-md-5 border rounded bg-secondary"}>
            <div className="lightningBg border rounded">
                <h1 className="sectionTitle text-center text-light p-3 fs-1 fw-bold">ADMINISTRATION PANEL</h1>
            </div>

            <Forms />
        </div>
    );
};

export default Admin;