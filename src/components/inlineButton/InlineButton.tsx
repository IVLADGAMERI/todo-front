import { ReactElement } from "react";
import s from "./InlineButton.module.css";

function InlineButton(props: { children: ReactElement | string, isActive?: boolean, onClick?: (event: any) => void, className?: string}) {
  const { children } = props;
  console.log(props.isActive);
  return (
    <button
      className={`w-100 text-white text-start p-1 rounded ${s.button} ${
        props.isActive ? s.buttonActive : ""
      } ${props.className}`}
      onClick={props.onClick}
    >
      {children}
    </button>
  );
}

export default InlineButton;
