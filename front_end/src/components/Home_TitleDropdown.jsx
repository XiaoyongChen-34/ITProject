import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Image,
  Container,
  Row,
  Col,
  Spinner,
  Stack,
  Form,
} from "react-bootstrap";
import { storeHashedIP, getCookie, handleNickname } from "./Cookie.jsx";
import { EntryContext } from "../App";
import { topicInfo } from "../Information/Topic_Info.jsx";
import { contextInfo } from "../Information/Context_Info.jsx";
import { getProblem } from "../functions/connectBackend";
import { postEntry } from "../functions/connectDatabase";
import { hashIP } from "../functions/encrypt";
import "./Home_TitleDropdown.css";

const Dropdown = () => {
  // Updated when user chooses a topic from the dropdown options
  const { entry, setEntry, msg, setMsg, prevQuestion, setPrevQuestion } =
    useContext(EntryContext);

  const [option, setOption] = useState({ topic: "", context: "" });

  // Update 'chosenOption'
  const handleTopicChange = (selectedOption) => {
    setOption((option) => {
      return { ...option, topic: selectedOption.target.value };
    });
    setEntry((entry) => {
      return { ...entry, topic: selectedOption.target.value };
    });
  };

  // Update 'chosenOption'
  const handleContextChange = (selectedOption) => {
    setOption((option) => {
      return { ...option, context: selectedOption.target.value };
    });
    setEntry((entry) => {
      return { ...entry, context: selectedOption.target.value };
    });
  };

  // Ready is set to true when the user made a request to generate a new problem
  const [ready, setReady] = useState(false);

  // Loading state: whether awaiting data to be collected from backend
  const [loading, setLoading] = useState(false);

  // Update previous question to be the current question when page refreshes
  useEffect(() => {
    setPrevQuestion(entry.question);
  }, []);

  // Sends the topic selected to the server and redirects to the problem page
  const navigate = useNavigate();
  const handleOnClick = () => {
    handleNickname();
    // if user accept cookie，check nickname (Will be 'Anonymous' if cookie not accepted)
    const nickname = getCookie("nickname");
    setEntry((entry) => ({ ...entry, name: nickname }));

    storeHashedIP();

    setLoading(true);
    getProblem(
      { topic: entry.topic, context: entry.context },
      setMsg,
      setEntry
    );
    setEntry((entry) => ({
      ...entry,
      time: "00:00:00",
      correctness: "N/A",
      flag: "False",
      studentCode: "N/A",
    }));
    setReady(!ready);
  };

  // Continue fetch data from backend until the requested question is generated
  const [time, setTime] = useState(0);

  // Checks output from backend every second once a request for a problem
  // is posted, and navigates to Problem page once the problem is received
  useEffect(() => {
    if (ready) {
      if (
        !msg.topic ||
        !msg.context ||
        msg.topic !== entry.topic ||
        msg.context !== entry.context ||
        !entry.ip ||
        !entry.question ||
        entry.correctness !== "N/A" ||
        entry.flag !== "False" ||
        entry.studentCode !== "N/A" ||
        (prevQuestion && prevQuestion === entry.question)
      ) {
        const interval = setInterval(() => {
          // This will run every second
          setTime((time) => time + 1);
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      } else {
        console.log(entry);
        postEntry(entry, setEntry);
        setReady(!ready);
        navigate("Problem");
      }
    }
  }, [ready, time]);

  // Fetch visitor ip address from an external api
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const hashedIp = await hashIP(data.ip);
        setEntry((entry) => ({
          ...entry,
          ip: hashedIp,
        }));
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    fetchIp();
  }, []);

  const buttonStyle = {
    borderRadius: "15px",
    width: "100%",
    height: "45px",
    backgroundColor: "#3F4346",
    color: "#FFFFFF",
    border: "none",
  };

  return (
    <>
      <Container fluid="lg" style={{ backgroundColor: "#fefefe" }}>
        <Row>
          <Col className="responsive-image">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "60vh",
              }}
            >
              <div className="image-blurred"></div>
            </div>
          </Col>

          <Col>
            <div className="p-5 heading-blurred" />

            <Stack direction="vertical" gap={2}>
              <Form.Select
                aria-label="Default select"
                onChange={handleTopicChange}
                style={{
                  width: "100%",
                  height: "45px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <option value="default">Choose a topic</option>
                {topicInfo.map((topic, index) => (
                  <option key={index} value={topic.heading}>
                    {topic.heading}
                  </option>
                ))}
              </Form.Select>
              <Form.Select
                aria-label="Default select"
                onChange={handleContextChange}
                style={{
                  width: "100%",
                  height: "45px",
                  cursor: "pointer",
                  borderRadius: "10px",
                }}
              >
                <option value="default">Choose a context</option>
                {contextInfo.map((context, index) => (
                  <option key={index} value={context.heading}>
                    {context.heading}
                  </option>
                ))}
              </Form.Select>

              {/* Button is not clickable when either topic or context is not selected by user */}
              {/* Button is set to loading and unclickable when user clicks generate */}
              {loading ? (
                <Button
                  style={buttonStyle}
                  className="Generate Button"
                  disabled
                >
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>
              ) : (
                <Button
                  style={buttonStyle}
                  className="Generate Button"
                  onClick={handleOnClick}
                  disabled={
                    option.topic == "default" ||
                    !option.topic ||
                    option.context == "default" ||
                    !option.context
                  }
                >
                  Generate
                </Button>
              )}
              <Button style={buttonStyle} onClick={() => navigate("Problem")}>
                Continue Last Question
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dropdown;
