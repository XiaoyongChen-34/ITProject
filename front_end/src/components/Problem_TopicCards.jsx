import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { TopicContext } from "../pages/Problem";
import CardsRoadMap from "./RoadMap_Cards";
import { topicInfo } from "../Information/Topic_Info";

// A set of context cards for user to choose
export default function TopicCards() {
  // Shows after a topic is chosen
  const { stage, nextStage, lastStage, setStage , entry, setEntry } =
    useContext(TopicContext);
  const handleOnClick = (topic) => {
    nextStage();
    setEntry({ ...entry, topic: topic });
  };
  return (
    <>
      <div style={{ padding: "20px" }}>
        <Container>
          <Row>
            {topicInfo.map((topic) => (
              <Col
                key={topic.key}
                xxl={3} // 4 items per row on extra large screens (≥ 1400px)
                xl={4} // 3 items per row on large screens (≥ 992px)
                lg={4} // 3 items per row on large screens (≥ 992px)
                md={6} // 2 items per row on medium screens (< 992px)
                sm={12} // 1 item per row on small screens (< 768px)
                className="mb-4 d-flex justify-content-center"
              >
                <CardsRoadMap
                  heading={topic.heading}
                  body={topic.body}
                  button={topic.button}
                  link={handleOnClick}
                  problemCompleted={topic.numCompleted}
                  img={topic.img}
                ></CardsRoadMap>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
