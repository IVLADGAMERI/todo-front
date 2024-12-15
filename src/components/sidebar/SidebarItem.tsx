import {
  Accordion,
  Col,
  Container,
  Row,
} from "react-bootstrap";
import { Topic } from "../../Types";
import { useState } from "react";
import SidebarTaskNavLink from "./SidebarTaskNavLink";
import ChevronInlineButton from "./ChevronInlineButton";

function SidebarItem(props: { topic: Topic; eventKey: string, activeTaskId: string | undefined }) {
  const [activeKey, setActiveKey] = useState<
    string | string[] | null | undefined
  >(null);
  const tasksItems = props.topic.tasks.map((item) => (
    <SidebarTaskNavLink activeTaskId={props.activeTaskId} task={item} />
  ));
  const accordionButtonOnClick = () => {
    setActiveKey((prevKey) => (prevKey === props.eventKey ? null : props.eventKey));
  };
  return (
    <Col xs={12} className="text-start mb-1 mx-0">
      <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
        <h6>
          <ChevronInlineButton
            onClick={accordionButtonOnClick}
            isActive={activeKey === props.eventKey}
            title={props.topic.title}
          />
        </h6>
        <Accordion.Collapse eventKey={props.eventKey}>
          <Container>
            <Row>{tasksItems}</Row>
          </Container>
        </Accordion.Collapse>
      </Accordion>
    </Col>
  );
}

export default SidebarItem;
