import OptionsDropdown from "../Dropdowns/OptionsDropdown";
import { Dropdown } from "react-bootstrap";
import SpinnerSvgAnimated from "../SpinnerSvgAnimated";
import { useParams } from "react-router-dom";
import {
  deleteTaskById,
  finishTask,
} from "../../Requests";
import { useState } from "react";
import { AxiosError } from "axios";

function TaskOptionsDropdown(props: {
  isSaved: boolean;
  isLoadingSavedUpdate: boolean;
  isFinished: boolean;
  onDeleteSuccess: () => void;
  onDelete: () => void;
  onDeleteError: (error: AxiosError) => void;
  onSave: () => void;
  onFinish: () => void;
  onFinishSuccess: () => void;
  onFinishError: (error: AxiosError) => void;
  onEdit: (event: any) => void;
}) {
  const { activeTaskId } = useParams();
  const activeTaskIdNumber = activeTaskId
    ? Number.parseInt(activeTaskId)
    : null;
  const [loadingFinishedUpdate, setLoadingFinishedUpdate] = useState(false);
  const [loadingDeleteUpdate, setLoadingDeleteUpdate] = useState(false);
  const deleteTaskCallback = () => {
    if (activeTaskIdNumber) {
      props.onDelete();
      setLoadingDeleteUpdate(true);
      deleteTaskById(
        { id: activeTaskIdNumber },
        () => {
          setLoadingDeleteUpdate(false);
          props.onDeleteSuccess();
        },
        (error) => {
          setLoadingDeleteUpdate(false);
          props.onDeleteError(error);
        }
      );
    }
  };
  const finishTaskCallback = () => {
    if (activeTaskIdNumber) {
      props.onFinish();
      setLoadingFinishedUpdate(true);
      finishTask(
        { id: activeTaskIdNumber },
        () => {
          props.onFinishSuccess();
          setLoadingFinishedUpdate(false);
        },
        (error) => {
          props.onFinishError(error);
          setLoadingFinishedUpdate(false);
        }
      );
    }
  };
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
    <Dropdown.Item onClick={finishTaskCallback}>
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
  const deleteItem = (
    <Dropdown.Item className="text-danger" onClick={deleteTaskCallback}>
      <i className="bi bi-trash3 me-2" />
      Удалить
    </Dropdown.Item>
  );
  const loadingDeleteUpdateItem = (
    <Dropdown.Item
      className="text-danger"
      onClick={deleteTaskCallback}
      disabled
    >
      <i className="bi bi-trash3 me-2" />
      Удаляется...
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
      {loadingFinishedUpdate
        ? loadingFinishUpdateItem
        : props.isFinished
        ? finishedItem
        : finishItem}
      <Dropdown.Divider />
      {loadingDeleteUpdate ? loadingDeleteUpdateItem : deleteItem}
    </OptionsDropdown>
  );
}

export default TaskOptionsDropdown;