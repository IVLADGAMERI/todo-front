import { FormGroup, Modal } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { FormEvent } from "react";
import { TaskPriority } from "../../Types";

function AddTaskModal(props: {
  show: boolean;
  onHide: () => void;
  onSubmit: (title: string, priority: TaskPriority) => void;
  isLoading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
  const [validated, setValidated] = useState(false);
  console.log(priority);
  console.log(typeof priority);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      props.onSubmit(title, priority);
      setTimeout(() => {
        setTitle("");
        setPriority(TaskPriority.LOW);
      }, 200);
    }
    setValidated(true);
  };
  return (
    <Modal show={props.show} onHide={props.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Новая задача</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group controlId="newTaskName" className="mb-3">
            <Form.Label>Название</Form.Label>
            <Form.Control
              value={title}
              required
              minLength={3}
              maxLength={16}
              type="text"
              placeholder="Название задачи"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <Form.Control.Feedback type="invalid">
              Название должно иметь длину от 3 до 16 символов
            </Form.Control.Feedback>
          </Form.Group>
          <FormGroup controlId="newTaskStatus">
            <Form.Label>Приоритет</Form.Label>
            <Form.Select
                value={priority}
                onChange={(event) => {
                    setPriority(event.target.value as TaskPriority)
                }}
            >
              <option value={TaskPriority.LOW}>Низкий</option>
              <option value={TaskPriority.MEDIUM}>Средний</option>
              <option value={TaskPriority.HIGH}>Высокий</option>
            </Form.Select>
          </FormGroup>
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

export default AddTaskModal;
