import { Task } from "../../Types";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InlineButton from "../inlineButton/InlineButton";
import TaskStatus from "../taskStatus/TaskStatus";

function SidebarTaskNavLink(props: {
  task: Task;
  activeTaskId: string | undefined;
}) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/task/${props.task.id}`);
  };
  console.log(props.activeTaskId);
  return (
    <Col xs={12} className="mb-1 pe-0">
      <InlineButton
        className="ps-3"
        onClick={onClick}
        isActive={
          !!(
            props.activeTaskId &&
            props.activeTaskId === props.task.id.toString()
          )
        }
      >
        <div className="d-flex flex-row">
          <TaskStatus statusName={props.task.statusName} />
          {props.task.title}
        </div>
      </InlineButton>
    </Col>
  );
}

export default SidebarTaskNavLink;
