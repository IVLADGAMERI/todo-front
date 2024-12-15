import { AxiosError } from "axios";
import axios from "axios";
import { Topic } from "./Types";

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

export const authenticationUrl =
  "http://localhost:8080/oauth2/authorization/github";
