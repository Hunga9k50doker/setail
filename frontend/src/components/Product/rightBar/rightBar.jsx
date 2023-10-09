/* eslint-disable jsx-a11y/anchor-is-valid */
import "./rightBar.scss";
import { useHistory } from "react-router-dom";
const SearchBar = ({ handleSubmit }) => {
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/?destination=${e.target[0].value}`);
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit || onSubmit}>
        <input
          className="ip-search"
          type="text"
          placeholder="Search Product..."
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            style={{ fill: "#fff" }}
          >
            <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

const Categories = ({ children }) => {
  return (
    <div className="category-list">
      <h5 className="sidebar__item__title">Categories</h5>
      <ul>{children}</ul>
    </div>
  );
};

const ProductMini = ({ shopData }) => {
  function RatingStar() {
    let star = "";
    for (var i = 1; i <= 5; i++) {
      if (i > shopData.rating) star += '<i className="far fa-star"></i>';
      else star += '<i className="fas fa-star"></i>';
    }
    return <div className="star" dangerouslySetInnerHTML={{ __html: star }} />;
  }
  return (
    <div className="product-mini">
      <div className="me-2">
        <img src={shopData.img} alt={shopData.title} />
      </div>
      <div>
        <a className="product-name" href="">
          {shopData.title}
        </a>
        <div>
          {shopData.sale ? (
            <>
              <p className="line-through">${shopData.cost}</p>
              <p>${shopData.cost - (shopData.cost * shopData.sale) / 100}</p>
            </>
          ) : (
            <p>${shopData.cost}</p>
          )}
        </div>
        {RatingStar()}
      </div>
    </div>
  );
};
export { SearchBar, Categories, ProductMini };
