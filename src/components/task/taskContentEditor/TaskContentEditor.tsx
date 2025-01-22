import { Col, Container, Form, Row } from "react-bootstrap";

function TaskContentEditor(props: {
  content: string;
  onChange: (event: any) => void;
  onBlur: (event: any) => void;
}) {
  return (
    <Container className="d-flex flex-fill w-100">
      <Row className="w-100 flex-fill d-flex">
        <Col xs={12} className="w-100 flex-fill d-flex p-0">
          <Form.Control
            value={props.content}
            onChange={props.onChange}
            style={{ resize: "none", height: "100%" }}
            as="textarea"
            onBlur={props.onBlur}
          ></Form.Control>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskContentEditor;
