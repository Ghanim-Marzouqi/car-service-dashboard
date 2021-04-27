import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { getRegions, getWillayats, createUser, getUserById, updateUser } from "../services";

const EditUser = () => {
  const history = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [regions, setRegions] = useState([]);
  const [willayats, setWillayats] = useState([]);
  const [form, setForm] = useState({
    id: "0",
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "Oman@123",
    user_type: "CUSTOMER",
    region_id: "",
    willayat_id: ""
  });
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });

  useEffect(() => {
    const fetchUser = async (payload) => {
      const response = await getUserById(payload);

      if (response !== null) {
        if (response.status === "success") {
          fetchAllWillayatsByRegionId(response.data.region_id);
          setForm(response.data);
        } else {
          setAlert({ visible: true, color: "danger", message: response.message });
        }
      } else {
        setAlert({ visible: true, color: "danger", message: "Server Error" });
      }
    }

    if (typeof id !== "undefined") {
      if (id === "0") {
        setTitle("Add");
      } else {
        setTitle("Edit");
        fetchUser(id);
      }
    } else {
      history.goBack();
    }
  }, [id, history]);

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

  const saveButtonHandler = async (e) => {
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

    if (form.id === "0") {
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
    } else {
      const response = await updateUser(form);

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
  }

  return (
    <>
      <h1>{title} Service</h1>
      <Form className="align-self-center mt-5">
        {alert.visible ?
          <Alert color={alert.color}>
            {alert.message}
          </Alert> : null
        }
        <FormGroup>
          <Label for="name">Name</Label>
          <Input placeholder="Please Enter Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" placeholder="Please Enter Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input placeholder="Please Enter Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input placeholder="Please Enter Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <label htmlFor="user_type">User Role</label>
          <Input type="select" id="input-user_ype" value={form.user_type} onChange={e => setForm({ ...form, user_type: e.target.value })}>
            <option value="">- Select Role -</option>
            <option value="CUSTOMER">Customer</option>
            <option value="ADMIN">Administrator</option>
            <option value="GARAGE_OWNER">Garage Owner</option>
          </Input>
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
          onClick={e => saveButtonHandler(e)}
        >
          Save
        </Button>
      </Form>
    </>
  )
}

export default EditUser;
