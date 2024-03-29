import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCardById } from "../../actions/cards";
import Loading from "../loading";
// import components
import Helmet from "../Helmet/Helmet";
import Banner from "../../components/banner/banner";
import Selections from "../../components/selections/selections";

import NavTabInfo from "../NavTabs/NavInfo";
import Sub from "../Subscribe/sub";

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
  const { card, isLoading } = useSelector((state) => state.cards);
  const [cardDataInit, setcardDataInit] = useState(card);

  useEffect(() => {
    if (!card) {
      dispatch(getCardById(slug));
    } else {
      setcardDataInit(card);
    }
  }, [card]);

  return (
    <Helmet title={cardDataInit?.title ?? "Tour Item"}>
      {!cardDataInit && (
        <div className="component mt-5 pt-5">
          <Loading />
        </div>
      )}
      {!cardDataInit && !isLoading && (
        <div className="component mt-5 pt-5">Tour not found!</div>
      )}
      {cardDataInit && !isLoading && (
        <div className="component">
          <Banner
            maxHeight={"800px"}
            img={cardDataInit.img}
            title={cardDataInit.title}
            subTitle="Amazing Tour"
            description={cardDataInit.subTitle}
          ></Banner>
          <NewStyleSelection>
            <Selections>
              <div className="row ">
                <NavTabInfo data={cardDataInit} />
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
