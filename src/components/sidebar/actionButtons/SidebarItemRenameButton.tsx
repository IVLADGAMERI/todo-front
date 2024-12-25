import InlineButton from "../../inlineButton/InlineButton";

function SidebarItemRenameButton(props: { onClick: (event: any) => void }) {
  return (
    <InlineButton
      onClick={props.onClick}
      className="mx-1 p-1 rounded-2 d-flex justify-content-center align-items-center"
    >
      <i className="bi bi-pencil"></i>
    </InlineButton>
  );
}

export default SidebarItemRenameButton;
