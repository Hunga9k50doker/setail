import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCards } from "../../../actions/cards";
// import data
import BannerArr from "../../../assets/fake-data/Banner";
import VideoData from "../../../assets/fake-data/Video";
import cardDataTemplate from "../../../assets/fake-data/CardDetails";

// import components
import Helmet from "../../../components/Helmet/Helmet";
import CustomTitle from "../../../components/customTitle/customTitle";

import VideoDemo from "../../../components/VideoDemo/VideoDemo";
import RowDetails from "../../../components/rowDetails/rowDetails";
import SlideCardTravel from "../../../components/Carousel/CarouselCardTravel";
import CarouselBanner from "../../../components/Carousel/CarouselBanner";
import CarouselReviews from "../../../components/Carousel/CarouselReviews";
import CarouselTeam from "../../../components/Carousel/CarouselTeam";
import CardSelection from "../../../components/cards/cardSelection/cardSelection";
import Selections from "../../../components/selections/selections";
import { BgWinter } from "../../../assets/img";
import { to_slug, get_random } from "../../../utils/utils";
import CardDetails from "../../../components/cards/cardDetails/cardDetails";

import Banner from "../../../components/banner/banner";
import "../../App.scss";
import "./winter.scss";
import Loading from "../../../components/loading";
import { GET_CARD_BY_ID } from "../../../constants/actionTypes";
import { ScoreRating } from "../../../config/scoreRating";
// img sub
import { Paris } from "../../../assets/img";

//get data
const getImgBanner = BannerArr.filter((e) => e.types === "banner_winter_travel");
const getVideoData = VideoData.filter((e) => e.id === "video_winter_travel");

const content1 = {
  content: "Try Now",
  title: "Winter Sports",
  subTitle: "",
};
const content2 = {
  content: " Enjoy Your",
  title: "Winter Holiday",
  subTitle: "Lorem eirmod sit vero lorem gubergren tempor. Takimata dolores et elitr nonumy nonumy. Gubergren sed stet ea est sit, magna.",
};

const NewStyleSlick = styled.div`
  .slide__card-slick .slick-list {
    height: fit-content !important;
  }
`;
const NewStyleVideo = styled.div`
  .video {
    min-height: 600px;
    padding: 0;
  }
  .video .responsive-video-poster {
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .video__subtitle {
    text-align: center;
  }
`;
const NewStyleCustomTitle = styled.div`
  .customTitle {
    margin-top: 0;
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
const HomeWinter = () => {
  const { cards, isLoading } = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cardData, setCardData] = useState(cards);

  const onRedirect = (item) => {
    dispatch({ type: GET_CARD_BY_ID, payload: { card: item } });
    history.push(`/tour-item/${item?._id ? item._id : to_slug(item.title)}`);
  };
 useEffect(() => {
    if (!cards.length) {
      dispatch(getCards);
    } 
  }, []);

  useEffect(() => {
    setCardData(cards);
  }, [cards]);
  return (
    <Helmet title="Home Winter Holiday" className="component">
      {/* banner */}
      <NewStyleSlick>
        <CarouselBanner>
          {getImgBanner.map((item, index) => (
            <Banner key={index} img={item.img} title={item.title} subTitle={item.subTitle} description={item.description}></Banner>
          ))}
        </CarouselBanner>
      </NewStyleSlick>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!cardData.length ? (
            <p className="fs-3 text-center">No data</p>
          ) : (
            <SlideCardTravel>
              {cardData
                .filter((c) => c.type === "winter")
                .map((item, index) => (
                  <div className="cursor-pointer" onClick={() => onRedirect(item)}>
                    <CardDetails
                      img={item.img}
                      calendar={new Date(item.calendar).getMonth().toString()}
                      custom={+item.custom}
                      location={item.location}
                      title={item.title}
                      subTitle={item.subTitle}
                      cost={Number(item.cost)}
                      rating={item.rating}
                      icon={
                        Number(item.rating) === 0
                          ? "far fa-star"
                          : Number(item.rating) <= ScoreRating.GOOD.value
                          ? "fas fa-star-half-alt"
                          : "fas fa-star"
                      }
                    />
                  </div>
                ))}
            </SlideCardTravel>
          )}
        </>
      )}

      {/* sub title */}
      <CustomTitle content={content1.content} title={content1.title} subTitle={content1.subTitle} />

      {/* video  */}

      <NewStyleVideo>
        {getVideoData.map((item) => (
          <VideoDemo key={item.id} poster={item.img} path={item.path} bgurl={item.bgUrl} />
        ))}
        <div className="video__subtitle" style={{ textAlign: "center" }}>
          <p>Lorem dolor ipsum voluptua consetetur kasd amet ipsum, est est dolores stet et, at accusam lorem dolores voluptua. Dolor et.</p>
          <button className="btn-primary">VIEW MORE</button>
        </div>
      </NewStyleVideo>

      {/* Reviews */}
      <CarouselReviews bgUrl={BgWinter} />
      {/* row icon sub with details*/}
      <NewStyleCustomTitle>
        <div className="area-slide-show-item-card">
          <CustomTitle content={content2.content} title={content2.title} subTitle={content2.subTitle} />
        </div>
      </NewStyleCustomTitle>
      <RowDetails />
      <CarouselTeam />
      <CustomTitle
        content="Choose Your"
        title="Winter Resort"
        subTitle="At magna aliquyam justo takimata ipsum. Gubergren lorem dolore amet ea duo diam magna dolore dolor. Erat gubergren voluptua tempor."
      />
      {/* selection item  */}
      <NewStyleSelection>
        <Selections>
          {cardDataTemplate
            .getAllCards()
            .filter((e) => e.title === "Slovenia" || e.title === "France" || e.title === "Switgerland")
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
    </Helmet>
  );
};

export default HomeWinter;
