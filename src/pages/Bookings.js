import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { getAllBookings } from "../services";
import { getOwnerGaragesState } from "../store";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const garages = useRecoilValue(getOwnerGaragesState);

  useEffect(() => {
    const garageIds = garages.map(g => g.id);

    const fetchAllBookings = async () => {
      const response = await getAllBookings({ garageIds });

      if (response !== null) {
        setBookings(response.data);
      } else {
        console.log("Server Error");
      }
    }

    fetchAllBookings();
  }, [garages]);

  return (
    <>
      <h1>Bookings</h1>
      {(bookings !== null && bookings.length) > 0 ?
        <Table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Service</th>
              <th>Garage</th>
              <th>Booking Date</th>
              <th>Is Confirmed</th>
              <th>Is Paid</th>
              <th className="text-right">Manage</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) =>
              <tr key={i}>
                <td>{booking.customer_name}</td>
                <td>{booking.service_name}</td>
                <td>{booking.garage_name}</td>
                <td>{`${booking.booking_date}`.split(".")[0].replace("T", " ")}</td>
                <td>{booking.is_confirmed === 0 ? "Pending" : "Confirmed"}</td>
                <td>{booking.is_paid === 0 ? "Pending" : "Paid"}</td>
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
        </Table> : <p>No Bookings Found</p>
      }
    </>
  );
}

export default Bookings;