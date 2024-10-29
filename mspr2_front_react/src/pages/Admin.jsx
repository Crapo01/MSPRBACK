import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import useLocalStorage from "../hooks/useLocalStorage";
import { Field, Form, Formik } from "formik";
import ActuAdmin from "../components/ActuAdmin";
import PointeurAdmin from "../components/PointeurAdmin";
import ConcertAdmin from "../components/ConcertAdmin";

function Admin() {

    function Forms() {
        return (
            <div className={"p-3 border rounded bg-light shadow h-100 "}>
                <section >
                    <h1 className="lightningBg border rounded text-light text-center sticky">INFORMATIONS</h1>

                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Ajouter un message</h2>
                    </div>
                    <Formik
                        initialValues={{
                            message: '',
                            important: false,
                        }}
                        onSubmit={
                            async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                const dataString = JSON.stringify(values, null, '  ');
                                console.log(dataString);
                                if (window.confirm('Confirmez vous la nouvelle entrée?')) {
                                    createAccount(dataString)
                                }

                                async function createAccount(dataString) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/informations'
                                    try {
                                        const newProduct = dataString
                                        console.log('String sent thru post: ' + newProduct)
                                        const response = await fetch(url, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json; charset=utf-8'
                                            },
                                            body: newProduct,
                                        })
                                        console.log(response)
                                        console.log('status:', response.status)
                                    }

                                    catch (error) {
                                        console.log(error);
                                    }
                                    finally {
                                        console.log(`Promise for fetch ${url} is resolved`);
                                    }
                                }
                            }

                        }
                    >
                        <Form className="lobsterFont">

                            <div className="d-flex flex-column mx-5">
                                <div className="d-flex flex-column">
                                    <label htmlFor=" message">Message d'information</label>
                                    <Field id="message" name="message" placeholder="Message d'information ici..." className="my-3" />
                                </div>
                                <div>
                                    <label>Important</label>
                                    <Field type="checkbox" name="important" className="m-3" />
                                </div>
                            </div>
                            <div className=' d-flex justify-content-end'>
                                <Button className='btn-warning border ' type="submit">Soumettre</Button>
                            </div>

                        </Form>
                    </Formik>
                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Ajouter un message</h2>
                    </div>
                    <Formik
                        initialValues={{
                            id: ''
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        <Form className="lobsterFont">

                            <div className="d-flex flex-column mx-5">
                                <div className="d-flex flex-column">
                                    <label htmlFor="id">Message d'information</label>
                                    <Field id="id" name="id" placeholder="ID du message à effacer" className="my-3" />
                                </div>
                                <div>
                                    <label>Important</label>
                                    <Field type="checkbox" name="important" className="m-3" />
                                </div>
                            </div>
                            <div className=' d-flex justify-content-end'>
                                <Button className='btn-warning border ' type="submit">Soumettre</Button>
                            </div>

                        </Form>
                    </Formik>
                </section>
                {/* <div>
                    <h1>Sign Up</h1>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            number:0,
                            toggle: false,
                            colors:'red'
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            alert(JSON.stringify(values, null, 2));
                        }}
                    >
                        <Form>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <Field id="firstName" name="firstName" placeholder="Jane" />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <Field id="lastName" name="lastName" placeholder="Doe" />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <Field
                                    id="email"
                                    name="email"
                                    placeholder="jane@acme.com"
                                    type="email"
                                />
                            </div>
                            <div>
                                <label htmlFor="number">number</label>
                                <Field
                                    id="number"
                                    name="number"
                                    placeholder="0"
                                    type="number"
                                />
                            </div>
                            <div>
                                <label>Important</label>
                                <Field type="checkbox" name="toggle" />
                            </div>
                            <div>
                                <label>Colors</label>
                                <Field name="colors" as="select" className="my-select">

                                    <option value="red">Red</option>

                                    <option value="green">Green</option>

                                    <option value="blue">Blue</option>
                                </Field>
                            </div>


                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div> */}


                {/* <section>
                    
                       

                    

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
                </section> */}


            </div>
        )

    }





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