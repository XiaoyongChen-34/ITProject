import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CardsRoadMap from "./RoadMap_Cards";
import { contextInfo } from "../Information/Context_Info";

export default function ContextGridRoadMap() {

  return (
    <>
      <div style={{ padding: "20px"}}>
        <Container>
          <Row>
            {contextInfo.map((card) => (
              <Col
                key={card.key}
                xxl={3} // 4 items per row on extra large screens (≥ 1400px)
                xl={4} // 3 items per row on large screens (≥ 992px)
                lg={4} // 3 items per row on large screens (≥ 992px)
                md={6} // 2 items per row on medium screens (< 992px)
                sm={12} // 1 item per row on small screens (< 768px)
                className="mb-4 d-flex justify-content-center"
              >
                <CardsRoadMap
                  heading={card.heading}
                  body={`This is about ${card.heading}`}
                  button={card.button}
                  link={card.link}
                  problemCompleted={card.numCompleted}
                  img={card.img}
                ></CardsRoadMap>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}
