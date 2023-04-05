import React from "react";

const Loading = () => {
  return (
    <>
      <div className="m-auto text-center d-flex gap-2 justify-content-center align-items-center">
        <div className="fw-bold fs-5 me-2">Loading data</div>
        <div style={{ width: "15px", height: "15px" }} className="spinner-grow text-primary" role="status"></div>
        <div style={{ width: "15px", height: "15px" }} className="spinner-grow text-secondary" role="status"></div>
        <div style={{ width: "15px", height: "15px" }} className="spinner-grow text-success" role="status"></div>
        <div style={{ width: "15px", height: "15px" }} className="spinner-grow text-danger" role="status"></div>
        <div style={{ width: "15px", height: "15px" }} className="spinner-grow text-warning" role="status"></div>
        <div style={{ width: "15px", height: "15px" }} className="spinner-grow text-info" role="status"></div>
        <div style={{ width: "15px", height: "15px" }} className="spinner-grow text-dark" role="status"></div>
      </div>
    </>
  );
};

export default Loading;
