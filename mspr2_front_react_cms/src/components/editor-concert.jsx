import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import authService from "../services/auth.service";
import userService from "../services/user.service";


function ConcertAdmin() {

    const [datas, setDatas] = useState([]);
    const [showPanel, setShowPanel] = useState(false);

    async function fetchData() {
        userService.getConcert().then(
            response => {
                // console.log(response)
                const data = response.data;
                if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
            },
            error => {
                console.log(error.message);
            }
        );
    }

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
            if (user.roles.includes("ROLE_EDITOR")) {
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
            userService.deleteConcert(id).then(
                response => {
                    // console.log(response)
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
                    window.location.reload()
                },
                error => {                    
                    if (error.response) {
                        alert(error.message + "\n" + error.response.data.message);
                    } else {
                        alert(error.message)
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
                                <div> {"id: " + item.id + " | nom: " + item.nom + " | origine: " + item.origine}  </div>
                                <div>{"image link: " + item.image}</div>
                                <div> {"date: " + item.date + " | heure: " + item.heure + " | scene: " + item.scene}  </div>
                                <div> {"description: " + item.description}  </div>
                                <div> {"lien: " + item.lien}  </div>
                                <Button className='btn-danger border btn-sm' onClick={() => handleDelete(item.id)} >Effacer</Button>
                            </Col>
                        ))}
                    </Row>
                </>
            )
        } else {
            return <h3>Pas de concert pour le moment</h3>
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
            userService.createConcert(dataString).then(
                response => {
                    // console.log(response)
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
                    window.location.reload()
                },
                error => {
                    console.log(error.message);
                }
            );
        }

        async function updateItem(dataString, id) {
            userService.updateConcert(dataString, id).then(
                response => {
                    // console.log(response)
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
                    window.location.reload()
                },
                error => {                    
                    if (error.response) {
                        alert(error.message + "\n" + error.response.data.message);
                    } else {
                        alert(error.message)
                    }
                }
            );
        }

        return (
            <div className={"p-3 border rounded bg-light shadow sticky50"}>
                <section >
                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Mettre à jour un groupe</h2>
                    </div>
                    <Formik
                        initialValues={{
                            id: "",
                            scene: "principale",
                            date: "14 juin",
                            heure: "18:00",
                            origine: "Europe",
                            image: "https://i.ebayimg.com/images/g/iF0AAOSw6x9i5MMT/s-l1200.png"
                        }}
                    >
                        {props => (
                            <Form>
                                <div className="d-flex flex-column">
                                    <label htmlFor="id">Id du groupe à mettre à jour</label>
                                    <Field type="number" id="id" name="id" placeholder="ID du groupe" className="my-3" />
                                </div>
                                <div className="d-flex flex-column mx-5">
                                    <div className="d-flex flex-column">
                                        <label htmlFor=" lat">nom du groupe</label>
                                        <Field id="nom" name="nom" placeholder="nom" className="my-3" />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label htmlFor=" lat">lien de l'image</label>
                                        <Field id="image" name="image" placeholder="https:...." className="my-3" />
                                    </div>
                                    <div className="d-flex flex-column">
                                        <label htmlFor="nom">description</label>
                                        <Field id="description" name="description" placeholder="Entrez une description" className="my-3" />
                                    </div>
                                    <div>
                                        <label className="my-3">origine</label>
                                        <Field name="origine" as="select" >
                                            <option></option>
                                            <option value="Europe">Europe</option>
                                            <option value="Amerique">Amerique</option>
                                            <option value="Afrique">Afrique</option>
                                            <option value="Asie">Asie</option>
                                            <option value="Australie">Australie</option>
                                        </Field>
                                        <label className="my-3">date</label>
                                        <Field name="date" as="select" >
                                            <option value="14 juin">14 Juin</option>
                                            <option value="15 juin">15 Juin</option>
                                            <option value="16 juin">16 Juin</option>
                                        </Field>

                                        <label className="my-3">heure</label>
                                        <Field name="heure" as="select" >
                                            <option value="18:00">18:00</option>
                                            <option value="19:00">19:00</option>
                                            <option value="20:00">20:00</option>
                                            <option value="21:00">21:00</option>
                                        </Field>

                                        <label className="my-3">scene</label>
                                        <Field name="scene" as="select" >
                                            <option value="principale">principale</option>
                                            <option value="nord">nord</option>
                                            <option value="est">est</option>
                                            <option value="sud">sud</option>
                                            <option value="ouest">ouest</option>
                                        </Field>

                                        <div className="d-flex flex-column">
                                            <label htmlFor="lien">lien externe</label>
                                            <Field id="lien" name="lien" placeholder="lien" className="my-3" />
                                        </div>
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

            {showPanel &&
                <>
                    <h1 className="lightningBg border rounded text-light text-center sticky z-1">CONCERTS</h1>
                    <div className="d-lg-flex">
                        <>
                            <div >
                                <Forms />
                            </div>

                            <div >
                                <Event />
                            </div>
                        </>


                    </div>
                </>
            }
        </>
    );
};

export default ConcertAdmin;