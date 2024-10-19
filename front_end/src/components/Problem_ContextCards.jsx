import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TopicContext } from "../pages/Problem";
import CardsRoadMap from "./RoadMap_Cards";
import { contextInfo } from "../Information/Context_Info";

// A set of topic cards for user to choose
export default function ContextCards() {
  // Opens up context selection after a topic is chosen
  const { stage, nextStage, entry, setEntry } =
    useContext(TopicContext);
  const handleOnClick = (context) => {
    nextStage();
    setEntry({ ...entry, context: context });
  };


  return (
    <>
      <div style={{ padding: "20px" }}>
        <Container>
          <Row>
            {contextInfo.map((context) => (
              <Col
                key={context.key}
                xxl={3} // 4 items per row on extra large screens (≥ 1400px)
                xl={4} // 3 items per row on large screens (≥ 992px)
                lg={4} // 3 items per row on large screens (≥ 992px)
                md={6} // 2 items per row on medium screens (< 992px)
                sm={12} // 1 item per row on small screens (< 768px)
                className="mb-4 d-flex justify-content-center"
              >
                <CardsRoadMap
                  heading={context.heading}
                  body={context.body}
                  button={context.button}
                  link={handleOnClick}
                  problemCompleted={context.numCompleted}
                  img={context.img}
                ></CardsRoadMap>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
