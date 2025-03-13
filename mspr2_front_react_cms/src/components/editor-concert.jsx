import { useEffect, useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import authService from "../services/auth.service";
import userService from "../services/user.service";

function ConcertAdmin() {
    const [datas, setDatas] = useState([]);
    const [showPanel, setShowPanel] = useState(false);
    const [showModal, setShowModal] = useState(false); // Etat pour afficher le modal
    const [selectedConcert, setSelectedConcert] = useState(null); // Concert sélectionné pour la modification

    async function fetchData() {
        userService.getConcert().then(
            response => {
                const data = response.data;
                if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data); };
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
        async function handleDelete(id) {
            if (window.confirm('Confirmez vous vouloir effacer?')) {
                deleteItem(id);
            }
        }

        async function deleteItem(id) {
            userService.deleteConcert(id).then(
                response => {
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data); };
                    window.location.reload();
                },
                error => {
                    if (error.response) {
                        alert(error.message + "\n" + error.response.data.message);
                    } else {
                        alert(error.message);
                    }
                }
            );
        }

        if (datas) {
            return (
                <>
                    <Row className={"m-3 sticky50"}>
                        {datas.map((item) => (
                            <Col key={item.id} className={"p-1 mx-3 border col-12 overflow-auto"}>
                                <div> {" nom: " + item.nom + " | origine: " + item.origine}  </div>
                                <div>{"image link: " + item.image}</div>
                                <div> {"date: " + item.date + " | heure: " + item.heure + " | scene: " + item.scene}  </div>
                                <div> {"description: " + item.description}  </div>
                                <div> {"lien: " + item.lien}  </div>
                                <Button className='btn-warning border btn-sm' onClick={() => openModal(item)}>Modifier</Button>
                                <Button className='btn-danger border btn-sm ms-2' onClick={() => handleDelete(item.id)} >Effacer</Button>
                            </Col>
                        ))}
                    </Row>
                </>
            );
        } else {
            return <h3>Pas de concert pour le moment</h3>;
        }
    }

    function Forms() {
        const handleAdd = async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            const dataString = JSON.stringify(values, null, '  ');
            if (window.confirm('Confirmez vous la nouvelle entrée?')) {
                createItem(dataString);
            }
        };

        const handleUpdate = async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            const dataString = JSON.stringify(values, null, '  ');
            if (window.confirm('Confirmez vous la mise à jour?')) {
                updateItem(dataString, values.id);
            }
        };

        async function createItem(dataString) {
            userService.createConcert(dataString).then(
                response => {
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data); };
                    window.location.reload();
                },
                error => {
                    console.log(error.message);
                }
            );
        }

        async function updateItem(dataString, id) {
            userService.updateConcert(dataString, id).then(
                response => {
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data); };
                    window.location.reload();
                },
                error => {
                    if (error.response) {
                        alert(error.message + "\n" + error.response.data.message);
                    } else {
                        alert(error.message);
                    }
                }
            );
        }

        return (
            <Formik
                enableReinitialize={true}
                initialValues={{
                    id: selectedConcert ? selectedConcert.id : "",
                    nom: selectedConcert ? selectedConcert.nom : "In Progress",
                    scene: selectedConcert ? selectedConcert.scene : "principale",
                    date: selectedConcert ? selectedConcert.date : "14 juin",
                    heure: selectedConcert ? selectedConcert.heure : "18:00",
                    origine: selectedConcert ? selectedConcert.origine : "Europe",
                    image: selectedConcert ? selectedConcert.image : "https://i.ebayimg.com/images/g/iF0AAOSw6x9i5MMT/s-l1200.png",
                    description: selectedConcert ? selectedConcert.description : "",
                    lien: selectedConcert ? selectedConcert.lien : "",
                }}
            >
                {props => (
                    <Form>

                        {/* Champ caché pour l'id */}
                        <Field type="hidden" id="id" name="id" value={props.values.id} />

                        <div className="d-flex flex-column mx-5">
                            <div className="d-flex flex-column">
                                <label htmlFor="nom">Nom du groupe</label>
                                <Field id="nom" name="nom" placeholder="Nom" className="my-3" />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="image">Lien de l'image</label>
                                <Field id="image" name="image" placeholder="https:...." className="my-3" />
                            </div>
                            <div className="d-flex flex-column">
                                <label htmlFor="description">Description</label>
                                <Field id="description" name="description" placeholder="Entrez une description" className="my-3" />
                            </div>
                            <div>
                                <label className="my-3">Origine</label>
                                <Field name="origine" as="select" >
                                    <option></option>
                                    <option value="Europe">Europe</option>
                                    <option value="Amerique">Amérique</option>
                                    <option value="Afrique">Afrique</option>
                                    <option value="Asie">Asie</option>
                                    <option value="Australie">Australie</option>
                                </Field>

                                <label className="my-3">Date</label>
                                <Field name="date" as="select" >
                                    <option value="14 juin">14 Juin</option>
                                    <option value="15 juin">15 Juin</option>
                                    <option value="16 juin">16 Juin</option>
                                </Field>

                                <label className="my-3">Heure</label>
                                <Field name="heure" as="select" >
                                    <option value="18:00">18:00</option>
                                    <option value="19:00">19:00</option>
                                    <option value="20:00">20:00</option>
                                    <option value="21:00">21:00</option>
                                </Field>

                                <label className="my-3">Scene</label>
                                <Field name="scene" as="select" >
                                    <option value="principale">Principale</option>
                                    <option value="nord">Nord</option>
                                    <option value="est">Est</option>
                                    <option value="sud">Sud</option>
                                    <option value="ouest">Ouest</option>
                                </Field>

                                <div className="d-flex flex-column">
                                    <label htmlFor="lien">Lien externe</label>
                                    <Field id="lien" name="lien" placeholder="lien" className="my-3" />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            {props.values.id === "" ? (
                                <Button className='btn-warning border btn-sm' onClick={() => handleAdd(props.values)}>Nouvelle entrée</Button>
                            ) : (
                                <Button className='btn-warning border btn-sm' onClick={() => handleUpdate(props.values)}>Mise à jour</Button>
                            )}
                        </div>
                    </Form>
                )}
            </Formik>
        );
    }

    // Fonction pour ouvrir le modal de modification
    const openModal = (concert) => {
        setSelectedConcert(concert);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedConcert(null);
    };

    return (
        <>
            {showPanel && (
                <>
                    <h1 className="lightningBg border rounded text-light text-center ">CONCERTS</h1>
                    <div className="d-lg-flex">
                        <div className="p-3 border rounded bg-light shadow">
                            <Button variant="primary" onClick={() => {setShowModal(true);setSelectedConcert(null)}}>
                                Ajouter un concert
                            </Button>
                            <div >
                                <Event />
                            </div>
                        </div>
                    </div>

                    {/* Modal pour ajouter un concert */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Ajouter un nouveau concert</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Forms />
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </>
    );
}

export default ConcertAdmin;