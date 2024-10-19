/**************************************************************
 *  Copyright 2024, All rights reserved, For internal use only
 *
 *  FILE:        Admin.jsx
 *  PROJECT:     Parson's Problem
 *  MODULE:      Front_end
 *
 *  Description:
 *  Hosts the admin account page, retrieves data from the database
 *  to display, data fetched is stored in 'students'.
 *
 *  Notes:
 *  
 *
 *  REVISION HISTORY
 *  Date:        By:             Description:
 *  2024-08-14   Yiwen Zhang     Initial creation and setup of
 *                               Admin.jsx
 *
 **************************************************************/

import React from "react";
import { useState, useEffect, createContext } from "react";
import NavbarAdminPage from "../components/Admin_Navbar";
import SortBlockAdminPage from "../components/Admin_TitleBlock";
import DataTableAdminPage from "../components/Admin_DataBlock";
import { getEntry } from "../functions/connectDatabase";

export const DataContext = createContext();

// Admin page for administrator to access data
function Admin() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getEntry("", "", setStudents)
  }, []);

  return (
    <>
      <NavbarAdminPage></NavbarAdminPage>
      
      <DataContext.Provider value={{ students, setStudents }}>
        <SortBlockAdminPage></SortBlockAdminPage>
        <DataTableAdminPage></DataTableAdminPage>
      </DataContext.Provider>
      <div
        style={{
          borderTop: "2px solid #f5f5f5 ",
          marginLeft: 20,
          marginRight: 20,
        }}
      ></div>
    </>
  );
}

export default Admin;
