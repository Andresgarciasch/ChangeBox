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
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);

  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [check, setCheck] = useState(false);
  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    password: false,
    repeat: false,
  });

  const history = useHistory();

  const handleSubmit = async () => {
    let data = {
      name: name,
      lastname: LastName,
      username: userName,
      email: email,
      password: password,
    };
    if (actions.registerUser(data)) {
      history.push("/private");
    } else {
      alert("Algo salio mal intente de nuevo");
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
                    <div className="d-flex justify-content-center">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Registro
                      </p>

                      <button
                        className="fa-solid fa-question"
                        onClick={() =>
                          alert(
                            "Nombre de usuario: 1. solo puede contener caracteres alfanumericos, barra baja y puntos 2. el punto y la barra baja no pueden ir ni al comienzo ni al final ni juntos 3. minimo 8 caracteres y maximo 20        Contraseña: 1. al menos una mayuscula y una minuscula 2. al menos un caracter numerico y un caracter especial 3. minimo de 8 caracteres"
                          )
                        }
                      ></button>
                    </div>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Nombre Completo
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
                            Apellidos
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
                            Nombre de Usuario
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
                              Nombre de Usuario Invalido
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
                            Correo Electrónico
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
                            <div className="text-warning">Correo Invalido</div>
                          )}
                        </div>
                      </div>

                      {/* <div className="d-flex flex-row align-items-center mb-4">
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
                               let regex = /[VEve]-[0123456789]{7,8}/; //pendiente de revisar el limite de los caracteres de los regex y su funcionamiento general

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
                      </div> */}

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Contraseña
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
                              caracter especial
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repetir Contraseña
                          </label>
                          <div className="d-flex">
                            <input
                              type={showRepeat ? "text" : "password"}
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

                            <button
                              className={
                                showRepeat
                                  ? "fa fa-eye-slash"
                                  : "fa fa-eye password-icon"
                              }
                              onClick={(e) => {
                                e.preventDefault();
                                setShowRepeat(!showRepeat);
                              }}
                            ></button>
                          </div>

                          {errors.repeat && (
                            <div className="text-warning">
                              contraseña diferente
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
                          Acepto los terminos dentro de{" "}
                          <a href="#!">Terminos de servicio</a>
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
                          Registrar
                        </button>
                      </div>
                      <Link className="m-auto" to={"/login"}>
                        Si ya tienes cuenta, inicia sesion
                      </Link>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample image"
                    />
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
