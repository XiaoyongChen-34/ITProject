import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../pages/Admin";
import { Card, ListGroup, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

// A block that displays information from the database
export default function DataTableAdminPage() {
  const { students } = useContext(DataContext);
  const [activeStudentIndex, setActiveStudentIndex] = useState(null);
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [itemsToShow, setItemsToShow] = useState(20);

  // Initial load of first 20 students
  useEffect(() => {
    setDisplayedStudents(students.slice(0, itemsToShow));
  }, [students, itemsToShow]);

  // Function to load more students when user scrolls to the bottom
  const loadMoreStudents = () => {
    const nextItemsToShow = itemsToShow + 20;
    if (nextItemsToShow <= students.length) {
      setDisplayedStudents(students.slice(0, nextItemsToShow));
      setItemsToShow(nextItemsToShow);
    } else {
      setDisplayedStudents(students.slice(0, students.length));
      setItemsToShow(students.length);
    }
  };

  // Handle scrolling event to load more students
  const handleScroll = (e) => {
    const bottomReached =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 1;
    if (bottomReached) {
      loadMoreStudents();
    }
  };

  const cardStyle = {
    padding: "1px", // Adjusted padding for better structure
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    position: "relative", // Enable positioning for the flag icon
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontWeight: "600", padding: "40px" }}>
          Students Performance Data
        </h1>
        <div
          className="center"
          style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
        >
          <div style={{ display: "flex", marginBottom: "3%" }}>
            {/* Scrollable list of students on the left */}
            <div
              style={{ width: "30%", maxHeight: "80vh", overflowY: "auto" }}
              onScroll={handleScroll}
            >
              {displayedStudents.length > 0 ? (
                displayedStudents.map((student, index) => (
                  <Card
                    key={index}
                    style={{
                      ...cardStyle,
                      backgroundColor:
                        student.Attempt &&
                        student.Attempt.length > 0 &&
                        student.Attempt[0].Correctness === "True"
                          ? "#a7ffa6"
                          : "#ffa6a6",
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveStudentIndex(index)}
                    className={
                      activeStudentIndex === index
                        ? "border-primary"
                        : "border-light"
                    }
                  >
                    <Card.Body>
                      {console.log("flagg" + student.Flag)}
                      {student.Flag == "True" && (
                        <FontAwesomeIcon
                          icon={faFlag}
                          style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            color: "red",
                          }}
                        />
                      )}
                      <Card.Title style={{ textAlign: "left" }}>
                        {student.Name}
                      </Card.Title>
                      <Card.Text style={{ margin: "1px", textAlign: "left" }}>
                        Topic: {student.Topic}
                      </Card.Text>
                      <Card.Text style={{ textAlign: "right" }}>
                        Start Time:{" "}
                        {student.StartTime
                          ? new Date(student.StartTime).toLocaleString(
                              "en-US",
                              {
                                timeZone: "UTC",
                              }
                            )
                          : "N/A"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <ListGroup.Item>No data available</ListGroup.Item>
              )}
            </div>

            {/* Detailed information panel on the right */}
            <Card
              style={{
                ...cardStyle,
                width: "70%",
                padding: "20px",
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              {activeStudentIndex !== null && students[activeStudentIndex] ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <strong>Name:</strong> {students[activeStudentIndex].Name}
                    </div>
                    <div>
                      <strong>Hashed IP:</strong>{" "}
                      {students[activeStudentIndex].IP}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <strong>Topic:</strong>{" "}
                      {students[activeStudentIndex].Topic}
                    </div>
                    <div>
                      <strong>Start Time:</strong>{" "}
                      {students[activeStudentIndex].StartTime
                        ? new Date(
                            students[activeStudentIndex].StartTime
                          ).toLocaleString("en-US", {
                            timeZone: "UTC",
                          })
                        : "N/A"}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <strong>Context:</strong>{" "}
                      {students[activeStudentIndex].Context}
                    </div>
                    <div>
                      <strong>Submit Time:</strong>{" "}
                      {students[activeStudentIndex].SubmitTime
                        ? new Date(
                            students[activeStudentIndex].SubmitTime
                          ).toLocaleString("en-US", {
                            timeZone: "UTC",
                          })
                        : "N/A"}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <strong>Correctness:</strong>{" "}
                    {students[activeStudentIndex].Attempt.length > 0 &&
                    students[activeStudentIndex].Attempt[0].Correctness ===
                      "True"
                      ? "True"
                      : "False"}
                  </div>

                  {/* Question Section */}
                  <h5
                    style={{
                      textAlign: "left",
                      marginTop: "20px",
                      marginLeft: "3px",
                    }}
                  >
                    Question
                  </h5>
                  <div style={{ textAlign: "left" }}>
                    {students[activeStudentIndex].Question.map(
                      (line, lineIndex) => (
                        <pre key={lineIndex}>{line}</pre>
                      )
                    )}
                  </div>

                  {/* Attempts Accordion */}
                  <h5
                    style={{
                      textAlign: "left",
                      marginTop: "20px",
                      marginLeft: "3px",
                    }}
                  >
                    Attempts
                  </h5>
                  <Accordion defaultActiveKey="0">
                    {students[activeStudentIndex].Attempt.map(
                      (attempt, attemptIndex) => (
                        <Accordion.Item
                          eventKey={attemptIndex.toString()}
                          key={attemptIndex}
                        >
                          <Accordion.Header>
                            Attempt {attemptIndex + 1}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ textAlign: "left" }}>
                              Time: {attempt.Time}
                            </div>
                            <div style={{ textAlign: "left" }}>
                              Correctness: {attempt.Correctness}
                            </div>
                            <div style={{ textAlign: "left" }}>
                              Submit Time:{" "}
                              {new Date(attempt.SubmitTime).toLocaleString()}
                            </div>
                            <div style={{ textAlign: "left" }}>
                              <strong>Student Code:</strong>
                              {attempt.StudentCode.map(
                                (codeLine, codeIndex) => (
                                  <pre key={codeIndex}>{codeLine}</pre>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      )
                    )}
                  </Accordion>
                </>
              ) : (
                <div>
                  <h3>
                    Please select a question from the left list to view details.
                  </h3>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
