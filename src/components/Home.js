import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useUserAuth } from "../context/UserAuthContext";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [answer, setAnswer] = useState("");
  const [, setGeneratingAnswer] = useState(false);

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
    if (!inputText.trim()) {
      console.error("Input text is empty");
      setIsLoading(false);
      setGeneratingAnswer(false);
      return;
    }

    setIsLoading(true);
    setGeneratingAnswer(true);
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: inputText }] }],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    } finally {
      setIsLoading(false);
      setGeneratingAnswer(false);
    }
  };

  return (
    <>
      <h1 className="mt-4">AI Code Explainer App</h1>
      <div className="d-flex">
        <div className="container">
          <div className="text-box rounded-4">
            <textarea
              id=""
              name=""
              placeholder="Enter your code here"
              maxLength="100000"
              value={inputText}
              onChange={handleInputChange}
              className="form-control mb-2 bg-dark text-white"
            ></textarea>
            <Button className="button explain-button" onClick={handleGenerateText} disabled={isLoading}>
              {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : "Explain"}
            </Button>
          </div>
          <div className="text-box rounded-4">
            <textarea
              id=""
              name=""
              placeholder="Explanation of your code will appear here"
              readOnly
              value={answer || ""}
              className="form-control mb-2 bg-dark text-white"
            ></textarea>
          </div>
        </div>
      </div>
  
      <div className={`sidebar ${showSidebar ? "show" : "hide"}`}>
          <nav>
            <ul>
              <li><a href="home" style={{ fontSize: "24px" }}>EXPL<span style={{ fontWeight: "bold" }}>AI</span>NIFY</a></li>
              <li><a href="signup">Sign Up </a></li>
              <li><a href="/">Log In</a></li>
              <li><a href="home">Home</a></li>
              <li>
                <Button className="button logout-button" onClick={handleLogout}>
                  Log out
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <Button variant="secondary" onClick={toggleSidebar} className="toggle-btn">
          {showSidebar ? "<<" : ">>"}
        </Button>
    </>
  );
};

export default Home;
