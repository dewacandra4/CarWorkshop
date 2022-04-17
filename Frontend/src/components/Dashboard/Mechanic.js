import React from "react";
import AuthUser from "../AuthUser/AuthUser";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Mechanic() {
  const { http } = AuthUser();
  // Get user data from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  // Get token from session storage
  const token = JSON.parse(sessionStorage.getItem("token"));
  // Get mechanic id from session storage
  const id_mechanic = user.id;
  // Loading effect
  const [loading, setLoading] = useState(true);
  // car repair list
  const [carRepairList, setCarRepairList] = useState([]);

  // get car repair list
  useEffect(() => {
    http
      .get("/list_cars_mechanic/" + id_mechanic, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCarRepairList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const markJobDone = async (id) => {
    const response = await http
      .put("mark_job_done/" + id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Success!");
        window.location.reload();
      })
      .catch((err) => {
        alert("Error, Please check your input!");
      });
  };

  return (
    <div>
      <h1 className="text-center">Welcome {user.name} </h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center">Car Repair List</h1>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Car</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="3" className="text-center">
                          <div
                            className="spinner-border text-primary"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                          Loading...
                        </td>
                      </tr>
                    ) : (
                      <>
                        {carRepairList.map((carRepair) => (
                          <tr key={carRepair.id}>
                            <td>{carRepair.name}</td>
                            <td>
                              {carRepair.status == "completed" ? (
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
                            <td>
                              {/* Disable/enable button when status completed/not  */}
                              {carRepair.status !== "completed" ? (
                                <button
                                  className="btn btn-primary"
                                  onClick={() =>
                                    Swal.fire({
                                      title: "Auto close alert!",
                                      html: "I will close in <b></b> milliseconds.",
                                      timer: 7000,
                                      timerProgressBar: true,
                                      didOpen: () => {
                                        Swal.showLoading();
                                        markJobDone(carRepair.id);
                                      },
                                    }).then((result) => {
                                      if (
                                        result.dismiss ===
                                        Swal.DismissReason.timer
                                      ) {
                                        console.log(
                                          "I was closed by the timer"
                                        );
                                      }
                                    })
                                  }
                                >
                                  Mark as Done
                                </button>
                              ) : (
                                <button className="btn btn-primary" disabled>
                                  Mark as Done
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
