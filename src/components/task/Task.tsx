import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { TaskFullDTO } from "../../Types";
import {
  authenticationUrl,
  deleteTaskById,
  getTaskFull,
  updateTaskContent,
} from "../../Requests";
import SpinnerFlexFillBlock from "../SpinnerFlexFillBlock";
import HomeNavLinkButton from "./HomeNavLinkButton";
import TaskInfo from "./taskInfo/TaskInfo";
import TaskContentEditor from "./taskContentEditor/TaskContentEditor";
import TaskOptionsDropdown from "./TaskOptionsDropdown";

function Task(props: {setLoadingTopicsUpdate: (value: boolean) => void}) {
  const { activeTaskId } = useParams();
  const activeTaskIdNumber = activeTaskId
    ? Number.parseInt(activeTaskId)
    : null;
  const [loading, setLoading] = useState(true);
  const [loadingContentUpdate, setLoadingContentUpdate] = useState(false);
  const [taskFull, setTaskFull] = useState<TaskFullDTO | null>(null);
  const [content, setContent] = useState<string>("");
  const [isChanged, setChanged] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (activeTaskIdNumber != null && !loadingContentUpdate) {
      getTaskFull(
        activeTaskIdNumber,
        (data) => {
          setTaskFull(data);
          setLoading(false);
          setContent(data.content);
        },
        (error) => {
          console.log(error);
          window.location.href = authenticationUrl;
        }
      );
    }
  }, [activeTaskId, loading, loadingContentUpdate]);
  if (loading || !taskFull) {
    return <SpinnerFlexFillBlock />;
  }
  const updateTaskContentCallback = () => {
    if (activeTaskIdNumber && isChanged) {
      setLoadingContentUpdate(true);
      updateTaskContent(
        { taskId: activeTaskIdNumber, newContent: content },
        () => {
          setLoadingContentUpdate(false);
          setChanged(false);
        },
        () => {
          setLoadingContentUpdate(false);
          window.location.href = authenticationUrl;
        }
      );
    }
  };

  const deleteTaskCallback = () => {
    if (activeTaskIdNumber) {
      props.setLoadingTopicsUpdate(true);
      deleteTaskById(
        { id: activeTaskIdNumber },
        () => {
          props.setLoadingTopicsUpdate(false);
          navigate("/");
        },
        () => {
          window.location.href = authenticationUrl;
        }
      );
    }
  };
  return (
    <Container
      className="d-flex flex-column align-items-center w-100 flex-fill rounded-2 p-3 text-start"
      style={{ backgroundColor: "var(--block-bg)" }}
    >
      <Row className="w-100 d-flex flex-row justify-content-evenly align-items-center mb-2">
        <Col xs={1}>
          <HomeNavLinkButton />
        </Col>
        <Col xs={10}>
          <h4 className="m-0 text-center">{taskFull?.title}</h4>
        </Col>
        <Col xs={1}>
          <TaskOptionsDropdown
            isSaveLoading={loadingContentUpdate}
            isSaved={!isChanged}
            onDelete={deleteTaskCallback}
            onSave={updateTaskContentCallback}
          />
        </Col>
      </Row>
      <Row className="mb-3 w-100">
        <Col xs={12}>
          <TaskInfo data={taskFull} />
        </Col>
      </Row>
      <Row className="d-flex flex-fill w-100">
        <Col xs={12} className="d-flex flex-fill">
          <TaskContentEditor
            content={content}
            onBlur={updateTaskContentCallback}
            onChange={(event) => {
              setContent(event.target.value);
              setChanged(event.target.value !== taskFull.content);
            }}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Task;
