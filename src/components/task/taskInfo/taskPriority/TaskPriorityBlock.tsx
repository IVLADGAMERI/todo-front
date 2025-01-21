import { Col, Container, Row } from "react-bootstrap";
import TaskPriorityIcon from "./TaskPriorityIcon";
import TaskPriorityTitle from "./TaskPriorityTitle";

function TaskPriorityBlock(props: {priorityName: string}) {
    return (
        <Container fluid>
            <Row className="d-flex align-items-center">
                <Col xs={12}>
                    <small className="text-muted">Приоритет</small>
                </Col>
                <Col xs={12} className="d-flex flex-row align-items-center">
                    <TaskPriorityIcon priorityName={props.priorityName} className="me-2" />
                    <TaskPriorityTitle priorityName={props.priorityName} />
                </Col>
            </Row>
        </Container>
    )
}

export default TaskPriorityBlock;