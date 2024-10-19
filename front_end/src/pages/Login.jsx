/**************************************************************
 *  Copyright 2024, All rights reserved, For internal use only
 *
 *  FILE:        Login.jsx
 *  PROJECT:     Parson's Problem
 *  MODULE:      Front_end
 *
 *  Description:
 *  Hosts the log in page, before user can access admin page.
 *
 *  Notes:
 *  Automatically directs to admin page if user has a log in
 *  cookie.
 *
 *
 *  REVISION HISTORY
 *  Date:        By:             Description:
 *  2024-08-14   Huisoo Kim      Initial creation and setup of
 *                               Login.jsx
 *
 **************************************************************/

import React, { useState } from "react";
import UserInput from "../components/Login_UserInput";

// Login page
function Login() {
  // Whether mouse is hovering over the login card
  const [isHover, setIsHover] = useState(false);

  const loginContainerStyle = {
    display: "flex",
    justfiyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#213C4E",
  };

  // Achieve a floating card effect
  const loginCardStyle = {
    backgroundColor: "#7B949C",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: isHover
      ? "0 20px 40px rbga(0, 0, 0, 0.5)"
      : "0 8px 16px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "700px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    margin: "auto",
    transform: isHover ? "translateY(-10px)" : "translateY(0)",
  };

  return (
    <>
      <div style={loginContainerStyle}>
        <div
          style={loginCardStyle}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div style={{ width: "100%" }}>
            <h1
              style={{
                textAlign: "center",
                paddingTop: "50px",
                fontFamily: "bitter, serif",
                color: "#213C4E",
                fontSize: "50px",
              }}
            >
              Log In
            </h1>
          </div>
          <UserInput />
        </div>
      </div>
    </>
  );
}

export default Login;
