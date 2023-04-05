import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createCard } from "../../actions/cards";
import { toast } from "react-toastify";
function Home() {
  const dispatch = useDispatch();
  const [cardData, setCardData] = useState({
    img: "",
    calendar: new Date().getMonth(),
    custom: 0,
    age: 0,
    location: "",
    title: "",
    subTitle: "",
    cost: 0,
    img__grid: [],
    rating: 5,
    review__details: [
      { title: "Rating", percent: 50 },
      { title: "Comfort", percent: 50 },
      { title: "Food", percent: 50 },
      { title: "Hospitality", percent: 50 },
      { title: "Hygiene", percent: 50 },
      { title: "Reception", percent: 50 },
    ],
  });
  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(createCard(cardData));
    clear();
  };
  const clear = () => {
    setCardData({
      img: "",
      calendar: new Date().getMonth(),
      custom: 0,
      age: 0,
      location: "",
      title: "",
      subTitle: "",
      cost: 0,
      img__grid: [],
    });
  };
  const onUpdate = (item) => {
    switch (item.target.name) {
      case "calendar":
        setCardData({ ...cardData, calendar: new Date(item.target.value).getMonth() });
        break;
      case "img__grid":
        const arrayImg = [];
        for (let index = 0; index < Array.from(item.target.files).length; index++) {
          let file = item.target.files[index];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            arrayImg.push(reader.result);
            const p = document.createElement("p");
            p.appendChild(document.createTextNode(file.name));
            document.getElementById("name_list_img").append(p);
          };
          reader.onerror = function (error) {
            toast(error.message);
          };
        }
        setCardData({ ...cardData, [item.target.name]: arrayImg });
        break;
      case "img":
        let file = item.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          setCardData({ ...cardData, [item.target.name]: reader.result });
        };
        reader.onerror = function (error) {
          toast(error.message);
        };
        if (file) {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
            setCardData({ ...cardData, [item.target.name]: reader.result });
            const p = document.createElement("p");
            p.appendChild(document.createTextNode(file.name));
            document.getElementById("name_img").append(p);
          };
          reader.onerror = function (error) {
            toast(error.message);
          };
        }
        break;
      default:
        setCardData({ ...cardData, [item.target.name]: item.target.value });
        break;
    }
  };
  return (
    <div className="home__admin container">
      <form className="row g-3 mt-5" onSubmit={handleSubmitForm}>
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input required onChange={onUpdate} autoComplete={"true"} type="text" className="form-control" name="title" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Calendar</label>
          <input required onChange={onUpdate} autoComplete={"true"} type="date" className="form-control" name="calendar" />
        </div>
        <div className="col-12">
          <label className="form-label">Price</label>
          <input required onChange={onUpdate} autoComplete={"true"} type="number" name="cost" className="form-control" placeholder="12000" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input required onChange={onUpdate} autoComplete={"true"} type="text" className="form-control" name="location" id="inputCity" />
        </div>
        {/* <div className="col-md-4">
          <label className="form-label">Location</label>
          <select value="" onChange={onUpdate} name="location" className="form-select">
            <option value="">Choose Location</option>
            <option value="New York">New York</option>
            <option value="BangKok">BangKok</option>
          </select>
        </div> */}
        <div className="col-md-3">
          <label className="form-label">Age</label>
          <input required onChange={onUpdate} type="number" autoComplete={"true"} className="form-control" name="age" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Amount Customer</label>
          <input required onChange={onUpdate} type="number" autoComplete={"true"} className="form-control" name="custom" />
        </div>
        <div className="col-12">
          <label className="form-check-label">Description</label>
          <textarea onChange={onUpdate} name="subTitle" cols={10} rows={3} autoComplete={"true"} className="form-control" type="text" />
        </div>
        <div className="col-12">
          <button className="btn btn-secondary">
            <label htmlFor="imagePrimary" className="form-check-label cursor-pointer">
              Upload image primary
            </label>
          </button>
          <input id="imagePrimary" onChange={onUpdate} className="form-check-input d-none" accept=".jpg,.png,.jpeg" type="file" name="img" />
          <div id="name_img"></div>
        </div>
        <div className="col-12">
          <button className="btn btn-secondary">
            <label htmlFor="imagesSecondary" className="form-check-label cursor-pointer">
              Upload images destination(recomand 8 images)
            </label>
          </button>
          <input
            id="imagesSecondary"
            onChange={onUpdate}
            className="form-check-input d-none"
            multiple
            accept=".jpg,.png,.jpeg"
            type="file"
            name="img__grid"
          />
          <div id="name_list_img"></div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
