import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Image, Stack } from "react-bootstrap";
import { User } from "react-flaticons";
import { CookieContext } from "../pages/Home";
import { getCookie } from "./Cookie";

// Navigation bar for the main page
const Navbar = () => {
  const { setShowCookie } = useContext(CookieContext);

  // Makes sure the user cannot access the student's performance page if cookie
  // is not accepted
  const navigate = useNavigate();
  const handleStudentLogin = () => {
    if (getCookie("cookieAccepted") === "true") {
      navigate("/Student");
    } else {
      setShowCookie(true);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <Stack
        direction="horizontal"
        gap={1}
        style={{ paddingRight: "15px", paddingLeft: "15px", width: "100%" }}
      >
        <User color="#336995" size="25px" />
        <a className="navbar-brand m-2" href="Admin">
          Admin Login
        </a>
        <div className="vr" />
        <a className="navbar-brand m-2" href="#" onClick={handleStudentLogin}>
          Student Login
        </a>
        <div className="ms-auto"></div>
        <Image
          src="https://bis.amsi.org.au/wp-content/uploads/sites/91/2019/04/uom-pos3d_h_sm.png"
          width="200px"
        />
      </Stack>
    </nav>
  );
};

export default Navbar;
