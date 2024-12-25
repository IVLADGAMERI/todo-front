import InlineButton from "../../inlineButton/InlineButton";

function SidebarItemDeleteButton(props: { onClick: (event: any) => void }) {
  return (
    <InlineButton
      onClick={props.onClick}
      className="mx-1 p-1 rounded-2 d-flex justify-content-center align-items-center"
    >
      <i className="bi bi-trash"></i>
    </InlineButton>
  );
}

export default SidebarItemDeleteButton;
