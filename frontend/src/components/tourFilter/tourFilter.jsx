import "./tourFilter.scss";
import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const TourFilter = ({ children }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const history = useHistory();
  const [formData, setFormData] = React.useState({
    destination: searchParams.get("destination") || "",
    time: searchParams.get("time") || "",
    type: searchParams.get("type") || "",
  });
  const handleSubmit = () => {
    if (
      formData.type === "" &&
      formData.time === "" &&
      formData.destination === ""
    )
      return toast.warning("Please enter at least one field");
    history.push(
      `/search/?destination=${formData.destination || ""}&time=${
        formData.time || ""
      }&type=${formData.type || ""}`
    );
  };
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="tour">
      <form
        className="tour__filter"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <ul className="tour__filter-list">
          {children}
          <li className="tour__filter-item">
            <i className="far fa-compass"></i>
            <input
              type="text"
              name="destination"
              onChange={onChange}
              placeholder="Where to?"
              defaultValue={formData.destination}
            />
          </li>
          <li className="tour__filter-item">
            <i className="far fa-calendar-alt"></i>
            <select
              id="tour__filter-item-months"
              name="time"
              onChange={onChange}
              defaultValue={formData.time}
            >
              <option value="">Month</option>
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">March</option>
              <option value="4">April</option>
              <option value="5">May</option>
              <option value="6">June</option>
              <option value="7">July</option>
              <option value="8">August</option>
              <option value="9">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </li>
          <li className="tour__filter-item">
            <i className="fas fa-thumbtack"></i>
            <select
              id="tour__filter-item-travel-types"
              name="type"
              onChange={onChange}
              defaultValue={formData.type}
            >
              <option value="">Travel Type</option>
              <option value="Europe">Europe</option>
              <option value="Latest">Latest</option>
              <option value="NY">NY</option>
              <option value="Po">PoPular</option>
              <option value="Skiing">Skiing</option>
              <option value="Trendy">Trendy</option>
              <option value="Wines">Wines</option>
            </select>
          </li>
          <li className="tour__filter-item">
            <input type="submit" value="Find now" />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default TourFilter;
