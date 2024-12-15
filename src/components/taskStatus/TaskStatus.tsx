function TaskStatus(props: {statusName: string}) {
    const status =
    props.statusName === "FINISHED" ? (
      <i className="bi bi-check-circle text-success me-2"></i>
    ) : (
      <i className="bi bi-clock text-warning me-2"></i>
    );
    return status;
}

export default TaskStatus;