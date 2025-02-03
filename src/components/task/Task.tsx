import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { TaskFullDTO, TaskPriority } from "../../Types";
import {
  deleteTaskById,
  getTaskFull,
  onUnauthorizedErrorDefault,
  updateTaskContent,
  updateTaskInfo,
} from "../../Requests";
import SpinnerFlexFillBlock from "../SpinnerFlexFillBlock";
import HomeNavLinkButton from "./HomeNavLinkButton";
import TaskInfo from "./taskInfo/TaskInfo";
import TaskContentEditor from "./taskContentEditor/TaskContentEditor";
import TaskOptionsDropdown from "./TaskOptionsDropdown";
import EditTaskModal from "../modals/EditTaskModal";
import { AxiosError } from "axios";

function Task(props: {
  setLoadingTopicsUpdate: (value: boolean) => void;
  loadingTopicsUpdate: boolean;
}) {
  const { activeTaskId } = useParams();
  const activeTaskIdNumber = activeTaskId
    ? Number.parseInt(activeTaskId)
    : null;
  const [loading, setLoading] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [taskFull, setTaskFull] = useState<TaskFullDTO | null>(null);
  const [content, setContent] = useState<string>("");
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [showUpdateTaskInfoModal, setShowUpdateTaskInfoModal] =
    useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      activeTaskIdNumber != null &&
      !loadingUpdate &&
      !props.loadingTopicsUpdate
    ) {
      getTaskFull(
        activeTaskIdNumber,
        (data) => {
          setTaskFull(data);
          setLoading(false);
          setContent(data.content);
        },
        (error) => {
          console.log(error);
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          }
        }
      );
    }
  }, [activeTaskIdNumber, loading, loadingUpdate, props.loadingTopicsUpdate]);
  if (loading || !taskFull) {
    return <SpinnerFlexFillBlock />;
  }
  const updateTaskContentCallback = () => {
    if (activeTaskIdNumber && isContentChanged) {
      setLoadingUpdate(true);
      updateTaskContent(
        { taskId: activeTaskIdNumber, newContent: content },
        () => {
          setLoadingUpdate(false);
          setIsContentChanged(false);
        },
        (error) => {
          setLoadingUpdate(false);
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          }
        }
      );
    }
  };
  const updateTaskInfoCallback = (
    newTitle: string,
    newPriority: TaskPriority,
    newExpiresAt?: string | null
  ) => {
    if (activeTaskIdNumber) {
      let onSuccess = () => {
        setLoadingUpdate(false);
        setShowUpdateTaskInfoModal(false);
      };
      let onError = (error: AxiosError) => {
        setLoadingUpdate(false);
        setShowUpdateTaskInfoModal(false);
        if (error.status === 401) {
          onUnauthorizedErrorDefault();
        }
      };
      if (newTitle !== taskFull.title) {
        props.setLoadingTopicsUpdate(true);
        onSuccess = () => {
          props.setLoadingTopicsUpdate(false);

          setShowUpdateTaskInfoModal(false);
        };
        onError = (error) => {
          props.setLoadingTopicsUpdate(false);
          setShowUpdateTaskInfoModal(false);
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          }
        };
      } else {
        setLoadingUpdate(true);
      }
      updateTaskInfo(
        {
          id: activeTaskIdNumber,
          newTitle: newTitle,
          newPriority: newPriority,
          newExpiresAt: newExpiresAt,
        },
        onSuccess,
        onError
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
        (error) => {
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          }
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
            isSaveLoading={loadingUpdate}
            isSaved={!isContentChanged}
            onEdit={() => {
              setShowUpdateTaskInfoModal(true);
            }}
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
              setIsContentChanged(event.target.value !== taskFull.content);
            }}
          />
        </Col>
      </Row>
      <EditTaskModal
        show={showUpdateTaskInfoModal}
        onHide={() => setShowUpdateTaskInfoModal(false)}
        isLoading={props.loadingTopicsUpdate}
        onSubmit={updateTaskInfoCallback}
        data={{
          title: taskFull.title,
          priority: taskFull.priorityName as TaskPriority,
          expiresAt: taskFull.expiresAt,
        }}
      />
    </Container>
  );
}

export default Task;
