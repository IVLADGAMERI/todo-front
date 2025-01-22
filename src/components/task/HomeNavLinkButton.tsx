import { useNavigate } from "react-router-dom";
import InlineButton from "../inlineButton/InlineButton";

function HomeNavLinkButton() {
  const navigate = useNavigate();
  return (
    <InlineButton
      className="text-center rounded-3 p-2"
      onClick={() => {
        navigate("/");
      }}
    >
      <h4 className="m-0">
        <i className="bi bi-arrow-left"></i>
      </h4>
    </InlineButton>
  );
}

export default HomeNavLinkButton;
