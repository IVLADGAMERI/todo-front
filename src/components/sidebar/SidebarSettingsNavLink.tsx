import { useNavigate } from "react-router-dom";
import InlineButton from "../inlineButton/InlineButton";

function SidebarSettingsNavLink() {
  const navigate = useNavigate();
  return (
    <InlineButton className="text-center rounded-3" onClick={() => navigate("/settings/sidebar")}>
      <i className="bi bi-gear text-white"></i>
    </InlineButton>
  );
}

export default SidebarSettingsNavLink;
