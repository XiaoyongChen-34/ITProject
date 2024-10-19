import React from "react";
import { Stack } from "react-bootstrap";
import { Home, Key } from "react-flaticons";

// A navigation bar for main page
export default function NavbarStudentPage() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <Stack direction="horizontal" gap={1}>
          <div className="p-1">
            <Key size="25px" style={{ marginBottom: "10px" }} />
            <a
              className="navbar-brand m-2"
              href=""
              style={{ fontWeight: "500" }}
            >
              Student Page
            </a>
          </div>
          <div className="p-1" style={{ position: "absolute", right: "0" }}>
            <a
              className="navbar-brand m-2"
              href="/"
              style={{ fontWeight: "500" }}
            >
              Home
            </a>
            <Home size="25px" style={{ marginBottom: "10px" }} />
          </div>
        </Stack>
      </nav>
    </>
  );
}
