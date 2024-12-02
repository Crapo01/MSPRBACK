import { Field, Form, Formik } from "formik";
import { Button } from "react-bootstrap";
import { useStompClient } from "react-stomp-hooks";


function Notifications() {
const stompClient = useStompClient();

async function handleClick(value) {
    await new Promise((r) => setTimeout(r, 500));
    if (stompClient) {
        const temp = JSON.stringify({ msg: value.message, lnk: value.link })
        stompClient.publish({ destination: '/app/broadcast', body: temp })
    }
}
return (
    <Formik
        initialValues={{
            message: '',
            link: '',
        }}
    >
        {props => (

            <Form>
                <div className="d-flex flex-column mx-5">
                    <div className="d-flex flex-column">
                        <label htmlFor=" message">Message notification push</label>
                        <Field id="message" name="message" placeholder="Message d'information ici..." className="my-3" />
                    </div>
                    <div className="d-flex flex-column">
                        <label htmlFor=" message">URL du lien (optionnel)</label>
                        <Field id="link" name="link" placeholder="url de la page" className="my-3" />
                    </div>
                </div>
                <div className=' d-flex justify-content-end'>
                    <Button className='btn-warning border btn-sm' onClick={() => handleClick(props.values)}>Publier</Button>
                </div>
            </Form>
        )
        }
    </Formik>
)
}
export default Notifications;