import React from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      style={{
        padding: "0",
        margin: "0",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* الكاروسيل مع تأثيرات سلسة */}
      <Carousel indicators={false} controls={false} interval={3000} fade>
        {[
          "https://images.unsplash.com/photo-1600074169098-16a54d791d0d?q=80&w=2072&auto=format&fit=crop",
          "https://images.pexels.com/photos/8828448/pexels-photo-8828448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        ].map((image, index) => (
          <Carousel.Item key={index}>
            <div
              style={{
                backgroundImage: `url('${image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                width: "100%",
                filter: "brightness(75%)", // تحسين وضوح النص
                transition: "all 0.5s ease-in-out",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* زر التنقل مع تأثيرات */}
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          zIndex: 10,
          animation: "fadeIn 1.5s ease-in-out",
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
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          Explore Countries
        </Button>
      </div>
    </Container>
  );
};

export default Home;
