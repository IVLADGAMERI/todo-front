import React from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { Route, Routes, useParams } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";

function App() {
  return (
    <Container fluid className="App min-vh-100 d-flex flex-column">
      <Routes>
        <Route
          index
          element={
            <Row className="d-flex flex-fill pt-4">
              <Col xl={3} lg={4} md={5} xs={12}>
                <Sidebar />
              </Col>
            </Row>
          }
        />
        <Route
          path="/task/:activeTaskId"
          element={
            <Row className="d-flex flex-fill pt-4">
              <Col xl={3} lg={4} md={5} xs={12}>
                <Sidebar />
              </Col>
            </Row>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
