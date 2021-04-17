import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from "reactstrap";

import { getStatistics } from "../services";

const Dashboard = () => {
  const history = useHistory();
  const [statistics, setStatistics] = useState({
    service_count: 0,
    garage_count: 0,
    user_count: 0,
    booking_count: 0
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      const response = await getStatistics();

      if (response !== null) {
        setStatistics({
          service_count: response.data.service_count,
          garage_count: response.data.garage_count,
          user_count: response.data.user_count,
          booking_count: response.data.booking_count
        });
      } else {
        console.log("Server Error");
      }
    }

    fetchStatistics();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <Row>
        <Col md={3} sm={4} xs={12}>
          <Card className="my-2" style={{ backgroundColor: "#0984e3", color: "white" }}>
            <CardBody>
              <CardTitle tag="h5">Services</CardTitle>
              <CardText tag="h1" className="text-center">{statistics.service_count}</CardText>
              <Button color="danger" size="sm" onClick={e => history.push("/admin/services")}>
                View
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} sm={4} xs={12}>
          <Card className="my-2" style={{ backgroundColor: "#ff7675", color: "white" }}>
            <CardBody>
              <CardTitle tag="h5">Garages</CardTitle>
              <CardText tag="h1" className="text-center">{statistics.garage_count}</CardText>
              <Button color="danger" size="sm" onClick={e => history.push("/admin/garages")}>
                View
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} sm={4} xs={12}>
          <Card className="my-2" style={{ backgroundColor: "#00b894", color: "white" }}>
            <CardBody>
              <CardTitle tag="h5">Users</CardTitle>
              <CardText tag="h1" className="text-center">{statistics.user_count}</CardText>
              <Button color="danger" size="sm" onClick={e => history.push("/admin/users")}>
                View
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col md={3} sm={4} xs={12}>
          <Card className="my-2" style={{ backgroundColor: "#6c5ce7", color: "white" }}>
            <CardBody>
              <CardTitle tag="h5">Bookings</CardTitle>
              <CardText tag="h1" className="text-center">{statistics.booking_count}</CardText>
              <div style={{ marginBottom: 40 }}></div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;