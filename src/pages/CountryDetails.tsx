import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Badge } from "react-bootstrap";

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
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName ? countryName :"")}?fullText=true`);
        if (!response.ok) throw new Error("Country not found");

        const data: Country[] = await response.json();
        if (data.length > 0) {
          setCountry(data[0]);
        } else {
          navigate("/notfound");
        }
      } catch (err) {
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
    <Container className="mt-5">
      <Card className="shadow-lg text-center p-4" style={{ background: "linear-gradient(to right, #ff7e5f, #feb47b)", borderRadius: "15px" }}>
        <Card.Img variant="top" src={country?.flags.png} alt={country?.name.common} className="w-50 mx-auto" />
        <Card.Body>
          <Card.Title className="text-white" style={{ fontSize: "2rem", fontWeight: "bold" }}>{country?.name.common}</Card.Title>
          <Card.Text className="text-white">
            <strong>Capital:</strong> {country?.capital?.[0] || "N/A"} <br />
            <strong>Region:</strong> {country?.region} <br />
            <strong>Subregion:</strong> {country?.subregion} <br />
            <strong>Population:</strong> {country?.population.toLocaleString()} <br />
            <strong>Currencies:</strong> {country?.currencies ? Object.values(country?.currencies).map((c) => `${c.name} (${c.symbol})`).join(", ") : "N/A"} <br />
            <strong>Languages:</strong> {country?.languages ? Object.values(country?.languages).join(", ") : "N/A"} <br />
            <strong>Timezones:</strong> {country?.timezones?.join(", ") || "N/A"} <br />
            {country?.borders && (
              <>
                <strong>Borders:</strong>{" "}
                {country?.borders.map((border, index) => (
                  <Badge key={index} bg="dark" className="me-1">{border}</Badge>
                ))}
              </>
            )}
          </Card.Text>
          <Button variant="light" onClick={() => navigate("/countries")} className="mt-3">
            🔙 Back to Countries
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CountryDetails;
