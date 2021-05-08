import React, { useState, useEffect } from "react";
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

import { garageOwnerRoutes as routes } from "../routes/Routes";

import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import EditOwnerGarage from "../pages/EditOwnerGarage";

import { getOwnerGarage } from "../services";
import { getLoggedInUserState, loggedInUserState, ownerGaragesState } from "../store";

const GarageOwnerLayout = () => {

  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const user = useRecoilValue(getLoggedInUserState);
  const [, setLoggedInUser] = useRecoilState(loggedInUserState);
  const [, setOwnerGarages] = useRecoilState(ownerGaragesState);

  useEffect(() => {
    const fetchOwnerGarage = async (payload) => {
      const response = await getOwnerGarage(payload);
      if (response !== null) {
        if (response.data !== null) {
          setOwnerGarages(response.data);
        }
      } else {
        console.log("Server Error");
      }
    }

    fetchOwnerGarage(user);
  }, [user, setOwnerGarages]);

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
    setOwnerGarages([]);
    history.replace("/auth");
  }

  return (
    user.user_type === "GARAGE_OWNER" ?
      <>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="#home" onClick={e => history.push("/garage-owner")}>CAR SERVICE</NavbarBrand>
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
                    <DropdownItem href="#profile" onClick={e => history.push("/garage-owner/profile")}>
                      My Profile
                    </DropdownItem>
                    <DropdownItem href="#change-password" onClick={e => history.push("/garage-owner/change-password")}>
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
            <Route path="/garage-owner/profile" component={Profile} />
            <Route path="/garage-owner/change-password" component={ChangePassword} />
            <Route path="/garage-owner/edit-garage/:id" component={EditOwnerGarage} />
            <Redirect from="/garage-owner" to="/garage-owner/garages" />
          </Switch>
        </Container>
      </> : <Redirect to="/auth" />
  )
}

export default GarageOwnerLayout;
