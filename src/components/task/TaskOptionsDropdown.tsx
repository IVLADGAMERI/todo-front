import OptionsDropdown from "../dropdowns/OptionsDropdown";
import { Dropdown } from "react-bootstrap";
import SpinnerSvgAnimated from "../SpinnerSvgAnimated";

function TaskOptionsDropdown(props: {
  isSaved: boolean;
  isLoadingSavedUpdate: boolean;
  isFinished: boolean;
  isLoadingFinishedUpdate: boolean;
  onDelete: (event: any) => void;
  onSave: (event: any) => void;
  onEdit: (event: any) => void;
  onFinish: (event: any) => void;
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
  const finishItem = (
    <Dropdown.Item onClick={props.onFinish}>
      <i className="bi bi-check-circle me-2"></i>
      Завершить
    </Dropdown.Item>
  );
  const finishedItem = (
    <Dropdown.Item disabled>
      <i className="bi bi-check-circle me-2"></i>
      Завершена
    </Dropdown.Item>
  );
  const loadingFinishUpdateItem = (
    <Dropdown.Item disabled>
      <SpinnerSvgAnimated />
      <span className="me-2"></span>
      Завершение...
    </Dropdown.Item>
  );
  return (
    <OptionsDropdown>
      <Dropdown.Item onClick={props.onEdit} disabled={props.isFinished}>
        <i className="bi bi-pencil me-2" />
        Изменить
      </Dropdown.Item>
      {props.isLoadingSavedUpdate
        ? saveLoadingItem
        : props.isSaved
        ? savedItem
        : saveItem}
      {props.isLoadingFinishedUpdate
        ? loadingFinishUpdateItem
        : props.isFinished
        ? finishedItem
        : finishItem}
      <Dropdown.Divider />
      <Dropdown.Item className="text-danger" onClick={props.onDelete}>
        <i className="bi bi-trash3 me-2" />
        Удалить
      </Dropdown.Item>
    </OptionsDropdown>
  );
}

export default TaskOptionsDropdown;
