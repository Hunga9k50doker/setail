import React, { useState } from "react";
import "./Nav.scss";
import "../../styles/global.scss";
import { NavLink, Link, useHistory } from "react-router-dom";
import LogoHeader from "../../assets/img/logo/logo-header.png";
import { CustomTitle, map, CardEmpty } from "../../assets/img";
import { LOGOUT } from "../../constants/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import moment from "moment";

const Nav = () => {
  const { authData } = useSelector((state) => state.authReducer);
  const { cart } = useSelector((state) => state.carts);

  const [showAncordion, setShowAncordion] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/?destination=${e.target[0].value}`);
    document.querySelector(".offcanvas").classList.remove("show");
    document.querySelector(".offcanvas-backdrop").classList.remove("show");
    document.querySelector(".offcanvas #search").value = "";
  };

  const logout = () => {
    dispatch({ type: LOGOUT });
    window.location.replace("/");
  };
  return (
    <div className="nav nav__category">
      <Link to="/">
        <picture style={{ position: "relative", zIndex: "99" }}>
          <source srcSet={LogoHeader} media="(min-width: 1025px)" />
          <img className="nav__logo" src={LogoHeader} alt="Not found" />
        </picture>
      </Link>
      <ul className="nav__list">
        <li className="nav__list-item nav__list-item-Home">
          <h3 activeclassname="active" className="nav__list-item-title">
            Home
          </h3>
          <div className="nav__list-item-selections">
            <NavLink
              to="/"
              className="nav__list-item-selection"
              activeclassname="active"
              exact={true}
            >
              <p>Travel Agency</p>
            </NavLink>
            <NavLink
              to="/home/winter-holidays"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Winters Holidays</p>
            </NavLink>
            <NavLink
              to="/home/exotic-destinations"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Exotic Destinations</p>
            </NavLink>
          </div>
        </li>{" "}
        <li className="nav__list-item nav__list-item-Pages">
          <h3 className="nav__list-item-title">Pages</h3>
          <div className="nav__list-item-selections">
            <NavLink
              to="/pages/about-us"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>About Us</p>
            </NavLink>
            <NavLink
              to="/pages/what-we-offer"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>What We Offer</p>
            </NavLink>
            <NavLink
              to="/pages/our-team"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Our Team</p>
            </NavLink>
          </div>
        </li>{" "}
        <li className="nav__list-item nav__list-item-Destinations">
          <h3 className="nav__list-item-title">Destinations</h3>
          <div className="nav__list-item-selections">
            <NavLink
              to="/destinations/list"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Destination List</p>
            </NavLink>
            <NavLink
              to="/destinations/slider"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Destination Slider</p>
            </NavLink>
            <NavLink
              to="/destinations/slovenia"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Destination Item</p>
            </NavLink>
          </div>
        </li>{" "}
        <li className="nav__list-item nav__list-item-Tours">
          <h3 className="nav__list-item-title">Tours</h3>
          <div className="nav__list-item-selections">
            <NavLink
              to="/tours/standard-list"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Standard List</p>
            </NavLink>
            <NavLink
              to="/tours/gallery-list"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Gallery List</p>
            </NavLink>
            <NavLink
              to="/tours/split-list"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Split List</p>
            </NavLink>
          </div>
        </li>{" "}
        <li className="nav__list-item nav__list-item-Blog">
          <h3 className="nav__list-item-title">Blog</h3>
          <div className="nav__list-item-selections">
            <NavLink
              to="/blog/masonry"
              className="nav__list-item-selection"
              activeclassname="active"
            >
              <p>Blog Masonry</p>
            </NavLink>
            <div className="nav__list-item-selection">
              <p>Blog Standard</p>
              <i className="fas fa-chevron-right"></i>
              <ul className="sub-menu ">
                <li className="sub-menu-item">
                  <NavLink to="/blog/right-sidebar">Right Sidebar</NavLink>
                </li>
                <li className="sub-menu-item">
                  <NavLink to="/blog/left-sidebar">Left Sidebar</NavLink>
                </li>
                <li className="sub-menu-item">
                  <NavLink to="/blog/without-sidebar">Without Sidebar</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </li>{" "}
        <li className="nav__list-item nav__list-item-Shop">
          <NavLink
            to="/shop/products"
            className="nav__list-item-title"
            activeclassname="active"
          >
            Shop
          </NavLink>
        </li>
        <li className="nav__list-item nav__list-item-Elements">
          <h3 className="nav__list-item-title">Elements</h3>
          <div className="nav__list-item-selections">
            <ul className="nav__list-item-selection sub-category">
              <li className="sub-category-item">Featured</li>
              <li className="sub-category-item">
                <NavLink to="/elements/tour-list" activeclassname="active">
                  Tour List
                </NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/tour-carousel" activeclassname="active">
                  Tour Carousel
                </NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/tour-filter">Tour Filter</NavLink>
              </li>
            </ul>
            <ul className="nav__list-item-selection sub-category">
              <li className="sub-category-item">Presentation</li>
              <li className="sub-category-item">
                <NavLink to="/elements/team">Team</NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/blog-list">Blog List</NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/shop-list">Shop List</NavLink>
              </li>
            </ul>
            <ul className="nav__list-item-selection sub-category">
              <li className="sub-category-item">Classic</li>
              <li className="sub-category-item">
                <NavLink to="/elements/accordions">Accordions</NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/tabs">Tabs</NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/buttons">Buttons</NavLink>
              </li>
            </ul>
            <ul className="nav__list-item-selection sub-category">
              <li className="sub-category-item">Typography</li>
              <li className="sub-category-item">
                <NavLink to="/elements/headings">Headings</NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/columns">Columns</NavLink>
              </li>
              <li className="sub-category-item">
                <NavLink to="/elements/section-title">Section Title</NavLink>
              </li>
            </ul>
          </div>
        </li>
      </ul>

      <ul className="nav__innerRight">
        <li className="nav__innerRight-item nav__innerRight-item-cart">
          <Badge badgeContent={cart.totalCount} color="primary">
            <i className="fas fa-shopping-cart"></i>
          </Badge>
          {cart.totalCount === 0 ? (
            <div className="cart-category">
              <p>No products in the cart.</p>
              <img className="no-cart-img" src={CardEmpty} alt="Not found" />
            </div>
          ) : (
            <div className="cart-category">
              {cart.items.map((item, key) => (
                <Link
                  key={key}
                  to={`/shop/products/${item.product._id}`}
                  className="d-flex justify-content-start"
                >
                  <ListItem>
                    <ListItemAvatar>
                      <img
                        width={50}
                        height={50}
                        src={item.product.img}
                        alt="Not found"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.product.title}
                      secondaryTypographyProps={{ component: "div" }}
                      secondary={moment(item.product.updatedAt).format(
                        "MMM DD YYYY"
                      )}
                    />
                  </ListItem>
                </Link>
              ))}
              <Link to="/my-cart">
                <button className="mx-0 my-0 mb-4 btn btn-primary">
                  View cart
                </button>
              </Link>
            </div>
          )}
        </li>
        <li className="nav__innerRight-item nav__innerRight-item-search">
          <Link to="/search">
            <i className="fas fa-search"></i>
          </Link>
        </li>
        <li
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          className="nav__innerRight-item nav__innerRight-item-category nav__bar__highPc"
        >
          <i className="fas fa-bars"></i>
        </li>
        <li
          onClick={() => setShowAncordion(!showAncordion)}
          className="nav__innerRight-item nav__innerRight-item-category nav__bar__lowPc"
        >
          <i className="fas fa-bars"></i>
        </li>
      </ul>

      {/* =======account on <=low pc (1024px) */}
      <div className="nav-account">
        {authData ? (
          <div className="displayName__account">
            <p>
              <i className="far fa-user"></i>
            </p>
            <ul className="options__account">
              <Link to="/setting" className="w-100 ">
                <li className="w-100 text-center">Setting</li>
              </Link>
              <Link to="/my-tour" className="w-100 ">
                <li className="w-100 text-center">My tour</li>
              </Link>
              <li onClick={() => logout()}>Logout</li>
            </ul>
          </div>
        ) : (
          <a data-bs-toggle="modal" href="#exampleModalToggle">
            <i className="far fa-user-circle"></i>
          </a>
        )}
      </div>
      {/* ===============canvals================= */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <h5 className="offcanvals__logo">
            <img src={LogoHeader} alt="Not found" />
          </h5>
          <h5 id="offcanvasRightLabel">
            <img src={CustomTitle} alt="Not found" />
          </h5>
          <h5 id="offcanvas__map">
            <a
              rel="noreferrer"
              target="_blank"
              href="https://goo.gl/maps/CtDU2ZbfngAxT2pe6"
            >
              <img src={map} alt="Not found" />
            </a>
          </h5>
          <h5 className="offcanvas__subtitle">
            Eos et ea vero et et clita elitr elitr justo dolores. Amet sed dolor
            aliquyam sanctus et consetetur dolore invidunt. Ut erat takimata
            justo et sed sea clita tempor diam,.
          </h5>
          <h3 className="offcanvas__title">Find Your Destination</h3>
          <form onSubmit={handleSubmit} className="canvas__search">
            <input
              placeholder="Search..."
              type="text"
              name="search"
              id="search"
            />
            <button type="submit">
              <i className="fab fa-searchengin"></i>
            </button>
          </form>
          <h3 className="offcanvas__title">Follow Me</h3>
          <ul className="list__social">
            <li className="item__social">
              <a
                href="https://twitter.com/home"
                rel="noreferrer"
                target="_blank"
              >
                <i className=" fab fa-twitter"></i>
              </a>
            </li>
            <li className="item__social">
              <a
                href="https://www.pinterest.com/qodeinteractive/"
                rel="noreferrer"
                target="_blank"
              >
                <i className=" fab fa-pinterest-p"></i>
              </a>
            </li>
            <li className="item__social">
              <a
                href="https://www.instagram.com/"
                rel="noreferrer"
                target="_blank"
              >
                <i className=" fab fa-instagram"></i>
              </a>
            </li>
            <li className="item__social">
              <a
                href="https://www.facebook.com/"
                rel="noreferrer"
                target="_blank"
              >
                <i className=" fab fa-facebook-f"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ======ancordion category=========== */}
      <div
        className={`accordion accordion__nav ${showAncordion ? "active" : ""}`}
        id="accordionExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Home
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body ">
              <NavLink
                to="/"
                className="nav__list-item-selection"
                // activeclassname="active"

                exact={true}
              >
                <p>Travel Agency</p>
              </NavLink>
              <NavLink
                to="/home/winter-holidays"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Winters Holidays</p>
              </NavLink>
              <NavLink
                to="/home/exotic-destinations"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Exotic Destinations</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Pages
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {" "}
              <NavLink
                to="/pages/about-us"
                className="nav__list-item-selection"

                // activeclassname="active"
              >
                <p>About Us</p>
              </NavLink>
              <NavLink
                to="/pages/what-we-offer"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>What We Offer</p>
              </NavLink>
              <NavLink
                to="/pages/our-team"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Our Team</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              Destinations
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <NavLink
                to="/destinations/list"
                className="nav__list-item-selection"

                // activeclassname="active"
              >
                <p>Destination List</p>
              </NavLink>
              <NavLink
                to="/destinations/slider"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Destination Slider</p>
              </NavLink>
              <NavLink
                to="/destinations/item"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Destination Item</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFour">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Tours
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {" "}
              <NavLink
                to="/tours/standard-list"
                className="nav__list-item-selection"

                // activeclassname="active"
              >
                <p>Standard List</p>
              </NavLink>
              <NavLink
                to="/tours/gallery-list"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Gallery List</p>
              </NavLink>
              <NavLink
                to="/tours/split-list"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Split List</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFive">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              Blog
            </button>
          </h2>
          <div
            id="collapseFive"
            className="accordion-collapse collapse"
            aria-labelledby="headingFive"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              {" "}
              <NavLink
                to="/blog/masonry"
                className="nav__list-item-selection"

                // activeclassname="active"
              >
                <p>Blog Masonry</p>
              </NavLink>
              <div className="nav__list-item-selection">
                <p>Blog Standard</p>
                <i className="fas fa-chevron-right"></i>
                <ul className="sub-menu ">
                  <li className="sub-menu-item">
                    <NavLink to="/blog/right-sidebar">Right Sidebar</NavLink>
                  </li>
                  <li className="sub-menu-item">
                    <NavLink to="/blog/left-sidebar">Left Sidebar</NavLink>
                  </li>
                  <li className="sub-menu-item">
                    <NavLink to="/blog/without-sidebar">
                      Without Sidebar
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="nav__list-item-selection">
                <p>Blog Types</p>
                <i className="fas fa-chevron-right"></i>
                <ul className="sub-menu ">
                  <li className="sub-menu-item">
                    <NavLink
                      to="/blog/standard"
                      //  activeclassname="active"
                    >
                      Standard
                    </NavLink>
                  </li>
                  <li className="sub-menu-item">
                    <NavLink
                      to="/blog/gallery"
                      //  activeclassname="active"
                    >
                      Gallery
                    </NavLink>
                  </li>
                  <li className="sub-menu-item">
                    <NavLink
                      to="/blog/NavLink"
                      //  activeclassname="active"
                    >
                      NavLink
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingSix">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              Shop
            </button>
          </h2>
          <div
            id="collapseSix"
            className="accordion-collapse collapse"
            aria-labelledby="headingSix"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <NavLink
                to="/shop/product-list"
                className="nav__list-item-selection"

                // activeclassname="active"
              >
                <p>Product List</p>
              </NavLink>
              <NavLink
                to="/shop/product-single"
                className="nav__list-item-selection"
                // activeclassname="active"
              >
                <p>Product Single</p>
              </NavLink>
              <div className="nav__list-item-selection">
                <p>Shop Layout</p>
                <i className="fas fa-chevron-right"></i>
                <ul className="sub-menu">
                  <li className="sub-menu-item">
                    <NavLink to="/shop/three-columns">Three Columns</NavLink>
                  </li>
                  <li className="sub-menu-item">
                    <NavLink to="/shop/four-columns">Four Columns</NavLink>
                  </li>
                  <li className="sub-menu-item">
                    <NavLink to="/shop/full-width">Full Width</NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item accordion-item-elements ">
          <h2 className="accordion-header" id="headingSeven">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSven"
              aria-expanded="false"
              aria-controls="collapseSven"
            >
              Elements
            </button>
          </h2>
          <div
            id="collapseSven"
            className="accordion-collapse collapse"
            aria-labelledby="headingSeven"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body accordion-body-element">
              <ul className="nav__list-item-selection sub-category  ">
                <li className="sub-category-item">Featured</li>
                <li className="sub-category-item">
                  <NavLink
                    to="/elements/tour-list"
                    //  activeclassname="active"
                  >
                    Tour List
                  </NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/tour-carousel">Tour Carousel</NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/tour-filter">Tour Filter</NavLink>
                </li>
              </ul>
              <ul className="nav__list-item-selection sub-category">
                <li className="sub-category-item">Presentation</li>
                <li className="sub-category-item">
                  <NavLink to="/elements/team">Team</NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/blog-list">Blog List</NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/shop-list">Shop List</NavLink>
                </li>
              </ul>
              <ul className="nav__list-item-selection sub-category">
                <li className="sub-category-item">Classic</li>
                <li className="sub-category-item">
                  <NavLink to="/elements/accordions">Accordions</NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/tabs">Tabs</NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/buttons">Buttons</NavLink>
                </li>
              </ul>
              <ul className="nav__list-item-selection sub-category">
                <li className="sub-category-item">Typography</li>
                <li className="sub-category-item">
                  <NavLink to="/elements/headings">Headings</NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/columns">Columns</NavLink>
                </li>
                <li className="sub-category-item">
                  <NavLink to="/elements/section-title">Section Title</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
