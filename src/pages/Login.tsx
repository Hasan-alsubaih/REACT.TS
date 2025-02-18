import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function Login() {
  const navigate = useNavigate();
  const { login, error, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(email, password);
    // .then(() => {
    //   navigate('/');
    // })
    // .catch(() => {
    //   setError('Login failed. Please check your email and password.');
    // });
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setMessage("Check your email for password reset instructions");
        // setError('');
      })
      .catch(() => {
        // setError('Failed to send reset email. Please try again.');
        // setMessage('');
      });
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
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
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
        <h1 style={{ color: "#333", marginBottom: "20px" }}>Login</h1>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
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
              width: "100%",
            }}
          >
            Login
          </button>
        </form>

        <button
          onClick={handleForgotPassword}
          style={{
            marginTop: "10px",
            background: "none",
            color: "#007bff",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Forgot Password?
        </button>

        <div style={{ marginTop: "15px" }}>
          <p style={{ color: "#555", fontSize: "14px" }}>
            Don't have an account?{" "}
            <a
              href="/signup"
              style={{
                color: "#ff758c",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
