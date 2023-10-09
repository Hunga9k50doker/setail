import React from "react";
import "./cardReview.scss";
import moment from "moment";
const CardReview = (props) => {
  return (
    <div className="card__reviews flex" style={props.style}>
      <img
        src={props.img}
        style={{
          width: props.width,
          height: props.height,
          borderRadius: "50%",
        }}
        alt="Not Found"
        className="img__user"
      />
      <div className="card__content">
        <h3 className="card__place">{props.place}</h3>
        <p className="card__rating__start">{props.star}</p>
        <p className="card__text">{props.description}</p>
        <p className="card__name__user">{props.name}</p>
        <p className="card__time ">
          {moment(props.time).format("MMM DD YYYY hh:mm a")}
        </p>
      </div>
    </div>
  );
};

export default CardReview;
