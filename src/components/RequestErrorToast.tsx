import { Toast } from "react-bootstrap";

function RequestErrorToast(props: { show: boolean; onClose: () => void, message: string }) {
  return (
    <Toast
      style={{ position: "absolute", bottom: 0, right: 0 }}
      className="mb-2 me-2 text-start"
      autohide
      delay={5000}
      show={props.show}
      bg="danger"
      onClose={props.onClose}
    >
      <Toast.Header>
        <h6 className="mb-0 me-auto">Ошибка!</h6>
      </Toast.Header>
      <Toast.Body>{props.message}</Toast.Body>
    </Toast>
  );
}

export default RequestErrorToast;
