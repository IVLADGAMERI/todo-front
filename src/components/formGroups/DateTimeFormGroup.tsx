import { FormGroup } from "react-bootstrap";
import { Form, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function DateTimeFormGroup(props: {
  controlId: string;
  groupLabel: string;
  enableSwitchLabel: string;
  value?: Date | null;
  onChange: (date: Date | null) => void;
}) {
  const propsValueDateString = props.value
    ? format(props.value, "yyyy-MM-dd")
    : "";
  const propsValueTimeString = props.value
    ? props.value.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";
  const [dateInput, setDateInput] = useState(propsValueDateString);
  const [timeInput, setTimeInput] = useState(propsValueTimeString);
  const [isEnabled, setIsEnabled] = useState(true);
  useEffect(() => {
    if (!isEnabled) {
      setDateInput("");
      setTimeInput("");
      props.onChange(null);
    }
    if (dateInput.length !== 0 && timeInput.length !== 0) {
      const dateTime = dateInput + "T" + timeInput + ":00";
      const date = new Date(dateTime);
      props.onChange(date);
    }
  }, [dateInput, timeInput, isEnabled]);
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
