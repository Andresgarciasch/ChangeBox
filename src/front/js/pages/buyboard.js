import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

// import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const BuyBoard = () => {
  const { store, actions } = useContext(Context);
  const [exchangeRate, setExchangeRate] = useState(false);
  const [balance, setBalance] = useState(false);
  const [message, setMessage] = useState(false);
  const [preferredBanks, setPreferredBanks] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="text-center mt-5">
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Publicar Compra
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Comprar</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Completa el formulario para publicar tu operacion de compra
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tasa de cambio"
              type="exchange_rate"
              fullWidth
              variant="standard"
              onChange={(e) => setExchangeRate(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Saldo"
              type="balance"
              fullWidth
              variant="standard"
              onChange={(e) => setBalance(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Mensaje"
              type="message"
              fullWidth
              variant="standard"
              onChange={(e) => setMessage(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Bancos preferidos"
              type="preferred_banks"
              fullWidth
              variant="standard"
              onChange={(e) => setPreferredBanks(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handleClose}>Publicar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <h1>Hello Rigo!!</h1>
      <p>
        <img src={rigoImageUrl} />
      </p>
      <div className="alert alert-info">
        {store.message ||
          "Loading message from the backend (make sure your python backend is running)..."}
      </div>
      <p>
        This boilerplate comes with lots of documentation:{" "}
        <a href="https://github.com/4GeeksAcademy/react-flask-hello/tree/95e0540bd1422249c3004f149825285118594325/docs">
          Read documentation
        </a>
      </p>
    </div>
  );
};
