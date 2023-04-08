import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCards } from "../../../actions/cards";
// import data
import BannerArr from "../../../assets/fake-data/Banner";
import VideoData from "../../../assets/fake-data/Video";
import cardData from "../../../assets/fake-data/CardDetails";

// import components
import Helmet from "../../../components/Helmet/Helmet";
import TourFilter from "../../../components/tourFilter/tourFilter";
import CustomTitle from "../../../components/customTitle/customTitle";
import Selections from "../../../components/selections/selections";
import CardSelection from "../../../components/cards/cardSelection/cardSelection";
import VideoDemo from "../../../components/VideoDemo/VideoDemo";
import RowDetails from "../../../components/rowDetails/rowDetails";
import SlideCardTravel from "../../../components/Carousel/CarouselCardTravel";
import SlideCardRating from "../../../components/Carousel/CarouselCardRating";
import CarouselBanner from "../../../components/Carousel/CarouselBanner";
import Banner from "../../../components/banner/banner";
import { to_slug } from "../../../utils/utils";
import CardDetails from "../../../components/cards/cardDetails/cardDetails";
import Loading from "../../../components/loading";
import "../../App.scss";
import "./travel.scss";
// img sub
import { Paris } from "../../../assets/img";
import { GET_CARD_BY_ID } from "../../../constants/actionTypes";
import { useHistory } from "react-router-dom";
//get data
const getImgBanner = BannerArr.filter((e) => e.types === "banner_home_travel");
const getVideoData = VideoData.filter((e) => e.id === "video_home_travel");

const imgArea = {
  img: Paris,
};
const content1 = {
  content: "Choose your",
  title: "Perfect holiday",
  subTitle: "Dare convenevole senza vostro niuna credere mentre impermutabile forse al, essilio cose tale sua novellare,.",
};
const content2 = {
  content: " Plan the",
  title: "Perfect holiday",
  subTitle: "By into murmured murmured door surely and soul at thee,.",
};

const HomeTravel = () => {
  const { cards } = useSelector((state) => state.cards);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const onRedirect = (item) => {
    dispatch({ type: GET_CARD_BY_ID, payload: { card: item } });
    history.push(`/tour-item/${item?._id ? item._id : to_slug(item.title)}`);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      dispatch(getCards);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [dispatch]);
  return (
    <Helmet title="Home Travel Agency" className="component">
      {/* banner */}
      <CarouselBanner>
        {getImgBanner.map((item, index) => (
          <Banner key={index} img={item.img} title={item.title} subTitle={item.subTitle} description={item.description}></Banner>
        ))}
      </CarouselBanner>

      {/* filter date, time, location */}
      <TourFilter />
      {/* sub title */}
      <CustomTitle content={content1.content} title={content1.title} subTitle={content1.subTitle} />
      {/* selection item  */}
      {Boolean(cards.length) && (
        <Selections>
          {cards.map((item, index) => (
            <Link to={`#`} onClick={() => onRedirect(item)} key={index} className="col col-xxl-3 col-lg-6 col-md-6 col-12">
              <CardSelection
                img={item.img}
                title={item.title}
                rating={item.rating}
                cost={Number(item.cost)}
                icon={Number(item.rating) < 6 ? "fas fa-star-half-alt" : "fas fa-star"}
              />
            </Link>
          ))}
        </Selections>
      )}
      {isLoading && (
        <Selections>
          <Loading />
        </Selections>
      )}
      {!cards.length && !isLoading && (
        <Selections>
          <h3 className="text-center">No data</h3>
        </Selections>
      )}
      {/* img sub */}
      <div className="row img-side-area">
        <div className="col col-lg-12 col-md-12 col-sm-0">
          <img className="img" src={imgArea.img} alt="not found" style={{ display: "flex", margin: "40px auto" }} />
        </div>
      </div>

      {/* video  */}
      <div>
        {getVideoData.map((item) => (
          <VideoDemo
            key={item.id}
            children={
              <>
                <h3>Go & Discover</h3>
                <h2>Breathtaking Cities</h2>
                <p>Sollst geliebet es helle trübhell heimat, stillestehn du warum nicht heut hast mein heut im.</p>
              </>
            }
            poster={item.img}
            path={item.path}
            bgurl={item.bgUrl}
          />
        ))}
      </div>

      {/* row icon sub with details*/}
      <RowDetails />
      {/* selection item slide show */}
      <div className="area-slide-show-item-card">
        <CustomTitle content={content2.content} title={content2.title} subTitle={content2.subTitle} />
        <SlideCardTravel>
          {cardData.getCards_random(12).map((item, index) => (
            <Link key={index} to={"/tour-item/" + to_slug(item.title)}>
              <CardDetails
                img={item.img}
                calendar={item.calendar}
                custom={item.custom}
                location={item.location}
                title={item.title}
                subTitle={item.subTitle}
                cost={Number(item.cost)}
                rating={item.rating}
                icon={Number(item.rating) < 6 ? "fas fa-star-half-alt" : "fas fa-star"}
              />
            </Link>
          ))}
        </SlideCardTravel>
      </div>
      {/* rating */}
      <SlideCardRating />
    </Helmet>
  );
};

export default HomeTravel;
