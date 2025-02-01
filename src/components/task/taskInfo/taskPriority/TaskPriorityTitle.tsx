import { ReactElement } from "react";
import { TaskPriority } from "../../../../Types";

function TaskPriorityTitle(props: { priority: TaskPriority, className?: string }) {
  let title: ReactElement<HTMLHeadingElement>;
  switch (props.priority) {
    case TaskPriority.HIGH:
      title = <h6 className={`text-danger mb-0 ${props.className}`}>Высокий</h6>;
      break;
    case TaskPriority.MEDIUM:
      title = <h6 className={`text-warning mb-0 ${props.className}`}>Средний</h6>;
      break;
    case TaskPriority.LOW:
      title = <h6 className={`text-info mb-0 ${props.className}`}>Низкий</h6>;
      break;
    default:
      title = <h6 className={props.className}>Не указан</h6>;
      break;
  }
  return title;
}

export default TaskPriorityTitle;
