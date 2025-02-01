import { Col, Container, Row } from "react-bootstrap";
import TaskPriorityIcon from "./TaskPriorityIcon";
import TaskPriorityTitle from "./TaskPriorityTitle";
import { TaskPriority } from "../../../../Types";

function TaskPriorityBlock(props: {priority: TaskPriority}) {
    return (
        <Container fluid>
            <Row className="d-flex align-items-center">
                <Col xs={12}>
                    <small className="text-muted">Приоритет</small>
                </Col>
                <Col xs={12} className="d-flex flex-row align-items-center">
                    <TaskPriorityIcon priority={props.priority} className="me-2" />
                    <TaskPriorityTitle priority={props.priority} />
                </Col>
            </Row>
        </Container>
    )
}

export default TaskPriorityBlock;