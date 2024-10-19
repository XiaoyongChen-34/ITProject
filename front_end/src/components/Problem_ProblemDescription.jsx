import React from "react";
import { Button, Card } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";
import ProblemColor from "../Information/Problem_Color";

// Problem description of problem based on user preference
export default function ProblemDescription({
  topic,
  context,
  description,
  cardTextStyles,
}) {
  const [state, setState] = useState({ open: true, text: "Collapse" });

  return (
    <Card style={{boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}>
      <Card.Header
        style={{
          ...cardTextStyles,
          color: `${ProblemColor.problemText}`,
          fontWeight: "bold",
          boxShadow: "0 4px 8 rgba(0, 0, 0, 0.1)",
        }}
      >
        Problem Description on topic "{topic}" and context "{context}"
      </Card.Header>
      <Card.Body style={{ ...cardTextStyles, color: `${ProblemColor.problemText}` }}>
        <div style={{ textAlign: "Right" }}>
          <Button
            variant={state.open ? "outline-secondary" : "secondary"}
            onClick={() =>
              state.open
                ? setState({ open: false, text: "Expand" })
                : setState({ open: true, text: "Collapse" })
            }
            aria-expanded={state.open}
            aria-controls="text"
          >
            {state.text}
          </Button>
        </div>

        {/* Expands and shows full description when button is clicked */}
        <Collapse in={state.open}>
          <div id="text">
            <ReactMarkdown children={description} />
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}
