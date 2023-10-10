/* eslint-disable jsx-a11y/anchor-is-valid */
import "./sectionSingle.scss";
import React, { useState } from "react";
import { RatingStar } from "../../../utils/utils";
import { RatingStarInput } from "../../../utils/utils";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { createComment, getComments } from "../../../actions/comments";
import moment from "moment";
import { createCart } from "../../../actions/carts";
import { toast } from "react-toastify";

const ProductItemDetails = ({ itemData }) => {
  const { product, isLoading } = useSelector((state) => state.products);
  const { authData } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const [productCount, setProductCount] = useState(1);

  const onChange = (event) => {
    setProductCount(event.target.value || 1);
  };

  const onAddCart = () => {
    if (!authData) return toast.warning("Please login to add cart");
    dispatch(
      createCart({
        product: product,
        userId: authData.result._id,
        count: productCount,
        total: productCount * product.cost,
      })
    );
  };

  return (
    <div className="product-details__container">
      <div className="img__list">
        <div className="img-product">
          <img className="w-100" src={itemData.img} alt="img-product" />
        </div>
        <div className="gallery">
          {itemData.img__grid.map((e, i) => (
            <div className="img-gallery" key={i}>
              <img
                width={150}
                height={150}
                src={e}
                alt={`img-gallery-${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="info">
        <h1>{itemData.title}</h1>
        {itemData.sale ? (
          <>
            <p className="text-decoration-line-through">${itemData.cost}</p>
            <p className="price">
              ${itemData.cost - (itemData.cost * itemData.sale) / 100}
            </p>
          </>
        ) : (
          <p className="price">${itemData.cost}</p>
        )}
        <div className="rating">
          {itemData.rating < 5 ? (
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
          {itemData.numRating > 0 && (
            <p>({itemData.numRating} customer review)</p>
          )}
        </div>
        <p className="introduce">{itemData.description}</p>
        <div className="btn-container">
          <div className="product-count">
            <input
              className="product-count__input"
              type="number"
              min={1}
              max={999}
              maxLength={3}
              value={productCount}
              onChange={onChange}
            />
            <div className="btn btn__ud">
              <button
                onClick={() => {
                  setProductCount((e) => +e + 1);
                }}
              >
                <i className="fas fa-chevron-up"></i>
              </button>
              <button
                onClick={() => {
                  setProductCount((e) => (e === 1 ? 1 : +e - 1));
                }}
              >
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </div>
          <button
            className="btn-product"
            onClick={onAddCart}
            disabled={isLoading}
          >
            ADD TO CART
          </button>
        </div>
        <div className="detail-container">
          <div className="detail__label">
            <p className="label">SKU:</p>
            <p className="label">Category:</p>
            <p className="label">Tags:</p>
          </div>
          <div className="info__detail">
            <span className="span__detail">{itemData.sku}</span>
            <span className="span__detail">
              <Link to={`/shop/products/?category=${itemData.category}`}>
                {itemData.category}
              </Link>
            </span>
            <span className="span__detail">
              {itemData.tag.map((e, i) => (
                <Link key={i} className="tags" to={`/shop/products/?tag=${e}`}>
                  {e}
                </Link>
              ))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewProduct = () => {
  const [star, setStar] = useState(3);
  const [pageData, setPageData] = useState({
    totalPages: 1,
    currentPage: 1,
    totalCount: 0,
    items: [],
  });
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { authData } = useSelector((state) => state.authReducer);
  const { comments } = useSelector((state) => state.comments);

  const onChange = (event, newValue) => {
    setStar(newValue);
  };

  const onSubmit = (e) => {
    const formData = {
      user: {
        name: e.name,
        email: e.email,
        _id: authData?.result?._id,
        avatar: authData?.result?.avatar,
      },
      description: e.description,
      rating: star,
      productId: slug,
    };
    dispatch(createComment(formData));
  };

  const initialValues = {
    description: "",
    name: authData?.result?.name,
    email: authData?.result?.email,
    rating: 3,
  };

  const handleLoadMore = () => {
    dispatch(
      getComments({
        productId: slug,
        page: comments.currentPage + 1,
      })
    );
  };

  React.useEffect(() => {
    dispatch(getComments({ productId: slug }));
  }, []);

  React.useEffect(() => {
    setPageData(comments);
  }, [comments]);

  return (
    <div className="review-product-container">
      {pageData.totalCount > 0 && (
        <>
          <h2>{pageData.totalCount} review for Modern Hat</h2>
          {pageData.items.map((e, i) => (
            <div key={i} className="review-product__item my-4">
              <img
                width={50}
                height={50}
                src={e.user.avatar}
                alt="user-avartar"
                className="rounded-circle"
              />
              <div>
                <RatingStar rating={4} />
                <h4>
                  {e.user.name} – {moment(e.createdAt).format("MMMM Do YYYY")}
                </h4>
                <p>{e.description}</p>
              </div>
            </div>
          ))}
          {pageData.currentPage < pageData.totalPages && (
            <button className="btn btn-primary" onClick={handleLoadMore}>
              View more
            </button>
          )}
        </>
      )}

      <h2>Add a review</h2>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <p id="first-line">
              Your email address will not be published. Required fields are
              marked *
            </p>
            <p>Your rating *</p>
            <RatingStarInput onChange={onChange} />
            <label htmlFor="review">Your review*</label>
            <textarea
              onChange={handleChange}
              className="text-white"
              name="description"
              required
              value={values.description}
            ></textarea>
            <label htmlFor="name">Name*</label>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              id="name"
              readOnly
              className="text-white"
              value={authData?.result?.name}
            />
            <label htmlFor="email">Email*</label>
            <input
              onChange={handleChange}
              className="text-white"
              type="text"
              name="email"
              id="email"
              readOnly
              value={authData?.result?.email}
            />
            <input type="checkbox" name="save-session" id="save-session" />
            <label htmlFor="save-session" id="save-session__label">
              Save my name, email, and website in this browser for the next time
              i comment.
            </label>
            <button type="submit">SUBMIT</button>
          </form>
        )}
      </Formik>
    </div>
  );
};

const ProductDetailNav = ({ shopData }) => {
  const [tabActive, setTabActive] = useState(0);
  const itemList = [
    <p>{shopData.description}</p>,
    <div className="add-info">
      <div className="label">
        <span>Weight</span>
        <span>Dismensions</span>
      </div>
      <div>
        <span>{shopData.weight}</span>
        <span>{shopData.dismensions}</span>
      </div>
    </div>,
    <ReviewProduct />,
  ];
  return (
    <div className="product-single__tab">
      <div className="tab-list">
        <button
          onClick={() => {
            setTabActive(() => 0);
          }}
          className={`tabs-item ${tabActive === 0 ? "active" : ""}`}
        >
          DESCRIPTION
        </button>

        <button
          onClick={() => {
            setTabActive(() => 1);
          }}
          className={`tabs-item ${tabActive === 1 ? "active" : ""}`}
        >
          ADDITIONAL INFORMATION
        </button>
        <button
          onClick={() => {
            setTabActive(() => 2);
          }}
          className={`tabs-item ${tabActive === 2 ? "active" : ""}`}
        >
          REVIEWS(1)
        </button>
      </div>
      <div className="bottom">{itemList[tabActive]}</div>
    </div>
  );
};
export { ProductItemDetails, ProductDetailNav };
