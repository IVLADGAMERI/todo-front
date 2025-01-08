import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { TaskFullDTO } from "../../Types";
import { authenticationUrl, getTaskFull } from "../../Requests";

function Task() {
  const { activeTaskId } = useParams();
  const activeTaskIdNumber = activeTaskId
    ? Number.parseInt(activeTaskId)
    : null;
  const [loading, setLoading] = useState(true);
  const [taskFull, setTaskFull] = useState<TaskFullDTO | null>(null);
  useEffect(() => {
    if (activeTaskIdNumber != null) {
      getTaskFull(
        activeTaskIdNumber,
        (data) => {
          setTaskFull(data);
          setLoading(false);
        },
        (error) => {
          console.log(error);
          window.location.href = authenticationUrl;
        }
      );
    }
  }, [activeTaskId, loading]);
  console.log(taskFull);
  return (
    <Container
      className="d-flex flex-column flex-fill rounded-2 p-3 text-start"
      style={{ backgroundColor: "var(--block-bg)" }}
    >
      {activeTaskId}
    </Container>
  );
}

export default Task;
