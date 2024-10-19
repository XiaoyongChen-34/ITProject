import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PopularTopic from "./Home_Buttons";
import rankImage from "../images/rank_pic.png";
import roadMapImage from "../images/road_map_pic.png";
import edImage from "../images/ed_pic.png";
import heading from "../images/Homepage_PopularTopics.gif";

// Used to navigate across several popular links
const FunctionalPanel = () => {
  return (
    <div style={{padding:"50px", alignContext:"center", backgroundColor:"#fcfcfc"}}>
      <img src={heading} style={{position:"absolute", left:"50%", transform:"translateX(-50%)"}}></img>
      
      <Container fluid="md" style={{padding:"20px", paddingTop:"100px"}}>
        <Row>
          <Col  style={{ alignContent: "center", textAlign: "center" }}>
            <PopularTopic image={roadMapImage} title="Road Map" link="/RoadMap"/>
          </Col>
          <Col style={{ alignContent: "center", textAlign: "center" }}>
            <PopularTopic image={rankImage} title="Rank" link="/Rank"/>
          </Col>
          <Col style={{ alignContent: "center", textAlign: "center" }}>
            <PopularTopic image={edImage} title="Ed" link="https://edstem.org/au/dashboard"/>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FunctionalPanel;
