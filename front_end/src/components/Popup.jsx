import React from "react";
import {Alert} from "react-bootstrap";

export default function Popup(props) {
  const alertStyle = {
    zIndex: "9999",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <div
        style={alertStyle}
      >
        <Alert key="info" variant={props.variant} dismissible>
          {props.message}
        </Alert>
      </div>
    </>
  );
}
