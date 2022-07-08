import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <footer className="futer d-flex py-3 text-center">
    <div className="d-flex  bg-primary justify-content-center">
      <div className="one mr-2 d-flex flex-column">
        <h6>Quienes somos</h6>
        <span>Andres Garcia</span>
        <span>Frank Gonzalez</span>
      </div>

      <div className="two mx-5">
        <h6>Proximamente</h6>
        <span>ChangeBox 2.0</span>
      </div>

      <div className="four mx-5">
        <h6>Sede</h6>
        <span>Venezuela</span>
      </div>

      <div className="three ml-5 d-flex flex-column">
        <h6>Contacto</h6>
        <span>+58 412-401 7284</span>
        <span>andres_28garcia@outlook.es</span>
      </div>
    </div>
  </footer>
);
