import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import userService from "../services/user.service";
import eventBus from "../common/EventBus";
import authService from "../services/auth.service";


function ActuAdmin() {

    const [datas, setDatas] = useState(false);
    const [showPanel, setShowPanel] = useState(false);


    async function fetchData() {
        userService.getInfo().then(
            response => {
                console.log(response)
                const data = response.data;
                if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
            },
            error => {
                console.log(error.message);

                if (error.response && error.response.status === 401) {
                    eventBus.dispatch("logout");
                }
            }
        );
    }

    useEffect(() => {       
        const user = authService.getCurrentUser();
        if (user) {
            if (user.roles.includes("ROLE_EDITOR")){
                setShowPanel(true);
                 fetchData(); 
             } 
        }
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
            userService.deleteInfo(id).then(
                response => {
                    console.log(response)
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
                    window.location.reload()
                },
                error => {
                    console.log(error.message);

                    if (error.response && error.response.status === 401) {
                        eventBus.dispatch("logout");
                    }
                }
            );
            // const url = 'http://localhost:8080/api/informations\/' + id
            // try {
            //     const response = await fetch(url, {
            //         method: 'DELETE'
            //     })
            // }

            // catch (error) {
            //     alert("Une erreur c\'est produite");
            // }
            // finally {
            //     window.location.reload();
            // }
        }

        if (datas) {
            return (
                <>

                    <Row className={"m-3 sticky50"}>

                        {datas.map((item) => (
                            <Col key={item.id} className={"p-1 mx-3 border col-12 overflow-auto"} >
                                <div> {"id:" + item.id + " |        important: " + item.important}  </div>
                                <div> {"message: " + item.message}  </div>

                                <Button className='btn-danger border btn-sm' onClick={() => handleDelete(item.id)} >Effacer</Button>
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

            userService.createInfo(dataString).then(
                response => {
                    console.log(response)
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
                    window.location.reload()
                },
                error => {
                    console.log(error.message);

                    if (error.response && error.response.status === 401) {
                        eventBus.dispatch("logout");
                    }
                }
            );

            // const URL = 'http://localhost:8080/api/informations'
            // const HEADER = authHeader();
            // console.log(HEADER)
            // try {
            //     const newProduct = dataString
            //     //console.log('String sent thru post: ' + newProduct)
            //     const response = await fetch(URL, {
            //         method: 'POST',
            //         headers:HEADER,
            //         body: newProduct,
            //     })
            //     //console.log(response)
            //     //console.log('status:', response.status)
            // }
            // catch (error) {
            //     //console.log(error);
            // }
            // finally {
            //     alert("done")
            //     window.location.reload();
            // }
        }

        async function updateItem(dataString, id) {

            userService.updateInfo(dataString, id).then(
                response => {
                    console.log(response)
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
                    window.location.reload()
                },
                error => {
                    console.log(error.message);

                    if (error.response && error.response.status === 401) {
                        eventBus.dispatch("logout");
                    }
                }
            );

            // const url = 'http://localhost:8080/api/informations/update/' + id

            // try {
            //     const newProduct = dataString
            //     //console.log('String sent thru post: ' + newProduct)
            //     const response = await fetch(url, {
            //         method: 'PUT',
            //         headers: {
            //             'Content-Type': 'application/json; charset=utf-8'
            //         },
            //         body: newProduct,
            //     })
            //     //console.log(response)
            //     //console.log('status:', response.status)
            // }
            // catch (error) {
            //     //console.log(error);
            // }
            // finally {
            //     window.location.reload();
            // }
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
                                            <Button className='btn-warning border btn-sm' onClick={() => handleAdd(props.values)}>Nouvelle entree</Button>
                                        }
                                        {props.values.id != "" &&
                                            <Button className='btn-warning border btn-sm' onClick={() => handleUpdate(props.values)}>Mise a jour</Button>
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
                {console.log("showPanel" + showPanel)}
                {showPanel &&
                    <>
                        <div className="w-50">
                            <Forms />
                        </div>

                        <div className="w-50">
                            <Event />
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default ActuAdmin;