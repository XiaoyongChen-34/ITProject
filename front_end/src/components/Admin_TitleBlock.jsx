import React, { useState, useContext } from "react";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import { DataContext } from "../pages/Admin";
import { getEntry } from "../functions/connectDatabase";
import { contextInfo } from "../Information/Context_Info";
import { topicInfo } from "../Information/Topic_Info";

// Allows user to filter data based on their desire, and will be displayed in datablock
export default function SortBlockAdminPage() {
  const { students, setStudents } = useContext(DataContext);
  const [field, setField] = useState("None");
  const [input, setInput] = useState("");

  const handleOnClick = (type) => {
    setField(type);
  };

  const handleOnChange = (input) => {
    setInput(input);
  };

  const handleSearch = () => {
    console.log("User input:", input);
    getEntry(field, input, setStudents);
  };

  const handleAll = () => {
    getEntry("", "", setStudents);
  };

  const formSelectStyle = {
    width: "500px",
  };

  return (
    <>
      <div style={{ backgroundColor: "#666666", textAlign: "center" }}>
        <div style={{ padding: "50px" }}>
          <h1 style={{ fontWeight: "bold", color: "white" }}>
            Performance Records of
          </h1>
          <h1 style={{ fontWeight: "bold", color: "white" }}>Students</h1>
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <p1 style={{ color: "white", fontSize:"20px" }}>Filter data by:</p1>
          <div
            style={{
              maxWidth: "fit-content",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <ButtonToolbar
              className="mb-2"
              aria-label="Filter Fields"
              style={{justifyContent:"center"}}
            >
              <ButtonGroup className="me-2" aria-label="First group">
                <Button
                  value="Topic"
                  variant="secondary"
                  onClick={(e) => handleOnClick(e.target.value)}
                >
                  Topic
                </Button>
                <Button
                  value="Context"
                  variant="secondary"
                  onClick={(e) => handleOnClick(e.target.value)}
                >
                  Context
                </Button>
                <Button
                  value="Correctness"
                  variant="secondary"
                  onClick={(e) => handleOnClick(e.target.value)}
                >
                  Correctness
                </Button>
                <Button
                  value="Time"
                  variant="secondary"
                  onClick={(e) => handleOnClick(e.target.value)}
                >
                  Time spent
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            <ButtonToolbar aria-label="Filter Selection">
              <InputGroup>
                <InputGroup.Text style={{ width: "100px" }} id="input">
                  {field}
                </InputGroup.Text>
                <div>
                  {/* Change form text to form select if user decides to filter data based on time spent */}
                  {field === "Time" ? (
                    <Form.Select
                      style={formSelectStyle}
                      onChange={(e) => handleOnChange(e.target.value)}
                    >
                      <option value="">choose your option</option>
                      <option value="3">less than 3 mins</option>
                      <option value="5">less than 5 mins</option>
                      <option value="10">less than 10 mins</option>
                      <option value="null">more than 10 mins</option>
                    </Form.Select>
                  ) : field === "Correctness" ? (
                    <Form.Select
                      style={formSelectStyle}
                      onChange={(e) => handleOnChange(e.target.value)}
                    >
                      <option value="">choose your option</option>
                      <option value="False">Unsuccessful Attempts</option>
                      <option value="True">Successful Attempts</option>
                    </Form.Select>
                  ) : field === "Topic" ? (
                    <Form.Select
                      style={formSelectStyle}
                      onChange={(e) => handleOnChange(e.target.value)}
                    >
                      <option value="">choose your option</option>
                      {topicInfo.map((topic, index) => (
                        <option key={index} value={topic.heading}>
                          {topic.heading}
                        </option>
                      ))}
                    </Form.Select>
                  ) : field === "Context" ? (
                    <Form.Select
                      style={formSelectStyle}
                      onChange={(e) => handleOnChange(e.target.value)}
                    >
                      <option value="">choose your option</option>
                      {contextInfo.map((context, index) => (
                        <option key={index} value={context.heading}>
                          {context.heading}
                        </option>
                      ))}
                    </Form.Select>
                  ) : (
                    <Form.Select style={formSelectStyle} disabled></Form.Select>
                  )}
                </div>
              </InputGroup>
              <Button
                value="Search"
                variant="secondary"
                onClick={handleSearch}
                disabled={input === ""}
              >
                Apply Filter
              </Button>
              <Button value="Search" variant="secondary" onClick={handleAll}>
                All
              </Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    </>
  );
}
