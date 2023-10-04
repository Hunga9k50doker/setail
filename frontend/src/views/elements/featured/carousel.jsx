import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import cardData from "../../../assets/fake-data/CardDetails";
import CardDetails from "../../../components/cards/cardDetails/cardDetails";
import { Baner1, banData } from "../../../components/blogItem/BlogItem";
import Helmet from "../../../components/Helmet/Helmet";
import SlideCardTravel from "../../../components/Carousel/CarouselCardTravel";
import { get_random, to_slug } from "../../../utils/utils";
import "../../App.scss";
import "./tourList.scss";
import { GET_CARD_BY_ID } from "../../../constants/actionTypes";
import Loading from "../../../components/loading";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../../../actions/cards";

const Carousel = () => {
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
    <Helmet title="Tour Carousel">
      <div className="tour-list grid">
        <Baner1 banData={banData[3]} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="container-fluid ">
              {" "}
              <section className="tour-card-list row grey py-5">
                {cardData.slice(0, 3).map((item, index) => (
                  <div onClick={() => onRedirect(item)} key={index} className="col col-xxl-3 col-lg-6 col-md-12 col-sm-12">
                    <CardDetails
                      key={index}
                      img={item.img}
                      calendar={new Date(item.calendar).getMonth().toString()}
                      custom={+item.custom}
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
            </div>
            <div className="container-fluid">
              {" "}
              <section className="destination-tour row py-5">
                <SlideCardTravel>
                  {get_random(cardData, 10).map((item, index) => (
                    <div className="cursor-pointer" key={index} onClick={() => onRedirect(item)}>
                      <CardDetails
                        img={item.img}
                        calendar={new Date(item.calendar).getMonth().toString()}
                        custom={+item.custom}
                        location={item.location}
                        title={item.title}
                        subTitle={item.subTitle}
                        cost={Number(item.cost)}
                        rating={item.rating}
                        icon={Number(item.rating) < 6 ? "fas fa-star-half-alt" : "fas fa-star"}
                      />
                    </div>
                  ))}
                </SlideCardTravel>
              </section>
            </div>
          </>
        )}
      </div>
    </Helmet>
  );
};

export default Carousel;
