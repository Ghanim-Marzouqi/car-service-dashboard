import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { changePassword } from "../services";
import { getLoggedInUserState } from "../store";

const ChangePassword = () => {
  const user = useRecoilValue(getLoggedInUserState);
  const [form, setForm] = useState({
    id: 0,
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });

  useEffect(() => {
    setForm({ id: user.id, oldPassword: "", newPassword: "", confirmPassword: "" });
  }, [user.id]);

  const changePasswordButtonHandler = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setAlert({ visible: true, color: "warning", message: "Password don't match" });
      return;
    }

    const response = await changePassword(form);

    if (response !== null) {
      if (response.status === "success") {
        setAlert({ visible: true, color: "success", message: response.message });
      } else {
        setAlert({ visible: true, color: "danger", message: response.message });
      }
    } else {
      console.log("Server Error");
    }
  }

  return (
    <>
      <h1>Change Password</h1>
      <Form className="align-self-center mt-5">
        {alert.visible ?
          <Alert color={alert.color}>
            {alert.message}
          </Alert> : null
        }
        <FormGroup>
          <Label for="oldPassword">Old Password</Label>
          <Input type="password" placeholder="Please Enter Old Password" onChange={e => setForm({ ...form, oldPassword: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="newPassword">New Password</Label>
          <Input type="password" placeholder="Please Enter New Password" onChange={e => setForm({ ...form, newPassword: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm New Password</Label>
          <Input type="password" placeholder="Please Enter Confirm New Password" onChange={e => setForm({ ...form, confirmPassword: e.target.value })} />
        </FormGroup>
        <Button
          className="mt-4"
          block
          color="primary"
          onClick={changePasswordButtonHandler}
        >
          Change Password
        </Button>
      </Form>
    </>
  );
}

export default ChangePassword;