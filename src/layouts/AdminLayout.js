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

import { adminRoutes as routes } from "../routes/Routes";

import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import EditService from "../pages/EditService";
import EditGarage from "../pages/EditGarage";
import EditUser from "../pages/EditUser";

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
    user.user_type === "ADMIN" ?
      <>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="#home" onClick={e => history.push("/admin")}>CAR SERVICE</NavbarBrand>
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
                    <DropdownItem href="#profile" onClick={e => history.push("/admin/profile")}>
                      My Profile
                  </DropdownItem>
                    <DropdownItem href="#change-password" onClick={e => history.push("/admin/change-password")}>
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
            <Route path="/admin/edit-service/:id" component={EditService} />
            <Route path="/admin/edit-garage/:id" component={EditGarage} />
            <Route path="/admin/edit-user/:id" component={EditUser} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
        </Container>
      </> : <Redirect to="/auth" />
  );
}

export default AdminLayout;