import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Validation = () => {
  const { store, actions } = useContext(Context);
  const [fullName, setFullName] = useState("");
  const [fullLastName, setFullLastName] = useState("");
  const [id, setId] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const history = useHistory();

  const handleSubmit = async () => {
    let data = {
      fullname: fullname,
      fulllastname: fulllastname,
      birthday: birthday,
      Id: Id,
    };
    if (await actions.userValidation(data)) {
      history.push("/private");
    } else {
      alert("EL USUARIO YA ESTA CREADO INTENTE DE NUEVO");
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
                      Formulario de validacion
                    </p>

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
                            onChange={(e) => setFullName(e.target.value)}
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
                            Apellidos
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            onChange={(e) => setFullLastName(e.target.value)}
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
                            Cedula de identidad
                          </label>
                          <div className="d-flex">
                            <input
                              id="form3Example4c"
                              className="form-control"
                              onChange={(e) => setId(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Fecha de nacimiento
                          </label>
                          <input
                            type="date"
                            id="form3Example3c"
                            className="form-control"
                            onChange={(e) => setBirthDay(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                          disabled={
                            !fullName.length > 0 ||
                            !fullLastName.length > 0 ||
                            !id.length > 0 ||
                            !birthDay.length > 0
                          }
                        >
                          Enviar
                        </button>
                      </div>
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
