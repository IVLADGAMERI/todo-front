import React, { useState } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import Main from "./components/Main";
import UserInfo from "./components/UserInfo";
import Task from "./components/task/Task";

function App() {
  const [loadingTopicsUpdate, setLoadingTopicsUpdate] = useState(false);
  return (
    <Container fluid className="App min-vh-100 d-flex flex-column text-white">
      <Routes>
        <Route
          index
          element={
            <Row className="d-flex flex-fill pt-4">
              <Col xl={3} lg={4} xs={12} className="d-flex flex-fill">
                <Sidebar
                  loadingUpdate={loadingTopicsUpdate}
                  setLoadingUpdate={setLoadingTopicsUpdate}
                />
              </Col>
              <Col
                xl={7}
                lg={6}
                md={12}
                xs={10}
                className="d-flex flex-column flex-fill pb-2"
              >
                <Main />
              </Col>
              <Col xs={12} lg={2}>
                <UserInfo />
              </Col>
            </Row>
          }
        />
        <Route
          path="/task/:activeTaskId"
          element={
            <Row className="d-flex flex-fill pt-4">
              <Col xl={3} lg={4} md={5} xs={12} className="d-flex flex-fill">
                <Sidebar
                  loadingUpdate={loadingTopicsUpdate}
                  setLoadingUpdate={setLoadingTopicsUpdate}
                />
              </Col>
              <Col
                className="d-flex flex-column flex-fill pb-4"
                xl={7}
                lg={5}
                md={12}
                xs={10}
              >
                <Task
                  setLoadingTopicsUpdate={setLoadingTopicsUpdate}
                  loadingTopicsUpdate={loadingTopicsUpdate}
                />
              </Col>
              <Col xs={12} lg={2}>
                <UserInfo />
              </Col>
            </Row>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
