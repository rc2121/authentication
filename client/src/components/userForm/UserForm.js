import React, { useState, useEffect } from "react";
import Header from "../header/Header";
import "./userForm.css";
import moment from "moment";
import { addUser, getSpecificUser, updateUser } from "../../Api";

const UserForm = (props) => {
  const { history } = props;
  const [newUserData, setNewUserData] = useState({
    name: undefined,
    gender: 1,
    age: undefined,
    dob: undefined,
  });
  const [valueError, setValueError] = useState({
    name: undefined,
    age: undefined,
    dob: undefined,
  });
  const [editId, setEditId] = useState(null);

  const handleCreateNewUser = async (e) => {
    e.preventDefault();
    if (await checkValidation()) {
      let status;
      if (editId) {
        status = await updateUser(editId, newUserData);
      } else {
        status = await addUser(newUserData);
      }
      if (status === 201 || status === 200) {
        history.push("/users");
      }
    }
  };

  const checkValidation = () => {
    let obj = {};
    if (!newUserData.name || newUserData.name === "") {
      obj["name"] = "please enter the name;";
    }
    if (!newUserData.age && newUserData.age !== 0) {
      obj["age"] = "please enter the age";
    }
    if (newUserData.age <= 0 && newUserData.age >= 101) {
      obj["age"] = "please enter the age between 1 to 100";
    }
    if (!newUserData.dob || newUserData.dob === "") {
      obj["dob"] = "please enter the dob";
    }
    if (Object.keys(obj).length > 0) {
      setValueError(obj);
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      history.push("/sign-in");
    }
    if (history.location.state) {
      const getSpecific = async () => {
        const data = await getSpecificUser(history.location.state.id);
        const { _id, name, gender, age, dob } = data[0];
        setNewUserData({
          name: name,
          gender: gender ? 1 : 0,
          age: age,
          dob: moment(dob).format("YYYY-MM-DD"),
        });
        setEditId(_id);
      };
      getSpecific();
    }
  }, [history]);

  return (
    <>
      <Header />
      <div className="user-form-wrapper">
        <h2>{editId ? "Edit" : "Create"} User Details</h2>
        <form className="needs-validation">
          <div className="mt-3">
            <label htmlFor="exampleInputEmail1">Name</label>
            <input
              type="text"
              className={`form-control ${valueError.name ? "is-invalid" : ""}`}
              id="exampleInput"
              aria-describedby="nameHelp"
              placeholder="Enter name"
              value={newUserData.name}
              onChange={(e) =>
                setNewUserData({ ...newUserData, name: e.target.value })
              }
            />
            {valueError.name && (
              <div className="invalid-feedback">{valueError.name}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail1">Gender:</label>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios1"
                value="1"
                checked={newUserData.gender === 1 ? true : false}
                onChange={() => setNewUserData({ ...newUserData, gender: 1 })}
              />
              <label className="form-check-label" htmlFor="exampleRadios1">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="exampleRadios"
                id="exampleRadios2"
                value="0"
                checked={newUserData.gender === 0 ? true : false}
                onChange={() => setNewUserData({ ...newUserData, gender: 0 })}
              />
              <label className="form-check-label" htmlFor="exampleRadios2">
                Female
              </label>
            </div>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail1">Age</label>
            <input
              type="number"
              className={`form-control ${valueError.age ? "is-invalid" : ""}`}
              id="exampleAge"
              aria-describedby="age"
              placeholder="Enter Age"
              value={newUserData.age}
              onChange={(e) =>
                setNewUserData({ ...newUserData, age: +e.target.value })
              }
            />
            {valueError.age && (
              <div className="invalid-feedback">{valueError.age}</div>
            )}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="exampleInputEmail1">Dob</label>
            <input
              type="date"
              className={`form-control ${valueError.name ? "is-invalid" : ""}`}
              id="exampleDob"
              aria-describedby="dob"
              value={newUserData.dob}
              onChange={(e) =>
                setNewUserData({ ...newUserData, dob: e.target.value })
              }
            />
            {valueError.dob && (
              <div className="invalid-feedback">{valueError.dob}</div>
            )}
          </div>
          <button
            className={`${editId ? "btn btn-success" : "btn btn-primary"} mt-3`}
            onClick={handleCreateNewUser}
          >
            {editId ? "Save" : "Create"}
          </button>
        </form>
      </div>
    </>
  );
};

export default UserForm;
