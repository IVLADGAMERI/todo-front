import { Accordion, Col, Container, Row } from "react-bootstrap";
import { Topic } from "../../Types";
import { useState } from "react";
import SidebarTaskNavLink from "./SidebarTaskNavLink";
import ChevronInlineButton from "./ChevronInlineButton";
import SidebarItemActionButtons from "./actionButtons/SidebarItemActionButtons";
import AddTaskButton from "./actionButtons/AddTaskButton";

function SidebarItem(props: {
  topic: Topic;
  eventKey: string;
  activeTaskId: string | undefined;
  onDelete: (event: any, id: number) => void;
  onUpdate: (event: any, id: number) => void;
}) {
  const [activeKey, setActiveKey] = useState<
    string | string[] | null | undefined
  >(null);
  const tasksItems = props.topic.tasks.map((item) => (
    <SidebarTaskNavLink activeTaskId={props.activeTaskId} task={item} />
  ));
  const accordionButtonOnClick = () => {
    setActiveKey((prevKey) =>
      prevKey === props.eventKey ? null : props.eventKey
    );
  };
  console.log(props.topic)
  return (
    <Col xs={12} className="text-start mb-1 mx-0">
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
              {tasksItems}
              <Col xs={12} className="pe-0">
                <AddTaskButton />
              </Col>
            </Row>
          </Container>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
}

export default SidebarItem;
