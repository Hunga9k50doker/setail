import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../../../actions/cards";
// import data
import BannerArr from "../../../assets/fake-data/Banner";
import cardDataTemplate from "../../../assets/fake-data/CardDetails";
import { BgOffer2 } from "../../../assets/img";
// import components
import Helmet from "../../../components/Helmet/Helmet";
import CustomTitle from "../../../components/customTitle/customTitle";

import RowDetails from "../../../components/rowDetails/rowDetails";
import SlideCardTravel from "../../../components/Carousel/CarouselCardTravel";
import CarouselBanner from "../../../components/Carousel/CarouselBanner";
import CardSelection from "../../../components/cards/cardSelection/cardSelection";
import Selections from "../../../components/selections/selections";
import { to_slug, parallaxBackground } from "../../../utils/utils";
import CardDetails from "../../../components/cards/cardDetails/cardDetails";
import Sub from "../../../components/Subscribe/sub";
import Banner from "../../../components/banner/banner";
import "../../App.scss";
import "./offer.scss";
import { GET_CARD_BY_ID } from "../../../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { ScoreRating } from "../../../config/scoreRating";
import Loading from "../../../components/loading";
//get data
const getImgBanner = BannerArr.filter((e) => e.types === "banner_pages");

const NewStyleSlick = styled.div`
  .slide__card-slick .slick-list {
    height: fit-content !important;
  }
`;

const NewStyleCustomTitle = styled.div`
  .customTitle {
    margin-top: 20px;
  }
  p {
    max-width: 600px;
    text-align: center;
  }
`;
const NewStyleItem = styled.div`
  .selections__item {
    border-radius: 50%;
    width: 350px;
    height: 350px;
    margin: 30px;
    &:before {
      display: block;
    }
  }
  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    z-index: 4;
    font-family: "Pacifico", sans-serif;
    font-weight: 400;
    font-style: italic;
  }
  h5,
  p,
  i,
  .selections__rating {
    display: none;
  }
`;
const NewStyleSelection = styled.div`
  .selections {
    padding-top: 0;
    margin-top: 80px;
    transform: translateY(-150px);
  }
`;

const NewStyleCustomDetails = styled.div`
  .row__details {
    margin: 100px auto;
  }
`;

const WhatWeOffer = () => {
  const ref = React.useRef();

  const { cards, isLoading } = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cardData, setCardData] = React.useState(cards);
  const onRedirect = (item) => {
    dispatch({ type: GET_CARD_BY_ID, payload: { card: item } });
    history.push(`/tour-item/${item?._id ? item._id : to_slug(item.title)}`);
  };

  React.useEffect(() => {
    if (!cards.length) {
      dispatch(getCards);
    } else {
      setCardData(cards);
    }
  }, [cards]);

  React.useEffect(() => {
    if (ref.current) parallaxBackground(ref.current);
  }, []);
  return (
    <Helmet title="What We Offer" className="component">
      {/* banner */}
      <NewStyleSlick>
        <CarouselBanner>
          {getImgBanner.map(
            (item, index) =>
              index === 1 && <Banner key={index} img={item.img} title={item.title} subTitle={item.subTitle} description={item.description}></Banner>
          )}
        </CarouselBanner>
      </NewStyleSlick>
      <NewStyleCustomDetails>
        <RowDetails />
      </NewStyleCustomDetails>
      <div className="offer__subscribe" ref={ref}>
        <div className="offer__subscribe__item">
          <form action="" className=" footer__form">
            <h3 className=" footer__title">Newsletter</h3>
            <h5 className=" footer__content  footer__text">Etiam rhoncus. Maecenas temp us, tellus eget condimentum rho</h5>
            <div className=" footer__form-name">
              <i className="fas fa-user"></i>
              <input maxLength="50" type="text" placeholder="Name" name="" id="" />
            </div>
            <div className=" footer__form-email">
              <i className="far fa-envelope"></i>
              <input maxLength="50" type="email" placeholder="Email" name="" id="" />
            </div>
            <button className=" footer__form-submit">Subscribe</button>
          </form>
        </div>
        <div className="offer__subscribe__item">
          <img className="offer__subscribe__img" src={BgOffer2} alt="Not found"></img>
          <p>50% Off Adventure on Sale</p>
        </div>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {cardData.length ? (
            <SlideCardTravel>
              {cardData
                .filter((c) => c.type === "winter")
                .map((item, index) => (
                  <div key={index} className="cursor-pointer" onClick={() => onRedirect(item)}>
                    <CardDetails
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
            </SlideCardTravel>
          ) : (
            <h3 className="text-center">No data</h3>
          )}
        </>
      )}
      <NewStyleCustomTitle>
        <CustomTitle
          content="Choose Your"
          title="Destinations"
          subTitle="At magna aliquyam justo takimata ipsum. Gubergren lorem dolore amet ea duo diam magna dolore dolor. Erat gubergren voluptua tempor."
        />
      </NewStyleCustomTitle>
      {/* selection item  */}
      <NewStyleSelection>
        <Selections>
          {cardDataTemplate
            .getAllCards()
            .filter((e) => e.title !== "Slovenia" && e.title !== "France" && e.title !== "Switgerland")
            .slice(0, 3)
            .map((item, index) => (
              <div key={index} className="col col-xxl-4 col-lg-6 col-md-6 col-12">
                <NewStyleItem>
                  <Link to={"/destinations/item/" + to_slug(item.title)}>
                    <CardSelection
                      img={item.img}
                      title={item.title}
                      rating={item.rating}
                      cost={Number(item.cost)}
                      // icon={Number(item.rating) < 6 ?"fas fa-star-half-alt" : "fas fa-star"}
                    />
                  </Link>
                </NewStyleItem>
              </div>
            ))}
        </Selections>
      </NewStyleSelection>
      <Sub />
    </Helmet>
  );
};

export default WhatWeOffer;
