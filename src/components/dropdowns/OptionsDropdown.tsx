import { Dropdown } from "react-bootstrap";
import s from "./OptionsDropdown.module.css";
import {ReactNode } from "react";

function OptionsDropdown(props: { children: ReactNode }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        variant="secondary"
        className={`${s.customDropdownToggle} rounded-3 p-2 w-100 text-center`}
      >
        <h5 className="mb-0">
          <i className="bi bi-three-dots"></i>
        </h5>
      </Dropdown.Toggle>
      <Dropdown.Menu>{props.children}</Dropdown.Menu>
    </Dropdown>
  );
}

export default OptionsDropdown;
