import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Modal
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export function PublicationReviewCard({
  date,
  exchange_rate,
  balance,
  message,
  preferred_banks,
  username,
  reputation,
  user_id_pub,
}) {
  // export function PublicationReviewCard() {
  const [expanded, setExpanded] = React.useState(false);

  // Modal
  const { store, actions } = useContext(Context);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Modal

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleUserInfo = () => {
    if (actions.getUserInfoByUsername(username)) {
      handleOpen();
      console.log(store.userinfobyusername);
    } else {
      alert("?????");
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            //El avatar seria para especificar si es compra(C) o venta(V)
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {/* Coloco la "C" manual por ahora*/}C
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          // En el title se coloca el nombre del usuario
          title={username}
          // En el subheader se puede colocar la reputacion y los trades completados
          subheader={reputation}
        />
        {/* <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      /> */}
        <CardContent>
          {/* <Typography variant="body2" color="text.secondary"> */}
          <Typography variant="body2">
            {/* Aqui iria la tasa de cambio */}
            {exchange_rate}
          </Typography>
          <Typography variant="body2">
            {/* Aqui iria el balance a cangear */}
            {balance}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="trade" onClick={handleUserInfo}>
            {/* <FavoriteIcon /> */}
            <CurrencyExchangeIcon />
          </IconButton>
          <IconButton aria-label="verified">
            <VerifiedUserIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              {/* Aqui iria el mensaje que la gente quiera colocar
            Corresponderia a cualquier descripcion */}
              {message}
            </Typography>
            <Typography paragraph>
              {/* Aqui iria el mensaje que la gente quiera colocar
            Corresponderia a cualquier descripcion */}
              {preferred_banks}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
      {/* Modal */}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {store.userinfobyusername && store.userinfobyusername.username}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {store.userinfobyusername && store.userinfobyusername.email}
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* Modal */}
    </>
  );
}
