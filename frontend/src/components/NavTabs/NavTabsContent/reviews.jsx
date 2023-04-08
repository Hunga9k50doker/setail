import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { to_slug, RatingStarInput, RatingStar, numberWithCommas } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateReviewCard } from "../../../actions/cards";
import { useImmer } from "use-immer";
import { avartDefault } from "../../../assets/img";
import moment from "moment";
import { ScoreRating } from "../../../config/scoreRating.js";
import Spinner from "../../../components/spinner";
const Reviews = (props) => {
  const { data } = props;
  const [formData, setFormData] = useImmer(initialFormData);
  let [cardItem, setcardItem] = useState(data);
  const [dataUserReview, setdataUserReview] = useState(data.review__descriptions[data.review__descriptions.length - 1]);
  const [defaultValueRating, setDefaultValueRating] = useState(3);
  const { authData } = useSelector((state) => state.authReducer);
  const { card, isLoading } = useSelector((state) => state.cards);

  useEffect(() => {
    setdataUserReview(card.review__descriptions[card.review__descriptions.length - 1]);
    setcardItem(card);
  }, [card]);
  const dispatch = useDispatch();
  let { slug } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authData) {
      return toast.warning("You need login to do this action!");
    }
    const dataSubmit = {
      ...formData,
      email: authData?.result?.email,
      userId: authData?.result?._id,
      avatar: authData?.result?.avatar,
      username: authData?.result?.name,
    };
    dispatch(updateReviewCard(slug, dataSubmit));
    setcardItem(card);
    onClear();
  };

  const onClear = () => {
    setFormData({
      ...formData,
      description: "",
    });
    setDefaultValueRating(3);
  };

  const onChangeRating = (e, name) => {
    const foundIndex = formData.review__details.findIndex((x) => x.title === name);
    if (foundIndex !== -1) {
      let newData = Object.freeze(formData.review__details[foundIndex]);
      let newArr = [...formData.review__details];
      newData = {
        ...formData.review__details[foundIndex],
        percent: +e,
      };
      newArr[foundIndex] = newData;
      setFormData((draft) => {
        draft.review__details = newArr;
      });
    }
  };

  const onError = (err) => {
    err.target.src = avartDefault;
  };
  return (
    <div className="component nav__content">
      <React.Fragment>
        <div className="review__item">
          <h2 className="item__title">Reviews Scores and Score Breakdown</h2>

          <p className="item__subtitle">
            Dolores stet justo ipsum tempor ea sed et et. Consetetur ipsum ea eirmod et. Tempor elitr dolore et diam dolor, sadipscing dolore justo
            duo vero erat magna lorem stet sit..
          </p>
          <div className="review__item__detail">
            <h2 className="review__item__score">
              <>
                {cardItem.rating < 5 && cardItem.rating !== 0 && (
                  <>
                    {numberWithCommas(+cardItem.rating)}
                    <p>
                      <i className="fas fa-star-half-alt"></i> {ScoreRating.GOOD.title}
                    </p>
                  </>
                )}
                {cardItem.rating > 5 && (
                  <>
                    {numberWithCommas(+cardItem.rating)}
                    <p>
                      <i className="fas fa-star"></i> {ScoreRating.BEST.title}
                    </p>
                  </>
                )}
                {cardItem.rating === 0 && (
                  <>
                    {numberWithCommas(0)}
                    <p>
                      <i className="far fa-star"></i> {ScoreRating.NOT.title}
                    </p>
                  </>
                )}
              </>
            </h2>
            <ul className="list__progress__bar">
              {cardItem.review__details.map((element, id) => (
                <li key={id} className={element.title + "  item__progress__bar"}>
                  <h6>
                    <p>{element.title}</p>
                    <p>{element.percent?.toFixed(1)}%</p>
                  </h6>
                  <div className="item__pb">
                    <p style={{ width: `${element.percent?.toFixed(1)}%` }} className="item__pb__percent">
                      ''
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {dataUserReview && (
            <div className="user__reviews">
              <div className="user__img">
                <img
                  src={dataUserReview.avatar}
                  alt="Can't Get"
                  style={{ width: "130px", height: "130px", borderRadius: "50%" }}
                  onError={(e) => onError(e)}
                />
              </div>
              <div className="user__reviews__info">
                <h6>{dataUserReview.username}</h6>
                {/* <p>{7}</p> */}
                <div className="user__rating">
                  <div className="row">
                    <div className="col col-xl-4 col-lg-4 col-md-6 col-12">
                      <>
                        {dataUserReview.rating.map(
                          (element, k) =>
                            element.title === "Rating" && (
                              <h6 key={k} className="user__rating__title">
                                <p>{element.title}</p>
                                <RatingStar rating={element.percent} />
                              </h6>
                            )
                        )}
                        {dataUserReview.rating.map(
                          (element, k) =>
                            element.title === "Hospitality" && (
                              <h6 key={k} className="user__rating__title">
                                <p>{element.title} </p>
                                <RatingStar rating={element.percent} />
                              </h6>
                            )
                        )}
                      </>
                    </div>
                    <div className="col col-xl-4 col-lg-4 col-md-6 col-12">
                      <>
                        {dataUserReview.rating.map(
                          (element, k) =>
                            element.title === "Comfort" && (
                              <h6 key={k} className="user__rating__title">
                                <p>{element.title} </p>
                                <RatingStar rating={element.percent} />
                              </h6>
                            )
                        )}
                        {dataUserReview.rating.map(
                          (element, k) =>
                            element.title === "Hygiene" && (
                              <h6 key={k} className="user__rating__title">
                                <p>{element.title} </p>
                                <RatingStar rating={element.percent} />
                              </h6>
                            )
                        )}
                      </>
                    </div>
                    <div className="col col-xl-4 col-lg-4 col-md-6 col-12">
                      <>
                        {dataUserReview.rating.map(
                          (element, k) =>
                            element.title === "Food" && (
                              <h6 key={k} className="user__rating__title">
                                <p>{element.title} </p>
                                <RatingStar rating={element.percent} />
                              </h6>
                            )
                        )}
                        {dataUserReview.rating.map(
                          (element, k) =>
                            element.title === "Reception" && (
                              <h6 key={k} className="user__rating__title">
                                <p>{element.title} </p>
                                <RatingStar rating={element.percent} />
                              </h6>
                            )
                        )}
                      </>
                    </div>
                  </div>
                </div>
                <p className="time__reviews">{moment(dataUserReview.createdAt).format("MMMM DD, YYYY hh:mm a")}</p>
              </div>
            </div>
          )}

          <form className="row g-3 needs-validation post__comment" onSubmit={handleSubmit}>
            <h3 className="form__title">Post a Comment</h3>
            <div className="user__rating">
              <div className="row">
                <div className="col col-xl-4 col-lg-4 col-md-6 col-12">
                  <>
                    {cardItem.review__details.map(
                      (element, k) =>
                        element.title === "Rating" && (
                          <h6 key={k} className="user__rating__title">
                            <p>
                              <p>{element.title}</p>
                            </p>
                            <RatingStarInput defaultValue={defaultValueRating} name="Rating" onChange={onChangeRating} />
                          </h6>
                        )
                    )}
                    {cardItem.review__details.map(
                      (element, k) =>
                        element.title === "Hospitality" && (
                          <h6 key={k} className="user__rating__title">
                            <p>
                              <p>{element.title}</p>
                            </p>
                            <RatingStarInput defaultValue={defaultValueRating} name="Hospitality" onChange={onChangeRating} />
                          </h6>
                        )
                    )}
                  </>
                </div>
                <div className="col col-xl-4 col-lg-4 col-md-6 col-12">
                  <>
                    {cardItem.review__details.map(
                      (element, k) =>
                        element.title === "Comfort" && (
                          <h6 key={k} className="user__rating__title">
                            <p>
                              <p>{element.title}</p>
                            </p>
                            <RatingStarInput defaultValue={defaultValueRating} name="Comfort" onChange={onChangeRating} />
                          </h6>
                        )
                    )}
                    {cardItem.review__details.map(
                      (element, k) =>
                        element.title === "Hygiene" && (
                          <h6 key={k} className="user__rating__title">
                            <p>
                              <p>{element.title}</p>
                            </p>
                            <RatingStarInput defaultValue={defaultValueRating} name="Hygiene" onChange={onChangeRating} />
                          </h6>
                        )
                    )}
                  </>
                </div>
                <div className="col col-xl-4 col-lg-4 col-md-6 col-12">
                  <>
                    {cardItem.review__details.map(
                      (element, k) =>
                        element.title === "Food" && (
                          <h6 key={k} className="user__rating__title">
                            <p>
                              <p>{element.title}</p>
                            </p>
                            <RatingStarInput defaultValue={defaultValueRating} name="Food" onChange={onChangeRating} />
                          </h6>
                        )
                    )}
                    {cardItem.review__details.map(
                      (element, k) =>
                        element.title === "Reception" && (
                          <h6 key={k} className="user__rating__title">
                            <p>
                              <p>{element.title}</p>
                            </p>
                            <RatingStarInput defaultValue={defaultValueRating} name="Reception" onChange={onChangeRating} />
                          </h6>
                        )
                    )}
                  </>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">
                  <i className="far fa-comments"></i>
                </span>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  type="text"
                  className="form-control"
                  id="validationCustom03"
                  placeholder="Comment"
                  rows="10"
                ></textarea>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">
                  <i className="fas fa-user"></i>
                </span>
                <input type="text" className="form-control" id="validationCustom02" placeholder="Name*" value={authData?.result?.name} readOnly />
              </div>
              <div className="valid-feedback">Looks good!</div>
            </div>
            <div className="col-md-6">
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">
                  <i className="far fa-envelope"></i>
                </span>
                <input
                  type="email"
                  className="form-control"
                  id="validationCustomUsername"
                  aria-describedby="inputGroupPrepend"
                  placeholder="Email"
                  value={authData?.result?.email}
                  readOnly
                />
                <div className="invalid-feedback">Please choose a Email.</div>
              </div>
            </div>

            <div className="col-12">
              <div className="form-check">
                <input type="checkbox" value="" id="invalidCheck" />
                <label className="form-check-label" htmlFor="invalidCheck">
                  Save my name, email, and website in this browser for the next time I comment.
                </label>
                <div className="invalid-feedback">You must agree before submitting.</div>
              </div>
            </div>
            <div className="col-12">
              <button disabled={isLoading} className="btn btn-primary d-flex align-items-center justify-content-center" type="submit">
                Submit
                {isLoading && <Spinner />}
              </button>
            </div>
          </form>
        </div>
      </React.Fragment>
    </div>
  );
};

const initialFormData = {
  review__details: [
    {
      title: "Rating",
      percent: 60,
      count: 1,
    },
    {
      title: "Comfort",
      percent: 60,
      count: 1,
    },
    {
      title: "Food",
      percent: 60,
      count: 1,
    },
    {
      title: "Hospitality",
      percent: 60,
      count: 1,
    },
    {
      title: "Hygiene",
      percent: 60,
      count: 1,
    },
    {
      title: "Reception",
      percent: 60,
      count: 1,
    },
  ],
  description: "",
};

export default Reviews;
