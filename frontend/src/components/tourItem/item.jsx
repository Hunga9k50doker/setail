import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCardById } from "../../actions/cards";
import cardData from "../../assets/fake-data/CardDetails";
import Loading from "../loading";
// import components
import Helmet from "../Helmet/Helmet";
import Banner from "../../components/banner/banner";
import Selections from "../../components/selections/selections";
import { BgSydneyOpera } from "../../assets/img";

import NavTabInfo from "../NavTabs/NavInfo";
import Sub from "../Subscribe/sub";
import { to_slug } from "../../utils/utils";

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

const ItemDetail = () => {
  const dispatch = useDispatch();
  let { slug } = useParams();
  const cardItem = cardData.getAllCards().find((item) => to_slug(item.title) === slug);
  const { card, cards, isLoading } = useSelector((state) => state.cards);
  useEffect(() => {
    if (!cardItem) {
      dispatch(getCardById(slug));
    }
  }, []);
  return (
    <Helmet title={cardItem ? cardItem.title : "Tour Item"}>
      {isLoading ? (
        <div className="component mt-5 pt-5">
          <Loading />
        </div>
      ) : (
        <div className="component">
          {cardItem ? (
            <Banner img={BgSydneyOpera} title={cardItem.title} subTitle="Amazing Tour" description={cardItem.description}></Banner>
          ) : (
            <Banner img={card.img} title={card.title} subTitle="Amazing Tour" description={card.subTitle}></Banner>
          )}

          <NewStyleSelection>
            <Selections>
              <div className="row ">
                <NavTabInfo data={card} />
              </div>
            </Selections>
          </NewStyleSelection>
        </div>
      )}
      <Sub />
    </Helmet>
  );
};

export default ItemDetail;
