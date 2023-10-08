import { Link } from "react-router-dom";
import "./sidebars.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createTour } from "../../actions/tours";
const SidebarBooking = () => {
  const [isvaliable, setIsValiable] = useState({
    status: true,
    title: "",
  });

  function checkAvaliable() {
    setIsValiable({
      status: card.avaliable,
      title: card.avaliable ? "Available!" : "Not Available!",
    });
  }

  const { authData } = useSelector((state) => state.authReducer);
  const { card } = useSelector((state) => state.cards);
  const { isLoading } = useSelector((state) => state.tours);
  const [formData, setFormData] = useState(initialvalues);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authData) {
      return toast.warning("You need login to do this action!");
    }
    if (!card.avaliable) {
      return toast.warning("Tour not available!");
    }
    const dataSubmit = {
      ...formData,
      userId: authData.result.id,
      cardId: card._id,
      total: +(formData.numberTikets * card.cost),
    };
    dispatch(createTour(dataSubmit));
    setFormData(initialvalues);
  };

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const timmer = setTimeout(() => {
      setIsValiable({
        ...isvaliable,
        title: "",
      });
    }, 3000);
    return clearTimeout(timmer);
  }, [isvaliable]);

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__item">
          <h3 className="sidebar__item-title">Book this tour</h3>
          <p className="sidebar__item-subTitle">
            Arrange your trip in advance - book this now!
          </p>
          <form className="sidebar__booking" onSubmit={handleSubmit}>
            <ul className="sidebar__item-inputs">
              <li className="sidebar__item-input">
                <i className="far fa-user"></i>
                <input
                  onChange={onChange}
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Name*"
                  required
                />
              </li>
              <li className="sidebar__item-input">
                <i className="far fa-envelope"></i>
                <input
                  onChange={onChange}
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email*"
                />
              </li>
              <li className="sidebar__item-input">
                <i className="fas fa-phone"></i>
                <input
                  onChange={onChange}
                  type="number"
                  name="phone"
                  id="phone__number"
                  min={0}
                  placeholder="Phone"
                />
              </li>
              <li className="sidebar__item-input">
                <label htmlFor="date__booking">
                  <i className="fas fa-calendar-week"></i>
                </label>

                <input
                  onChange={onChange}
                  style={{ width: "100%" }}
                  type="date"
                  name="date"
                  id="date__booking"
                  required
                  placeholder="dd-mm-yy*"
                />
              </li>
              <li className="sidebar__item-input">
                <i className="fas fa-thumbtack"></i>
                <input
                  onChange={onChange}
                  type="number"
                  name="numberTikets"
                  id="number__ticket"
                  required
                  placeholder="Number of tickets*"
                  min={0}
                />
              </li>
              <li className="sidebar__message__booking sidebar__item-input">
                <i className="far fa-comments"></i>
                <textarea
                  onChange={onChange}
                  name="description"
                  id="message__booking"
                  cols="25"
                  rows="3"
                  placeholder="Your message"
                ></textarea>
              </li>
            </ul>
            <div className="siderbar__item siderbar__item__btn">
              <button
                type="button"
                onClick={checkAvaliable}
                className="check__valid"
              >
                Check Availability
              </button>
              {isvaliable ? (
                <p className="text-success text-center">{isvaliable.title}</p>
              ) : (
                <p className="text-secondary text-center">{isvaliable.title}</p>
              )}
            </div>
            <div className="siderbar__item siderbar__item__btn">
              <button
                disabled={isLoading}
                type="submit"
                className="d-flex justify-content-center align-items-center"
              >
                Book now
                {/* {isLoading && <Spinner />} */}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link to="/shop/product-list" style={{ width: "100%" }} className="img">
        <img
          style={{ width: "100%", marginTop: "40px", objectFit: "contain" }}
          src={require("../../assets/img/other/sidebar-img-1.jpg").default}
          alt="not found"
        />
      </Link>
    </>
  );
};

const initialvalues = {
  cardId: "",
  userId: "",
  username: "",
  email: "",
  phone: "",
  date: "",
  description: "",
  numberTikets: 0,
  total: 0,
};
export default SidebarBooking;
