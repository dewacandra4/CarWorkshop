import React from "react";
import AuthUser from "../AuthUser/AuthUser";
import { useState, useEffect } from "react";

export default function CarOwner() {
  const { http } = AuthUser();
  // Get user data from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  // Get token from session storage
  const token = JSON.parse(sessionStorage.getItem("token"));
  // Get car owner id from session storage
  const id_car_owner = user.id;
  // Loading effect
  const [loading, setLoading] = useState(true);
  // car owner list
  const [carOwnerList, setCarOwnerList] = useState([]);

  // complaint
  const [complaint, setComplaint] = useState({
    id_car: "",
    car_name: "",
    complaint: "",
  });

  // handler complaint
  const handleComplaint = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  // const submitFormComplaint = (e) => {
  //   e.preventDefault();
  //   http
  //     .put("submit_complaint/"+ complaint.id_car, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .then((res) => {
  //       alert("Complaint sent!");
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // submit complaint
  const submitFormComplaint = async (e) => {
    e.preventDefault();
    const response = await http.put("submit_complaint", complaint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      alert("Complaint sent!");
      window.location.reload();
    }).catch((err) => {
      alert("Error, Please check your input!");
    });
  };

  // get car owner list
  useEffect(() => {
    http
      .get("/list_cars_owner/" + id_car_owner, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarOwnerList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="text-center">Welcome {user.name} </h1>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Car</th>
                      <th>License Plate</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Assigned Mechanic </th>
                      <th>Registered Date</th>
                      <th>Update Date </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carOwnerList.map((car) => (
                      <tr key={car.id}>
                        <td>{car.name}</td>
                        <td>{car.license_plate}</td>
                        <td>{car.service}</td>
                        <td>
                          {car.status == "completed" ? (
                            <h6>
                              <span className="badge bg-success">
                                Completed
                              </span>
                            </h6>
                          ) : (
                            <h6>
                              <span className="badge bg-warning">
                                On Repair
                              </span>
                            </h6>
                          )}
                        </td>
                        <td>{car.mechanic}</td>
                        <td>{car.created_at}</td>
                        <td>{car.updated_at}</td>
                        <td>
                          {car.status == "completed" ? (
                            // button Modal
                            <button
                              className="btn btn-success"
                              data-bs-toggle="modal"
                              data-bs-target="#complaintModal"
                              onClick={() => {
                                setComplaint({
                                  id_car: car.id,
                                  car_name: car.name,
                                  complaint: "",
                                });
                              }}
                            >
                              Submit a complaint
                            </button>
                          ) : (
                            <button className="btn btn-secondary" disabled>
                              Submit a complaint
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Complaint Modal */}
      <div
        className="modal fade"
        id="complaintModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="complaintModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="complaintModalLabel">
                Submit a complaint
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitFormComplaint}>
                <div className="form-group">
                  <input type="hidden" name="id_car" value={complaint.id_car} />
                  <h5 className="text-center">
                    Car Name: <b> {complaint.car_name} </b>{" "}
                  </h5>
                  <label htmlFor="complaint">Complaint</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter your complaint"
                    name="complaint"
                    onChange={handleComplaint}
                  ></textarea>
                  {/* <input
                    type="text"
                    name="complaint"
                    onChange={handleComplaint}
                  /> */}
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
