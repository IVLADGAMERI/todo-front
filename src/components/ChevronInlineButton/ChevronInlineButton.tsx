import s from "./ChevronInlineButton.module.css";
import InlineButton from "../InlineButton/InlineButton";

function ChevronInlineButton(props: {
  onClick: (event: any) => void;
  isActive: boolean;
  title: any;
}) {
  console.log(props.isActive);
  return (
    <InlineButton className="w-100" isActive={false}>
      <h6 onClick={props.onClick} className="m-0">
        <i
          className={`bi bi-chevron-right me-1 ms-1 d-inline-block ${
            s.buttonChevron
          } ${props.isActive ? s.activeButtonChevron : ""}`}
        />
        {props.title}
      </h6>
    </InlineButton>
  );
}

export default ChevronInlineButton;
