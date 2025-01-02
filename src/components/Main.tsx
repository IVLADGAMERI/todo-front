import { Col, Container, Row } from "react-bootstrap";
import Clock from "./Clock";

function Index() {
    return (
        <Container fluid style={{ backgroundColor: "var(--block-bg)" }} className="flex-fill d-flex rounded-3 mb-3 p-4">
            <Row>
                <Col xs={12}>
                    <Clock />
                </Col>
            </Row>
        </Container>
    )
}

export default Index;