import { Button } from "react-bootstrap";
import InlineButton from "../inlineButton/InlineButton";

function SaveContentButton(props: {
  disabled: boolean;
  onClick: (event: any) => void;
}) {
  return (
    <Button
      variant="outline-primary"
      className="rounded-3 text-center p-2 d-flex justify-content-center align-items-center"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <h5 className="mb-0">
        <i className="bi bi-floppy"></i>
      </h5>
    </Button>
  );
}

export default SaveContentButton;
