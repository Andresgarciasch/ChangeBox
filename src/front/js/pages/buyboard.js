import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { PublicationReviewCard } from "../component/publicationinboard";
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

  // const history = useHistory();

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
    if (actions.createBuyPublication(data)) {
      handleClose();
      //alert("Publicacion creada");
      //history.push("/buyboard");
    } else {
      alert("?????");
    }
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
      <div>
        {store.buypublications &&
          store.buypublications.length > 0 &&
          store.buypublications.map((buypublication, index) => {
            return (
              <PublicationReviewCard
                key={index}
                date={buypublication.date}
                exchange_rate={buypublication.exchange_rate}
                balance={buypublication.balance}
                message={buypublication.message}
                preferred_banks={buypublication.preferred_banks}
                username={buypublication.username}
                reputation={buypublication.reputation}
                user_id_pub={buypublication.user_id_pub}
              />
            );
          })}
      </div>
      {/* Si el token es indefinido, se redirige a la pagina principal */}
      {localStorage.getItem("token") == undefined && (
        <Redirect to={"/buy-board"}></Redirect>
      )}
    </div>
  );
};
