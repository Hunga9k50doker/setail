import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import { TypeUser } from "../config/auth.js";
import {
  PublishRoute,
  PrivateRoute,
  SuperPrivateRoute,
} from "../routes/routes";
import NotFound from "./NotFound";
import "./App.scss";
import { getMyProfile } from "../actions/auth";
import Cookies from "js-cookie";
import WebSocketComponent from "../components/websocket";

function App() {
  const jwt = Cookies.get("jwt");
  // handleEvent btn back top
  // The back-to-top button is hidden at the beginning
  const [showButton, setShowButton] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.authReducer.authData;
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      scrollFunction();
    });
    verifyToken();
    return window.removeEventListener("scroll", () => {
      scrollFunction();
    });
  }, []);

  const verifyToken = () => {
    if (jwt) {
      dispatch(getMyProfile);
    }
  };

  function scrollFunction() {
    if (window.scrollY > 30) {
      const nav = document.querySelector(".nav.nav__category");
      const navItem = document.querySelector(
        ".nav__list-item-Elements .nav__list-item-selections"
      );
      if (nav && navItem) {
        nav.style.top = "0";
        navItem.style.top = "75px";
      }
    } else {
      const nav = document.querySelector(".nav.nav__category");
      const navItem = document.querySelector(
        ".nav__list-item-Elements .nav__list-item-selections"
      );
      if (nav && navItem) {
        nav.style.top = "42px";
        navItem.style.top = "117px";
      }
      setShowButton(false);
    }
    if (window.scrollY > 300) {
      setShowButton(true);
    }
  }
  // This function will scroll the window to the top
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="App">
      <WebSocketComponent />
      <BrowserRouter>
        <Switch>
          <Route exact path={PublishRoute.map((e) => e.path)}>
            <MainLayout>
              {showButton && (
                <button className="backToTop" onClick={() => scrollToTop()}>
                  <i className="fas fa-arrow-up"></i>
                </button>
              )}
              {PublishRoute.map((route, key) => {
                return (
                  <Route
                    exact
                    key={key}
                    path={route.path}
                    component={route.component}
                  ></Route>
                );
              })}
            </MainLayout>
          </Route>
          {user?.result && (
            <Route exact path={PrivateRoute.map((e) => e.path)}>
              <MainLayout>
                {PrivateRoute.map((route, key) => {
                  return (
                    <Route
                      exact
                      key={key}
                      path={route.path}
                      component={route.component}
                    ></Route>
                  );
                })}
              </MainLayout>
            </Route>
          )}
          {user?.result?.role >= TypeUser.ADMIN && (
            <Route exact path={SuperPrivateRoute.map((e) => e.path)}>
              <AdminLayout>
                {SuperPrivateRoute.map((route, key) => {
                  return (
                    <Route
                      exact
                      key={key}
                      path={route.path}
                      component={route.component}
                    ></Route>
                  );
                })}
              </AdminLayout>
            </Route>
          )}
          <MainLayout>
            <Route path="*">
              <NotFound />
            </Route>
          </MainLayout>
        </Switch>
        <ToastContainer autoClose={1000} />
      </BrowserRouter>
    </div>
  );
}

export default App;
