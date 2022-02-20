import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

class editStudent extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      phone: "",
      course: "",
    };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    const studentId = this.props.match.params.id;
    // console.log(studentId);
    const res = await axios.get(
      `http://127.0.0.1:8000/api/edit-student/${studentId}`
    );
    console.log(res);
    if (res.data.status === 200) {
      this.setState({
        name: res.data.student.name,
        email: res.data.student.email,
        phone: res.data.student.course,
        course: res.data.student.phone,
      });
    }
    else if (res.data.status === 404) {
      this.props.history.push('/')
      swal({
          title: "No Record Found",
          text: res.data.message,
          icon: "warning",
          button: "OK!",
        });
    }
  }

  updateStudent = async (e) => {
    e.preventDefault();
    const studentId = this.props.match.params.id;
    document.getElementById('update-btn').innerText = 'updating';
    document.getElementById('update-btn').disabled = true;

    const res = await axios.put(
      `http://127.0.0.1:8000/api/update-student/${studentId}`,
      this.state
    );
    if (res.data.status === 200) {
        // console.log(res.data.message);
        swal({
          title: "Student Updated Succesfully",
          text: res.data.message,
          icon: "success",
          button: "OK!",
        });
        document.getElementById("update-btn").innerText = "Update Student";
        document.getElementById("update-btn").disabled = false;
      this.setState({
        name: "",
        email: "",
        phone: "",
        course: "",
      });
    }
  };

  render() {
    const { name, email, phone, course } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>
                  Update Student
                  <Link to={"/"} className="btn btn-primary btn-sm float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.updateStudent}>
                  <div className="form-group mb-3">
                    <label>Student Name</label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={this.handleChange}
                      className="form-control"
                    />
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
                  </div>
                  <div className="form-group mb-3">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      id="update-btn"
                    >
                      Update Student
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

export default editStudent;
