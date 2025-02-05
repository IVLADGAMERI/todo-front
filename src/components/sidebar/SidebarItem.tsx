import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Topic } from "../../Types";
import { useState } from "react";
import SidebarTaskNavLink from "./SidebarTaskNavLink";
import ChevronInlineButton from "../ChevronInlineButton/ChevronInlineButton";
import SidebarItemActionButtons from "./ActionButtons/SidebarItemActionButtons";
import AddTaskButton from "./ActionButtons/AddTaskButton";

function SidebarItem(props: {
  topic: Topic;
  eventKey: string;
  activeTaskId: string | undefined;
  onDelete: (event: any, id: number) => void;
  onRename: (event: any, id: number) => void;
  setShowNewTaskModal: (show: boolean) => void;
  setNewTaskTopicId: (topicId: number) => void;
}) {
  const [activeKey, setActiveKey] = useState<
    string | string[] | null | undefined
  >(null);
  const tasksNavlinks = props.topic.tasks.map((item) => (
    <SidebarTaskNavLink activeTaskId={props.activeTaskId} task={item} />
  ));
  
  const accordionButtonOnClick = () => {
    setActiveKey((prevKey) =>
      prevKey === props.eventKey ? null : props.eventKey
    );
  };
  console.log(props.topic)
  return (
    <Col xs={12} className="text-start mb-1 mx-0 ps-0">
      <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        <Container>
          <Row className="d-flex align-items-center">
            <Col xs={10}>
                <ChevronInlineButton
                  onClick={accordionButtonOnClick}
                  isActive={activeKey === props.eventKey}
                  title={props.topic.title}
                />
            </Col>
            <Col xs={2}>
              <SidebarItemActionButtons
                onDelete={(event) => props.onDelete(event, props.topic.id)}
                onEdit={console.log}
              />
            </Col>
          </Row>
        </Container>
        <Accordion.Collapse eventKey={props.eventKey}>
          <Container className="pt-1">
            <Row>
              {tasksNavlinks}
              <Col xs={12} className="pe-0">
                <AddTaskButton onClick={() => {
                    props.setNewTaskTopicId(props.topic.id)
                    props.setShowNewTaskModal(true)
                  }} />
              </Col>
            </Row>
          </Container>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
}

export default SidebarItem;
