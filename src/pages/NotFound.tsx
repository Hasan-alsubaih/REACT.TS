import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container className="text-center mt-5">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Container>
  );
};

export default NotFound;
