import { FormEvent, useEffect, useState } from "react";
import { TaskPriority } from "../../Types";
import { Modal, Form, FormGroup, Button } from "react-bootstrap";
import DateTimeFormGroup from "../formGroups/DateTimeFormGroup";

function EditTaskModal(props: {
  show: boolean;
  onHide: () => void;
  onSubmit: (title: string, priority: TaskPriority, expiresAt?: string) => void;
  data: { title: string; priority: TaskPriority; expiresAt?: string };
  isLoading: boolean;
}) {
  const expiresAtDateProps = props.data.expiresAt
    ? new Date(props.data.expiresAt)
    : null;
  const titleProps = props.data.title;
  const prorityProps = props.data.priority;
  const [title, setTitle] = useState<string>(titleProps);
  const [isChanged, setIsChanged] = useState(false);
  const [validated, setValidated] = useState(false);
  const [expiresAtDate, setExpiresAtDate] = useState<Date | null>(
    expiresAtDateProps
  );
  const [priority, setPriority] = useState<TaskPriority>(prorityProps);
  const resetState = () => {
    setTitle(titleProps);
    setExpiresAtDate(expiresAtDateProps);
    setPriority(prorityProps);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() && isChanged) {
      const expiresAtISO = expiresAtDate?.toISOString();
      props.onSubmit(title, priority, expiresAtISO);
      resetState();
    }
    setValidated(true);
  };
  useEffect(() => {
    setIsChanged(
      expiresAtDate?.getTime() !== expiresAtDateProps?.getTime() ||
        title !== titleProps ||
        priority !== prorityProps
    );
  }, [expiresAtDate, priority, title]);
  useEffect(() => {
    resetState();
  }, [props.data])
  console.log(isChanged);
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide();
        resetState();
      }}
      style={{ fontFamily: "var(--font-family)" }}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Изменить данные</Modal.Title>
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
            controlId="editTaskExpiresAt"
            groupLabel="Истекает"
            enableSwitchLabel="Ограничена по времени"
            onChange={setExpiresAtDate}
            value={expiresAtDate}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            disabled={props.isLoading || !isChanged}
          >
            Подтвердить
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditTaskModal;
