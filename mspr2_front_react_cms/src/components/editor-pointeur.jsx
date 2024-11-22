import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import userService from "../services/user.service";
import eventBus from "../common/EventBus";
import authService from "../services/auth.service";
import CarteMini from "./cartemini";

function PointeurAdmin() {

    const [datas, setDatas] = useState(false);
    const [showPanel, setShowPanel] = useState(false);
    const [dataFromChild, setDataFromChild] = useState({lat: 0 ,lon: 0 });

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

    async function fetchData() {
        userService.getPointeur().then(
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
            userService.deletePointeur(id).then(
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
                                <Button className='btn-danger border btn-sm' onClick={() => handleDelete(item.id)} >Effacer</Button>
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
                console.log(dataString)
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
            userService.createPointeur(dataString).then(
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
        }

        async function updateItem(dataString, id) {
            userService.updatePointeur(dataString, id).then(
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
                            lon: dataFromChild.lon,
                            lat: dataFromChild.lat,
                            nom: '',
                            type: 'scene',
                            description: '',
                            lien: ''
                        }}
                    >
                        {props => (
                            <Form>
                                <div className="d-flex flex-column">
                                    <div className="d-flex flex-column flex-md-row">
                                        <div className="d-flex flex-column mx-1">
                                            <label htmlFor="id">Id (MAJ)</label>
                                            <Field type="number" id="id" name="id" placeholder="id du pointeur" />
                                        </div>
                                        <div className="d-flex flex-column mx-1">
                                            <label>Type</label>
                                            <Field name="type" as="select" className="type">

                                                <option value="scene">scene</option>

                                                <option value="alimentation">alimentation</option>

                                                <option value="informations">informations</option>

                                                <option value="toilettes">toilettes</option>
                                            </Field>

                                    </div>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row">
                                        <div className="d-flex flex-column mx-1">
                                            <label htmlFor="lon">longitude</label>
                                            <Field type="number" step="0.0001" id="lon" name="lon" placeholder="longitude" value={dataFromChild.lon} />
                                        </div>
                                        <div className="d-flex flex-column mx-1">
                                            <label htmlFor="lat">latitude</label>
                                            <Field type="number" step="0.0001" id="lat" name="lat" placeholder="latitude" value={dataFromChild.lat} />
                                        </div>
                                        </div>
                                    <p>Cliquer sur la carte pour recuperer les coordonnées</p>
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
                                        <Button className='btn-warning border btn-sm' onClick={() => handleAdd(props.values)}>Nouvelle entree</Button>
                                    }
                                    {props.values.id != "" &&
                                        <Button className='btn-warning border btn-sm' onClick={() => handleUpdate(props.values)}>Mise a jour</Button>
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
            <div className="d-lg-flex">
                {console.log("showPanel" + showPanel)}
                {showPanel &&
                    <>
                        <div >
                            <Forms />
                        </div>

                        <div >
                            <CarteMini sendDataToParent={handleDataFromChild}/>
                            <Event />
                        </div>
                    </>
                }

            </div>
        </>
    );
};

export default PointeurAdmin;