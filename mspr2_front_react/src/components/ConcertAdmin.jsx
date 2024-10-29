import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Field, Form, Formik } from "formik";

function ConcertAdmin() {

    const [datas, setDatas] = useState(false);

    async function fetchData() {
        try {

            const response = await fetch("http://localhost:8080/api/concerts/all");
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
                                <div> {"id: " + item.id + " | nom: " + item.nom + " | origine: " + item.origine}  </div>
                                <div>{"image link: "+item.image}</div>
                                <div> {"date: " + item.date + " | heure: " + item.heure + " | scene: " + item.scene}  </div>
                                <div> {"description: " + item.description}  </div>
                                <div> {"lien: " + item.lien}  </div>
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
        return (
            <div className={"p-3 border rounded bg-light shadow sticky50"}>
                <section >

                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Ajouter un concert</h2>
                    </div>
                    <Formik
                        initialValues={{
                            scene: "principale",
                            date: "14 juin",
                            heure: "18:00",
                            origine: "Europe",
                            image: "https://i.ebayimg.com/images/g/iF0AAOSw6x9i5MMT/s-l1200.png"
                        }}
                        onSubmit={
                            async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                const dataString = JSON.stringify(values, null, '  ');
                                console.log(dataString);
                                if (window.confirm(dataString + 'Confirmez vous la nouvelle entrée?')) {
                                    createConcert(dataString)
                                }

                                async function createConcert(dataString) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/concerts'
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
                                        <option value="14 Juin">14 Juin</option>
                                        <option value="15 Juin">15 Juin</option>
                                        <option value="16 Juin">16 Juin</option>
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
                                <Button className='btn-warning border ' type="submit">Soumettre</Button>
                            </div>
                        </Form>
                    </Formik>
                    <div className="m-3 p-1 border rounded bg-secondary ">
                        <h2>Effacer un groupe</h2>
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
                                if (window.confirm('Confirmez vous vouloir effacer' + values.id + '?')) {
                                    deleteInfo(values.id)
                                }

                                async function deleteInfo(id) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/concerts\/' + id
                                    try {
                                        const response = await fetch(url, {
                                            method: 'DELETE'
                                        })
                                        if (response.status == 200) { alert(id + " a été éffacée") }
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
                        <h2>Mettre à jour un groupe</h2>
                    </div>
                    <Formik
                        initialValues={{
                            scene: "principale",
                            date: "14 juin",
                            heure: "18:00",
                            origine: "Europe",
                            image: "https://i.ebayimg.com/images/g/iF0AAOSw6x9i5MMT/s-l1200.png"
                        }}
                        onSubmit={
                            async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                const dataString = JSON.stringify(values, null, '  ');
                                console.log(dataString);
                                if (window.confirm('Confirmez vous la nouvelle entrée?')) {
                                    updateGroupe(dataString)
                                }

                                async function updateGroupe(dataString) {
                                    console.log('start')
                                    const url = 'http://localhost:8080/api/concerts/update/' + values.id
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
                                        <option value="14 Juin">14 Juin</option>
                                        <option value="15 Juin">15 Juin</option>
                                        <option value="16 Juin">16 Juin</option>
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
            <h1 className="lightningBg border rounded text-light text-center sticky z-1">CONCERTS</h1>
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

export default ConcertAdmin;