import React, { useContext } from "react";
import { Offcanvas, Stack, Button } from "react-bootstrap";
import { TopicContext } from "../pages/Problem";
import TopicCards from "./Problem_TopicCards";
import ContextCards from "./Problem_ContextCards";
import { Stepper, Step, StepLabel } from "@mui/material";

export default function ProblemOffcanvas() {
  const { stage, nextStage, lastStage, setStage, handleRegenerate, entry } =
    useContext(TopicContext);
  const steps = [
    `Choose Topic: ${entry.topic}`,
    `Choose Context: ${entry.context}`,
    "Regenerate",
  ];

  return (
    <>
      <Offcanvas
        show={stage !== 0}
        placement={"top"}
        style={stage !== 3 ? { height: "100%" } : { height: "150px" }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title style={{ width: "100%" }}>
            <Stack gap={2} direction="horizontal">
              <h3 style={{ width: "120px" }}>
                {stage == 1 ? "Topics" : "Contexts"}
              </h3>
              {/** Goes to the next page, topic --> context, context --> generate */}
              {stage !== 1 && (
                <Button variant="secondary" onClick={lastStage}>
                  {stage == 2
                    ? "Back to Topics"
                    : stage == 3 && "Back to Contexts"}
                </Button>
              )}
              {/** Goes to the last page, context --> topic, generate --> context */}
              {stage !== 3 && (
                <Button onClick={nextStage}>
                  {stage == 1
                    ? "Keep Current Topic"
                    : stage == 2 && "Keep Current Context"}
                </Button>
              )}
              {stage == 3 && (
                <Button variant="success" onClick={handleRegenerate}>
                  Regenerate
                </Button>
              )}
              <Button className="ms-auto" onClick={() => setStage(0)}>
                Cancel
              </Button>
            </Stack>
            <Stepper style={{ marginTop: "40px" }} activeStep={stage - 1}>
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {stage == 1 ? <TopicCards /> : stage == 2 ? <ContextCards /> : <></>}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
