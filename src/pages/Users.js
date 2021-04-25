import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from 'react-toast-notifications';

import { getAllUsers, deleteUser } from "../services";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const { addToast, removeAllToasts } = useToasts();

  useEffect(() => {
    removeAllToasts();
    fetchAllUsers();
  }, [removeAllToasts]);

  const fetchAllUsers = async () => {
    const response = await getAllUsers();

    if (response !== null) {
      setUsers(response.data);
    } else {
      console.log("Server Error");
    }
  }

  const showTaostMessage = (message, type) => {
    return addToast(message, { appearance: type, autoDismiss: true });
  }

  const getUserType = (userType) => {
    if (userType === "ADMIN") {
      return "Administrator";
    } else if (userType === "GARAGE_OWNER") {
      return "Garage Owner";
    } else if (userType === "CUSTOMER") {
      return "Customer";
    } else {
      return "Unknown";
    }
  }

  const deleteButtonHandler = async (e, payload) => {
    e.preventDefault();

    const response = await deleteUser(payload);

    if (response !== null) {
      if (response.status === "success") {
        showTaostMessage(response.message, "success");
        await fetchAllUsers();
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
        <h1>Users</h1>
        <Button className="my-2" color="primary" size="sm" onClick={e => history.push("/admin/edit-user/0")}>
          <FontAwesomeIcon icon={faPlus} />{" "} Add New User
        </Button>
      </div>
      {users.length > 0 ?
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Role</th>
              <th className="text-right">Manage</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) =>
              <tr key={i}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.region_name} / {user.willayat_name}</td>
                <td>{getUserType(user.user_type)}</td>
                <td className="text-right">
                  <Button className="mr-2" color="success" size="sm" onClick={e => history.push(`/admin/edit-user/${user.id}`)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" size="sm" onClick={e => deleteButtonHandler(e, user.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>)
            }
          </tbody>
        </Table> : <p>No Users Found</p>}
    </>
  );
}

export default Users;