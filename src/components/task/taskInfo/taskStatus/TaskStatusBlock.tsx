import { Col, Container, Row } from "react-bootstrap";
import TaskStatusIcon from "../../../taskStatus/TaskStatusIcon";
import { TaskStatus } from "../../../../Types";

function TaskStatusBlock(props: { isFinished: boolean }) {
  let statusTitle = "Выполнена";
  const titleTextColorClassName = props.isFinished
    ? "text-success"
    : "text-warning";
  if (!props.isFinished) {
    statusTitle = "В процессе";
  }
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <small className="text-muted">Статус</small>
        </Col>
        <Col xs={12} className="d-flex flex-row align-items-center">
          <TaskStatusIcon
            statusName={
              props.isFinished ? TaskStatus.FINISHED : TaskStatus.ACTIVE
            }
          />
          <h6 className={`${titleTextColorClassName} mb-0`}>{statusTitle}</h6>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskStatusBlock;
