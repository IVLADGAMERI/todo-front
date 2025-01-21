import { Col, Container, Row } from "react-bootstrap";

function TaskCreatedAtBlock(props: {createdAt: Date}) {
    return (
        <Container fluid>
            <Row className="d-flex align-items-center">
                <Col xs={12}>
                    <small className="text-muted">Создана</small>
                </Col>
                <Col  xs={12} className="d-flex flex-row align-items-center">
                    <i className="bi bi-calendar-date me-2"></i>
                    <h6 className="mb-0">{props.createdAt.toLocaleDateString()}</h6>
                </Col>
            </Row>
        </Container>
    )
}

export default TaskCreatedAtBlock;