import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { creareService, getServiceById, updateService } from "../services";

const EditService = () => {
  const history = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [form, setForm] = useState({
    id: "0",
    name: "",
    description: ""
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
        fetchService({ id });
      }
    } else {
      history.goBack();
    }
  }, [id, history]);

  const fetchService = async (payload) => {
    const response = await getServiceById(payload);

    if (response !== null) {
      if (response.status === "success") {
        setForm(response.data);
      } else {
        setAlert({ visible: true, color: "danger", message: response.message });
      }
    } else {
      setAlert({ visible: true, color: "danger", message: "Server Error" });
    }
  }

  const saveButtonHandler = async (e) => {
    e.preventDefault();

    if (form.id === "0") {
      const response = await creareService(form);

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
      const response = await updateService(form);

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
          <Label for="description">Description</Label>
          <Input placeholder="Please Enter Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
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

export default EditService;
