import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from 'react-toast-notifications';

import { getAllBookings, confirmBooking, sendEmail } from "../services";
import { getOwnerGaragesState } from "../store";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { addToast, removeAllToasts } = useToasts();
  const garages = useRecoilValue(getOwnerGaragesState);
  const garageIds = garages.map(g => g.id);

  useEffect(() => {
    removeAllToasts();
    fetchAllBookings(garageIds);
  }, [garageIds, removeAllToasts]);

  const fetchAllBookings = async (garageIds) => {
    const response = await getAllBookings({ garageIds });

    if (response !== null) {
      setBookings(response.data);
    } else {
      console.log("Server Error");
    }
  }

  const showTaostMessage = (message, type) => {
    return addToast(message, { appearance: type, autoDismiss: true });
  }

  const updateBooking = async (payload) => {
    const response = await confirmBooking(payload);

    if (response !== null) {
      if (response.status === "success") {
        showTaostMessage(response.message, "success");
        sendEmail({
          email: payload.email,
          subject: "Booking Confirmed",
          message: "Your requested booking has been confirmed"
        });
        await fetchAllBookings(garageIds);
      } else {
        showTaostMessage(response.message, "error");
      }
    } else {
      showTaostMessage("Server Error", "error");
    }
  }

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
                  {booking.is_confirmed === 0 ?
                    <>
                      <Button className="mr-2" color="info" size="sm" onClick={e => updateBooking({ id: booking.id, is_confirmed: 1, is_paid: booking.is_paid, email: booking.customer_email })}>
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button color="danger" size="sm" onClick={e => { }}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </> : null}
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