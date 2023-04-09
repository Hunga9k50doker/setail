import React, { useState, useEffect } from "react";
import "../../App.scss";
import "./tourList.scss";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../../../actions/cards";
import { Link } from "react-router-dom";
import CardDetails from "../../../components/cards/cardDetails/cardDetails";
import { Baner1, banData } from "../../../components/blogItem/BlogItem";
import Helmet from "../../../components/Helmet/Helmet";
import { featureTourData, FeatureTour, TourGalleryItem, TourMasonryItem } from "../../../components/cards/cardTourList/cardTourList";
import { GET_CARD_BY_ID } from "../../../constants/actionTypes";
import Loading from "../../../components/loading";
import { useHistory } from "react-router-dom";
const TourList = () => {
  const { cards, isLoading } = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState(cards);
  const history = useHistory();
  const onRedirect = (item) => {
    dispatch({ type: GET_CARD_BY_ID, payload: { card: item } });
    history.push(`/tour-item/${item._id}`);
  };
  useEffect(() => {
    if (!cards.length) {
      dispatch(getCards);
    } else {
      setCardData(cards);
    }
  }, [cards]);
  return (
    <Helmet title="Tour List">
      <div className="tour-list grip ">
        <Baner1 banData={banData[2]} />
        <div className="container-fluid">
          {" "}
          {isLoading ? (
            <Loading />
          ) : (
            <section className="tour-card-list row grey py-5">
              {cardData.slice(0, 3).map((item, index) => (
                <div onClick={() => onRedirect(item)} key={index} className="col col-xxl-3 col-lg-6 col-md-12 col-sm-12 cursor-pointer">
                  <CardDetails
                    key={index}
                    img={item.img}
                    calendar={new Date(item.calendar).getMonth()}
                    custom={item.custom}
                    location={item.location}
                    title={item.title}
                    description={item.description}
                    cost={Number(item.cost)}
                    rating={item.rating}
                    icon={Number(item.rating) < 6 ? "fas fa-star-half-alt" : "fas fa-star"}
                  />
                </div>
              ))}
            </section>
          )}
        </div>
        <div className="container">
          {" "}
          <section className="destination-tour row py-5">
            {featureTourData.row1.map((item, index) => (
              <div className="item" key={index}>
                <FeatureTour data={item} />
              </div>
            ))}
          </section>
        </div>
        <div className="container-fluid">
          {" "}
          <section className="tour-gallery row grey py-5">
            {featureTourData.row2.map((item, index) => (
              <div className="item" key={index}>
                <TourGalleryItem data={item} />
              </div>
            ))}
          </section>
        </div>
        <div className="container">
          {" "}
          <section className="tour-masonry row py-5">
            <div className="container">
              {featureTourData.row3.map((item, index) => (
                <div className={`grid-item grid-item-${index}`} key={index}>
                  <TourMasonryItem data={item} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Helmet>
  );
};

export default TourList;
