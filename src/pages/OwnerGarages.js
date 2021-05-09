import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";

import { getGarageOwnerGarages, deleteGarage } from "../services";
import { getLoggedInUserState } from "../store";

const OwnerGarages = () => {
  const history = useHistory();
  const user = useRecoilValue(getLoggedInUserState);
  const { addToast, removeAllToasts } = useToasts();
  const [garages, setGarages] = useState([]);

  const fetchGarageOwnerGarages = useCallback(async () => {
    const response = await getGarageOwnerGarages(user.id);

    if (response !== null) {
      if (response.status === "success") {
        setGarages(response.data);
      }
    } else {
      console.log("Server Error");
    }
  }, [user.id]);

  useEffect(() => {
    removeAllToasts();
    fetchGarageOwnerGarages();
  }, [removeAllToasts, user.id, fetchGarageOwnerGarages]);

  const showTaostMessage = (message, type) => {
    return addToast(message, { appearance: type, autoDismiss: true });
  }

  const handleDeleteGarage = async (e, garageId) => {
    e.preventDefault();

    const response = await deleteGarage(garageId);

    if (response != null) {
      if (response.status === "success") {
        showTaostMessage(response.message, "success");
        fetchGarageOwnerGarages();
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
        <Button className="my-2" color="primary" size="sm" onClick={e => history.push("/garage-owner/edit-garage/0")}>
          <FontAwesomeIcon icon={faPlus} />{" "} Add New Garage
        </Button>
      </div>
      {garages.length > 0 ?
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Service</th>
              <th>Service Price</th>
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
                <td>{garage.service_price} O.R</td>
                <td>{garage.owner_name}</td>
                <td>{garage.region_name} / {garage.willayat_name}</td>
                <td className="text-right">
                  <Button className="mr-2" color="success" size="sm" onClick={e => history.push(`/garage-owner/edit-garage/${garage.id}`)}>
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

export default OwnerGarages;
