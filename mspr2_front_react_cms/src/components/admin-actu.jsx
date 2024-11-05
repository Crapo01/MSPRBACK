import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import AuthService from "../services/auth.service";

function ActuAdmin() {

    const [datas, setDatas] = useState(false);
    // const [showAdmin, setShowAdmin] = useState(false);
    // const [showEditor, setShowEditor] = useState(false);

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
        // setShowAdmin(AuthService.getCurrentUser().roles.includes("ROLE_ADMIN"));
        // setShowEditor(AuthService.getCurrentUser().roles.includes("ROLE_EDITOR"));
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
            const url = 'http://localhost:8080/api/informations\/' + id
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
                                <div> {"id:" + item.id + " |        important: " + item.important}  </div>
                                <div> {"message: " + item.message}  </div>

                                <Button className='btn-danger border ' onClick={() => handleDelete(item.id)} >Effacer</Button>
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
            //console.log('start')
            const url = 'http://localhost:8080/api/informations'
            try {
                const newProduct = dataString
                //console.log('String sent thru post: ' + newProduct)
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: newProduct,
                })
                //console.log(response)
                //console.log('status:', response.status)
            }
            catch (error) {
                //console.log(error);
            }
            finally {
                window.location.reload();
            }
        }

        async function updateItem(dataString, id) {
            //console.log('start')
            const url = 'http://localhost:8080/api/informations/update/' + id
            //console.log(url)
            try {
                const newProduct = dataString
                //console.log('String sent thru post: ' + newProduct)
                const response = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'
                    },
                    body: newProduct,
                })
                //console.log(response)
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
            <>

                <div className={"p-3 border rounded bg-light shadow sticky50"}>
                    <section >

                        <div className="m-3 p-1 border rounded bg-secondary ">
                            <h2>Ajouter Modifier un message</h2>
                        </div>
                        <Formik
                            initialValues={{
                                id: '',
                                message: '',
                                important: false,
                            }}
                        >
                            {props => (
                                <Form>
                                    <div className="d-flex flex-column mx-5">
                                        <div className="d-flex flex-column">
                                            <label htmlFor="id">Id du message (uniquement pour les mises a jour)</label>
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
                                        {props.values.id == "" &&
                                            <Button className='btn-warning border ' onClick={() => handleAdd(props.values)}>Nouvelle entree</Button>
                                        }
                                        {props.values.id != "" &&
                                            <Button className='btn-warning border ' onClick={() => handleUpdate(props.values)}>Mise a jour</Button>
                                        }
                                    </div>
                                </Form>
                            )
                            }
                        </Formik>
                    </section>
                </div>

            </>
        )

    }

    return (
        <>
            <h1 className="lightningBg border rounded text-light text-center sticky z-1">INFORMATIONS</h1>
            <div className="d-flex">
                {/* {console.log("showEditor" + showEditor)}
                {showEditor && */}
                    <div className="w-50">
                        <Forms />
                    </div>
                {/* } */}
                <div className="w-50">
                    <Event />
                </div>

            </div>
        </>
    );
};

export default ActuAdmin;