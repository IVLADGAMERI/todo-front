import { AxiosError } from "axios";
import axios from "axios";
import {
  AddTaskDTO,
  DeleteTaskDTO,
  GetTaskFullDTO,
  Task,
  TaskFullDTO,
  Topic,
  UpdateTaskContentDTO,
  UpdateTaskInfoDTO,
  UserDTO,
} from "./Types";

export function onUnauthorizedErrorDefault() {
  window.location.href = authenticationUrl;
}

export function getTopics(
  onSuccess: (data: Topic[]) => void,
  onError: (error: AxiosError) => void
) {
  axios
    .get("http://localhost:8080/topics", { withCredentials: true })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}

export function addTopic(
  title: string,
  onSuccess: () => void,
  onError: (error: AxiosError) => void
) {
  axios
    .post("http://localhost:8080/topic", { title }, { withCredentials: true })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      onError(error);
    });
}

export function addTask(
  data: AddTaskDTO,
  onSuccess: () => void,
  onError: (error: AxiosError) => void
) {
  axios
    .post("http://localhost:8080/task", data, { withCredentials: true })
    .then(() => {
      onSuccess();
    })
    .catch((error) => {
      console.log(data);
      onError(error);
    });
}

export function deleteTopic(
  id: number,
  onSuccess: (data: Topic[]) => void,
  onError: (error: AxiosError) => void
) {
  axios
    .delete("http://localhost:8080/topic", {
      data: { id: id },
      withCredentials: true,
    })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}

export function getUserInfo(
  onSuccess: (data: UserDTO) => void,
  onError: (error: AxiosError) => void
) {
  axios
    .get("http://localhost:8080/user", {
      withCredentials: true,
    })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}

export function getTaskFull(
  id: number,
  onSuccess: (data: TaskFullDTO) => void,
  onError: (error: AxiosError) => void
) {
  axios
    .get("http://localhost:8080/task", {
      params: { id: id },
      withCredentials: true,
    })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}

export function updateTaskContent(
  data: UpdateTaskContentDTO,
  onSuccess: (data: TaskFullDTO) => void,
  onError: (error: AxiosError) => void
) {
  axios
    .put("http://localhost:8080/task/content", data, { withCredentials: true })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}

export function deleteTaskById(
  data: DeleteTaskDTO,
  onSuccess: () => void,
  onError: (error: AxiosError) => void
) {
  axios.delete("http://localhost:8080/task", {data: data, withCredentials: true})
  .then(() => {
    onSuccess();
  })
  .catch((error) => {
    onError(error);
  })
}

export function updateTaskInfo(
  data: UpdateTaskInfoDTO,
  onSuccess: () => void,
  onError: (error: AxiosError) => void
) {
  axios.put("http://localhost:8080/task/info", data, {withCredentials: true})
  .then(() => {
    onSuccess();
  })
  .catch((error) => {
    onError(error);
  })
}

export const authenticationUrl =
  "http://localhost:8080/oauth2/authorization/github";

export const logoutUrl = "http://localhost:8080/logout";
