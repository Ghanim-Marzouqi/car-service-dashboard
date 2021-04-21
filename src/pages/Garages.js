import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";

import { getAllGarages, deleteGarage } from "../services";

const Garages = () => {
  const history = useHistory();
  const { addToast, removeAllToasts } = useToasts();
  const [garages, setGarages] = useState([]);

  useEffect(() => {
    removeAllToasts();
    fetchAllGarages();
  }, [removeAllToasts]);

  const fetchAllGarages = async () => {
    const response = await getAllGarages();

    if (response !== null) {
      setGarages(response.data);
    } else {
      console.log("Server Error");
    }
  }

  const showTaostMessage = (message, type) => {
    return addToast(message, { appearance: type, autoDismiss: true });
  }

  const handleDeleteGarage = async (e, garageId) => {
    e.preventDefault();

    const response = await deleteGarage(garageId);

    if (response != null) {
      if (response.status === "success") {
        showTaostMessage(response.message, "success");
        fetchAllGarages();
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
        <h1>Garages</h1>
        <Button className="my-2" color="primary" size="sm" onClick={e => history.push("/admin/edit-garage/0")}>
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
                <td className="text-right">
                  <Button className="mr-2" color="success" size="sm" onClick={e => history.push(`/admin/edit-garage/${garage.id}`)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" size="sm" onClick={e => handleDeleteGarage(e, garage.id)}>
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