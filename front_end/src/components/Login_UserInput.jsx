import React, { useState, useContext } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../App";
import { EyeCrossed, Eye } from "react-flaticons";
import { setCookie } from "./Cookie";

const UserInput = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });

  // Notify main app
  const { onLogin } = useContext(LoginContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input.username === "admin" && input.password === "admin") {
      onLogin();
      setCookie(input.username, true, 1);
      navigate("/admin");
    } else {
      alert("Username or password incorrect!");
    }
  };

  const buttonStyle = {
    height: "45px",
    border: "none",
    marginTop: "10px",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#213C4E"
  };

  // Toggle to hide password
  const [showPW, setShowPW] = useState(false);

  return (
    <>
      <div
        style={{
          margin: "auto",
          padding: "80px",
          color: "#213C4E",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Enter your username"
              name="username"
              value={input.username}
              onChange={(e) => {
                setInput({ ...input, username: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPW ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={input.password}
                onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
                }}
              />
              <Button
                style={{ width: "50px", backgroundColor: "#213C4E"}}
                onClick={() => setShowPW(!showPW)}
              >
                {showPW ? <Eye /> : <EyeCrossed />}
              </Button>
            </InputGroup>
          </Form.Group>
          <div
            className="text-center"
            style={{
              display: "grid",
              placeItems: "center",
              marginTop: "100px",
            }}
          >
            <Button type="submit" style={buttonStyle}>
              Log In
            </Button>
            <Button
              type="submit"
              variant="outline-secondary"
              style={buttonStyle}
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default UserInput;
