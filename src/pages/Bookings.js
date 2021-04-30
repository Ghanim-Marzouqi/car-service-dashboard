import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Button, Table } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from 'react-toast-notifications';

import { getAllBookings, confirmBooking, sendEmail } from "../services";
import { getGarageIdsState } from "../store";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { addToast, removeAllToasts } = useToasts();
  const garageIds = useRecoilValue(getGarageIdsState);

  useEffect(() => {
    removeAllToasts();
    fetchAllBookings(garageIds);
  }, [garageIds, removeAllToasts]);

  const getBookingStatus = (status) => {
    if (status) {
      if (status === "P") {
        return "Pending";
      } else if (status === "C") {
        return "Confirmed";
      } else if (status === "R") {
        return "Rejected";
      }
    } else {
      return "Unknown";
    }
  }

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

        if (payload.status === "C") {
          sendEmail({
            email: payload.email,
            subject: "Booking Confirmed",
            message: `Your order (reference number: ${response.data.order_id} - Date: ${response.data.booking_date.split(".")[0].replace("T", " ")}) has been confirmed`
          });
        } else {
          sendEmail({
            email: payload.email,
            subject: "Booking Rejected",
            message: `Your order (reference number: ${response.data.order_id} - Date: ${response.data.booking_date.split(".")[0].replace("T", " ")}) has been rejected`
          });
        }

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
              <th>Booking Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, i) =>
              <tr key={i}>
                <td>{booking.customer_name}</td>
                <td>{booking.service_name}</td>
                <td>{booking.garage_name}</td>
                <td>{`${booking.booking_date}`.split(".")[0].replace("T", " ")}</td>
                <td>{getBookingStatus(booking.status)}</td>
                <td className="text-right">
                  {booking.status === "P" ?
                    <>
                      <Button className="mr-2" color="info" size="sm" onClick={e => updateBooking({ id: booking.id, status: "C", email: booking.customer_email })}>
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button color="danger" size="sm" onClick={e => updateBooking({ id: booking.id, status: "R", email: booking.customer_email })}>
                        <FontAwesomeIcon icon={faTimes} />
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