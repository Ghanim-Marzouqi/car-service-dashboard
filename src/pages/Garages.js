import React, { useState, useEffect } from "react";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getAllGarages } from "../services";

const Garages = () => {
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    const fetchAllGarages = async () => {
      const response = await getAllGarages();

      if (response !== null) {
        setGarages(response.data);
      } else {
        console.log("Server Error");
      }
    }

    fetchAllGarages();
  }, []);
  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <h1>Garages</h1>
        <Button className="my-2" color="primary" size="sm">
          <FontAwesomeIcon icon={faPlus} />{" "} Add New Garage
        </Button>
      </div>
      {garages.length > 0 ?
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Owner</th>
              <th>Location</th>
              <th className="text-right">Manage</th>
            </tr>
          </thead>
          <tbody>
            {garages.map((garage, i) =>
              <tr key={i}>
                <td>{garage.name}</td>
                <td>{garage.service_name}</td>
                <td>{garage.owner_name}</td>
                <td>{garage.region_name} / {garage.willayat_name}</td>
                <td className="text-right" onClick={e => { }}>
                  <Button className="mr-2" color="success" size="sm">
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" size="sm" onClick={e => { }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>)
            }
          </tbody>
        </Table> : <p>No Garages Found</p>}
    </>
  );
}

export default Garages;