import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useRecoilState } from "recoil";

import { loggedInUserState } from "../store";

import { login } from "../services";

const Login = () => {
  const history = useHistory();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });
  const [, setLoggedInUser] = useRecoilState(loggedInUserState);

  const loginButtonHandler = async (e) => {
    e.preventDefault();

    if (!form.username && form.username === "") {
      setAlert({ visible: true, color: "warning", message: "username cannot be empty" });
      return;
    }

    if (!form.password && form.password === "") {
      setAlert({ visible: true, color: "warning", message: "password cannot be empty" });
      return;
    }

    const response = await login(form);

    if (response !== null) {
      if (response.status === "success") {
        setAlert({ visible: true, color: "success", message: response.message });
        setLoggedInUser(response.data);
        setTimeout(() => {
          setAlert({ visible: false, color: "", message: "" });
          setForm({ username: "", password: "" });
          if (response.data.user_type === "ADMIN") {
            history.push("/admin");
          } else if (response.data.user_type === "GARAGE_OWNER") {
            history.push("/garage-owner");
          } else {
            setAlert({ visible: true, color: "danger", message: "You're NOT authorized to use the system" });
          }
        }, 2000);
      } else {
        setAlert({ visible: true, color: "danger", message: response.message });
      }
    } else {
      setAlert({ visible: true, color: "danger", message: "Server Error" });
    }
  }

  return (
    <div className="d-flex flex-column justify-content-center py-5">
      <img
        src={require("../assets/img/logo.png").default}
        alt="Logo"
        className="align-self-center"
        width={250}
        height="auto"
      />
      <h1 className="align-self-center">CAR SERVICE</h1>
      <Form className="align-self-center w-50 mt-5">
        {alert.visible ?
          <Alert color={alert.color}>
            {alert.message}
          </Alert> : null
        }
        <FormGroup>
          <Label for="username">Username</Label>
          <Input placeholder="Please Enter Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" placeholder="Please Enter Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        </FormGroup>
        <Button
          className="mt-4"
          block
          color="primary"
          onClick={loginButtonHandler}
        >
          Sign In
        </Button>
        <Button
          className="mt-4"
          block
          color="outline-primary"
          onClick={() => history.push("/auth/registration")}
        >
          Sign Up
        </Button>
      </Form>
    </div>
  );
}

export default Login;