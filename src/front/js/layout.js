import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { SignUp } from "./pages/signup";
import { Single } from "./pages/single";
import { LogIn } from "./pages/login";
import { Validation } from "./pages/validation";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { GetPassword } from "./pages/getpassword";
import { BuyBoard } from "./pages/buyboard";
import { SellBoard } from "./pages/sellboard";
import { Chat } from "./component/chat";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/signup">
              <SignUp />
            </Route>

            <Route exact path="/login">
              <LogIn />
            </Route>

            <Route exact path="/validation">
              <Validation />
            </Route>

            <Route exact path="/getpassword">
              <GetPassword />
            </Route>

            <Route exact path="/buyboard">
              <BuyBoard />
            </Route>

            <Route exact path="/sellboard">
              <SellBoard />
            </Route>

            <Route exact path="/chat">
              <Chat />
            </Route>

            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
