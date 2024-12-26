import { AxiosError } from "axios";
import axios from "axios";
import { Topic, UserDTO } from "./Types";

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
  onSuccess: (data: Topic[]) => void,
  onError: (error: AxiosError) => void
) {
  axios
    .post("http://localhost:8080/topic", { title }, { withCredentials: true })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
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
    .get("http://localhost:8080/user", { withCredentials: true })
    .then((response) => {
      onSuccess(response.data);
    })
    .catch((error) => {
      onError(error);
    });
}

export const authenticationUrl =
  "http://localhost:8080/oauth2/authorization/github";

export const logoutUrl = "http://localhost:8080/logout";
