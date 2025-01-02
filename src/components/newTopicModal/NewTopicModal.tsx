import { FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function NewTopicModal(props: {
  show: boolean;
  onHide: () => void;
  onSubmit: (title: string) => void;
  isLoading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    console.log(form.checkValidity());
    if (form.checkValidity()) {
      props.onSubmit(title);
      setTimeout(() => {setTitle("")}, 200);
    }
    setValidated(true);
  };
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Новая тема</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="newTopicName">
            <Form.Label>Название</Form.Label>
            <Form.Control
              value={title}
              required
              minLength={3}
              maxLength={16}
              type="text"
              placeholder="Название темы"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Название должно иметь длину от 3 до 16 символов
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" disabled={props.isLoading}>
            Подтвердить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default NewTopicModal;
