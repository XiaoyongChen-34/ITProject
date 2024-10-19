/**************************************************************
 *  Copyright 2024, All rights reserved, For internal use only
 *
 *  FILE:        Admin.jsx
 *  PROJECT:     Parson's Problem
 *  MODULE:      Front_end
 *
 *  Description:
 *  Hosts the student performance page, retrieves student
 *  specific data from database based on nickname and ip stored
 *  in cookie. Sends update of nickname to database if changed.
 *
 *  Notes:
 *  
 *
 *  REVISION HISTORY
 *  Date:        By:             Description:
 *  2024-09-02   Xiaoyong Chen   Initial creation and setup of
 *                               Student.jsx
 *
 **************************************************************/

import React, { useState, useEffect, createContext } from "react";
import NavbarStudentPage from "../components/Student_Navbar";
import SortBlockStudentPage from "../components/Student_TitleBlock";
import DataTableStudentPage from "../components/Student_DataBlock";
import { getEntry } from "../functions/connectDatabase";
import { getCookie, hashIP } from "../components/Cookie"; // Assuming we placed cookie-related functions in utils/cookieUtils

export const DataContext = createContext();

// Student page that only shows data for the logged-in student
function Student() {
  const [filteredStudents, setFilteredStudents] = useState([]);

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

  useEffect(() => {
    // Fetch all student data and filter it
    getEntry("", "", async (data) => {
      const filteredData = await filterStudentData(data);
      setFilteredStudents(filteredData); // Set the filtered data
    });
  }, []);

  return (
    <>
      <NavbarStudentPage />
      <DataContext.Provider value={{ filteredStudents, setFilteredStudents }}>
        <SortBlockStudentPage />
        <DataTableStudentPage />
      </DataContext.Provider>
    </>
  );
}

export default Student;
