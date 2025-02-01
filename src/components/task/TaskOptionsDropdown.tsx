import OptionsDropdown from "../dropdowns/OptionsDropdown";
import { Dropdown } from "react-bootstrap";
import SpinnerSvgAnimated from "../SpinnerSvgAnimated";

function TaskOptionsDropdown(props: {
  isSaved: boolean;
  isSaveLoading: boolean;
  onDelete: (event: any) => void;
  onSave: (event: any) => void;
  onEdit: (event: any) => void;
}) {
  const saveItem = (
    <Dropdown.Item onClick={props.onSave}>
      <i className="bi bi-floppy me-2"></i>
      Сохранить
    </Dropdown.Item>
  );
  const savedItem = (
    <Dropdown.Item disabled>
      <i className="bi bi-check-lg me-2"></i>
      Сохранено
    </Dropdown.Item>
  );
  const saveLoadingItem = (
    <Dropdown.Item disabled>
      <SpinnerSvgAnimated />
      <span className="me-2"></span>
      Сохранение...
    </Dropdown.Item>
  );
  return (
    <OptionsDropdown>
      <Dropdown.Item onClick={props.onEdit}>
        <i className="bi bi-pencil me-2" />
        Изменить
      </Dropdown.Item>
      {props.isSaveLoading
        ? saveLoadingItem
        : props.isSaved
        ? savedItem
        : saveItem}
      <Dropdown.Divider />
      <Dropdown.Item className="text-danger" onClick={props.onDelete}>
        <i className="bi bi-trash3 me-2" />
        Удалить
      </Dropdown.Item>
    </OptionsDropdown>
  );
}

export default TaskOptionsDropdown;
