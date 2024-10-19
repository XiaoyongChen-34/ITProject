import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { contextInfo } from "../Information/Context_Info";

export default function SlidesRoadMap() {

  return (
    <>
      <div style={{ backgroundColor: "#D8D9DA", padding: "30px 0 30px 0" }}>
        <Carousel
          style={{
            height:"50vh",
            position:"relative",
            overflow:"hidden",
            backgroundColor: "lightsteelblue",
            margin: "0 30px",
            borderRadius: "30px",
          }}
        >
          {contextInfo.map((slide) => (
            <Carousel.Item key={slide.key} style={{}}>
                      {/* Background overlay for opacity */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // High opacity for background
            zIndex: 1,
          }}
        />
              <Image src={slide.img} style={{width:"100%", height:"50vh", objectFit:"cover"}} />
              <Carousel.Caption style={{zIndex: 2}}>
                <h3>{slide.heading}</h3>
                <p>{`This is about ${slide.heading}`}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}
