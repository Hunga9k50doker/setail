import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { FormControl } from "@mui/material";

const RatingStarInput = ({ name, onChange, defaultValue, ...props }) => {
  return (
    <FormControl>
      <Rating
        name="simple-controlled"
        defaultValue={defaultValue || 3}
        onChange={onChange}
        emptyIcon={
          <StarIcon
            style={{ opacity: 0.55, color: "#fff" }}
            fontSize="inherit"
          />
        }
      />
    </FormControl>
  );
};

const RatingStar = ({ rating }) => {
  let score = rating / 20;
  let star = "";
  for (var i = 1; i <= 5; i++) {
    if (i > score) star += `<i className="far fa-star"></i>`;
    else star += '<i class="fas fa-star"></i>';
  }
  return (
    <article className="star" dangerouslySetInnerHTML={{ __html: star }} />
  );
};

// convert string to slug
function to_slug(str) {
  // Chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  str = str.replace(/(đ)/g, "d");

  // Xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  // xóa phần dự - ở đầu
  str = str.replace(/^-+/g, "");

  // xóa phần dư - ở cuối
  str = str.replace(/-+$/g, "");

  // return
  return str;
}

// pagination
function Pagination({ data, RenderComponent, pageLimit, dataLimit }) {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function nextPage() {
    setCurrentPage((page) => page + 1);
  }
  function prePage() {
    setCurrentPage((page) => page - 1);
  }
  function changePage(e) {
    const page = Number(e.target.textContent);
    setCurrentPage(page);
  }
  function getPaginateData() {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  }
  function getGroupPage() {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, id) => start + id + 1);
  }
  return (
    <>
      <div className="container__data">
        {getPaginateData().map((e, id) => (
          <RenderComponent key={id} data={e} />
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={prePage}
          className={`btn_pre btn_pagi ${currentPage === 1 ? "disabled" : ""}`}
        >
          Pre
        </button>
        {getGroupPage().map((e, id) => (
          <button
            key={id}
            onClick={changePage}
            className={`btn_pagi ${currentPage === e ? "active" : "null"}`}
          >
            {e}
          </button>
        ))}
        <button
          onClick={nextPage}
          className={`btn_next btn_pagi ${
            currentPage === pages ? "disabled" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

// get random
const get_random = (arr, count) => {
  const max = arr.length - count;
  const min = 0;
  const start = Math.floor(Math.random() * (max - min) + min);
  return arr.slice(start, start + count);
};

//sort low to high
const getSortCards = (arr) =>
  arr.sort(function (a, b) {
    return Number(a.cost) - Number(b.cost);
  });

// sort high to low
const getSortParseCards = (arr) =>
  arr.sort(function (a, b) {
    return Number(b.cost) - Number(a.cost);
  });

// sort flow name A- Z
const getSortStringCards = (arr) =>
  arr.sort(function (a, b) {
    return ("" + a.title).localeCompare(b.title);
  });

// parallax bg
const parallaxBackground = (ref) => {
  window.addEventListener("scroll", () => {
    let offset = window.scrollY;
    ref.style.backgroundPositionY = offset * -0.15 + "px";
  });
};

const numberWithCommas = (num, type = undefined) => {
  if (num === Math.floor(num) && !type) {
    return `${num}.0`;
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export {
  RatingStarInput,
  RatingStar,
  to_slug,
  Pagination,
  get_random,
  parallaxBackground,
  numberWithCommas,
  getSortCards,
  getSortParseCards,
  getSortStringCards,
};
