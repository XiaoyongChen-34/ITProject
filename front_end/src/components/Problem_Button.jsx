import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger } from "react-bootstrap";
import ProblemColor from "../Information/Problem_Color";
import "./Problem_Button.css";

export default function ProblemButton(props) {
  const buttonStyle = {
    fontSize: "50px",
    color: `${ProblemColor.buttons}`,
  };

  const buttonCaptionStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: `${ProblemColor.buttonCaptions}`,
    userSelect:"none",
  };

  return (
    <>
      {props.trigger === "hover" ? (
        <>
          <div style={props.style} className="problem-button">
            <OverlayTrigger
              placement={props.placement}
              overlay={props.overlay}
              delay={{ show: "10", hide: "40" }}
            >
              <FontAwesomeIcon
                className="icon"
                icon={props.icon}
                style={buttonStyle}
                onClick={props.handleOnClick}
              />
            </OverlayTrigger>
            <p className="caption" style={buttonCaptionStyle}>{props.caption}</p>
          </div>
        </>
      ) : props.trigger === "click" ? (
        <>
          <div style={props.style}  className="problem-button">
            <OverlayTrigger
              placement={props.placement}
              overlay={props.overlay}
              trigger={props.trigger}
            >
              <FontAwesomeIcon
                className="icon"
                icon={props.icon}
                style={buttonStyle}
                onClick={props.handleOnClick}
              />
            </OverlayTrigger>
            <p className="caption" style={buttonCaptionStyle}>{props.caption}</p>
          </div>
        </>
      ) : (
        <>
          <div style={props.style}  className="problem-button">
            <FontAwesomeIcon
              className="icon"
              icon={props.icon}
              style={buttonStyle}
              onClick={props.handleOnClick}
            />
            <p className="caption" style={buttonCaptionStyle}>{props.caption}</p>
          </div>
        </>
      )}
    </>
  );
}
