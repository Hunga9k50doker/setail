const Spinner = ({ width, height }) => {
  return <div className="spinner-border text-secondary ms-2" style={{ width: width ?? "20px", height: height ?? "20px" }} role="status"></div>;
};

export default Spinner;
