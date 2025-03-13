import { useEffect, useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import Notifications from "./notification";

function ActuAdmin() {
    const [datas, setDatas] = useState([]);
    const [showPanel, setShowPanel] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [initialValues, setInitialValues] = useState({ id: "", message: "", important: false });

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user && user.roles.includes("ROLE_EDITOR")) {
            setShowPanel(true);
            fetchData();
        }
    }, []);

    async function fetchData() {
        userService.getInfo().then(
            response => {
                const data = response.data;
                if (data.code === "rest_no_route") throw "error:rest_no_route";
                setDatas(data);
            },
            error => console.log(error.message)
        );
    }

    function handleShow(item = { id: "", message: "", important: false }) {
        setInitialValues(item);
        setShowModal(true);
    }

    function handleClose() {
        setShowModal(false);
    }

    async function handleAdd(values) {
        if (window.confirm("Confirmez-vous la nouvelle entrée?")) {
            userService.createInfo(JSON.stringify(values, null, '  ')).then(response => {
                if (response.data.code !== "rest_no_route") {
                    setDatas(response.data);
                    window.location.reload();
                }
            }).catch(error => console.log(error.message));
        }
    }

    async function handleUpdate(values) {
        if (window.confirm("Confirmez-vous la mise à jour?")) {
            userService.updateInfo(JSON.stringify(values, null, '  '), values.id).then(response => {
                if (response.data.code !== "rest_no_route") {
                    setDatas(response.data);
                    window.location.reload();
                }
            }).catch(error => alert(error.message));
        }
    }

    async function handleDelete(id) {
        if (window.confirm("Confirmez-vous vouloir effacer?")) {
            userService.deleteInfo(id).then(response => {
                if (response.data.code !== "rest_no_route") {
                    setDatas(response.data);
                    window.location.reload();
                }
            }).catch(error => alert(error.message));
        }
    }

    return (
        <>
            {showPanel && (
                <>
                    <h1 className="lightningBg border rounded text-light text-center ">NOTIFICATIONS</h1>
                    <Notifications />
                    <h1 className="lightningBg border rounded text-light text-center ">INFORMATIONS</h1>
                    <div className="d-lg-flex">
                        <div className="p-3 border rounded bg-light shadow ">
                            <Button className="btn-primary mb-3" onClick={() => handleShow()}>Ajouter une information</Button>
                            <Row className="m-3 sticky50">
                                {datas.map((item) => (
                                    <Col key={item.id} className="p-1 mx-3 border col-12 overflow-auto">
                                        <div>{`important: ${item.important}`}</div>
                                        <div>{`message: ${item.message}`}</div>
                                        <Button className="btn-warning border btn-sm m-1" onClick={() => handleShow(item)}>Éditer</Button>
                                        <Button className="btn-danger border btn-sm m-1" onClick={() => handleDelete(item.id)}>Effacer</Button>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    </div>
                </>
            )}

            {/* Modal Form */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{initialValues.id ? "Modifier l'information" : "Ajouter une information"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik initialValues={initialValues} enableReinitialize>
                        {props => (
                            <Form>
                                <div className="d-flex flex-column mx-5">
                                    {/* Champ caché pour l'id */}
                                    <Field type="hidden" id="id" name="id" value={props.values.id} />
                                    <div className="d-flex flex-column">
                                        <label htmlFor="message">Message</label>
                                        <Field id="message" name="message" className="my-3" />
                                    </div>
                                    <div>
                                        <label>Important</label>
                                        <Field type="checkbox" name="important" className="m-3" />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    {props.values.id ? (
                                        <Button className='btn-warning border btn-sm' onClick={() => handleUpdate(props.values)}>Mise à jour</Button>
                                    ) : (
                                        <Button className='btn-success border btn-sm' onClick={() => handleAdd(props.values)}>Ajouter</Button>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ActuAdmin;
