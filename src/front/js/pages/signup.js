import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [birthday, setBirthday] = useState("");

  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    password: false,
    repeat: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSubmit = async () => {
    let data = {
      name: name,
      email: email,
      password: password,
    };
    if (await actions.registerUser(data)) {
      history.push("/private");
    } else {
      alert("EL USUARIO YA ESTA CREADO INTENTE DE NUEVO");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Sign up
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your LastName
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your UserName
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            onChange={(e) => setUserName(e.target.value)}
                            onBlur={(e) => {
                              let regex =
                                /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
                              //                                 Only contains alphanumeric characters, underscore and dot.
                              //                                 Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.).
                              //                                 Underscore and dot can't be next to each other (e.g user_.name).
                              //                                 Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).
                              //                                 Number of characters must be between 8 to 20.

                              if (regex.test(userName)) {
                                setErrors({ ...errors, userName: false });
                              } else {
                                setErrors({ ...errors, userName: true });
                              }
                            }}
                          />
                          {errors.userName && (
                            <div className="text-warning">
                              UserName invalido
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => {
                              let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

                              if (regex.test(email)) {
                                setErrors({ ...errors, email: false });
                              } else {
                                setErrors({ ...errors, email: true });
                              }
                            }}
                          />
                          {errors.email && (
                            <div className="text-warning">Correo invalido</div>
                          )}
                        </div>
                      </div>

                      {/* <div className="col-md-6 mb-4">
                        <i class="fa-solid fa-earth-americas"></i>
                        <select className="select">
                          <option value="1" disabled>
                            Nationality
                          </option>
                          <option value="2">V</option>
                          <option value="3">E</option>
                        </select>
                      </div> */}

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fa-solid fa-earth-americas"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Your ID Number
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            onChange={(e) => setId(e.target.value)}
                            onBlur={(e) => {
                              let regex = /[VEve]-[0123456789]{7,8}/;

                              if (regex.test(id)) {
                                setErrors({ ...errors, id: false });
                              } else {
                                setErrors({ ...errors, id: true });
                              }
                            }}
                          />
                          {errors.id && (
                            <div className="text-warning">ID invalido</div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <label className="form-label" htmlFor="form3Example4c">
                          Enter your birthday
                          <input
                            type="date"
                            className="form-control"
                            onChange={(e) => setBirthday(e.target.value)}
                          />
                        </label>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            file id
                          </label>
                          <input
                            type="file"
                            id="form3Example1c"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <div className="d-flex">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="form3Example4c"
                              className="form-control"
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={(e) => {
                                let regex =
                                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                                if (regex.test(password)) {
                                  setErrors({ ...errors, password: false });
                                } else {
                                  setErrors({ ...errors, password: true });
                                }
                              }}
                            />
                            <button
                              className={
                                showPassword
                                  ? "fa fa-eye-slash"
                                  : "fa fa-eye password-icon"
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setShowPassword(!showPassword);
                              }}
                            ></button>
                          </div>
                          {errors.password && (
                            <div className="text-warning">
                              recuerda que debe tener al menos 8 caracteres 1
                              letra minuscula 1 letra mayuscula 1 numero y un
                              caracter especial perro
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>
                          <input
                            type="password"
                            id="form3Example4cd"
                            className="form-control"
                            onChange={(e) => setRepeat(e.target.value)}
                            onBlur={(e) => {
                              if (repeat !== password) {
                                setErrors({ ...errors, repeat: true });
                              } else {
                                setErrors({ ...errors, repeat: false });
                              }
                            }}
                          />
                          {errors.repeat && (
                            <div className="text-warning">
                              contraseña diferente perro de awa
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value={check}
                          id="form2Example3c"
                          onChange={(e) => setCheck(!check)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="form2Example3"
                        >
                          I agree all statements in{" "}
                          <a href="#!">Terms of service</a>
                        </label>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                          disabled={
                            errors.email ||
                            errors.password ||
                            errors.repeat ||
                            !check ||
                            !name.length > 0 ||
                            !email.length > 0 ||
                            !password.length > 0 ||
                            !repeat.length > 0
                          }
                        >
                          Register
                        </button>
                      </div>
                      <Link className="m-auto" to={"/login"}>
                        Si ya tienes cuenta, inicia sesion
                      </Link>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    {/* <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {localStorage.getItem("token") != undefined && (
        <Redirect to={"/private"}></Redirect>
      )}
    </section>
  );
};
