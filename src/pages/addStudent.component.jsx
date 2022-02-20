import React, {Component} from "react";
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from "sweetalert";


class addStudent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      course: "",
      error_list: [],
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    
  };

  saveStudent = async (e) => {
    e.preventDefault(); 
    const res = await axios.post(
      "http://127.0.0.1:8000/api/add-student",
      this.state
    ); 
    if (res.data.status === 200) {
      // console.log('Student Added Succesfully');
      swal({
        title: "Student Added Succesfully",
        text: res.data.message,
        icon: "success",
        button: "OK!",
      });
      this.props.history.push('/'); 
      this.setState({
        name: "",
      email: "",
      phone: "",
      course: "",
      })
    }
    else {
      this.setState({
        error_list: res.data.validate_err,
      });
      console.log('Error adding student');
    }
  }

  render() {
    const { name, email, phone, course, error_list } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>
                  Student Data
                  <Link to={"/"} className="btn btn-primary btn-sm float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.saveStudent}>
                  <div className="form-group mb-3">
                    <label>Student Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    <span className="text-danger">{error_list.name}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Course</label>
                    <input
                      type="text"
                      name="course"
                      value={course}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    <span className="text-danger">{error_list.course}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Email</label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    <span className="text-danger">{error_list.email}</span>
                  </div>
                  <div className="form-group mb-3">
                    <label>Student Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={this.handleChange}
                      className="form-control"
                    />
                    <span className="text-danger">{error_list.phone}</span>
                  </div>
                  <div className="form-group mb-3">
                    <button className="btn btn-primary" type="submit">
                      Save Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default addStudent 