import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import LOGO1 from "../../img/LOGO 1.png";

export const Validation = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [identification, setIdentification] = useState("");
  const [nationality, setNationality] = useState("");

  const history = useHistory();

  const handleSubmit = async () => {
    let data = {
      name: name,
      lastname: lastName,
      birthday: birthDay,
      identification: identification,
      nationality: nationality,
    };
    // if (await actions.validationUser(data)) {
    if (actions.validationUser(data)) {
      history.push("/buyboard");
    } else {
      alert("DATOS PARA VERIFICACION ENVIADOS");
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
                      Formulario de verificación
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example1c"
                          >
                            Nombre
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
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Apellido
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            onChange={(e) => setLastName(e.target.value)}
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
                            Fecha de nacimiento
                          </label>
                          <div className="d-flex">
                            <input
                              type="date"
                              id="form3Example4c"
                              className="form-control"
                              onChange={(e) => setBirthDay(e.target.value)}
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
                            Cédula de indentidad
                          </label>
                          <input
                            id="form3Example3c"
                            className="form-control"
                            onChange={(e) => setIdentification(e.target.value)}
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
                            Nacionalidad
                          </label>
                          <input
                            type="text"
                            id="form3Example3c"
                            className="form-control"
                            onChange={(e) => setNationality(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          onClick={handleSubmit}
                          disabled={
                            !name.length > 0 ||
                            !lastName.length > 0 ||
                            !birthDay.length > 0 ||
                            !identification.length > 0 ||
                            !nationality.length > 0
                          }
                        >
                          Enviar
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
      {/* Si el token es indefinido, se redirige a la pagina principal */}
      {localStorage.getItem("token") == undefined && (
        <Redirect to={"/validation"}></Redirect>
      )}
    </section>
  );
};
