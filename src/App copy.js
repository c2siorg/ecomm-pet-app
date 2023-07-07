// import logo from './logo.svg';
import React, { useEffect } from 'react';
// import './App.css';
// import './App.scss';
// import { Nav, Navbar, Container }  from 'react-bootstrap';
import { Nav, Navbar, Container , Button, Icon, Menu}  from 'semantic-ui-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useAuthContext } from "@asgardeo/auth-react";

import Catalog from './components/Catalog/Catalog.js';
import MyCart from './components/MyCart/Cart.js';
import Admin from './components/Admin/Admin.js';

const RightLoginSignupMenu = () => {
  const { state } = useAuthContext();
  let isLoggedIn = state.isAuthenticated;
  let menu;


if (isLoggedIn) {
return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          PetStore
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item href="/" name="Catalog" />
          <Menu.Item href="/mycart" name="My Cart" />
          <Menu.Item href="/admin" name="Admin" />
          <RightLoginSignupMenu />
        </Menu.Menu>
      </Container>
    </Menu>
  );
}
}
// Component to render the navigation bar
const PetStoreNav = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item as="a" header>
          PetStore
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item href="/" name="Catalog" />
          <Menu.Item href="/mycart" name="My Cart" />
          <Menu.Item href="/admin" name="Admin" />
          <RightLoginSignupMenu />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

// Main app component
const App = () => {
  useEffect(() => {
    document.title = 'PetStore';
  }, []);
  return (
    <>
    <PetStoreNav />
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Catalog} />
        <Route path="/mycart" component={MyCart} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </BrowserRouter>
    </>
  );
}


export default App;