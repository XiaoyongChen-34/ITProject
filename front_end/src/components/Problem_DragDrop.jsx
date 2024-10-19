import React, { useState, useEffect, useContext } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ProblemDescription from "./Problem_ProblemDescription";
import { SubmitContext } from "../pages/Problem";
import { EntryContext } from "../App";
import { checkCode } from "../functions/connectBackend";
import ProblemColor from "../Information/Problem_Color";
import "./Problem_DragDrop.css";

const ItemTypes = {
  BLOCK: "block",
};

// Each individual block of code that can be dragged
const Block = ({ block, index, fromWorkspace }) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BLOCK,
    item: { block, index, fromWorkspace },
  }));
  const { entry } = useContext(EntryContext);
  return (
    <div
      className="segment"
      ref={drag}
      style={{
        padding: "8px",
        marginBottom: "8px",
        backgroundColor: (entry.correctness =="True" ? `${ProblemColor.correctBlock}`:`${ProblemColor.blocksInDrag}`),
        borderRadius: "10px",
        color: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        height: "40px",
        width: "100%",
        cursor:"pointer",
      }}
    >
      <pre
        style={{
          fontFamily: "Consolas, Courier New",
          fontSize: "17px",
          color: (entry.correctness =="True" ? `${ProblemColor.correctBlockText}`:`${ProblemColor.blocksInDragText}`),
        }}
      >
        {block.content}
      </pre>
    </div>
  );
};

// Each individual slot on the right, where each block of code go
const Slot = ({ block, index, moveBlockToSlot }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    drop: (item) => moveBlockToSlot(item.index, index, item.fromWorkspace),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        marginBottom: "8px",
        backgroundColor: isOver ? `${ProblemColor.blocksInDrop}` : `${ProblemColor.blocksInDropText}`,
        borderRadius: "10px",
        height: "40px",
        width: "100%",
        boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.2)",
        cursor:"pointer",
      }}
    >
      {block ? (
        <Block block={block} index={index} fromWorkspace />
      ) : (
        <div style={{ height: "100%" }}></div>
      )}
    </div>
  );
};

// Left box, where the blocks of code originally were
const BlocksList = ({ blocks, moveBlockToSlot }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.BLOCK,
    drop: (item) => moveBlockToSlot(item.index, null, item.fromWorkspace), // Drop back to the block list
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        minHeight: "450px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        backgroundColor: isOver ? "#d1d1d1" : "#f8f9fa",
        padding: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "auto",
        height: "100%",
      }}
    >
      {blocks.map((block, index) =>
        block ? (
          <Block
            key={block.id}
            block={block}
            index={index}
            fromWorkspace={false}
          />
        ) : (
          <div key={`block-placeholder-${index}`} />
        )
      )}
    </div>
  );
};

const ParsonsProblem = () => {
  // Holds the original shuffled code
  const [code, setCode] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [workspace, setWorkspace] = useState([]);
  const { run, setRun, reset } = useContext(SubmitContext);
  const { entry, setEntry, msg, setMsg } = useContext(EntryContext);
  const [output, setOutput] = useState({ accuracy: "False", output: "" });

  useEffect(() => {
    const problem = msg.shuffledCode.map((string, index) => ({
      id: `block-${index + 1}`, // Ensure a unique ID
      content: string,
    }));
    setCode(problem);
    setWorkspace(new Array(problem.length).fill(null)); // Initialize empty slots
  }, [msg]);

  // Updates the parson's problem blocks once code is changed
  useEffect(() => {
    setBlocks([...code]);
  }, [code]);

  useEffect(() => {
    if (run) {
      const finishedCode = workspace.map((value) => value?.content || ""); // Send code content only
      setEntry((entry) => ({...entry, studentCode: finishedCode.join('$')})) // Record student attempt to entry
      checkCode(finishedCode, setOutput, setEntry);
    }
    setRun(false);
  }, [run]);

  useEffect(() => {
    setBlocks([...code]);
    setWorkspace(new Array(blocks.length).fill(null)); // Reset workspace to initial state
  }, [reset]);

  const moveBlockToSlot = (sourceIndex, targetIndex, fromWorkspace) => {
    console.log(
      `Moving block from ${
        fromWorkspace ? "workspace" : "blocks"
      } at index ${sourceIndex} to ${
        targetIndex !== null
          ? `workspace at index ${targetIndex}`
          : "blocks list"
      }`
    );

    const newWorkspace = [...workspace];
    const newBlocks = [...blocks];

    if (targetIndex === null) {
      // Moving from workspace back to blocks list
      const blockToMove = workspace[sourceIndex];
      newWorkspace[sourceIndex] = null;
      const emptyIndex = newBlocks.findIndex((block) => block === null); // Find an empty slot in blocks list
      newBlocks[emptyIndex] = blockToMove; // Place the block back in blocks list
    } else if (!fromWorkspace) {
      // Moving from blocks to workspace
      const blockToMove = blocks[sourceIndex];

      // Swap if target slot is already filled
      if (newWorkspace[targetIndex]) {
        newBlocks[sourceIndex] = newWorkspace[targetIndex]; // Put the current block from slot back into blocks list
      } else {
        newBlocks[sourceIndex] = null; // Remove the block from blocks list
      }

      newWorkspace[targetIndex] = blockToMove; // Place the dragged block into the workspace slot
    } else {
      // Moving within the workspace
      const blockToMove = workspace[sourceIndex];

      // Swap if the target slot is already filled
      if (newWorkspace[targetIndex]) {
        newWorkspace[sourceIndex] = newWorkspace[targetIndex]; // Swap the blocks
      } else {
        newWorkspace[sourceIndex] = null; // Clear the source slot
      }

      newWorkspace[targetIndex] = blockToMove; // Place the dragged block into the target slot
    }

    setWorkspace(newWorkspace);
    setBlocks(newBlocks);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {/* Problem description section */}
      <Container>
        <Row style={{marginTop:"10px"}}>
          <Col>
            <ProblemDescription
              topic={msg.topic}
              context={msg.context}
              description={msg.description}
              cardTextStyles={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "17px",
              }}
            />
          </Col>
        </Row>
        {/* Drag and drop section */}
        <Row xs={2} style={{ height: "60vh", paddingTop: "10px" }}>
          <Col style={{ height: "60vh" }}>
            <BlocksList blocks={blocks} moveBlockToSlot={moveBlockToSlot} />
          </Col>
          {/* Box on the right side, containing all the slots */}
          <Col style={{ height: "60vh" }}>
            <div
              style={{
                minHeight: "450px",
                border: "1px solid #ccc",
                borderRadius: "10px",
                backgroundColor: "#f8f9fa",
                padding: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "auto",
                height: "100%",
                position: "relative",
              }}
            >
              {[...Array(msg.shuffledCode.length)].map((_, i) => (
                <Slot
                  key={`slot-${i}`}
                  block={workspace[i]}
                  index={i}
                  moveBlockToSlot={moveBlockToSlot}
                />
              ))}
            </div>
          </Col>
        </Row>
        {/* Output section */}
        <Row style={{ height: "20vh", paddingTop: "20px"}}>
          <Col>
            <Card
              body
              style={{
                fontFamily: "Consolas, Courier New",
                fontSize: "17px",
                color: "gray",
                padding: "10px",
                marginBottom:"10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              &gt;&gt; {entry.correctness !== "N/A" ? String(entry.correctness): ""}
              <br />
              &gt;&gt; {output.output}
            </Card>
          </Col>
        </Row>
      </Container>
    </DndProvider>
  );
};

export default ParsonsProblem;
