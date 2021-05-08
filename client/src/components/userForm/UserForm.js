import React, { useState,useEffect } from "react";
import "./userForm.css";
import moment from 'moment';
import { addUser, getSpecificUser, updateUser } from '../../Api';

const UserForm = (props) => {
  const { history } = props;
  const [ newUserData, setNewUserData] = useState({
    name: undefined,
    gender: true,
    age: undefined,
    dob: undefined,
  });
  const [editId, setEditId] = useState(null)

  const handleCreateNewUser = async(e) => {
    e.preventDefault();
    let status;
    if(editId) {
      status = await updateUser(editId, newUserData);
    } else {
      status = await addUser(newUserData);
    }
    if (status === 201 || status === 200) {
      history.push('/users');
    }
  };

  useEffect(()=>{
    if (!localStorage.getItem('id')) {
      history.push('/sign-in')
    }
    if (history.location.state) {
        const getSpecific = async () => {
            const data = await getSpecificUser(history.location.state.id)
            const { _id, name, gender, age, dob } = data[0]; 
            setNewUserData({
              name: name,
              gender: gender ? 1 : 0,
              age: age,
              dob: moment(dob).format('YYYY-MM-DD')
            });
            setEditId(_id);
        }
        getSpecific();
    }
  },[]);
  
  return (
    <div className="user-form-wrapper">
      <h2>{editId ? 'Edit' : 'Create'} User Details</h2>
      <form>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            aria-describedby="nameHelp"
            placeholder="Enter name"
            value={newUserData.name}
            onChange={(e) => setNewUserData({...newUserData, name: e.target.value})}
          />
        </div>
        <div className="form-group mt-3">
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked={newUserData.gender === 1 ? true : false} onChange={() => setNewUserData({ ...newUserData, gender: 1 })} />
                <label className="form-check-label" for="exampleRadios1">
                    Male
                </label>
            </div>
            <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="0" checked={newUserData.gender === 0 ? true : false} onChange={() => setNewUserData({ ...newUserData, gender: 0 })} />
                <label className="form-check-label" for="exampleRadios2">
                    Female
                </label>
            </div>
        </div>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Age</label>
          <input
            type="number"
            className="form-control"
            id="exampleAge"
            aria-describedby="age"
            placeholder="Enter Age"
            value={newUserData.age}
            onChange={(e) => setNewUserData({...newUserData, age: +e.target.value})}
          />
        </div>
        <div className="form-group mt-3">
          <label for="exampleInputEmail1">Dob</label>
          <input
            type="date"
            className="form-control"
            id="exampleDob"
            aria-describedby="dob"
            value={newUserData.dob}
            onChange={(e) => setNewUserData({...newUserData, dob: e.target.value})}
          />
        </div>
        <button className="btn btn-primary mt-3" onClick={handleCreateNewUser}>
          {editId ? 'Edit' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
