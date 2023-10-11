/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./productItem.scss";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createCart } from "../../../actions/carts";

const ProductItem = ({ shopData }) => {
  const dispatch = useDispatch();
  const { authData } = useSelector((state) => state.authReducer);

  var [isAddCart, setCart] = useState(false);

  const onAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!authData) return toast.warning("Please login to add cart");
    dispatch(
      createCart({
        product: shopData,
        userId: authData.result._id,
        count: 1,
        total: 1 * shopData.cost,
      })
    );
    setCart(true);
  };

  const Button = function () {
    if (isAddCart)
      return (
        <Link to={"/my-cart"}>
          <button className="btn btn-product">VIEW CART</button>
        </Link>
      );
    else
      return (
        <button className="btn btn-product" onClick={(e) => onAddCart(e)}>
          ADD TO CART
        </button>
      );
  };
  return (
    <div className="product-item">
      <div className="img-container ">
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
