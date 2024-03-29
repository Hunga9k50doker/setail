/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../App.scss";
import "./list.scss";
import ProductItem from "../../../components/Product/item/productItem";
import {
  SearchBar,
  Categories,
  ProductMini,
} from "../../../components/Product/rightBar/rightBar";
import { Baner1, banData } from "../../../components/blogItem/BlogItem";
import { amazingTour } from "../../../assets/img";
import FilterPrice from "../../../components/filter/filterPrice";
import { getProducts } from "../../../actions/products";
import Pagination from "@mui/material/Pagination";
import useSearchParam from "../../../hook/useSearchParam";
import { useHistory } from "react-router-dom";

const ShopList = () => {
  const ITEM_PER_PAGE = 12;
  const page = useSearchParam("page");
  const sort = useSearchParam("sort");
  const cate = useSearchParam("category");
  const name = useSearchParam("name");
  const price = useSearchParam("price");
  const min = useSearchParam("min");
  const max = useSearchParam("max");
  const tag = useSearchParam("tag");

  const dispatch = useDispatch();
  const history = useHistory();
  const { products } = useSelector((state) => state.products);
  const tags = [
    "Accessories",
    "Beach",
    "Camping",
    "Summer",
    "Vintage",
    "Winter",
  ];

  const handleChange = (e, value) => {
    const category = tags.find((e) => e === value);
    if (category)
      history.push(`${history.location.pathname}?category=${category}`);
    else
      history.push(
        `${history.location.pathname}?page=${value || 1}&sort=${
          e.target.value || sort || ""
        }&category=${cate || ""}`
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`${history.location.pathname}?name=${e.target[0].value}`);
  };

  const onFilterPrice = (e) => {
    e.preventDefault();
    if (e.target[0].value === e.target[1].value)
      history.push(`${history.location.pathname}?price=${e.target[0].value}`);
    else
      history.push(
        `${history.location.pathname}?min=${e.target[0].value}&max=${e.target[1].value}`
      );
  };

  React.useEffect(() => {
    dispatch(
      getProducts({
        itemsPerPage: ITEM_PER_PAGE,
        page,
        sort,
        category: cate,
        name,
        min,
        max,
        price,
        tag,
      })
    );
  }, [history.location.search]);

  return (
    <div className="product-list">
      <Baner1 banData={banData[1]} />
      <div className="container">
        <div className="row">
          <div className="col col-xxl-9 col-xl-9 col-md-9 col-sm-12">
            <div className="left-col">
              <div className="top-content">
                <span>{`Showing page ${products.currentPage} of ${
                  products.totalPages || 1
                }`}</span>
                <div className="d-flex align-items-center gap-2">
                  {history.location.search && (
                    <button
                      onClick={() => history.push("/shop/products")}
                      className="my-0 mx-0 btn btn-primary"
                    >
                      Reset filter
                    </button>
                  )}
                  <select
                    name="sort-item"
                    id="sort-item"
                    size="1"
                    onChange={handleChange}
                  >
                    <option value="popular">Sort by popularity</option>
                    <option value="rating">Sort by average rating</option>
                    <option default value="date">
                      Sort by lasted
                    </option>
                    <option value="lowprice">
                      Sort by price: low to hight
                    </option>
                    <option value="highprice">
                      Sort by price: high to low
                    </option>
                  </select>
                </div>
              </div>
              {products.totalCount > 0 && (
                <>
                  <div className="row">
                    {products.items.map((e, i) => (
                      <div
                        key={i}
                        className="col col-xxl-4 col-xl-4 col-md-4 col-sm-12 py-4"
                      >
                        <div className="item">
                          <Link to={`/shop/products/${e._id}`}>
                            <ProductItem key={i} shopData={e} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bottom-content">
                    <Pagination
                      onChange={handleChange}
                      className="mx-auto mt-4"
                      count={products.totalPages}
                      variant="outlined"
                      color="primary"
                      page={products.currentPage}
                    />
                  </div>
                </>
              )}
              {products.totalCount === 0 && (
                <h3 className="text-center">No data</h3>
              )}
            </div>
          </div>
          <div className="col col-xxl-3 col-xl-3 col-md-3 col-sm-12">
            <div className="right-col">
              <SearchBar handleSubmit={handleSubmit} />
              <FilterPrice onSubmit={onFilterPrice}>
                <div className="fillter__button">
                  <button type="submit">Filter</button>
                </div>
              </FilterPrice>
              <Categories>
                <>
                  {tags.map((e, index) => (
                    <li
                      role="button"
                      key={index + 1}
                      onClick={(event) => handleChange(event, e)}
                    >
                      {e}
                    </li>
                  ))}
                </>
              </Categories>
              <div className="popular-product">
                <h5>Popular products</h5>
                {products.items.slice(0, 3).map((e, i) => (
                  <ProductMini key={i} shopData={e} />
                ))}
              </div>
              <img id="img-amazing-tour" src={amazingTour} alt="amazing-tour" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopList;
