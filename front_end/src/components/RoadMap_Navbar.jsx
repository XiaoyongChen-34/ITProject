import React from "react";
import { Stack } from "react-bootstrap";
import { Home, Map } from "react-flaticons";

// A navigation bar for main page
export default function NavbarRoadMap() {
  return (
    <>
      <nav className="navbar navbar-expand-lg light">
        <Stack direction="horizontal" gap={1} style={{marginLeft:"10px"}}>
          <div className="p-1">
            <Map size="25px" style={{ marginBottom: "10px"}} />
            <a
              className="navbar-brand m-2"
              href=""
              style={{ fontWeight: "500"}}
            >
              Course Roadmap
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
