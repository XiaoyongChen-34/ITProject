import React, { useState, useContext } from "react";
import podium from "../images/podium.png";
import "./Rank_styles.css";
import { RankContext } from "../pages/Rank";

export default function PodiumRank() {
  const {ranks} = useContext(RankContext);
  const slicedRanks = ranks.slice(0,3);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const podiumPosition = [
    {
      boxTop: "1%",
      boxLeft: "50%",
      boxWidth: "30%",
    },
    {
      boxTop: "24%",
      boxLeft: "25%",
      boxWidth: "23%",
    },
    {
      boxTop: "31%",
      boxLeft: "75%",
      boxWidth: "23%",
    },
  ];
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <img src={podium} style={{ marginTop: "200px", width: "100%" }}></img>
        <div
          style={{
            position: "absolute",
            marginTop: "200px",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
          }}
        >
          {slicedRanks.map((rank, index) => (
            <div
              key={index}
              className="podium"
              style={{
                top: podiumPosition[index].boxTop,
                left: podiumPosition[index].boxLeft,
                width: podiumPosition[index].boxWidth,
                "--mouse-x": `${mousePosition.x}%`,
                "--mouse-y": `${mousePosition.y}%`,
              }}
              onMouseMove={handleMouseMove}
            >
              <span className="text">{rank.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
