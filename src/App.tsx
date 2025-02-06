import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Countries from "./pages/Countries";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Navbar from "./pages/Navbar";
import NotFound from "./pages/NotFound"; 
import CountryDetails from "./pages/CountryDetails";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:countryName" element={<CountryDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
