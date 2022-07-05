import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
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

export const SellBoard = () => {
  const { store, actions } = useContext(Context);
  const [exchangeRate, setExchangeRate] = useState(false);
  const [balance, setBalance] = useState(false);
  const [message, setMessage] = useState(false);
  const [preferredBanks, setPreferredBanks] = useState(false);
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePublicationCreation = async () => {
    let data = {
      // date = Como genero la fecha de manera automatica?
      exchange_rate: exchangeRate,
      balance: balance,
      message: message,
      preferred_banks: preferredBanks,
    };
    if (actions.createSellPublication(data)) {
      history.push("/sell-board");
    } else {
      alert("?????");
    }
  };

  return (
    <div className="text-center mt-5">
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Publicar Venta
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Vender</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Completa el formulario para publicar tu operacion de venta
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tasa de cambio"
              type="float"
              fullWidth
              variant="standard"
              onChange={(e) => setExchangeRate(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Saldo"
              type="float"
              fullWidth
              variant="standard"
              onChange={(e) => setBalance(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Mensaje"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setMessage(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Bancos preferidos"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setPreferredBanks(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button onClick={handlePublicationCreation}>Publicar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div></div>
    </div>
  );
};
