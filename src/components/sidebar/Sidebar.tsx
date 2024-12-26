import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Topic } from "../../Types";
import { authenticationUrl, getTopics, addTopic, deleteTopic } from "../../Requests";
import SidebarItem from "./SidebarItem";
import { useParams } from "react-router-dom";
import InlineButton from "../inlineButton/InlineButton";
import SidebarSettingsNavLink from "./SidebarSettingsNavLink";
import NewTopicModal from "../newTopicModal/NewTopicModal";

function Sidebar() {
  const { activeTaskId } = useParams();
  const [loadingTopics, setLoadingTopics] = useState(true);
  const [loadingTopicsUpdate, setLoadingTopicsUpdate] = useState(false);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [showNewTopicModal, setShowNewTopicModal] = useState<boolean>(false);
  const addTopicCallback = (title: string) => {
    setLoadingTopicsUpdate(true);
    addTopic(
      title,
      (data) => {
        setShowNewTopicModal(false);
        setLoadingTopicsUpdate(false);
      },
      (error) => {
        console.log(error);
        window.location.href = authenticationUrl;
      }
    );
  };
  const deleteTopicCallback = (event: any, id: number) => {
    setLoadingTopicsUpdate(true);
    deleteTopic(
      id,
      (data) => {
        setLoadingTopicsUpdate(false);
      },
      (error) => {
        console.log(error);
        window.location.href = authenticationUrl;
      }
    )
  }
  useEffect(() => {
    if (!loadingTopicsUpdate || loadingTopics) {
      getTopics(
        (data) => {
          setTopics(data);
          setLoadingTopics(false);
        },
        (error) => {
          console.log(error);
          window.location.href = authenticationUrl;
        }
      );
    }
  }, [loadingTopicsUpdate, loadingTopics]);
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
        <Row className="d-flex flex-column justify-content-center align-items-center py-5">
          <Col>
            <Spinner />
          </Col>
        </Row>
      </Container>
    );
  } else if (topics) {
    const sidebarItems = topics.map((item) => (
      <SidebarItem
        onDelete={deleteTopicCallback}
        onUpdate={console.log}
        activeTaskId={activeTaskId}
        eventKey={topics.indexOf(item).toString()}
        topic={item}
      />
    ));
    return (
      <Container
        className="d-flex flex-column rounded-3 p-3"
        style={{
          backgroundColor: "#292d30",
          maxHeight: "50vh",
          overflowY: "hidden",
        }}
      >
        <Row className="mb-2 d-flex align-items-center">
          <Col xs={9}>
            <h5 className="text-start">Мои задачи</h5>
          </Col>
          <Col xs={3} className="d-flex flex-row align-items-center">
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
        <Row className="overflow-y-scroll">{sidebarItems}</Row>
        <NewTopicModal
          show={showNewTopicModal}
          onHide={() => setShowNewTopicModal(false)}
          isLoading={loadingTopicsUpdate}
          onSubmit={addTopicCallback}
        />
      </Container>
    );
  }
  return <Container></Container>;
}

export default Sidebar;
