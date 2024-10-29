import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
import useLocalStorage from "../hooks/useLocalStorage";
import { Field, Form, Formik } from "formik";

function ActuAdmin() {

    const [datas, setDatas] = useState(false);

    async function fetchData() {
        try {

            const response = await fetch("http://localhost:8080/api/informations/all");
            const data = await response.json();
            if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };

        } catch (error) {
            throw ("Une erreur est survenue dans l'appel API actu: ")
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    function Event() {
        if (datas) {
            return (
                <>

                    <Row className={"m-3 sticky50"}>

                        {datas.map((item) => (
                            <Col key={item.id} className={"p-1 mx-3 border col-12"} >
                                <div> {"id:" + item.id+" |        important: " + item.important}  </div>
                                <div> {"message: " + item.message}  </div>                                
                            </Col>
                        ))}
                    </Row>
                </>
            )
        } else {
            return <h3>Pas d'infos pour le moment</h3>
        }
    }

    function Forms() {
        return (
            <div className={"p-3 border rounded bg-light shadow sticky50"}>                   
                <section >

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
                                        window.location.reload();
                                    }
                                }
                            }
                        }
                    >
                        <Form>
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
                        <h2>Effacer un message</h2>
                    </div>
                    <Formik
                        initialValues={{
                            id: ''
                        }}
                        onSubmit={
                            async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                const dataString = JSON.stringify(values, null, '  ');
                                console.log(dataString);
                                if (window.confirm('Confirmez vous vouloir effacer'+values.id+'?')) {
                                    deleteInfo(values.id)
                                }

                                async function deleteInfo(id) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/informations\/'+id
                                    try { 
                                        const response = await fetch(url, {
                                            method: 'DELETE'
                                        })
                                        if (response.status==200) {alert(id+" a été éffacée")}
                                    }

                                    catch (error) {
                                        alert("Une erreur c\'est produite");
                                    }
                                    finally {
                                        window.location.reload();
                                    }
                                }
                            }
                        }
                    >
                        <Form>
                            <div className="d-flex flex-column mx-5">
                                <div className="d-flex flex-column">
                                    <label htmlFor="id">Message d'information</label>
                                    <Field type="number" id="id" name="id" placeholder="ID du message à effacer" className="my-3" />
                                </div>
                            </div>
                            <div className=' d-flex justify-content-end'>
                                <Button className='btn-warning border ' type="submit">Soumettre</Button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Mettre à jour un message</h2>
                    </div>
                    <Formik
                        initialValues={{
                            id:'',
                            message: '',
                            important: false,
                        }}
                        onSubmit={
                            async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                const dataString = JSON.stringify(values, null, '  ');
                                console.log(dataString);
                                if (window.confirm('Confirmez vous la nouvelle entrée?')) {
                                    updateInfo(dataString)
                                }

                                async function updateInfo(dataString) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/informations/update/'+values.id
                                    console.log(url)
                                    try {
                                        const newProduct = dataString
                                        console.log('String sent thru post: ' + newProduct)
                                        const response = await fetch(url, {
                                            method: 'PUT',
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
                                        window.location.reload();
                                    }
                                }
                            }
                        }
                    >
                        <Form>
                            <div className="d-flex flex-column mx-5">
                            <div className="d-flex flex-column">
                                    <label htmlFor="id">Id du message</label>
                                    <Field type="number" id="id" name="id" placeholder="ID du message à effacer" className="my-3" />
                                </div>
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
                </section>
            </div>
        )

    }



    return (
        <>
         <h1 className="lightningBg border rounded text-light text-center sticky z-1">INFORMATIONS</h1>
            <div className="d-flex">
                <div className="w-50">
                    <Forms />
                </div>
                <div className="w-50">
                    <Event />
                </div>

            </div>
        </>
    );
};

export default ActuAdmin;