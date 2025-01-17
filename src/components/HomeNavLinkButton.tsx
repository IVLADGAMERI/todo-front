import { useNavigate } from "react-router-dom";
import InlineButton from "./inlineButton/InlineButton";

function HomeNavLinkButton() {
  const navigate = useNavigate();
  return (
    <InlineButton
      className="text-center rounded-circle p-2"
      onClick={() => {
        navigate("/");
      }}
    >
      <h3 className="m-0"><i className="bi bi-house-door" /></h3>
    </InlineButton>
  );
}

export default HomeNavLinkButton;
