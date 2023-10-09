import React from "react";
import "./single.scss";
import "../../App.scss";
import ProductItem from "../../../components/Product/item/productItem";
import {
  ProductDetailNav,
  ProductItemDetails,
} from "../../../components/Product/item/sectionSingle";
import { Baner1, banData } from "../../../components/blogItem/BlogItem";
import { useSelector, useDispatch } from "react-redux";
import { getProductById, getProducts } from "../../../actions/products";
import { useParams } from "react-router-dom";
import Loading from "../../../components/loading";
const ShopSingle = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { product, products, isLoading } = useSelector(
    (state) => state.products
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getProductById(slug));
  }, [slug]);

  React.useEffect(() => {
    if (product)
      dispatch(
        getProducts({
          category: product.category,
        })
      );
  }, [product]);

  if (!product && isLoading) return <Loading />;
  if (!product && !isLoading) return <h3>No data</h3>;

  return (
    <div className="product-list-single">
      <Baner1 banData={banData[1]} />
      <div className="background">
        <ProductItemDetails itemData={product} />
        <ProductDetailNav shopData={product} />
        <h1>Related Products</h1>
        <div className="related-product">
          {products.items
            .filter((e) => e._id !== slug)
            .map((e, i) => (
              <div className="item" key={i}>
                <ProductItem shopData={e} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ShopSingle;
