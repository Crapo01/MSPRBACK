import { useEffect, useState } from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import userService from "../services/user.service";
import eventBus from "../common/EventBus";
import authService from "../services/auth.service";


function UserAdmin() {

    const [datas, setDatas] = useState(false);
    const [showPanel, setShowPanel] = useState(false);


    async function fetchData() {
        userService.getUsers().then(
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
            if (user.roles.includes("ROLE_ADMIN")) {
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

        async function handleUpdate(values, id) {
            await new Promise((r) => setTimeout(r, 500));
            const dataString = JSON.stringify(values, null, '  ');
            console.log(values)
            console.log(dataString)
            if (window.confirm('Confirmez vous la mise à jour?')) {
                updateItem(dataString, id)
            }
        }

        async function updateItem(dataString, id) {
            userService.updateUser(dataString, id).then(
                response => {
                    console.log(response)
                    const data = response.data;
                    if (data.code === "rest_no_route") { throw "error:rest_no_route" } else { setDatas(data) };
                    alert("updated")
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

        async function deleteItem(id) {
            userService.deleteUser(id).then(
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
                            <Row className={"p-1  border d-flex "}>
                                <Col key={item.id} className={"p-1   col-6 overflow-auto"} >
                                    <div className="d-flex">
                                        <div>
                                            <div> {"id:" + item.id + " |        username: " + item.username}  </div>
                                            {item.roles.map((role) => (
                                                <div> {role.name}  </div>
                                            ))}
                                        </div>
                                        <div>
                                            {item.id != 1 && <Button className='btn-danger m-2 border btn-sm' onClick={() => handleDelete(item.id)} >Effacer</Button>}
                                        </div>
                                    </div>

                                </Col>
                                {item.id != 1 &&
                                    <Col className={"p-1   col-6 overflow-auto"}>
                                        <Formik initialValues={{ role: ["none"] }}>
                                            {props => (
                                                <Form>

                                                    <label className="my-3">ROLE</label>
                                                    <Field name="role" as="select" multiple>
                                                        <option value="admin">admin</option>
                                                        <option value="editor">editor</option>
                                                        <option value="viewer">viewer</option>
                                                    </Field>

                                                    {props.values.role != [] && <Button className='btn-warning border m-2 btn-sm' onClick={() => handleUpdate(props.values, item.id)}>Mise a jour</Button>}

                                                </Form>
                                            )}
                                        </Formik>
                                    </Col>
                                }
                            </Row>
                        ))}
                    </Row>
                </>
            )
        } else {
            return <h3>Pas d'infos pour le moment</h3>
        }
    }


    return (
        <>
            <h1 className="lightningBg border rounded text-light text-center sticky z-1">UTILISATEURS</h1>

            {console.log("showPanel" + showPanel)}
            {showPanel &&
                <>


                    <div >
                        <Event />
                    </div>
                </>
            }

        </>
    );
};

export default UserAdmin;