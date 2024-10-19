import React, {useContext} from "react";
import "./Rank_styles.css";
import { RankContext } from "../pages/Rank";

export default function RankRest() {
  const {ranks} = useContext(RankContext);
  const slicedRanks = ranks.slice(3);

  return (
    <>
      <div>
        {slicedRanks.map((rank, index) =>
          rank.name == "Alex" ? (
            <li key={index} className="rank-item myself">
              <span className="rank">#{index+4}</span>
              <span className="name">{rank.name}</span>
              <span className="score">{rank.score}</span>
            </li>
          ) : (
            <li key={index} className="rank-item">
              <span className="rank">#{index+4}</span>
              <span className="name">{rank.name}</span>
              <span className="score">{rank.score}</span>
            </li>
          )
        )}
      </div>
    </>
  );
}
