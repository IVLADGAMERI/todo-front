import { Col, Container, FormGroup, Modal, Row } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { FormEvent } from "react";
import { TaskPriority } from "../../Types";
import DateTimeFormGroup from "../formGroups/DateTimeFormGroup";

function AddTaskModal(props: {
  show: boolean;
  onHide: () => void;
  onSubmit: (title: string, priority: TaskPriority, expiresAt?: string) => void;
  isLoading: boolean;
}) {
  const [title, setTitle] = useState("");
  const [expiresAtDate, setExpiresAtDate] = useState<Date>();
  const [priority, setPriority] = useState<TaskPriority>(TaskPriority.LOW);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      const expiresAtISO = expiresAtDate?.toISOString();
      console.log(expiresAtISO);
      props.onSubmit(title, priority, expiresAtISO);
      setTimeout(() => {
        setTitle("");
        setPriority(TaskPriority.LOW);
        setExpiresAtDate(undefined);
      }, 200);
    }
    setValidated(true);
  };
  return (
    <Modal show={props.show} onHide={props.onHide} style={{fontFamily: "var(--font-family)"}}>
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
              maxLength={32}
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
          <FormGroup controlId="newTaskStatus" className="mb-3">
            <Form.Label>Приоритет</Form.Label>
            <Form.Select
              value={priority}
              onChange={(event) => {
                setPriority(event.target.value as TaskPriority);
              }}
            >
              <option value={TaskPriority.LOW}>Низкий</option>
              <option value={TaskPriority.MEDIUM}>Средний</option>
              <option value={TaskPriority.HIGH}>Высокий</option>
            </Form.Select>
          </FormGroup>
          <DateTimeFormGroup
            controlId="expiresAt"
            groupLabel="Истекает"
            enableSwitchLabel="Ограничена по времени"
            onChange={setExpiresAtDate}
          />
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
