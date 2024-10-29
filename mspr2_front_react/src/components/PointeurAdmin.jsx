import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import ReactHtmlParser from 'react-html-parser';
import useLocalStorage from "../hooks/useLocalStorage";
import { Field, Form, Formik } from "formik";

function PointeurAdmin() {

    const [datas, setDatas] = useState(false);

    async function fetchData() {
        try {

            const response = await fetch("http://localhost:8080/api/pointeurs/all");
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
                                <div> {"id:" + item.id+" | lon: "+ item.lon+" | lat: " +item.lat}  </div> 
                                <div> {"nom: " + item.nom+" | type: " + item.type }  </div>
                                <div> {"description: " + item.description}  </div>
                                <div> {"lien: " + item.lien}  </div>
                            </Col>
                        ))}
                    </Row>
                </>
            )
        } else {
            return <h3>Pas de pointeur pour le moment</h3>
        }
    }

    function Forms() {
        return (
            <div className={"p-3 border rounded bg-light shadow sticky50"}>                   
                <section >

                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Ajouter un pointeur</h2>
                    </div>
                    <Formik
                        initialValues={{
                            lon: 2.4433,
                            lat: 48.8383,
                            nom: '',
                            type: 'scene',
                            description: '',
                            lien:''
                        }}
                        onSubmit={
                            async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                const dataString = JSON.stringify(values, null, '  ');
                                console.log(dataString);
                                if (window.confirm(dataString+'Confirmez vous la nouvelle entrée?')) {
                                    createPointeur(dataString)
                                }

                                async function createPointeur(dataString) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/pointeurs'
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
                                    <label htmlFor=" lat">latitude du pointeur</label>
                                    <Field type="number" step="0.0001" id="lat" name="lat" placeholder="latitude" className="my-3" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label htmlFor=" lat">longitude du pointeur</label>
                                    <Field type="number" step="0.0001" id="lon" name="lon" placeholder="longitude" className="my-3" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label htmlFor="nom">nom du pointeur</label>
                                    <Field id="nom" name="nom" placeholder="nom du pointeur" className="my-3" />
                                </div>
                                <div>
                                <label>Type</label>
                                <Field name="type" as="select" className="type">

                                    <option value="scene">scene</option>

                                    <option value="alimentation">alimentation</option>

                                    <option value="informations">informations</option>

                                    <option value="toilettes">toilettes</option>
                                </Field>
                                <div className="d-flex flex-column">
                                    <label htmlFor="description">description du pointeur</label>
                                    <Field id="description" name="description" placeholder="description" className="my-3" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label htmlFor="lien">lien externe</label>
                                    <Field id="lien" name="lien" placeholder="lien" className="my-3" />
                                </div>
                            </div>
                            </div>
                            <div className=' d-flex justify-content-end'>
                                <Button className='btn-warning border ' type="submit">Soumettre</Button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Effacer un pointeur</h2>
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
                                    const url = 'http://localhost:8080/api/pointeurs\/'+id
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
                                    <label htmlFor="id">Id du pointeur à effacer</label>
                                    <Field type="number" id="id" name="id" placeholder="ID du message à effacer" className="my-3" />
                                </div>
                            </div>
                            <div className=' d-flex justify-content-end'>
                                <Button className='btn-warning border ' type="submit">Soumettre</Button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Mettre à jour un pointeur</h2>
                    </div>
                    <Formik
                        initialValues={{
                            lon: 2.4433,
                            lat: 48.8383,
                            nom: '',
                            type: 'scene',
                            description: '',
                            lien:''
                        }}
                        onSubmit={
                            async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                const dataString = JSON.stringify(values, null, '  ');
                                console.log(dataString);
                                if (window.confirm('Confirmez vous la nouvelle entrée?')) {
                                    updatePointeur(dataString)
                                }

                                async function updatePointeur(dataString) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/pointeurs/update/'+values.id
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
                                    <label htmlFor="id">Id du pointeur à mettre à jour</label>
                                    <Field type="number" id="id" name="id" placeholder="id du pointeur a modifier" className="my-3" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label htmlFor=" lat">latitude du pointeur</label>
                                    <Field type="number" step="0.0001" id="lat" name="lat" placeholder="latitude" className="my-3" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label htmlFor=" lat">longitude du pointeur</label>
                                    <Field type="number" step="0.0001" id="lon" name="lon" placeholder="longitude" className="my-3" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label htmlFor="nom">nom du pointeur</label>
                                    <Field id="nom" name="nom" placeholder="nom du pointeur" className="my-3" />
                                </div>
                                <div>
                                <label>Type</label>
                                <Field name="type" as="select" className="type">

                                    <option value="scene">scene</option>

                                    <option value="alimentation">alimentation</option>

                                    <option value="informations">informations</option>

                                    <option value="toilettes">toilettes</option>
                                </Field>
                                <div className="d-flex flex-column">
                                    <label htmlFor="description">description du pointeur</label>
                                    <Field id="description" name="description" placeholder="description" className="my-3" />
                                </div>
                                <div className="d-flex flex-column">
                                    <label htmlFor="lien">lien externe</label>
                                    <Field id="lien" name="lien" placeholder="lien" className="my-3" />
                                </div>
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
         <h1 className="lightningBg border rounded text-light text-center sticky z-1">POINTEURS</h1>
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

export default PointeurAdmin;