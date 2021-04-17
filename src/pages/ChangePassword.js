import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const ChangePassword = () => {

  const changePasswordButtonHandler = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h1>Change Password</h1>
      <Form className="align-self-center w-50 mt-5">
        <FormGroup>
          <Label for="name">Old Password</Label>
          <Input placeholder="Please Enter Name" />
        </FormGroup>
        <FormGroup>
          <Label for="email">New Password</Label>
          <Input placeholder="Please Enter Email" />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Confirm New Password</Label>
          <Input placeholder="Please Enter Phone" />
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