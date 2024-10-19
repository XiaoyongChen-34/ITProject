/**************************************************************
 *  Copyright 2024, All rights reserved, For internal use only
 *
 *  FILE:        Home.jsx
 *  PROJECT:     Parson's Problem
 *  MODULE:      Front_end
 *
 *  Description:
 *  Hosts the home/main page, main entry point of the program,
 *  initially displays cookies and nickname setting. Enables
 *  access to admin page, student page, problem page, etc.
 *
 *  Notes:
 *
 *
 *  REVISION HISTORY
 *  Date:        By:             Description:
 *  2024-08-10   Yiwen Zhang     Initial creation and setup of
 *                               Main.jsx
 *
 **************************************************************/

import React, { createContext, useState } from "react";
import Dropdown from "../components/Home_TitleDropdown";
import Navbar from "../components/Home_Navbar";
import FunctionalPanel from "../components/Home_PopularTopics";
import Cookie from "../components/Cookie";

export const CookieContext = createContext();

function Home() {
  const [showCookie, setShowCookie] = useState(false);
  return (
    <>
        <CookieContext.Provider value={{ showCookie, setShowCookie }}>
          <Navbar />
          <Dropdown />
          <div
            style={{
              borderTop: "2px solid #f5f5f5 ",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>
          <FunctionalPanel />
          <div
            style={{
              borderTop: "2px solid #f5f5f5 ",
              marginLeft: 20,
              marginRight: 20,
            }}
          ></div>

          <Cookie />
        </CookieContext.Provider>
    </>
  );
}

export default Home;
