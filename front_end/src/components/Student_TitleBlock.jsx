import React, { useState, useContext, useRef, useEffect } from "react";
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import { getCookie, setCookie } from "./Cookie.jsx";
import { DataContext } from "../pages/Student";
import { getEntry } from "../functions/connectDatabase";
import { topicInfo } from "../Information/Topic_Info.jsx";
import { contextInfo } from "../Information/Context_Info.jsx";
import { StudentPageColor } from "../Information/Problem_Color.jsx";

// Allows user to filter data based on their desire, and will be displayed in datablock
export default function SortBlockStudentPage() {
  const { filteredStudents, setFilteredStudents } = useContext(DataContext);
  const [field, setField] = useState("None");
  const [input, setInput] = useState("");
  const titleRef = useRef(null);
  const [nickname, setNickname] = useState("User");

  const handleBlur = () => {
    const newNickname = titleRef.current.innerText.trim();
    if (newNickname === "") {
      titleRef.current.innerText = "User";
    } else if (newNickname !== nickname) {
      setNickname(newNickname);
      setCookie("nickname", newNickname, 180);
      const ipArray = JSON.parse(getCookie("ipArray"));
      console.log({
        oldNickname: nickname,
        newNickname: newNickname,
        ipArray: ipArray,
      });
      fetch("http://localhost:3001/updateNickname", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldNickname: nickname,
          newNickname: newNickname,
          ipArray: ipArray,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Nickname updated in database:", data);
        })
        .catch((error) => {
          console.error("Error updating nickname:", error);
        });

      console.log("Nickname updated and saved to cookie:", newNickname);
    }
  };

  // Handle keyboard events to detect the Enter key
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents a new line
      titleRef.current.blur(); // Trigger blur, calling handleBlur
    }
  };

  // Add global click event listener
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (titleRef.current && !titleRef.current.contains(event.target)) {
        titleRef.current.blur(); // If click happens outside titleRef, trigger blur
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch nickname from cookie when the page loads
  useEffect(() => {
    const storedNickname = getCookie("nickname");
    if (storedNickname) {
      setNickname(storedNickname); // Set the state with the nickname from the cookie
      if (titleRef.current) {
        titleRef.current.innerText = storedNickname; // Set the displayed text
      }
    }
  }, []);

  const handleOnClick = (type) => {
    setField(type);
  };

  const handleOnChange = (input) => {
    setInput(input);
  };

  // Function to filter students based on nickname and IP hash
  const filterStudentData = async (students) => {
    const nickname = getCookie("nickname"); // Get the nickname from the cookie
    const ipArray = JSON.parse(getCookie("ipArray") || "[]"); // Get the IP hash list from the cookie

    if (!nickname || ipArray.length === 0) {
      console.error("No nickname or IP data found.");
      return [];
    }

    // Filter student data that matches the nickname and IP hash
    const filteredData = await Promise.all(
      students.map(async (student) => {
        return student.Name === nickname && ipArray.includes(student.IP)
          ? student
          : null;
      })
    );

    // Remove null results
    return filteredData.filter((student) => student !== null);
  };

  const handleSearch = () => {
    console.log("User input:", input);
    getEntry(field, input, async (data) => {
      const filteredData = await filterStudentData(data);
      setFilteredStudents(filteredData); // Set the filtered data
    });
  };

  const handleAll = () => {
    getEntry("", "", async (data) => {
      const filteredData = await filterStudentData(data);
      setFilteredStudents(filteredData); // Set the filtered data
    });
  };

  const formSelectStyle = {
    width: "500px",
  };

  const textStyle = {color: `${StudentPageColor.textInButton}`, fontWeight:"600"}

  return (
    <>
      <div style={{ backgroundColor: `${StudentPageColor.titleBlockBg}`, textAlign: "center" }}>
        <div style={{ padding: "40px" }}>
          <h1
            ref={titleRef}
            style={{
              fontWeight: "bold",
              borderBottom: "5px solid white",
              color: "white",
              fontSize: "72px",
              display: "inline-block",
              margin: "0 auto",
              outline: "none",
              fontFamily: 'Archive, sans-serif',
            }}
            contentEditable="true"
            suppressContentEditableWarning={true}
            spellCheck="false"
            onBlur={handleBlur} // Trigger when losing focus to check content
            onKeyDown={handleKeyDown} // Detect keyboard events
          >
            {nickname}
          </h1>
          {/* Add small text below the title */}
          <p style={{ color: "white", fontSize: "18px", marginTop: "0px" }}>
            Edit your name
          </p>
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
