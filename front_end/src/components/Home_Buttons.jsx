import React from "react";
import "./Home_Buttons.css";

// A image and text pair that is not yet clickable
const PopularTopic = (props) => {
  return (
    <>
      <figure className="myButton">
        <img src={props.image} />
        <figcaption>
          <i className="ion-android-add"></i>
        </figcaption>
        <a href={props.link}></a>
      </figure>
      <h4>{props.title}</h4>
    </>
  );
};

export default PopularTopic;
