import { useEffect, useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import CarteMini from "./cartemini";
import { latLng } from "leaflet";

function PointeurAdmin() {
  const [datas, setDatas] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [dataFromChild, setDataFromChild] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPointeur, setCurrentPointeur] = useState(null);  // Pour stocker l'élément sélectionné

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

  async function fetchData() {
    try {
      const response = await userService.getPointeur();
      const data = response.data;
      if (data.code === "rest_no_route") throw new Error("No route found");
      setDatas(data);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  }

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.roles.includes("ROLE_EDITOR")) {
      setShowPanel(true);
      fetchData();
    }
  }, []);

  async function handleApiRequest(action, params) {
    try {
      let response;
      switch (action) {
        case "create":
          response = await userService.createPointeur(params);
          break;
        case "update":
          response = await userService.updatePointeur(params.dataString, params.id);
          break;
        case "delete":
          response = await userService.deletePointeur(params);
          break;
        default:
          throw new Error("Action not supported");
      }
      const data = response.data;
      if (data.code === "rest_no_route") throw new Error("No route found");
      setDatas(data);
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  }

  function Event() {
    async function handleDelete(id) {
      if (window.confirm("Confirmez vous vouloir effacer?")) {
        await handleApiRequest("delete", id);
      }
    }

    return (
      <Row className="m-3 sticky50">
        {datas.map((item) => (
          <Col key={item.id} className="p-1 mx-3 border col-12 overflow-auto">
            <div>{`lon: ${item.lon} | lat: ${item.lat}`}</div>
            <div>{`nom: ${item.nom} | type: ${item.type}`}</div>
            <div>{`description: ${item.description}`}</div>
            <div>{`lien: ${item.lien}`}</div>
            <Button className="btn-danger border btn-sm" onClick={() => handleDelete(item.id)}>
              Effacer
            </Button>
            <Button
              className="btn-warning border btn-sm ml-2"
              onClick={() => openEditModal(item)}
            >
              Editer
            </Button>
          </Col>
        ))}
      </Row>
    );
  }

  // Fonction pour ouvrir la modal avec les données de l'élément à modifier
  function openEditModal(item) {
    if (dataFromChild){
        item.lon = dataFromChild.lon;
        item.lat = dataFromChild.lat;
    }
    
    setCurrentPointeur(item);
    console.log(currentPointeur);
    setShowModal(true);
  }

  // Fonction pour ouvrir la modal pour la création d'un nouveau pointeur
  function openNewPointeurModal() {
    setCurrentPointeur(null);  
    setShowModal(true);  
  }

  function closeModal() {
    setShowModal(false);
    setCurrentPointeur(null);
  }

  function Forms() {
    async function handleFormSubmit(values, action) {
      const dataString = JSON.stringify(values, null, "  ");
      if (window.confirm(action === "create" ? "Confirmez vous la nouvelle entrée?" : "Confirmez vous la mise à jour?")) {
        await handleApiRequest(action, action === "create" ? dataString : { dataString, id: values.id });
      }
    }

    return (
      <div className="p-3 border rounded bg-light shadow sticky50">
        <section>            
          <div className="m-3 p-1 border rounded bg-secondary">
            <h2>{currentPointeur ? "Modifier un pointeur" : "Ajouter un pointeur"}</h2>
          </div>
          <Formik
            initialValues={{
              id: currentPointeur ? currentPointeur.id : "",
              lon: currentPointeur  ? currentPointeur.lon : dataFromChild.lon,
              lat: currentPointeur  ? currentPointeur.lat : dataFromChild.lat,
              nom: currentPointeur ? currentPointeur.nom : "fake",
              type: currentPointeur ? currentPointeur.type : "scene",
              description: currentPointeur ? currentPointeur.description : "fake",
              lien: currentPointeur ? currentPointeur.lien : "",
            }}
            onSubmit={(values) => handleFormSubmit(values, values.id ? "update" : "create")}
          >
            {(props) => (
              <Form>
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column flex-md-row">
                     {/* Champ caché pour l'id */}
                     <Field type="hidden" id="id" name="id" value={props.values.id} />
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
                      <label htmlFor="lon">Longitude</label>
                      <Field type="number" step="0.0001" id="lon" name="lon" placeholder="longitude" value={dataFromChild.lon} />
                    </div>
                    <div className="d-flex flex-column mx-1">
                      <label htmlFor="lat">Latitude</label>
                      <Field type="number" step="0.0001" id="lat" name="lat" placeholder="latitude" value={dataFromChild.lat} />
                    </div>
                  </div>
                  <p>Cliquer sur la carte pour récupérer les coordonnées</p>
                  <div className="d-flex flex-column">
                    <label htmlFor="description">Description du pointeur</label>
                    <Field id="description" name="description" placeholder="description" className="my-3" />
                  </div>
                  <div className="d-flex flex-column">
                    <label htmlFor="lien">Lien externe</label>
                    <Field id="lien" name="lien" placeholder="lien" className="my-3" />
                  </div>
                  <div className="d-flex flex-column">
                    <label htmlFor="nom">Nom du pointeur</label>
                    <Field id="nom" name="nom" placeholder="nom du pointeur" className="my-2" required />
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button className="btn-warning border btn-sm" type="submit">
                    {props.values.id ? "Mise à jour" : "Nouvelle entrée"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </section>
      </div>
    );
  }

  return (
    <>
      {showPanel && (
          <>          
          <h1 className="lightningBg border rounded text-light text-center ">POINTEURS</h1>
          <CarteMini sendDataToParent={handleDataFromChild}  />
          <div className="d-lg-flex ">
            <div>
              <Button className="btn-primary" onClick={openNewPointeurModal}>
                Nouveau Pointeur
              </Button>
              <p>Cliquer sur la carte pour enregistrer la position</p>
              <p>lon: {dataFromChild.lon}</p>
              <p>lat: {dataFromChild.lat}</p>
              <Event />
            </div>
          </div>
          
        </>
      )}

      {/* Modal pour l'édition */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentPointeur ? "Modifier un pointeur" : "Ajouter un pointeur"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Forms />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PointeurAdmin;

