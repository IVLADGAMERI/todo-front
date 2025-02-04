import React, { createContext, ReactNode, useState } from "react";

interface Context {
  showMessage: (message: string) => void;
  show: boolean;
  message: string;
  close: () => void
}

export const RequestErrorToastContext = createContext<Context>({
  show: false,
  message: "",
  showMessage: () => {},
  close: () => {}
});

export function RequestErrorToastContextProvider(props: {
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState<string>("");
  const showMessage = (message: string) => {
    setShow(false);
    setMessage(message);
    setShow(true);
  };
  return (
    <RequestErrorToastContext.Provider
      value={{
        message: message,
        show: show,
        showMessage: showMessage,
        close: () => setShow(false)
      }}
    >
      {props.children}
    </RequestErrorToastContext.Provider>
  );
}
