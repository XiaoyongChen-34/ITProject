import React, { useState, useEffect, useContext, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EyeCrossed, Eye } from "react-flaticons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Stack, Button } from "react-bootstrap";
import { EntryContext } from "../App";
import { useNavigate } from "react-router-dom";
import { TimeContext } from "../pages/Problem";
import ProblemColor from "../Information/Problem_Color";

// Navigation bar at the top of the problem page
const Navbar_problem_page = () => {
  const [timerColor, setTimerColor] = useState(`${ProblemColor.timer}`);

  const [visible, setVisible] = useState(true);

  // Update time for storage
  const { entry, setEntry } = useContext(EntryContext);

  // Function to convert a time string (HH:MM:SS) back to total seconds
  const parseTime = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number); // Split the string and convert each part to a number
    return hours * 3600 + minutes * 60 + seconds; // Convert to total seconds
  };

  // Fetch time from local storage
  const [time, setTime] = useState(() => {
    const previousTime = localStorage.getItem("entry");
    return parseTime(JSON.parse(previousTime).time) + 1;
  });

  // Stop the timer when wait is set to true
  const { wait } = useContext(TimeContext);

  // Stores the timer interval
  const timerRef = useRef(null);
  // Stores the start time
  const startRef = useRef(Date.now());

  // Timer logic: Increment time every second, timers stops when page is closed,
  // continues to run when page is opened in the background
  useEffect(() => {
    if (!wait) {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - startRef.current) / 1000);
        setTime(time + elapsed);
        setEntry((entry) => ({ ...entry, time: formatTime(time + elapsed) }));
      }, 1000);

      return () => clearInterval(timerRef.current); // Cleanup interval on component unmount
    }
  }, [wait]);

  // Function to format time as HH:MM:SS and always make 2 digits using padStart(2,"0")
  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  };

  const navigate = useNavigate();
  // Return to home page when clicked
  const handleReturn = () => {
    navigate("/");
  };

  // Toggle timer visibility
  const toggleTimer = () => {
    timerColor === `${ProblemColor.timer}`
      ? setTimerColor(`${ProblemColor.timerBackground}`)
      : setTimerColor(`${ProblemColor.timer}`);
    setVisible(!visible);
  };

  return (
    <>
      <Stack
        direction="horizontal"
        gap={6}
        justify-content-end="true"
        style={{
          position: "sticky",
          top: 0,
          zIndex: "1",
          background: "rgb(0, 0, 0, 0.2)",
        }}
      >
        <div className="p-2">
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="3x"
            style={{ paddingLeft: "15px", cursor: "pointer" }}
            onClick={handleReturn}
          />
        </div>
        <div
          className="p-2 mx-auto"
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "700",
            fontSize: "35px",
          }}
        >
          Parson's Problem
        </div>
        <div className="p-2" style={{ display: "flex", alignItems: "center" }}>
          <div onClick={toggleTimer} style={{ cursor: "pointer" }}>
            {visible ? (
              <Eye
                size={"50px"}
                style={{
                  paddingRight: "5px",
                  color: `${ProblemColor.timerBackground}`,
                }}
              ></Eye>
            ) : (
              <EyeCrossed
                size={"50px"}
                style={{
                  paddingRight: "5px",
                  color: `${ProblemColor.timerBackground}`,
                }}
              ></EyeCrossed>
            )}
          </div>
          <Button
            variant="dark"
            disabled
            style={{
              borderRadius: "30px",
              borderWidth: "0px",
              backgroundColor: `${ProblemColor.timerBackground}`,
              color: `${timerColor}`,
            }}
          >
            {formatTime(time)}
          </Button>
        </div>
      </Stack>
    </>
  );
};

export default Navbar_problem_page;
