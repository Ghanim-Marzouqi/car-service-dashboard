import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { getRegions, getWillayats, getAllServices, getGarageOwners, createGarage, getGarageById, updateGarage } from "../services";

const EditGarage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [services, setServices] = useState([]);
  const [owners, setOwners] = useState([]);
  const [regions, setRegions] = useState([]);
  const [willayats, setWillayats] = useState([]);
  const [form, setForm] = useState({
    id: "0",
    name: "",
    description: "",
    service_id: "",
    service_price: "",
    owner_id: "",
    region_id: "",
    willayat_id: ""
  });
  const [alert, setAlert] = useState({
    visible: false,
    color: "",
    message: ""
  });

  useEffect(() => {
    if (typeof id !== "undefined") {
      if (id === "0") {
        setTitle("Add");
      } else {
        setTitle("Edit");
        fetchGarageById(id);
        fetchAllWillayatsByRegionId(form.region_id);
      }
    } else {
      history.goBack();
    }
  }, [id, history, form.region_id]);

  useEffect(() => {
    const fetchAllServices = async () => {
      const response = await getAllServices();

      if (response !== null) {
        setServices(response.data);
      } else {
        console.log("Server Error");
      }
    }

    const fetchGarageOwners = async () => {
      const response = await getGarageOwners();

      if (response !== null) {
        setOwners(response.data);
      } else {
        console.log("Server Error");
      }
    }

    const fetchAllRegions = async () => {
      const response = await getRegions();

      if (response !== null) {
        setRegions(response.data);
      } else {
        console.log("Server Error");
      }
    }

    fetchAllServices();
    fetchGarageOwners();
    fetchAllRegions();
  }, []);

  const fetchGarageById = async (id) => {
    const response = await getGarageById(id);

    if (response !== null) {
      if (response.status === "success") {
        setForm(response.data);
      }
    } else {
      setAlert({ visible: true, color: "danger", message: "Server Error" });
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

  const regionChangeHandler = async (e, regionId) => {
    if (regionId) {
      setForm({ ...form, region_id: regionId });
      fetchAllWillayatsByRegionId(regionId);
    }
  }

  const saveButtonHandler = async e => {
    e.preventDefault();

    if (id === "0") {
      const response = await createGarage(form);

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
      const response = await updateGarage(form);

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
      <h1>{title} Garage</h1>
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
          <Label for="name">Description</Label>
          <Input placeholder="Please Enter Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="service">Service</Label>
          <Input type="select" name="service" value={form.service_id} onChange={e => setForm({ ...form, service_id: e.target.value })}>
            <option>- Select Service -</option>
            {services.length > 0 ?
              services.map((service, i) => <option key={i} value={service.id}>{service.name}</option>) : null
            }
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="name">Service Price</Label>
          <Input placeholder="Please Enter Service Price" value={form.service_price} onChange={e => setForm({ ...form, service_price: e.target.value })} />
        </FormGroup>
        <FormGroup>
          <Label for="service">Owner</Label>
          <Input type="select" name="owner" value={form.owner_id} onChange={e => setForm({ ...form, owner_id: e.target.value })}>
            <option>- Select Owner -</option>
            {owners.length > 0 ?
              owners.map((owner, i) => <option key={i} value={owner.id}>{owner.name}</option>) : null
            }
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

export default EditGarage;
