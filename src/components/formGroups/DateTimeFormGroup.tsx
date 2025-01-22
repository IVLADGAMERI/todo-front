import { FormGroup } from "react-bootstrap";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

function DateTimeFormGroup(props: {
  controlId: string;
  groupLabel: string;
  enableSwitchLabel: string;
  onChange: (date: Date) => void;
}) {
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  useEffect(() => {
    if (dateInput.length !== 0 && timeInput.length !== 0) {
      const dateTime = dateInput + "T" + timeInput + ":00";
      const date = new Date(dateTime);
      props.onChange(date);
    }
  }, [dateInput, timeInput]);
  return (
    <FormGroup controlId={props.controlId}>
      <Form.Label>{props.groupLabel}</Form.Label>
      <Container fluid className="p-0">
        <Row>
          <Col xs={6}>
            <Form.Control
              type="date"
              required={isEnabled}
              disabled={!isEnabled}
              value={dateInput}
              onChange={(event) => {
                setDateInput(event.target.value);
              }}
            ></Form.Control>
          </Col>
          <Col xs={6}>
            <Form.Control
              type="time"
              required={isEnabled}
              disabled={!isEnabled}
              value={timeInput}
              onChange={(event) => {
                setTimeInput(event.target.value);
              }}
            ></Form.Control>
          </Col>
          <Col xs={12} className="mt-2">
            <Form.Check
              type="switch"
              id="dateTimeEnableSwitch"
              onChange={(event) => {
                setIsEnabled(event.target.checked);
              }}
              checked={isEnabled}
              label={props.enableSwitchLabel}
            />
          </Col>
        </Row>
      </Container>
    </FormGroup>
  );
}

export default DateTimeFormGroup;
