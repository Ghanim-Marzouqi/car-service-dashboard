import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getAllUsers } from "../services";

const Users = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await getAllUsers();

      if (response !== null) {
        setUsers(response.data);
      } else {
        console.log("Server Error");
      }
    }

    fetchAllUsers();
  }, []);

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
                  <Button className="mr-2" color="success" size="sm" onClick={e => { }}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button color="danger" size="sm" onClick={e => { }}>
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