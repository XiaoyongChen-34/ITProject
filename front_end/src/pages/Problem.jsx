/**************************************************************
 *  Copyright 2024, All rights reserved, For internal use only
 *
 *  FILE:        Problem.jsx
 *  PROJECT:     Parson's Problem
 *  MODULE:      Front_end
 *
 *  Description:
 *  Hosts the problem page, users complete parson's problems here.
 *  Sends entry data to database, retrieves problem from back
 *  end based on users' choice.
 *
 *  Notes:
 *
 *
 *
 *  REVISION HISTORY
 *  Date:        By:             Description:
 *  2024-08-10   Huisoo Kim      Initial creation and setup of
 *                               Problem.jsx
 *
 **************************************************************/

import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Stack,
  Popover,
  Form,
  Button,
  Tooltip,
} from "react-bootstrap"; // Import Popover and Button
import Navbar_problem_page from "../components/Problem_Navbar";
import ParsonsProblem from "../components/Problem_DragDrop";
import ProblemOffcanvas from "../components/Problem_Offcanvas";
import Popup from "../components/Popup";
import ProblemButton from "../components/Problem_Button";
import { getProblem } from "../functions/connectBackend";
import { postEntry } from "../functions/connectDatabase";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faFontAwesome } from "@fortawesome/free-brands-svg-icons";
import "../components/Firework.css";
import {
  fas,
  faRotate,
  faFlag,
  faRotateRight,
  faCirclePlay,
  faThumbsUp,
  faListUl,
} from "@fortawesome/free-solid-svg-icons";
import { EntryContext } from "../App";
import bg3 from "../images/paper_grid_bg2.png";
library.add(fas, faTwitter, faFontAwesome);

export const TopicContext = React.createContext();
export const SubmitContext = React.createContext();
export const TimeContext = React.createContext();

