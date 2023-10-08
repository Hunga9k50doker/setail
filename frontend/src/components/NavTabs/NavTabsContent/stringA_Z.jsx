import CardDetails from "../../../components/cards/cardDetails/cardDetails";

const NavContentLowToHigh = ({ data, isLoading, onRedirect }) => {
  return (
    <div className="row ">
      <div className="row">
        {data.map((item, index) => (
          <div
            onClick={() => onRedirect(item)}
            key={index}
            style={{ marginTop: "20px" }}
            className="col col-xxl-6 col-lg-6 col-md-6 col-12 cursor-pointer"
          >
            <CardDetails
              key={index}
              img={item.img}
              calendar={new Date(item.calendar).getMonth().toString()}
              custom={+item.custom}
              location={item.location}
              title={item.title}
              description={item.description}
              cost={Number(item.cost)}
              rating={item.rating}
              icon={
                Number(item.rating) < 6 ? "fas fa-star-half-alt" : "fas fa-star"
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavContentLowToHigh;
