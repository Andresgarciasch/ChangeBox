import React, { useContext } from "react";
import { Context } from "../store/appContext";
import LOGO1 from "../../img/LOGO 1.png";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="fondo text-center">
      <h1>ChangeBox</h1>
      <p>
        <img src={LOGO1} />
      </p>
      {/* <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div> */}
      {/* <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
          Read documentation
        </a> 
      </p>
        */}
    </div>
  );
};
