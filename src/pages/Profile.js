import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { getRegions, getWillayats, updateProfile } from "../services";
import { getLoggedInUserState } from "../store";

const Profile = () => {
  const user = useRecoilValue(getLoggedInUserState);
  const [form, setForm] = useState({
    id: 0,
    name: "",
    email: "",
    phone: "",
    region_id: 0,
    willayat_id: 0
  });
  const [regions, setRegions] = useState([]);
  const [willayats, setWillayats] = useState([]);
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

    const fetchAllWillayats = async () => {
      const response = await getWillayats({ id: user.region_id });

      if (response !== null) {
        setWillayats(response.data);
      } else {
        console.log("Server Error");
      }
    }

    setForm({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      region_id: user.region_id,
      willayat_id: user.willayat_id
    });

    fetchAllRegions();
    fetchAllWillayats();
  }, [user]);

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

  const updateProfileButtonHandler = async (e) => {
    e.preventDefault();

    const response = await updateProfile(form);

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
      <h1>My Profile</h1>
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
          <Input placeholder="Please Enter Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Input placeholder="Please Enter Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="region">Region</Label>
          <Input type="select" name="region" value={form.region_id} onChange={e => regionChangeHandler(e, e.target.value)}>
            <option>- Select Region -</option>
            {regions.length > 0 ?
              regions.map((region, i) => <option key={i} value={region.id} selected={region.id === form.region_id ? true : false}>{region.name}</option>) : null
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="willayat">Willayat</Label>
          <Input type="select" name="willayat" value={form.willayat_id} onChange={e => setForm({ ...form, willayat_id: e.target.value })}>
            <option>- Select Willayat -</option>
            {willayats.length > 0 ?
              willayats.map((willayat, i) => <option key={i} value={willayat.id} selected={willayat.id === form.willayat_id ? true : false}>{willayat.name}</option>) : null
            }
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