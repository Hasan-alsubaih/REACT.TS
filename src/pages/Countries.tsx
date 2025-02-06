import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Form } from "react-bootstrap";

interface Country {
  name: { common: string };
  capital?: string[];
  population: number;
  flags: { png: string };
  region: string;
}

const Countries: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) throw new Error("Failed to fetch countries");
        const data: Country[] = await response.json();
        setCountries(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="min-vh-100 p-4" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <h1 className="text-center text-white mb-4">🌍 Explore Countries</h1>

      <Form className="mb-4">
        <Form.Control
          type="text"
          placeholder="🔍 Search for a country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="rounded-pill p-3 shadow-sm"
        />
      </Form>

      <Row>
        {filteredCountries.map((country, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <Card
              className="shadow-lg border-0"
              onClick={() => navigate(`/countries/${encodeURIComponent(country.name.common)}`)}
              style={{
                cursor: "pointer",
                backgroundColor: "#f8f9fa",
                borderRadius: "15px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0px 4px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Card.Img variant="top" src={country.flags.png} alt={country.name.common} style={{ height: "180px", objectFit: "cover", borderRadius: "15px 15px 0 0" }} />
              <Card.Body className="text-center">
                <Card.Title style={{ fontWeight: "bold" }}>{country.name.common}</Card.Title>
                <Card.Text>
                  <strong>Region:</strong> {country.region}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Countries;
