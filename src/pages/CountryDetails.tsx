import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Spinner,
  Badge,
  Row,
  Col,
} from "react-bootstrap";

interface Country {
  name: { common: string };
  capital?: string[];
  population: number;
  flags: { png: string };
  region: string;
  subregion: string;
  currencies?: Record<string, { name: string; symbol: string }>;
  languages?: Record<string, string>;
  timezones?: string[];
  borders?: string[];
}

const CountryDetails: React.FC = () => {
  const { countryName } = useParams();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const data = await response.json();
        setCountry(data[0]);
      } catch (err) {
        console.error(err);
        navigate("/notfound");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryName, navigate]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading country details...</p>
      </Container>
    );
  }

  return (
    <Container
      fluid
      style={{
        background: "linear-gradient(to right, #2c3e50, #4ca1af)",
        minHeight: "100vh",
      }}
    >
      <Row
        className="justify-content-center align-items-start"
        style={{ paddingTop: "120px" }}
      >
        {/* Flag on the left */}
        <Col md={4} className="d-flex justify-content-center align-items-start">
          <img
            src={country?.flags.png}
            alt={country?.name.common}
            className="img-fluid rounded-circle shadow-lg"
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
          />
        </Col>

        {/* Country Info on the right */}
        <Col md={6} className="d-flex justify-content-center align-items-start">
          <Card
            className="shadow-lg rounded-4 p-4 w-100"
            style={{ background: "#f5f5f5" }}
          >
            <Card.Body>
              <Card.Title
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {country?.name.common}
              </Card.Title>
              <Card.Text style={{ color: "#555", fontSize: "1.1rem" }}>
                <strong>Capital:</strong> {country?.capital?.[0] || "N/A"}{" "}
                <br />
                <strong>Region:</strong> {country?.region} <br />
                <strong>Subregion:</strong> {country?.subregion} <br />
                <strong>Population:</strong>{" "}
                {country?.population.toLocaleString()} <br />
                <strong>Currencies:</strong>{" "}
                {country?.currencies
                  ? Object.values(country?.currencies)
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(", ")
                  : "N/A"}{" "}
                <br />
                <strong>Languages:</strong>{" "}
                {country?.languages
                  ? Object.values(country?.languages).join(", ")
                  : "N/A"}{" "}
                <br />
                <strong>Timezones:</strong>{" "}
                {country?.timezones?.join(", ") || "N/A"} <br />
                {country?.borders && (
                  <>
                    <strong>Borders:</strong>{" "}
                    {country?.borders.map((border, index) => (
                      <Badge key={index} bg="dark" className="me-1">
                        {border}
                      </Badge>
                    ))}
                  </>
                )}
              </Card.Text>
              <Button
                variant="info"
                onClick={() => navigate("/countries")}
                className="mt-3 px-4 py-2"
                style={{
                  backgroundColor: "#0069d9",
                  borderColor: "#0069d9",
                  color: "white",
                  transition: "all 0.3s ease",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  borderRadius: "5px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0069d9")
                }
              >
                🔙 Back to Countries
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CountryDetails;
