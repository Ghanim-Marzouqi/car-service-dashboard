import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { getRegions, getWillayats, createUser } from "../services";

const Registration = () => {
  const history = useHistory();
  const [regions, setRegions] = useState([]);
  const [willayats, setWillayats] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    user_type: "GARAGE_OWNER",
    region_id: "",
    willayat_id: ""
  });
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });

  useEffect(() => {
    const fetchAllRegions = async () => {
      const response = await getRegions();

      if (response !== null) {
        setRegions(response.data);
      } else {
        console.log("Server Error");
      }
    }

    fetchAllRegions();
  }, []);

  const regionChangeHandler = async (e, regionId) => {
    if (regionId) {
      setForm({ ...form, region_id: regionId });
      fetchAllWillayatsByRegionId(regionId);
    }
  }

  const fetchAllWillayatsByRegionId = async (id) => {
    const response = await getWillayats({ id });

    if (response !== null) {
      setWillayats(response.data);
    } else {
      console.log("Server Error");
    }
  }

  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const registrationButtonHandler = async (e) => {
    e.preventDefault();

    if (!form.name || form.name === "") {
      setAlert({ visible: true, color: "warning", message: "name cannot be empty" });
      return;
    }

    if (!form.email || form.email === "") {
      setAlert({ visible: true, color: "warning", message: "email cannot be empty" });
      return;
    }

    if (!form.phone || form.phone === "") {
      setAlert({ visible: true, color: "warning", message: "phone number cannot be empty" });
      return;
    }

    if (!form.username || form.username === "") {
      setAlert({ visible: true, color: "warning", message: "username cannot be empty" });
      return;
    }

    if (!form.username || form.username === "") {
      setAlert({ visible: true, color: "warning", message: "username cannot be empty" });
      return;
    }

    if (!form.region_id || form.region_id === "") {
      setAlert({ visible: true, color: "warning", message: "region cannot be empty" });
      return;
    }

    if (!form.willayat_id || form.willayat_id === "") {
      setAlert({ visible: true, color: "warning", message: "willayat cannot be empty" });
      return;
    }

    if (!isValidEmail(form.email)) {
      setAlert({ visible: true, color: "warning", message: "email is not valid" });
      return;
    }

    if (form.phone.length !== 8) {
      setAlert({ visible: true, color: "warning", message: "phone number must be 8 digits" });
      return;
    }

    if (form.phone.substr(0, 1) !== "7" && form.phone.substr(0, 1) !== "9") {
      setAlert({ visible: true, color: "warning", message: "phone number must start with 7 or 9" });
      return;
    }

    const response = await createUser(form);

    if (response !== null) {
      if (response.status === "success") {
        setAlert({ visible: true, color: "success", message: response.message });
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
          <Label for="name">Name</Label>
          <Input placeholder="Please Enter Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" placeholder="Please Enter Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="username">Phone</Label>
          <Input type="number" placeholder="Please Enter Phone" onChange={e => setForm({ ...form, phone: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input placeholder="Please Enter Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" placeholder="Please Enter Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="region">Region</Label>
          <Input type="select" name="region" value={form.region_id} onChange={e => regionChangeHandler(e, e.target.value)}>
            <option>- Select Region -</option>
            {regions.length > 0 ?
              regions.map((region, i) => <option key={i} value={region.id}>{region.name}</option>) : null
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="willayat">Willayat</Label>
          <Input type="select" name="willayat" value={form.willayat_id} onChange={e => setForm({ ...form, willayat_id: e.target.value })}>
            <option>- Select Willayat -</option>
            {willayats.length > 0 ?
              willayats.map((willayat, i) => <option key={i} value={willayat.id}>{willayat.name}</option>) : null
            }
          </Input>
        </FormGroup>
        <Button
          className="mt-4"
          block
          color="primary"
          onClick={registrationButtonHandler}
        >
          Sign Up
        </Button>
        <Button
          className="mt-4"
          block
          color="outline-primary"
          onClick={() => history.goBack()}
        >
          Already Registered
        </Button>
      </Form>
    </div>
  );
}

export default Registration;
