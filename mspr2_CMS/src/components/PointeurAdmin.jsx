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

        async function handleDelete(values) {
            await new Promise((r) => setTimeout(r, 500));
            const dataString = JSON.stringify(values, null, '  ');
            if (window.confirm('Confirmez vous vouloir effacer?')) {
                deleteItem(dataString)
            }
        }

        async function deleteItem(id) {
            const url = 'http://localhost:8080/api/pointeurs\/' + id
            try {
                const response = await fetch(url, {
                    method: 'DELETE'
                })
            }

            catch (error) {
                alert("Une erreur c\'est produite");
            }
            finally {
                window.location.reload();
            }
        }

        if (datas) {
            return (
                <>

                    <Row className={"m-3 sticky50"}>

                        {datas.map((item) => (
                            <Col key={item.id} className={"p-1 mx-3 border col-12 overflow-auto"} >
                                <div> {"id:" + item.id + " | lon: " + item.lon + " | lat: " + item.lat}  </div>
                                <div> {"nom: " + item.nom + " | type: " + item.type}  </div>
                                <div> {"description: " + item.description}  </div>
                                <div> {"lien: " + item.lien}  </div>
                                <Button className='btn-danger border ' onClick={() => handleDelete(item.id)} >Effacer</Button>
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

        async function handleAdd(values) {
            await new Promise((r) => setTimeout(r, 500));
            const dataString = JSON.stringify(values, null, '  ');
            if (window.confirm('Confirmez vous la nouvelle entrée?')) {
                createItem(dataString)
            }
        }

        async function handleUpdate(values) {
            await new Promise((r) => setTimeout(r, 500));
            const dataString = JSON.stringify(values, null, '  ');
            if (window.confirm('Confirmez vous la mise à jour?')) {
                updateItem(dataString, values.id)
            }
        }


        async function createItem(dataString) {
            const url = 'http://localhost:8080/api/pointeurs'
            try {
                const newProduct = dataString
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: newProduct,
                })
            }
            catch (error) {
                //console.log(error);
            }
            finally {
                window.location.reload();
            }
        }

        async function updateItem(dataString, id) {
            const url = 'http://localhost:8080/api/pointeurs/update/' + id
            try {
                const newProduct = dataString
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: newProduct,
                })
                //console.log('status:', response.status)
            }
            catch (error) {
                //console.log(error);
            }
            finally {
                window.location.reload();
            }
        }

        return (
            <div className={"p-3 border rounded bg-light shadow sticky50"}>
                <section >
                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Ajouter/modifier un pointeur</h2>
                    </div>
                    <Formik
                        initialValues={{
                            id: "",
                            lon: 2.4433,
                            lat: 48.8383,
                            nom: '',
                            type: 'scene',
                            description: '',
                            lien: ''
                        }}
                    >
                        {props => (
                            <Form>
                                <div className="d-flex flex-column">
                                    <div className="d-flex">
                                        <div className="d-flex flex-column">
                                            <label htmlFor="id">Id (MAJ)</label>
                                            <Field type="number" id="id" name="id" placeholder="id du pointeur" />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <label htmlFor="lat">latitude</label>
                                            <Field type="number" step="0.0001" id="lat" name="lat" placeholder="latitude" />
                                        </div>

                                    </div>
                                    <div className="d-flex">
                                        <div className="d-flex flex-column">
                                            <label htmlFor="lon">longitude</label>
                                            <Field type="number" step="0.0001" id="lon" name="lon" placeholder="longitude" />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <label>Type</label>
                                            <Field name="type" as="select" className="type">

                                                <option value="scene">scene</option>

                                                <option value="alimentation">alimentation</option>

                                                <option value="informations">informations</option>

                                                <option value="toilettes">toilettes</option>
                                            </Field>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label htmlFor="description">description du pointeur</label>
                                        <Field id="description" name="description" placeholder="description" className="my-3" />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label htmlFor="lien">lien externe</label>
                                        <Field id="lien" name="lien" placeholder="lien" className="my-3" />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label htmlFor="nom">nom du pointeur</label>
                                        <Field id="nom" name="nom" placeholder="nom du pointeur" className="my-2" />
                                    </div>

                                </div>
                                <div className=' d-flex justify-content-end'>
                                    {props.values.id == "" &&
                                        <Button className='btn-warning border ' onClick={() => handleAdd(props.values)}>Nouvelle entree</Button>
                                    }
                                    {props.values.id != "" &&
                                        <Button className='btn-warning border ' onClick={() => handleUpdate(props.values)}>Mise a jour</Button>
                                    }
                                </div>
                            </Form>
                        )}
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