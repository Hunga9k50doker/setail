import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
const ContentItem = (props) => {
  const { data } = props;
  const { card } = useSelector((state) => state.cards);
  const [cardItem, setCardItem] = useState(data);
  useEffect(() => {
    setCardItem(card);
  }, [card]);
  return (
    <div className="component nav__content">
      <div className="content__item">
        <h2 className="item__title">
          {cardItem.title}
          <p>
            <strong> ${cardItem.cost}</strong> / person
          </p>
        </h2>

        <h3 className="item__rating">
          {/* <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i>
              <i className="far fa-star"></i> */}
          {cardItem.rating <= 7 ? (
            <>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </>
          ) : (
            <>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </>
          )}
          <p>
            ({cardItem.review__descriptions.length}{" "}
            {cardItem.review__descriptions.length < 2 ? "review" : "reviews"})
          </p>
        </h3>
        <p className="item__subtitle">{cardItem.description}</p>
        <div className="item__list__btn">
          <button className="item__btn__calendar">
            <i className="far fa-calendar"></i>1
          </button>
          <button className="item__btn__age">
            <i className="fas fa-user"></i>
            {cardItem.age} Age
          </button>
          <button className="item__btn__location">
            <i className="fas fa-map-marker-alt"></i>
            {cardItem.location}
          </button>
        </div>
        <ul className="item__list__info">
          <li className="item__info">
            <h6>Destination</h6>
            <div className="item__detail item__link">
              <Link to="#">{cardItem.title} Tour</Link>
            </div>
          </li>
          <li className="item__info">
            <h6>Departure</h6>
            <div className="item__detail">
              <h6>Main Square, Old Town</h6>
            </div>
          </li>
          <li className="item__info">
            <h6>Departure Time</h6>
            <div className="item__detail">
              <h6> Approximately 8.30AM</h6>
            </div>
          </li>
          <li className="item__info">
            <h6>Return Time</h6>
            <div className="item__detail">
              <h6> Approximately 7.30PM</h6>
            </div>
          </li>
          <li className="item__info">
            <h6>Dress Code</h6>
            <div className="item__detail">
              <h6>Casual, comfortable and light</h6>
            </div>
          </li>
          <li className="item__info">
            <h6>Included</h6>
            <div className="item__detail">
              <h6>
                <p>
                  <i className="far fa-check-circle"></i>
                  <span>5 Star Accommodation</span>
                </p>
                <p>
                  <i className="far fa-check-circle"></i>
                  <span>Breakfast</span>
                </p>
              </h6>
              <h6>
                <p>
                  <i className="far fa-check-circle"></i>
                  <span>Airport Transfer</span>
                </p>
                <p>
                  <i className="far fa-check-circle"></i>
                  <span>Personal Guide</span>
                </p>
              </h6>
            </div>
          </li>
          <li className="item__info">
            <h6>Not Included</h6>
            <div className="item__detail">
              <h6>
                <p>
                  <i className="fas fa-ban"></i>
                  <span>Gallery Ticket</span>
                </p>
              </h6>
              <h6>
                <p>
                  <i className="fas fa-ban"></i>
                  <span>Lunch</span>
                </p>
              </h6>
            </div>
          </li>
        </ul>
      </div>
      <div className="content__item">
        <h2 className="item__title">From our gallery</h2>
        <p className="item__subtitle">
          Elitr sed eos elitr elitr tempor. Gubergren no sit sadipscing duo at
          justo lorem sanctus. Ipsum ea accusam eirmod ut,.
        </p>

        <div className="row item__list__img ">
          {cardItem?.img__grid?.slice(8, 11).map((e, id) => (
            <div key={id} className="col col-lg-4 col-md-4 col-12">
              <div className="grid__item">
                <img
                  className="grid__item__img"
                  style={{ width: "300px", height: "300px" }}
                  src={e}
                  alt="Not found"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
