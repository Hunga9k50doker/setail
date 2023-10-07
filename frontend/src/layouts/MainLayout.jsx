import React from "react";
import NavOnTop from "../containers/NavOnTop/NavOnTop";
import Nav from "../containers/Navigation/Nav";
import Footer from "../containers/Footer/footer";

const MainLayout = ({ children }) => (
  <div className="main__layout">
    <NavOnTop />
    <Nav />
    <div style={{ minHeight: "100vh" }}>{children}</div>
    <Footer />
  </div>
);
export default MainLayout;
