import React from "react";
import axios from "axios";
import AuthUser from "../AuthUser/AuthUser";
import { useState, useEffect } from "react";


// import { useNavigate } from "react-router-dom";
export default function Admin() {
  //  const navigation = useNavigate();
  const { http } = AuthUser();
  // Get user data from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  // Get token from session storage
  const token = JSON.parse(sessionStorage.getItem("token"));
  // Loading effect
  const [loading, setLoading] = useState(true);

  // services list
  const [services, setServices] = useState([]);
  // car owners list
  const [carOwners, setCarOwners] = useState([]);
  // car repair management list
  const [carRepairManagements, setCarRepairManagements] = useState([]);
  // mechanic list
  const [mechanics, setMechanics] = useState([]);
  
  // Car
  const [inputs, setInputs] = useState({
    name: "",
    model: "",
    license_plate: "",
    owner_id: "",
    // mechanic_id: "0",
    service_id: "",
    status: "on_repair",
    error_list: [],
  });
  // Car owner
  const [owner, setOwner] = useState({
    name: "",
    email: "",
    password: "",
    role: 2,
    error_list: [],
  });
  // services
  const [service, setService] = useState({
    name: "",
    price: "",
    error_list: [],
  });
  // edit service
  const [editServices, setEditService] = useState({
    name: "",
    price: "",
    id: "",
    error_list: [],
  });
  // assign mechanic
  const [assignMechanic, setAssignMechanic ] = useState({
    id: "",
    error_list: [],
  });


  // get services list data
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/list_services",
    }).then((res) => {
      if (res.status == 200) {
        setServices(res.data.data);
        setLoading(false);
      }
    });
  }, []);
  // get car owner list data
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/list_cowners",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status == 200) {
        setCarOwners(res.data);
        setLoading(false);
      }
    });
  }, []);

  // get mechanic data
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/list_mechanics",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status == 200) {
        setMechanics(res.data);
        setLoading(false);
      }
    });
  }, []);

  // get car repair management list data
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/list_cars",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status == 200) {
        setCarRepairManagements(res.data.data);
        setLoading(false);
      }
    });
  }, []);

  // Select option for services
  var serviceList_Option = "";
  if (services.length > 0) {
    serviceList_Option = services.map((service, index) => {
      return (
        <option key={index} value={service.id}>
          {service.name}
        </option>
      );
    });
  }

  // Select option for car owners
  var carOwnerList_Option = "";
  if (carOwners.length > 0) {
    carOwnerList_Option = carOwners.map((carOwner, index) => {
      return (
        <option key={index} value={carOwner.id}>
          {carOwner.name}
        </option>
      );
    });
  }

  // Select option for mechanics
  var mechanicList_Option = "";
  if (mechanics.length > 0) {
    mechanicList_Option = mechanics.map((mechanic, index) => {
      return (
        <option key={index} value={mechanic.id}>
          {mechanic.name}
        </option>
      );
    });
  }

  // handler for car owner input
  const handleOwner = (e) => {
    e.persist();
    setOwner((owner) => ({
      ...owner,
      [e.target.name]: e.target.value,
    }));
  };

  //   handdler for input car 
  const handleCar = (e) => {
    e.persist();
    setInputs((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  //  handdler for input service 
  const handleService = (e) => {
    e.persist();
    setService((service) => ({
      ...service,
      [e.target.name]: e.target.value,
    }));
  };

  //  handdler for input service change
  const handleChangeService = (e) => {
    e.persist();
    setEditService((editServices) => ({
      ...editServices,
      [e.target.name]: e.target.value,
    }));
  };

  // handler for assign mechanic
  const handleAssignMechanic = (e) => {
    e.persist();
    setAssignMechanic((assignMechanic) => ({
      ...assignMechanic,
      [e.target.name]: e.target.value,
    }));
  };


  //  submit car
  const submitForm = async (e) => {
    e.preventDefault();
    const response = await http.post("add_car", inputs, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Successfully add car!");
      window.location.reload();
    }).catch((err) => {
      alert("Error, Please check your input!");
    });
  };

  //   submit car owner

  const submitFormOwner = async (e) => {
    e.preventDefault();
    const response = await http.post("register_cowner", owner, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Successfully add car owner!");
      window.location.reload();
    }).catch((err) => {
      alert("Error, Please check your input!");
    });
  };

  //  submit add service
  const submitFormService = async (e) => {
    e.preventDefault();
    const response = await http.post("add_service", service, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Successfully add service!");
      window.location.reload();
    }).catch((err) => {
      alert("Error, Please check your input!");
    });
  };

  //  submit edit service
  const submitFormEditService = async (e) => {
    e.preventDefault();
    const response = await http.put("edit_service", editServices, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Successfully edit the service!");
      window.location.reload();
    }).catch((err) => {
      alert("Error, Please check your input!");
    });
  };

  // submit assign mechanic
  const submitFormAssignMechanic = async (e) => {
    e.preventDefault();
    const response = await http.put("updateMechanic", assignMechanic, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Successfully assign mechanic!");
      window.location.reload();
    }).catch((err) => {
      alert("Error, Please check your input!");
    });
  };



  //  delete service
  const deleteService = async (id) => {
    const response = await http.delete("delete_service/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      alert("Service deleted!");
      window.location.reload();
    }).catch((err) => {
      alert("Error, service not deleted!");
    });
  };

  return (
    <div>
      <h1 className="text-center">Welcome {user.name} </h1>
      {/* Add Car Info */}
      {/* Start Table Services */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3>Services List</h3>
            </div>
            <div className="card-body">
              {/* Button add services */}
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#serviceModal"
              >
                Add Service
              </button>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Option</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">
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
                      {services.map((service, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{service.name}</td>
                            <td>{service.price}</td>
                            <td>
                              {/* <Link to={`/edit_service/${service.id}`}>
                                    <button className="btn btn-primary">
                                      View
                                    </button>
                                  </Link> */}
                              {/* Button modal edit */}
                              <button
                                onClick={() => {
                                  setEditService({
                                    service,
                                    id: service.id,
                                    name: service.name,
                                    price: service.price,
                                  });
                                  // console.log(editServices.selectedData)
                                }}
                                className="btn btn-primary mx-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editServiceModal"
                              >
                                Edit{" "}
                              </button>
                              <button
                                onClick={() => {
                                  deleteService(service.id);
                                }}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* End Table Services */}
      {/* Start Table Car Owner */}
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-4">
            <div className="card-header">
              <h3>Car Owner List</h3>
            </div>
            <div className="card-body">
              {/* Button Add Car Owner */}
              <button
                type="button"
                className="btn btn-primary mx-2 my-2"
                data-bs-toggle="modal"
                data-bs-target="#carOwnerModal"
              >
                Add Car Owner
              </button>
              <h6 className="text-danger">
                *Please give the account to the car owner, so that they can
                check the car service status{" "}
              </h6>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                        Loading
                      </td>
                    </tr>
                  ) : (
                    <>
                      {carOwners.map((carOwner, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{carOwner.name}</td>
                            <td>{carOwner.email}</td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* End Table Car Owner */}

      {/* Start table car repair managegement */}
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-4">
            <div className="card-header">
              <h3>Job & Car Repair Management</h3>
            </div>
            <div className="card-body">
              {/* Button Modal Car */}
              <button
                type="button"
                className="btn btn-primary mx-2"
                data-bs-toggle="modal"
                data-bs-target="#carModal"
              >
                Add Car
              </button>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Car Owner</th>
                    <th scope="col">Car</th>
                    <th scope="col">Service</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">Option</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="7">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                        Loading
                      </td>
                    </tr>
                  ) : (
                    <>
                      {carRepairManagements.map(
                        (carRepairManagement, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{carRepairManagement.car_owner}</td>
                              <td>{carRepairManagement.name}</td>
                              <td>{carRepairManagement.service}</td>
                              <td>{carRepairManagement.created_at}</td>
                              <td>{
                              (carRepairManagement.status == "completed" ? (
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
                              ))}
                              </td>
                              <td>
                                <button
                                  onClick={() => {
                                    setAssignMechanic({
                                      carRepairManagement,
                                      id: carRepairManagement.id,
                                    });
                                    console.log(carRepairManagement.id);
                                  }}
                                  className="btn btn-primary mx-2"
                                  data-bs-toggle="modal"
                                  data-bs-target="#editCarRepairManagementModal"
                                >
                                  Assign{" "}
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/*Start Modal Edit Service */}
      <div
        className="modal fade"
        id="editServiceModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Service
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitFormEditService}>
                <div className="form-group">
                  <input type="hidden" name="id" value={editServices.id} />
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={editServices.name}
                    onChange={handleChangeService}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={editServices.price}
                    onChange={handleChangeService}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Modal Edit Service */}

      {/*Start Modal Add Owner */}
      <div
        className="modal fade"
        id="carOwnerModal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Car Owner</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={submitFormOwner}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    onChange={handleOwner}
                    value={owner.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleOwner}
                    value={owner.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    onChange={handleOwner}
                    value={owner.password}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password_confirmation">
                    Password Confirmation
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    placeholder="Enter password confirmation"
                    onChange={handleOwner}
                    value={owner.password_confirmation}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Owner Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Modal Add Owner */}
      {/* Start Modal Add Car */}
      <div
        className="modal fade"
        id="carModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Car</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={submitForm}>
              <div className="modal-body">
                <input
                  className="form-control my-2"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleCar}
                  value={inputs.name}
                />
                <input
                  className="form-control my-2"
                  type="text"
                  name="model"
                  placeholder="Model"
                  onChange={handleCar}
                  value={inputs.model}
                />
                <input
                  className="form-control my-2"
                  type="text"
                  name="license_plate"
                  placeholder="License Plate"
                  onChange={handleCar}
                  value={inputs.license_plate}
                />
                <select
                  className="form-select my-2"
                  type="text"
                  name="owner_id"
                  placeholder="Owner ID"
                  onChange={handleCar}
                  value={inputs.owner_id}
                >
                  <option value="">Select Owner</option>
                  {carOwnerList_Option}
                </select>

                <select
                  className="form-select my-2"
                  name="service_id"
                  onChange={handleCar}
                  value={inputs.service_id}
                >
                  <option value="">Select Service</option>
                  {serviceList_Option}
                </select>
                {/* <select
                  className="form-select my-2"
                  name="status"
                  onChange={handleCar}
                  value={inputs.status}
                >
                  <option value="">Select Status</option>
                  <option value="completed">Completed</option>
                  <option value="on_repair">On Repair</option>
                </select> */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Modal Add Car */}
      {/*Start Modal Add Services */}
      <div
        className="modal fade"
        id="serviceModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Service</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <form onSubmit={submitFormService}>
              <div className="modal-body">
                <input
                  className="form-control my-2"
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleService}
                  value={service.name}
                />
                <input
                  className="form-control my-2"
                  type="text"
                  name="price"
                  placeholder="Price"
                  onChange={handleService}
                  value={service.price}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/*End Modal Add Services */}
      {/* Start Modal Assign Mechanic */}
      <div
        className="modal fade"
        id="editCarRepairManagementModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Assign Mechanic</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={submitFormAssignMechanic}>
              <div className="modal-body">
                <input type="hidden" name="id" value={assignMechanic.id} />
                <select 
                  className="form-select my-2"
                  name="mechanic_id"
                  onChange={handleAssignMechanic}
                  value={assignMechanic.mechanic_id}
                >
                  <option value="">Select Mechanic</option>
                  {mechanicList_Option}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Assign Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* End Modal Assign Mechanic */}
    </div>
  );
}
