import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import Header from "../header/Header";
import "./userList.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllUsers, deleteUser } from "../../Api";
import moment from "moment";

const UserList = (props) => {
  const { history } = props;
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      history.push("/sign-in");
    }
    const getUser = async () => {
      const data = await getAllUsers(localStorage.getItem("id"));
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setUsers(data);
    };
    getUser();
  }, [history]);

  const handleToggle = (e) => {
    setToggle((val) => !val);
  };

  const handleDelete = async () => {
    const data = await deleteUser(deleteUserId);
    setUsers(data);
    handleToggle();
  };
  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  } else {
    return (
      <>
        <Header />
        <div className="add-wrapper">
          <Button
            variant="success"
            onClick={() => {
              history.push("/form");
            }}
          >
            Add New
          </Button>
        </div>
        {toggle && (
          <Modal show={toggle} onHide={handleToggle}>
            <Modal.Header closeButton>
              <Modal.Title>Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure, you want to delete this user ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleDelete}>
                Yes
              </Button>
              <Button variant="primary" onClick={handleToggle}>
                No
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <div className="user-table-wrapper">
          <h4>User Details</h4>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">gender</th>
                <th scope="col">Age</th>
                <th scope="col">DOB</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.gender ? "Male" : "Female"}</td>
                    <td>{d.age}</td>
                    <td>{moment(d.dob).format("DD-MM-YYYY")}</td>
                    <td>
                      <div className="action-column">
                        <Button
                          variant="primary"
                          onClick={() =>
                            props.history.push({
                              pathname: "/form",
                              state: { id: d._id },
                            })
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            setDeleteUserId(d._id);
                            handleToggle();
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr align="center">
                  <td colSpan={6}>No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <ToastContainer autoClose={2000} />
      </>
    );
  }
};

export default UserList;