// Main platform for user to complete parson's problem
export default function Problem() {
  // Records user's newest topic and context preference
  const { entry, setEntry, msg, setMsg, prevQuestion, setPrevQuestion } =
    useContext(EntryContext);

  // Calls the navbar component to stop the timer when regeneration button is pressed
  // so time can be reset for the next problem
  const [wait, setWait] = useState(false);

  const [showAlert, setShowAlert] = useState(0);

  // Add state for showing flag popover
  const [flagMessage, setFlagMessage] = useState("");
  const [email, setEmail] = useState("");

  // Firework control when user get their question right
  const [firework, setFirework] = useState(false);
  useEffect(() => {
    if (entry.correctness === "True") {
      console.log("true");
      setFirework(true);
      const timer = setTimeout(() => {
        setFirework(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [entry.correctness]);

  const handleSubmit = () => {
    console.log(entry);
    postEntry(entry, setEntry).then((response) => {
      // Successful submission will send alert to user, 1: successful attempt, 2 unsuccessful attempt
      console.log(response);
      if (response && response.status === 200) {
        if (entry.correctness === "True") {
          setShowAlert(1);
          setTimeout(() => {
            setShowAlert(0);
          }, 3000);
        } else if (entry.correctness === "False") {
          setShowAlert(2);
          setTimeout(() => {
            setShowAlert(0);
          }, 3000);
        }
      }
    });
  };

  // Hooker for offcanvas topic and context selection
  // Stage set to 1 for topic selection, set to 2 for context selection
  const [stage, setStage] = useState(0);
  const nextStage = () => (
    setStage((prevStage) => prevStage + 1), console.log(stage)
  );
  const lastStage = () => setStage(stage - 1);

  // Alters the reset state, the change will be pass to 'ParsonsProblem' component
  // and will move all blocks back to original position
  const [reset, setReset] = useState(false);
  const handleRetryButtonOnClick = () => setReset(!reset);
  const [run, setRun] = useState(false);
  const handleRunButton = () => setRun(true);

  // Creates a post request and sends the topic and context to the back end server
  const handleRegenerate = () => {
    setLoading(true);
    getProblem(
      { topic: entry.topic, context: entry.context },
      setMsg,
      setEntry
    );
    setWait(true);
    setEntry((entry) => ({
      ...entry,
      time: "00:00:00",
      correctness: "N/A",
      flag: "False",
      studentCode: "N/A",
    }));
    setReady(true);
  };

  const submitFlag = () => {
    const flagData = {
      email: email,
      message: flagMessage,
    };

    console.log("Flag submitted:", flagData); // You can send flagData to your backend here
    // Clear form fields after submission
    setFlagMessage("");
    setEmail("");
  };

  const [ready, setReady] = useState(false);

  // Continue fetch data from backend until the requested question is generated
  const [time, setTime] = useState(0);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Update previous question to be the current question when page refreshes
  useEffect(() => {
    setPrevQuestion(entry.question);
    console.log(entry);
    console.log("set!");
  }, []);

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
        entry.time !== "00:00:00" ||
        entry.flag !== "False" ||
        entry.studentCode !== "N/A" ||
        (prevQuestion && prevQuestion === entry.question)
      ) {
        const interval = setInterval(() => {
          // This will run every second
          setTime((time) => time + 1);
        }, 1000);
        console.log("Waiting for entry update");
        setEntry((entry) => ({ ...entry, time: "00:00:00" }));

        // Warn user to try again if request for a question was unsuccessful
        if (msg.message === "unsuccess") {
          setReady(false);
          setLoading(false);
          setMsg((msg) => ({ ...msg, message: "" }));
          setShowAlert(3);
          setTimeout(() => {
            setShowAlert(0);
          }, 3000);
        }

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
      } else {
        console.log(entry);
        postEntry(entry, setEntry);
        setReady(false);
        setLoading(false);
        window.location.reload();
      }
    }
  }, [ready, time]);

  // Popover content for the flag button using the Form template
  const flagPopover = (
    <Popover id="popover-flag">
      <Popover.Header as="h3">Report an Issue</Popover.Header>
      <Popover.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={flagMessage}
              onChange={(e) => setFlagMessage(e.target.value)} // Update flag message state
            />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicCheckbox"
          ></Form.Group>
        </Form>
        <Button
          variant="danger"
          onClick={submitFlag}
          style={{ marginTop: "10px" }}
        >
          Submit Flag
        </Button>
      </Popover.Body>
    </Popover>
  );

  const leftButtonSmall = {
    marginRight: "50%",
    cursor: "pointer",
    textAlign: "center",
  };

  const rightButtonSmall = {
    marginLeft: "50%",
    cursor: "pointer",
    textAlign: "center",
  };

  const stickyStack = {
    display: "flex",
    marginTop: "auto",
    bottom: 10,
    position: "sticky",
  };

  const regenerateOverlay = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Regenerate a question base on "{entry.topic}" and "{entry.context}"
    </Tooltip>
  );

  const topicOverlay = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Choose another topic and/or context
    </Tooltip>
  );

  const leftButtons = [
    {
      icon: faRotate,
      style: leftButtonSmall,
      handle: handleRegenerate,
      caption: "Regenerate",
      overlay: regenerateOverlay,
      trigger: "hover",
      placement: "right",
    },
    {
      icon: faListUl,
      style: leftButtonSmall,
      handle: nextStage,
      caption: "Topics",
      overlay: topicOverlay,
      trigger: "hover",
      placement: "right",
    },
    {
      icon: faFlag,
      style: leftButtonSmall,
      handle: () => {},
      caption: "Report",
      overlay: flagPopover,
      trigger: "click",
      placement: "right",
    },
  ];
  const rightButtons = [
    {
      icon: faRotateRight,
      style: rightButtonSmall,
      handle: handleRetryButtonOnClick,
      caption: "Retry",
      overlay: "",
    },
    {
      icon: faCirclePlay,
      style: rightButtonSmall,
      handle: handleRunButton,
      caption: "Run",
      overlay: "",
    },
    {
      icon: faThumbsUp,
      style: rightButtonSmall,
      handle: handleSubmit,
      caption: "Submit",
      overlay: "",
    },
  ];

  return (
    <>
      {/** Fireworks */}
      {firework && (
        <div>
          <div className="firework"></div>
          <div className="firework"></div>
          <div className="firework"></div>
        </div>
      )}

      {/** Alert overlays */}
      <div>
        {showAlert === 1 && (
          <Popup
            variant="success"
            message="Yeeeehaaaa! Successful Attempt Recorded to Database, CONGRATS!!!"
          ></Popup>
        )}
        {showAlert === 2 && (
          <Popup
            variant="danger"
            message="Unsuccessful Attempt Recorded :<"
          ></Popup>
        )}
        {showAlert === 3 && (
          <Popup
            variant="danger"
            message="Gemini couldn't respond, try changing the topic or context :<"
          ></Popup>
        )}
      </div>
      <div>
        {loading && (
          <Popup variant="dark" message="Gemini is thinking..."></Popup>
        )}
      </div>
      {/** Main page layout */}
      <div
        style={{
          backgroundImage: `url(${bg3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          maxHeight: "200vh",
          backgroundColor: "rgba(0,0,0,0.2)",
          position: "relative",
          backgroundAttachment: "fixed",
        }}
      >
        <TimeContext.Provider value={{ wait, setWait }}>
          <Navbar_problem_page></Navbar_problem_page>
        </TimeContext.Provider>
        <TopicContext.Provider
          value={{
            stage,
            nextStage,
            lastStage,
            setStage,
            entry,
            setEntry,
            handleRegenerate,
          }}
        >
          <ProblemOffcanvas></ProblemOffcanvas>
        </TopicContext.Provider>
        <Container fluid style={{ zIndex: "100" }}>
          <Row xs={12}>
            <Col xs={2} style={{ display: "flex" }}>
              <Stack direction="vertical" style={stickyStack}>
                {leftButtons.map((button, index) => (
                  <ProblemButton
                    key={index}
                    icon={button.icon}
                    style={button.style}
                    handleOnClick={button.handle}
                    caption={button.caption}
                    overlay={button.overlay}
                    trigger={button.trigger}
                    placement={button.placement}
                  ></ProblemButton>
                ))}
              </Stack>
            </Col>
            <Col xs={8} style={{ display: "flex" }}>
              <SubmitContext.Provider value={{ run, setRun, reset }}>
                <ParsonsProblem></ParsonsProblem>
              </SubmitContext.Provider>
            </Col>
            <Col
              xs={2}
              style={{
                display: "flex",
              }}
            >
              <Stack direction="vertical" style={stickyStack}>
                {rightButtons.map((button, index) => (
                  <ProblemButton
                    key={index}
                    icon={button.icon}
                    style={button.style}
                    handleOnClick={button.handle}
                    caption={button.caption}
                    overlay={button.overlay}
                  ></ProblemButton>
                ))}
              </Stack>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
