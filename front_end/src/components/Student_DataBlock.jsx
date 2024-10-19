import React, { useContext, useState } from "react";
import { DataContext } from "../pages/Student";
import { Table, Accordion, Pagination } from "react-bootstrap";
import { StudentPageColor } from "../Information/Problem_Color";
import heading from "../images/performance_page_heading.gif";

// A block that displays information from database
export default function DataTableStudentPage() {
  const { filteredStudents } = useContext(DataContext);

  const microColumn = {
    width: "35px",
  };

  const miniColumn = {
    width: "60px",
  };

  const smallColumn = {
    width: "100px",
  };

  const mediumColumn = {
    width: "200px",
    whiteSpace: "nowrap",
    overflow: "clip",
    textOverflow: "ellipsis",
  };

  const largeColumn = {
    width: "380px",
    whiteSpace: "nowrap",
    overflow: "clip",
    textOverflow: "ellipsis",
  };

  // Pagination
  const entriesPerPage = 10;

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastStudent = currentPage * entriesPerPage;
  const indexOfFirstStudent = indexOfLastStudent - entriesPerPage;
  const currentStudents = filteredStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );
  const totalPages = Math.ceil(filteredStudents.length / entriesPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
        variant="success"
      >
        {i}
      </Pagination.Item>
    );
  }

  const [isHover, setIsHover] = useState(false);
  // Achieve a floating card effect
  const loginCardStyle = {
    backgroundColor: "white",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: isHover
      ? "0 20px 40px rbga(0, 0, 0, 0.5)"
      : "0 8px 16px rgba(0, 0, 0, 0.2)",
    height: "80vh",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    margin: "auto",
    transform: isHover ? "translateY(-10px)" : "translateY(0)",
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ margin: "20px" }}>
          <img src={heading}></img>
        </div>

        <div
          className="center"
          style={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}
        >
          <Accordion>
            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              style={{
                overflowY: "auto",
                height: "80vh",
                overflowX: "auto",
                border: `5px solid ${StudentPageColor.titleBlockBg}`,
                borderRadius: "20px",
                ...loginCardStyle,
              }}
            >
              <Table
                striped
                bordered
                hover
                className="center"
                style={{ tableLayout: "fixed" }}
              >
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: "#fff",
                  }}
                >
                  <tr>
                    <th style={microColumn}>No.</th>
                    <th style={smallColumn}>Hashed IP</th>
                    <th style={smallColumn}>Start Time</th>
                    <th style={miniColumn}>Time</th>
                    <th style={smallColumn}>Submit Time</th>
                    <th style={smallColumn}>Topic</th>
                    <th style={smallColumn}>Context</th>
                    <th style={largeColumn}>Question</th>
                    <th style={smallColumn}>Correctness</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.length > 0 ? (
                    currentStudents.map((student, index) => (
                      <tr key={index}>
                        <td style={smallColumn}>
                          {indexOfFirstStudent + index + 1}
                        </td>
                        <td style={mediumColumn}>{student.IP}</td>
                        <td style={smallColumn}>
                          {student.StartTime &&
                          !isNaN(new Date(student.StartTime))
                            ? new Date(student.StartTime).toLocaleString(
                                "en-US",
                                { timeZone: "UTC" }
                              )
                            : "N/A"}
                        </td>
                        <td style={smallColumn}>{student.Attempt[0]?.Time}</td>
                        <td style={smallColumn}>
                          {student.Attempt[0]?.SubmitTime &&
                          !isNaN(new Date(student.Attempt[0]?.SubmitTime))
                            ? new Date(
                                student.Attempt[0]?.SubmitTime
                              ).toLocaleString("en-US", { timeZone: "UTC" })
                            : "N/A"}
                        </td>
                        <td style={smallColumn}>{student.Topic}</td>
                        <td style={smallColumn}>{student.Context}</td>
                        <td style={largeColumn}>
                          <Accordion.Item eventKey={index}>
                            <Accordion.Header>Click to expand</Accordion.Header>
                            <Accordion.Body style={{ textAlign: "left" }}>
                              {student.Question.map((line, index) => (
                                <pre key={index}>{line}</pre>
                              ))}
                            </Accordion.Body>
                          </Accordion.Item>
                        </td>
                        <td style={smallColumn}>
                          <p>
                            {student.Attempt.length === 0
                            ? "N/A"
                            : student.Attempt.length > 0 &&
                              student.Attempt[0]?.Correctness
                            }
                            {console.log(student.Attempt)}

                          </p>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Accordion>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination>{pages}</Pagination>
          </div>
        </div>
      </div>
    </>
  );
}
