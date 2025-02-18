import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { register, error, user } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register(email, password);
    // .then(() => {
    //   navigate('/login');
    // })
    // .catch((error) => {
    //   setMessage('Registration failed, please try again.');
    //   console.error(error);
    // });
  };
  useEffect(() => {
    user && navigate("/");
  }, [user]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "linear-gradient(to right, #ff758c, #ff7eb3)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>Sign Up</h1>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "12px",
              margin: "10px 0",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
              fontSize: "16px",
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              margin: "10px 0",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
              fontSize: "16px",
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              margin: "10px 0",
              borderRadius: "8px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
              fontSize: "16px",
            }}
            required
          />
          <button
            type="submit"
            style={{
              padding: "12px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              fontSize: "16px",
              fontWeight: "bold",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Sign Up
          </button>
        </form>

        <div style={{ marginTop: "15px" }}>
          <p style={{ color: "#555", fontSize: "14px" }}>
            Already have an account?{" "}
            <a
              href="/login"
              style={{
                color: "#ff758c",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
