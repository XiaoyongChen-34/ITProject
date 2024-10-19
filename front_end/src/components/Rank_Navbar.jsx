import React from "react";
import { Stack } from "react-bootstrap";
import { Home } from "react-flaticons";
import podium from "../images/podium-icon.png";

// A navigation bar for main page
export default function NavbarRank() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <Stack direction="horizontal" gap={1} style={{marginLeft:"10px"}}>
          <div className="p-1">
            <img src={podium} style={{ marginBottom: "10px", width:"50px"}} />
            <a
              className="navbar-brand m-2"
              href=""
              style={{ fontWeight: "500"}}
            >
              Leaderboard
            </a>
          </div>
          <div className="p-1" style={{ position: "absolute", right: "10px" }}>
            <a
              className="navbar-brand m-2"
              href="/"
              style={{ fontWeight: "500"}}
            >
              Home
            </a>
            <Home size="25px" style={{ marginBottom: "10px"}} />
          </div>
        </Stack>
      </nav>
    </>
  );
}
