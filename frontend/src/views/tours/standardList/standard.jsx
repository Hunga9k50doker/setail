import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "../../App.scss";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCards } from "../../../actions/cards";
// import data
import BannerArr from "../../../assets/fake-data/Banner";

// import components
import Helmet from "../../../components/Helmet/Helmet";
import Banner from "../../../components/banner/banner";
import Selections from "../../../components/selections/selections";
import NavTabFilter from "../../../components/NavTabs/NavFilter";
import { to_slug, get_random } from "../../../utils/utils";
import { GET_CARD_BY_ID } from "../../../constants/actionTypes";
import { ScoreRating } from "../../../config/scoreRating";
const getImgBanner = BannerArr.filter((e) => e.types === "banner_tours");
const NewStyleSelection = styled.div`
  .selections {
    padding: 50px 0;
    background: #fff;
    transform: translateY(-70px);
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 0;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), -2px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Standard = () => {
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
    } else {
      setCardData(cards);
    }
  }, [cards]);
  return (
    <Helmet title="Tours Search Page">
      <div className="component">
        {getImgBanner.map((item, index) => (
          <Banner key={index} img={item.img} title={item.title} subTitle={item.subTitle} description={item.description}></Banner>
        ))}

        <NewStyleSelection>
          <Selections>
            <div className="row ">
              <NavTabFilter data={cardData} isLoading={isLoading} onRedirect={onRedirect} />
            </div>
          </Selections>
        </NewStyleSelection>
      </div>
    </Helmet>
  );
};

export default Standard;
