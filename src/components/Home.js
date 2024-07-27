import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [inputText, setInputText] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerateText = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBJZ3bntauZYDFyqxCPH-Om16ctymz_gwg`,
        data: {
          prompt: inputText,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setGeneratedText(response.data.generatedContent);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  };

  return (
    <div className="d-flex">
      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
        <nav>
          <ul>
            <li><a style={{ fontSize: "32px" }} href="home">Cod EX</a></li>
            <li><a href="signup">Sign Up </a></li>
            <li><a href="/">Log In</a></li>
            <li><a href="home">Home</a></li>
            <li><Button variant="primary" onClick={handleLogout}>
              Log out
            </Button></li>
          </ul>
        </nav>
      </div>
      <Button variant="secondary" onClick={toggleSidebar} className="toggle-btn">
        {showSidebar ? "<<" : ">>"}
      </Button>
      <div className="content flex-grow-1 p-4">
        <div className="p-4 box mt-3 text-center">
          <h1 style={{ fontSize: "32px" }}>Welcome</h1>
          <p style={{ fontSize: "18px" }}>{user && user.email}</p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Enter text to generate"
            className="form-control mb-2"
          />
          <Button variant="primary" onClick={handleGenerateText}>
            Generate Text
          </Button>
        </div>
        {generatedText && (
          <div className="mt-4 p-4 box">
            <h3>Generated Text:</h3>
            <p>{generatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
