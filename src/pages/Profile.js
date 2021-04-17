import React from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Profile = () => {

  const updateProfileButtonHandler = (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h1>My Profile</h1>
      <Form className="align-self-center w-50 mt-5">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input placeholder="Please Enter Name" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input placeholder="Please Enter Email" />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input placeholder="Please Enter Phone" />
        </FormGroup>
        <FormGroup>
          <Label for="region">Region</Label>
          <Input type="select" name="region">
            <option>Region 1</option>
            <option>Region 2</option>
            <option>Region 3</option>
            <option>Region 4</option>
            <option>Region 5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="willayat">Willayat</Label>
          <Input type="select" name="willayat">
            <option>Willayat 1</option>
            <option>Willayat 2</option>
            <option>Willayat 3</option>
            <option>Willayat 4</option>
            <option>Willayat 5</option>
          </Input>
        </FormGroup>
        <Button
          className="mt-4"
          block
          color="primary"
          onClick={updateProfileButtonHandler}
        >
          Update Profile
        </Button>
      </Form>
    </>
  );
}

export default Profile;