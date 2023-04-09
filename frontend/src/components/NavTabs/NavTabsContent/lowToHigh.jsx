import { Link } from "react-router-dom";

// ip data
import cardData from "../../../assets/fake-data/CardDetails";

import CardDetails from "../../../components/cards/cardDetails/cardDetails";
import { to_slug, getSortCards } from "../../../utils/utils";

const NavContentLowToHigh = ({ data, isLoading, onRedirect }) => {
  const hef = window.location.pathname;

  return (
    <div className="row ">
      <div className="row">
        {/* get cards */}

        {getSortCards(data)
          .filter((e) => e.type !== "carousel__slider")
          .map((item, index) =>
            hef !== "/tours/split-list" ? (
              <div
                onClick={() => onRedirect(item)}
                key={index}
                style={{ marginTop: "20px" }}
                className="col col-xxl-6 col-lg-6 col-md-6 col-12 cursor-pointer"
              >
                <CardDetails
                  key={index}
                  img={item.img}
                  calendar={new Date(item.calendar).getMonth()}
                  custom={item.custom}
                  location={item.location}
                  title={item.title}
                  description={item.description}
                  cost={Number(item.cost)}
                  rating={item.rating}
                  icon={Number(item.rating) < 6 ? "fas fa-star-half-alt" : "fas fa-star"}
                />
              </div>
            ) : (
              <div
                onClick={() => onRedirect(item)}
                key={index}
                style={{ marginTop: "20px" }}
                className="col col-xxl-12 col-lg-12 col-md-12 col-12 cursor-pointer"
              >
                <CardDetails
                  key={index}
                  img={item.img}
                  calendar={new Date(item.calendar).getMonth()}
                  custom={item.custom}
                  location={item.location}
                  title={item.title}
                  description={item.description}
                  cost={Number(item.cost)}
                  rating={item.rating}
                  icon={Number(item.rating) < 6 ? "fas fa-star-half-alt" : "fas fa-star"}
                />
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default NavContentLowToHigh;
