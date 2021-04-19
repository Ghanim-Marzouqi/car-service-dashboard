import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from 'react-toast-notifications';

import { getAllServices, deleteService } from "../services";

const Services = () => {
  const history = useHistory();
  const { addToast, removeAllToasts } = useToasts();
  const [services, setServices] = useState([]);

  useEffect(() => {
    removeAllToasts();
    fetchAllServices();
  }, [removeAllToasts]);

  const fetchAllServices = async () => {
    const response = await getAllServices();

    if (response !== null) {
      setServices(response.data);
    } else {
      console.log("Server Error");
    }
  }

  const showTaostMessage = (message, type) => {
    return addToast(message, { appearance: type, autoDismiss: true });
  }

  const deleteButtonHandler = async (e, payload) => {
    e.preventDefault();

    const response = await deleteService(payload);

    if (response !== null) {
      if (response.status === "success") {
        showTaostMessage(response.message, "success");
        await fetchAllServices();
      } else {
        showTaostMessage(response.message, "error");
      }
    } else {
      showTaostMessage("Server Error", "error");
    }
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <h1>Services</h1>
        <Button className="my-2" color="primary" size="sm" onClick={e => history.push("/admin/edit-service/0")}>
          <FontAwesomeIcon icon={faPlus} />{" "} Add New Service
        </Button>
      </div>
      {services.length > 0 ?
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th className="text-right">Manage</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) =>
              <tr key={i}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price} O.R</td>
                <td className="text-right">
                  <Button className="mr-2" color="success" size="sm" onClick={e => history.push(`/admin/edit-service/${service.id}`)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" size="sm" onClick={e => deleteButtonHandler(e, { id: service.id })}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>)}
          </tbody>
        </Table> : <p>No Services Found</p>
      }
    </>
  );
}

export default Services;