import SidebarItemRenameButton from "./SidebarItemRenameButton";
import SidebarItemDeleteButton from "./SidebarItemDeleteButton";

function SidebarItemActionButtons(props: {
  onEdit: (event: any) => void;
  onDelete: (event: any) => void;
}) {
  return (
    <div className="d-flex justify-content-center align-items-center flex-row">
      <SidebarItemRenameButton onClick={props.onEdit} />
      <SidebarItemDeleteButton onClick={props.onDelete} />
    </div>
  );
}

export default SidebarItemActionButtons;
