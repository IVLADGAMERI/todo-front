import { TaskStatus } from "../../../Types";

function TaskStatusIcon(props: {statusName: string}) {
    const status =
    props.statusName === TaskStatus.FINISHED ? (
      <i className="bi bi-check-circle text-success me-2"></i>
    ) : (
      <i className="bi bi-arrow-counterclockwise text-warning me-2"></i>
    );
    return status;
}

export default TaskStatusIcon;