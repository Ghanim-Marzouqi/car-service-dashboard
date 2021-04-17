import React, { useState } from "react";
import { Switch, Route, Redirect, useHistory, NavLink } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { adminRoutes as routes } from "../routes/Routs";

import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";

import { getLoggedInUserState, loggedInUserState } from "../store";

const AdminLayout = () => {

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(getLoggedInUserState);
  const [, setLoggedInUser] = useRecoilState(loggedInUserState);

  const toggle = () => setIsOpen(!isOpen);

  const getRoutes = (routes) => {
    return routes.map((route, i) =>
      <Route
        key={i}
        path={route.layout + route.path}
        component={route.component} />
    );
  }

  const getNavLinks = (routes) => {
    return routes.map((route, i) =>
      <NavItem key={i}>
        <NavLink to={route.layout + route.path} style={{ margin: 10, color: "darkgray", textDecoration: 'none' }}>
          {capitalizeFirstLetter(route.path.replace("/", ""))}
        </NavLink>
      </NavItem>
    );
  }

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const logoutButtonHandler = (e) => {
    e.preventDefault();
    setLoggedInUser({
      name: "",
      email: "",
      phone: "",
      username: "",
      user_type: "",
      region_id: "",
      willayat_id: ""
    });
    history.replace("/auth");
  }

  return (
    <>
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="#home">CAR SERVICE</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {getNavLinks(routes)}
            </Nav>
            <Nav navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  {user.name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="/admin/profile">
                    My Profile
                  </DropdownItem>
                  <DropdownItem href="/admin/change-password">
                    Change Password
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={logoutButtonHandler}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <Container fluid>
        <Switch>
          {getRoutes(routes)}
          <Route path="/admin/profile" component={Profile} />
          <Route path="/admin/change-password" component={ChangePassword} />
          <Redirect from="/admin" to="/admin/dashboard" />
        </Switch>
      </Container>
    </>
  );
}

export default AdminLayout;