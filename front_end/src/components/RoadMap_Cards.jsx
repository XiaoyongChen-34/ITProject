import React from "react";
import "./RoadMap_Cards.css";

export default function CardsRoadMap(props) {
  return (
    <>
      <div style={{cursor:"pointer"}} onClick={() => props.link(props.heading)}>
        <article className="myCard">
          <header className="myCard__thumb">
            <img src={props.img} />
          </header>
          <div className="myCard__date">
            <span className="myCard__date__day">{props.problemCompleted}</span>
            <br />
            <span className="myCard__date__month">Completed</span>
          </div>
          <div className="myCard__body">
            <h2 className="myCard__title">{props.heading}</h2>
            <div className="myCard__subtitle">have some fun!</div>
            <p className="myCard__description">{props.body}</p>
          </div>
          <footer className="myCard__footer">
          </footer>
        </article>
      </div>
    </>
  );
}
