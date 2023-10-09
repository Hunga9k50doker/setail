import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import components
import Helmet from "../../components/Helmet/Helmet";
import TourFilter from "../../components/tourFilter/tourFilter";
import CustomTitle from "../../components/customTitle/customTitle";
import Selections from "../../components/selections/selections";
import CardSelection from "../../components/cards/cardSelection/cardSelection";

import "../App.scss";
import "./index.scss";
// img sub
import { GET_CARD_BY_ID } from "../../constants/actionTypes";
import { useHistory } from "react-router-dom";
import { searchCard } from "../../actions/cards";

const content1 = {
  content: "Choose your",
  title: "Perfect holiday",
  subTitle:
    "Dare convenevole senza vostro niuna credere mentre impermutabile forse al, essilio cose tale sua novellare,.",
};

const SearchPage = () => {
  const { cards, isLoading } = useSelector((state) => state.cards);
  const searchParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  const history = useHistory();
  const [cardData, setCardData] = useState(cards.items);
  const onRedirect = (item) => {
    dispatch({ type: GET_CARD_BY_ID, payload: { card: item } });
    history.push(`/tour-item/${item?._id}`);
  };

  React.useEffect(() => {
    dispatch(
      searchCard({
        destination: searchParams.get("destination") || "",
        time: searchParams.get("time") || "",
        type: searchParams.get("type") || "",
        page: searchParams.get("page") || "",
      })
    );
  }, [history.location.search]);

  useEffect(() => {
    setCardData(cards.items);
  }, [cards]);
  return (
    <Helmet title="Home Travel Agency" className="component">
      <div style={{ marginTop: "120px", height: "40px" }}></div>
      {/* filter date, time, location */}
      <TourFilter />
      <CustomTitle
        content={content1.content}
        title={content1.title}
        subTitle={content1.subTitle}
      />
      {/* selection item */}
      {Boolean(cardData.length) && (
        <Selections>
          {cardData.map((item, index) => (
            <div
              onClick={() => onRedirect(item)}
              key={index}
              className="cursor-pointer col col-xxl-3 col-lg-6 col-md-6 col-12"
            >
              <CardSelection
                img={item.img}
                title={item.title}
                rating={item.rating}
                cost={Number(item.cost)}
                icon={
                  Number(item.rating) < 6
                    ? "fas fa-star-half-alt"
                    : "fas fa-star"
                }
              />
            </div>
          ))}
        </Selections>
      )}
      {!cards.items.length && !isLoading && (
        <Selections>
          <h3 className="text-center">No cards found</h3>
        </Selections>
      )}
    </Helmet>
  );
};

export default SearchPage;
