import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getAllServices } from "../services";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchAllServices = async () => {
      const response = await getAllServices();

      if (response !== null) {
        setServices(response.data);
      } else {
        console.log("Server Error");
      }
    }

    fetchAllServices();
  }, []);

  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <h1>Services</h1>
        <Button className="my-2" color="primary" size="sm">
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
                  <Button className="mr-2" color="success" size="sm" onClick={e => { }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" size="sm" onClick={e => { }}>
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