import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Image,
  Placeholder,
  Row,
} from "react-bootstrap";
import { authenticationUrl, getUserInfo, logoutUrl } from "../Requests";
import { UserDTO } from "../Types";

function UserInfo() {
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [login, setLogin] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  useEffect(() => {
    getUserInfo(
      (data: UserDTO) => {
        setAvatarUrl(data.imgUrl);
        setLogin(data.login);
        setProfileUrl(data.profileUrl);
        setLoading(false);
      },
      (error) => {
        console.log(error);
        window.location.href = authenticationUrl;
      }
    );
  }, [loading]);
  if (loading) {
    return (
      <Container
        fluid
        className="rounded-3 p-2"
        style={{ backgroundColor: "var(--block-bg)" }}
      >
        <Row className="d-flex flex-row align-items-center">
          <Placeholder xs={9} animation="glow" as={Col}>
            <Placeholder xs={12} />
          </Placeholder>
          <Placeholder animation="glow" xs={3} as={Col}>
            <Placeholder.Button xs={12} variant="danger" />
          </Placeholder>
        </Row>
      </Container>
    );
  } else {
    return (
      <Container
        fluid
        className="rounded-2 p-2"
        style={{ backgroundColor: "var(--block-bg)" }}
      >
        <Row className="d-flex flex-row align-items-center">
          <Col
            xs={3}
            className="d-flex aling-items-center justify-content-center"
          >
            <Image fluid roundedCircle src={avatarUrl} />
          </Col>
          <Col xs={6} className="d-flex flex-row align-items-center">
            <a
              href={profileUrl}
              className="d-inline-block text-truncate"
            >
              {login}
            </a>
          </Col>
          <Col xs={3}>
            <Button
              variant="outline-danger text-center rounded-2 px-2 py-1"
              onClick={() => (document.location.href = logoutUrl)}
            >
              <i className="bi bi-box-arrow-right"></i>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default UserInfo;
