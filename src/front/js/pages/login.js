import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const LogIn = () => {
  const { store, actions } = useContext(Context);
  const [userName, setUserName] = useState("");
  // Se comenta setemail porque estamos pasando el username en la funcion "handleSubmit"
  // const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    // username: false,
    email: false,
    password: false,
  });

  const history = useHistory();

  const handleSubmit = async () => {
    let data = {
      username: userName,
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
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Ingreso
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Nombre de Usuario o correo electronico
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

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                          disabled={
                            !userName.length > 0 || !password.length > 0
                          }
                        >
                          Ingresar
                        </button>
                      </div>
                      <Link className="m-auto" to={"/getpassword"}>
                        Olvidaste tu contraseña
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
      {/* Si el token es indefinido, se redirige a la pagina principal */}
      {localStorage.getItem("token") == undefined && (
        <Redirect to={"/login"}></Redirect>
      )}
    </section>
  );
};
