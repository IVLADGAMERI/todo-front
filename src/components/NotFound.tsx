import { Container } from "react-bootstrap";

function NotFound(props: {message: string}) {
    return (
        <Container style={{backgroundColor: "var(--block-bg)"}} className="rounded-3 d-flex flex-fill align-items-center justify-content-center">
            <h3 className="mb-0">{props.message}</h3>
        </Container>
    )
}

export default NotFound;