import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #667eea, #764ba2)',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Login</h1>
        <form>
          <input
            type="text"
            placeholder="Username"
            style={{
              padding: '12px',
              margin: '10px 0',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
              fontSize: '16px',
            }}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            style={{
              padding: '12px',
              margin: '10px 0',
              borderRadius: '8px',
              border: '1px solid #ccc',
              width: '100%',
              boxSizing: 'border-box',
              fontSize: '16px',
            }}
          />
          <br />
          <button
            type="submit"
            style={{
              padding: '12px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              width: '100%',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: '0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
          >
            Login
          </button>
        </form>

        <div style={{ marginTop: '15px' }}>
          <p style={{ color: '#555', fontSize: '14px' }}>Don't have an account?</p>
          <button
            onClick={() => navigate('/signup')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff758c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: '0.3s',
              marginTop: '10px',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#ff5c7a')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff758c')}
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
