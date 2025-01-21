import { TaskPriority } from "../../../../Types";

function TaskPriorityIcon(props: { priorityName: string; className?: string }) {
  let icon;
  switch (props.priorityName) {
    case TaskPriority.HIGH:
      icon = (
        <i
          className={`bi bi-lightning-charge text-danger ${props.className}`}
        ></i>
      );
      break;
    case TaskPriority.MEDIUM:
      icon = (
        <i
          className={`bi bi-lightning-charge text-warning ${props.className}`}
        ></i>
      );
      break;
    case TaskPriority.LOW:
      icon = (
        <i
          className={`bi bi-lightning-charge text-info ${props.className}`}
        ></i>
      );
      break;
    default:
      icon = <i className={`bi bi-question-circle ${props.className}`}></i>;
      break;
  }
  return icon;
}

export default TaskPriorityIcon;
