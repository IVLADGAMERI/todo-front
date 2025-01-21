import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TaskFullDTO } from "../../Types";
import { authenticationUrl, getTaskFull } from "../../Requests";
import SpinnerFlexFillBlock from "../SpinnerFlexFillBlock";
import HomeNavLinkButton from "../HomeNavLinkButton";
import TaskPriorityBlock from "./taskInfo/taskPriority/TaskPriorityBlock";
import TaskInfo from "./taskInfo/TaskInfo";

function Task() {
  const { activeTaskId } = useParams();
  const activeTaskIdNumber = activeTaskId
    ? Number.parseInt(activeTaskId)
    : null;
  const [loading, setLoading] = useState(true);
  const [taskFull, setTaskFull] = useState<TaskFullDTO | null>(null);
  useEffect(() => {
    if (activeTaskIdNumber != null) {
      getTaskFull(
        activeTaskIdNumber,
        (data) => {
          setTaskFull(data);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          window.location.href = authenticationUrl;
        }
      );
    }
  }, [activeTaskId, loading]);
  console.log(taskFull);
  if (loading || !taskFull) {
    return (
      <SpinnerFlexFillBlock />
    );
  }
  return (
    <Container
      className="d-flex flex-column flex-fill rounded-2 p-3 text-start"
      style={{ backgroundColor: "var(--block-bg)" }}
    >
      <Row className="w-100 d-flex flex-row justify-content-start align-items-center mb-2">
        <Col xs={1}>
          <HomeNavLinkButton />
        </Col>
        <Col xs={10}>
          <h4 className="m-0 text-center">{taskFull?.title}</h4>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <TaskInfo data={taskFull} />
        </Col>
      </Row>
    </Container>
  );
}

export default Task;
