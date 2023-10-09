/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./productItem.scss";
import React, { useState } from "react";

const ProductItem = ({ shopData }) => {
  var [isAddCart, setCart] = useState(false);

  const Button = function () {
    if (isAddCart)
      return (
        <button
          className="btn btn-product"
          onClick={function () {
            window.location.href = "";
          }}
        >
          VIEW CART
        </button>
      );
    else
      return (
        <button
          className="btn btn-product"
          onClick={function () {
            setCart(() => true);
          }}
        >
          ADD TO CART
        </button>
      );
  };
  return (
    <div className="product-item">
      <div className="img-container">
        <img width={300} height={300} src={shopData.img} alt={shopData.title} />
        {/* hover button */}
        <div className="overlay">{Button()}</div>
      </div>
      <Link className="product-name" to={`/shop/products/${shopData._id}`}>
        {shopData.title}
      </Link>
      <div className="info">
        <div className="info-rice">
          {shopData.sale ? (
            <>
              <p className="line-through">${shopData.cost}</p>
              <p>${shopData.cost - (shopData.cost * shopData.sale) / 100}</p>
            </>
          ) : (
            <p>${shopData.cost}</p>
          )}
        </div>
        <div className="rating">
          {shopData.rating < 5 ? (
            <>
              <i className="fas fa-star"></i> <i className="fas fa-star"></i>{" "}
              <i className="fas fa-star"></i> <i className="fas fa-star"></i>{" "}
              <i className="far fa-star"> </i>
            </>
          ) : (
            <>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i> <i className="fas fa-star"></i>{" "}
              <i className="fas fa-star"></i> <i className="fas fa-star"></i>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
