import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import LOGO1 from "../../img/LOGO 1.png";

export const GetPassword = () => {
  const { store, actions } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");

  const [errors, setErrors] = useState({
    userName: false,
    email: false,
    password: false,
  });

  const history = useHistory();

  const handleSubmit = async () => {
    let data = {
      email: email,
      password: password,
    };
    if (await actions.loginUser(data)) {
      history.push("/private");
    } else {
      alert("CREDENCIALES INVALIDAS");
    }
  };

  //   por modificar registerUser a logUser creando nuevo endpoint

  return (
    <section className="fondo">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Cambiar contraseña
                    </p>

                    <form className="mx-1 mx-md-4">
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
                          />
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
                          ></input>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Contraseña Nueva
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

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                          // disabled={
                          //   errors.email ||
                          //   errors.username ||
                          //   errors.password ||
                          //   !check ||
                          //   !email.length > 0 ||
                          //   !password.length > 0
                          // }
                        >
                          Cambiar
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src={LOGO1} className="img-fluid" alt="Sample image" />
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
