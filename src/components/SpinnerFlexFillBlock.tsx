import { Container, Spinner } from "react-bootstrap";

function SpinnerFlexFillBlock() {
    return (
        <Container
        className="d-flex flex-column flex-fill align-items-center justify-content-center rounded-2 p-3 text-start"
        style={{ backgroundColor: "var(--block-bg)" }}
      >
        <Spinner />
      </Container>
    )
}

export default SpinnerFlexFillBlock;