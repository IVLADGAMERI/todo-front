import { Col, Container, Row } from "react-bootstrap";
import TaskPriorityBlock from "./taskPriority/TaskPriorityBlock";
import { TaskFullDTO, TaskStatus } from "../../../Types";
import TaskCreatedAtBlock from "./taskCreatedAt/TaskCreatedAtBlock";
import TaskExpiresAtBlock from "./taskExpiresAt/TaskExpiresAtBlock";
import TaskStatusBlock from "./taskStatus/TaskStatusBlock";

function TaskInfo(props: { data: TaskFullDTO }) {
  const isFinished = props.data.statusName === TaskStatus.FINISHED;
  const createdAt = new Date(props.data.createdAt);
  const expiresAt = props.data.expiresAt
    ? new Date(props.data.expiresAt)
    : null;
  return (
    <Container className="px-3">
      <Row>
        <Col xs={4} className="border-end border-start">
          <TaskCreatedAtBlock createdAt={createdAt} />
        </Col>
        <Col xs={4} className="border-end">
          <TaskPriorityBlock priorityName={props.data.priorityName} />
        </Col>
        <Col xs={4} className="border-end">
          {isFinished || !expiresAt ? (
            <TaskStatusBlock isFinished={isFinished} />
          ) : (
            <TaskExpiresAtBlock expiresAt={expiresAt} />
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TaskInfo;
