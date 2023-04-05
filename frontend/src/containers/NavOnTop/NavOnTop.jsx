import { useState, useEffect, useContext, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import decode from "jwt-decode";
import "./NavOnTop.scss";
import "../../styles/global.scss";
import "../../styles/responsive.scss";
import "../../styles/grid.scss";
import { AUTH, LOGOUT } from "../../constants/actionTypes";
import { toast } from "react-toastify";
import { gapi } from "gapi-script";
import { login, register } from "../../actions/auth";
const NavOnTop = () => {
  const clientId = "212369444782-cqma440j1i0lu34ef4939ghsmfspse0d.apps.googleusercontent.com";
  const dispatch = useDispatch();
  const history = useHistory();
  const [active, setActive] = useState(false);
  const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const comfirmPasswordRef = useRef(null);
  const modalAccoutRef = useRef(null);
  // const authData = useSelector((state) => state.authData);
  const location = useLocation();
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const [formRegister, setFormRegister] = useState({
    username: "",
    password: "",
    email: "",
  });
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({ clientId: clientId });
    });
    const token = dataUser?.token;
    if (token) {
      const decodeToken = decode(token);
      if (decodeToken.exp * 100 < new Date().getTime()) logout();
    }
    setDataUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  const handleEvents = {
    handleClick(e) {
      e.stopPropagation();
    },
    registerAcc(e) {
      if (comfirmPasswordRef.current.value !== formRegister.password) {
        console.log(comfirmPasswordRef.current.value, formRegister.password);
        toast.warning("Password not match!");
      } else {
        dispatch(register(formRegister, history));
      }
    },
    loginAcc() {
      dispatch(login(formLogin, history));
    },
  };
  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setDataUser(null);
  };
  function hiddenModal() {
    modalAccoutRef.current.click();
  }
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.token;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      toast.success("Login sucessfully!");
      setDataUser(JSON.parse(localStorage.getItem("profile")));
      hiddenModal();
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    toast.error(error.message);
    console.log(error);
  };

  return (
    <>
      <div className="nav__onTop">
        <ul className="nav__onTop-leftInner">
          <li className="nav__onTop-leftInner-item">
            <i className="far fa-envelope"></i>
            <p className="nav__onTop-leftInner-item-text">setail@qote.com</p>
          </li>
          <li className="nav__onTop-leftInner-item">
            <i className="fas fa-phone"></i>
            <p className="nav__onTop-leftInner-item-text">1 562 867 5309</p>
          </li>
          <li className="nav__onTop-leftInner-item">
            <i className="fas fa-map-marker-alt"></i>
            <p className="nav__onTop-leftInner-item-text">Broadway Morris St, New York</p>
          </li>
        </ul>
        <ul className="nav__onTop-rightInner">
          <li className="nav__onTop-rightInner-item nav__onTop-rightInner-item-socialNetwork">
            <a href="https://twitter.com/home" rel="noreferrer" target="_blank">
              <i className=" fab fa-twitter"></i>
            </a>
          </li>
          <li className="nav__onTop-rightInner-item nav__onTop-rightInner-item-socialNetwork">
            <a href="https://www.pinterest.com/qodeinteractive/" rel="noreferrer" target="_blank">
              <i className=" fab fa-pinterest-p"></i>
            </a>
          </li>
          <li className="nav__onTop-rightInner-item nav__onTop-rightInner-item-socialNetwork">
            <a href="https://www.instagram.com/" rel="noreferrer" target="_blank">
              <i className=" fab fa-instagram"></i>
            </a>
          </li>
          <li className="nav__onTop-rightInner-item nav__onTop-rightInner-item-socialNetwork">
            <a href="https://www.facebook.com/" rel="noreferrer" target="_blank">
              <i className=" fab fa-facebook-f"></i>
            </a>
          </li>
          <li className="nav__onTop-rightInner-item nav__onTop-rightInner-item-toggleLang">
            <p>English</p>
            {/* <i className="fas fa-chevron-down"></i>
            <div className="nav__onTop-rightInner-item-langs">
              <Link to="#" className="nav__onTop-rightInner-item-lang">
                VietNam
              </Link>
              <Link to="#" className="nav__onTop-rightInner-item-lang">
                France
              </Link>
              <Link to="#" className="nav__onTop-rightInner-item-lang">
                German
              </Link>
            </div> */}
          </li>
          <li className="nav__onTop-rightInner-item nav__onTop-rightInner-account">
            {dataUser ? (
              <div className="displayName__account">
                <p>{dataUser?.result?.name}</p>
                <ul className="options__account">
                  <li>Setting</li>
                  <li onClick={() => logout()}>Đăng xuất</li>
                </ul>
              </div>
            ) : (
              <a data-bs-toggle="modal" href="#exampleModalToggle">
                <i className="far fa-user-circle"></i>
              </a>
            )}
          </li>
        </ul>
      </div>
      {/* ================login/register=========== */}

      <div
        ref={modalAccoutRef}
        className={`acccount modal fade`}
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        {active ? (
          <div
            onClick={() => setActive(!active)}
            className="modal__custom"
            style={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
            }}
          >
            <div onClick={(e) => handleEvents.handleClick(e)} className="form" style={{ padding: 0, marginBottom: 0 }}>
              <h6 className="form__subtitle">Enter email to retrieve password</h6>
              <div className="form__body">
                <div className="form__body__input">
                  <input type="email" placeholder="Email" name="email" onChange={() => {}} />
                </div>
                <div className="form__body__input ">
                  <button
                    className="mt-3"
                    onClick={() => {
                      // resetPassword(email);
                      hiddenModal();
                    }}
                  >
                    Send email
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="tab-content" id="pills-tabContent">
                <ul className="nav nav__form nav-pills mb-3" id="pills-tab" role="tablist">
                  {/* login */}
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="login-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#login"
                      type="button"
                      role="tab"
                      aria-controls="login"
                      aria-selected="true"
                    >
                      Login
                    </button>
                  </li>

                  {/* register */}
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="register-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#register"
                      type="button"
                      role="tab"
                      aria-controls="register"
                      aria-selected="false"
                    >
                      Register
                    </button>
                  </li>
                </ul>
                <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab">
                  <form
                    method="post"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEvents.loginAcc();
                      // handleEvents.autoCloseModal();
                    }}
                    className="form"
                    style={{ padding: 0, marginBottom: 0 }}
                  >
                    <h2 className="form__title">Sign In Here!</h2>
                    <h6 className="form__subtitle">Log into your account in just a few simple steps</h6>
                    <div className="form__body">
                      <div className="form__body__input">
                        <i className="fas fa-user"></i>
                        <input
                          required
                          type="text"
                          placeholder="Username"
                          name="username"
                          onChange={(e) => setFormLogin({ ...formLogin, username: e.target.value })}
                        />
                      </div>
                      <div className="form__body__input">
                        <i className="fas fa-lock"></i>
                        <input
                          required
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(e) => setFormLogin({ ...formLogin, password: e.target.value })}
                        />
                      </div>
                      <div className="form__body__input__radio">
                        <input name="remember_login" id="remember_login" type="checkbox" />
                        <label htmlFor="remember_login">Remember me</label>
                      </div>
                      <h5>
                        <Link className="forgot__password" to="#" onClick={() => setActive(true)}>
                          Lost Your Password?
                        </Link>
                      </h5>
                      <div className="form__body__input">
                        <input className="submit" type="submit" value="SIGN IN" />
                      </div>
                      <h6 className="form__subtitle text-center">Sign in with Facebook or Google+</h6>
                    </div>
                    <div className="form__footer">
                      <button disabled title="not support" onClick={() => {}} className="btn-login facebook">
                        Facebook
                      </button>
                      <GoogleLogin
                        clientId={clientId}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                        render={(props) => (
                          <button onClick={props.onClick} disabled={props.disabled} className="btn-login facebook cursor-pointer">
                            Google+
                          </button>
                        )}
                      />
                    </div>
                  </form>
                </div>
                <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
                  <form
                    method="post"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEvents.registerAcc();
                    }}
                    className="form"
                    style={{ padding: 0, marginBottom: 0 }}
                  >
                    <h2 className="form__title">Register Now</h2>
                    <h6 className="form__subtitle">Join the SetSail community today & set up a free account.</h6>
                    <div className="form__body">
                      <div className="form__body__input">
                        <i className="fas fa-user"></i>
                        <input
                          type="text"
                          placeholder="User name"
                          name="userName"
                          onChange={(e) => setFormRegister({ ...formRegister, username: e.target.value })}
                        />
                      </div>
                      <div className="form__body__input">
                        <i className="fas fa-envelope"></i>
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={(e) => setFormRegister({ ...formRegister, email: e.target.value })}
                        />
                      </div>
                      <div className="form__body__input">
                        <i className="fas fa-lock"></i>
                        <input
                          required
                          minLength="6"
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={(e) => setFormRegister({ ...formRegister, password: e.target.value })}
                        />
                      </div>
                      <div className="form__body__input">
                        <i className="fas fa-lock"></i>
                        <input ref={comfirmPasswordRef} type="password" placeholder="Comfirm password" name="comfirm_password" />
                      </div>

                      <div className="form__body__input form__body__input__register">
                        <input className="submit register" type="submit" value="REGISTER" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NavOnTop;
