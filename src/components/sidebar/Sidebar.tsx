import { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Topic, TaskPriority } from "../../Types";
import {
  getTopics,
  addTopic,
  deleteTopic,
  addTask,
  onUnauthorizedErrorDefault,
} from "../../Requests";
import SidebarItem from "./SidebarItem";
import { useParams } from "react-router-dom";
import InlineButton from "../InlineButton/InlineButton";
import SidebarSettingsNavLink from "./SidebarSettingsNavLink";
import AddTopicModal from "../Modals/AddTopicModal";
import AddTaskModal from "../Modals/AddTaskModal";
import SpinnerFlexFillBlock from "../SpinnerFlexFillBlock";
import EmptySidebarItemsBLock from "./EmptySidebarItemsBlock";
import { RequestErrorToastContext } from "../RequestErrorToastContext";

function Sidebar(props: {
  loadingUpdate: boolean;
  setLoadingUpdate: (value: boolean) => void;
}) {
  const { activeTaskId } = useParams();
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showNewTopicModal, setShowNewTopicModal] = useState<boolean>(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState<boolean>(false);
  const [newTaskTopicId, setNewTaskTopicId] = useState<number | null>(null);
  const showRequestErrorToastMessage = useContext(RequestErrorToastContext).showMessage;
  const addTaskCallback = (
    title: string,
    priority: TaskPriority,
    expiresAt?: string
  ) => {
    if (newTaskTopicId != null) {
      props.setLoadingUpdate(true);
      addTask(
        {
          topicId: newTaskTopicId,
          title: title,
          priority: priority,
          expiresAt: expiresAt,
        },
        () => {
          setShowNewTaskModal(false);
          props.setLoadingUpdate(false);
        },
        (error) => {
          console.log(error);
          let errorMessage = error.message;
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          } else {
            showRequestErrorToastMessage(errorMessage);
          }
        }
      );
    }
  };
  const addTopicCallback = (title: string) => {
    props.setLoadingUpdate(true);
    addTopic(
      title,
      () => {
        setShowNewTopicModal(false);
        props.setLoadingUpdate(false);
      },
      (error) => {
        console.log(error);
        let errorMessage = error.message;
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          } else {
            showRequestErrorToastMessage(errorMessage);
          }
      }
    );
  };
  const deleteTopicCallback = (event: any, id: number) => {
    props.setLoadingUpdate(true);
    deleteTopic(
      id,
      (data) => {
        props.setLoadingUpdate(false);
      },
      (error) => {
        console.log(error);
        let errorMessage = error.message;
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          } else {
            showRequestErrorToastMessage(errorMessage);
          }
      }
    );
  };
  useEffect(() => {
    if (!props.loadingUpdate || loadingTopics) {
      getTopics(
        (data) => {
          setTopics(data);
          setLoadingTopics(false);
        },
        (error) => {
          console.log(error);
          let errorMessage = error.message;
          if (error.status === 401) {
            onUnauthorizedErrorDefault();
          } else {
            showRequestErrorToastMessage(errorMessage);
          }
        }
      );
    }
  }, [props.loadingUpdate, loadingTopics]);
  if (loadingTopics) {
    return (
      <Container
        fluid
        className="d-flex flex-column rounded-3 p-3"
        style={{ backgroundColor: "var(--block-bg)" }}
      >
        <Row>
          <Col>
            <h5 className="text-start">Мои задачи</h5>
          </Col>
        </Row>
        <Row className="d-flex flex-column py-5">
          <Col>
            <SpinnerFlexFillBlock />
          </Col>
        </Row>
      </Container>
    );
  } else if (topics) {
    const sidebarItems =
      topics.length === 0 ? (
        <EmptySidebarItemsBLock />
      ) : (
        topics.map((item) => (
          <SidebarItem
            setShowNewTaskModal={setShowNewTaskModal}
            setNewTaskTopicId={setNewTaskTopicId}
            onDelete={deleteTopicCallback}
            onRename={console.log}
            activeTaskId={activeTaskId}
            eventKey={topics.indexOf(item).toString()}
            topic={item}
          />
        ))
      );
    return (
      <Container
        className="d-flex flex-column rounded-3 p-3"
        style={{
          backgroundColor: "#292d30",
          maxHeight: "50vh",
          overflowY: "hidden",
        }}
      >
        <Row className="mb-2 d-flex align-items-center border-bottom pb-2">
          <Col xs={9}>
            <h5 className="text-start mb-0">Мои задачи</h5>
          </Col>
          <Col
            xs={3}
            className="d-flex flex-row align-items-center justify-content-end"
          >
            <InlineButton
              className="text-center rounded-3 me-1"
              onClick={() => {
                setShowNewTopicModal(true);
              }}
            >
              <i className="bi bi-folder-plus text-white"></i>
            </InlineButton>
            <SidebarSettingsNavLink />
          </Col>
        </Row>
        <Row className="overflow-y-scroll d-flex">{sidebarItems}</Row>
        <AddTopicModal
          show={showNewTopicModal}
          onHide={() => setShowNewTopicModal(false)}
          isLoading={props.loadingUpdate}
          onSubmit={addTopicCallback}
        />
        <AddTaskModal
          show={showNewTaskModal}
          onHide={() => setShowNewTaskModal(false)}
          isLoading={props.loadingUpdate}
          onSubmit={addTaskCallback}
        />
      </Container>
    );
  }
  return <Container></Container>;
}

export default Sidebar;
