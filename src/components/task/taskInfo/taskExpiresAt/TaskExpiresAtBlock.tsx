import { differenceInDays, isAfter, isTomorrow } from "date-fns";
import { Col, Container, Row } from "react-bootstrap";

function getExpiresAtTitle(expiresAt: Date): string {
  let title;
  const daysDifference = differenceInDays(new Date(), expiresAt);
  const now = new Date();
  const expiresAtTime = `${expiresAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
  if (isAfter(now, expiresAt)) {
    title = "Истекла";
  } else if (isTomorrow(expiresAt)) {
    title = `Завтра в ${expiresAtTime}`;
  } else if (daysDifference > 0) {
    title = `Через ${daysDifference} дней`;
  } else if (daysDifference === 0) {
    title = `В ${expiresAt.toLocaleTimeString()}`;
  } else {
    title = `${expiresAt.toLocaleDateString()} в ${expiresAtTime}`;
  }
  return title;
}

function TaskExpiresAtBlock(props: { expiresAt: Date | null }) {
  let expiresAtTitle = "Никогда";
  if (props.expiresAt) {
    const expiresAt = props.expiresAt;
    expiresAtTitle = getExpiresAtTitle(expiresAt);
  }
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <small className="text-muted">Истекает</small>
        </Col>
        <Col xs={12} className="d-flex flex-row align-items-center">
          <i className="bi bi-stopwatch me-2"></i>
          <h6 className="mb-0">{expiresAtTitle}</h6>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskExpiresAtBlock;
