import React from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ChatBubble from "../pages/ChatBubble";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      style={{
        padding: 0,
        margin: 0,
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Carousel indicators={false} controls={false} interval={3000} fade>
        {[
          "https://images.unsplash.com/photo-1600074169098-16a54d791d0d?q=80&w=2072&auto=format&fit=crop",
          "https://miro.medium.com/v2/resize:fit:1400/1*bYjx_RKWJtHhg-VU8wVqoA.jpeg",
          "https://www.gapyearworld.com/wp-content/uploads/2021/05/hands-600497_1280.jpg",
        ].map((image, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
                filter: "brightness(75%)",
                transition: "all 0.5s ease-in-out",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <ChatBubble />

      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <Button
          onClick={() => navigate("/countries")}
          variant="primary"
          style={{
            fontSize: "1.2rem",
            padding: "10px 30px",
            borderRadius: "30px",
            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
            backgroundColor: "red",
          }}
        >
          Explore Countries
        </Button>
      </div>
    </Container>
  );
};

export default Home;
